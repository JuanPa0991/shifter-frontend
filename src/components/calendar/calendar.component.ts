import { Component, signal, ViewChild, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AddCalendarEventComponent } from '../add-calendar-event/add-calendar-event.component';
import { TurnComponent } from '../../pages/turn/turn.component';
import esLocale from '@fullcalendar/core/locales/es';
import { TurnDTO, TurnService } from '../../services/turn.service';
import { delay, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, AddCalendarEventComponent, TurnComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() initDate?: string;
  @Input() endDate?: string;
  @Input() userId?: number;
  @ViewChild(AddCalendarEventComponent) addEventDialog!: AddCalendarEventComponent;
  @ViewChild('calendar') calendar: any;
  @ViewChild('turnDialog') turnDialog!: TurnComponent;

  @Output() turnSaved = new EventEmitter<any>();

  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventColor: '#378006',
    eventDisplay: 'block',
    locale: esLocale
  });

  protected isNotAdminUser = false;

  constructor(
    private readonly turnService: TurnService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isNotAdminUser = !!this.route.snapshot.queryParams['userId']
    this.updateCalendarRange();
    this.loadTurns(this.route.snapshot.queryParams['userId']);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateCalendarRange();
  }

  updateCalendarRange() {
    if (this.initDate && this.endDate) {
      const end = new Date(this.endDate);
      end.setDate(end.getDate() + 1);
      const endStr = end.toISOString().split('T')[0];

      this.calendarOptions.set({
        ...this.calendarOptions(),
        visibleRange: {
          start: this.initDate,
          end: endStr
        },
        validRange: {
          start: this.initDate,
          end: endStr
        },
        initialDate: this.initDate
      });
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if (this.initDate && this.endDate) {
      const start = new Date(selectInfo.start);
      start.setHours(0, 0, 0, 0);
      const init = new Date(this.initDate);
      init.setHours(0, 0, 0, 0);
      const end = new Date(this.endDate);
      end.setHours(0, 0, 0, 0);

      if (start < init || start > end) {
        return;
      }
    }
    if (this.turnDialog) {
      this.turnDialog.showDialog();
      this.turnDialog.turnForm.patchValue({
        initDate: selectInfo.start.toISOString().split('T')[0],
        endDate: selectInfo.end ? selectInfo.end.toISOString().split('T')[0] : ''
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Deseas eliminar el turno '${clickInfo.event.title}'?`)) {
      this.turnService.deleteTurn(clickInfo.event.extendedProps['id']).pipe(
        first()
      ).subscribe(() => {
        clickInfo.event.remove();
      })
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
  }

  addEvent(eventData: any) {
    const calendarApi = this.calendar.getApi();
    calendarApi.addEvent({
      title: `${eventData.turn} - ${eventData.group || eventData.user}`,
      start: eventData.startDate,
      end: eventData.endDate,
      extendedProps: {
        id: eventData.id
      },
      backgroundColor: this.getEventColor(eventData.turn)
    });
  }

  addTurnEvent(turns: TurnDTO[]) {
    const calendarApi = this.calendar?.getApi?.();
    if (!calendarApi) return;

    turns.forEach(turn => {
      let title = '';
      if (turn.userName) title += turn.userName;
      if (turn.groupId) title += (title ? ' - ' : '') + 'Grupo ' + turn.groupId;
      if (turn.initHour || turn.endHour) {
        title += (title ? '\n' : '') + `${turn.initHour || ''} - ${turn.endHour || ''}`;
      }

      calendarApi.addEvent({
        title: title.trim(),
        start: turn.initDate,
        end: turn.endDate || turn.initDate, // Para evento de un solo día
        allDay: true,
        extendedProps: {
          id: turn.id
        },
        backgroundColor: '#2196F3',
        borderColor: '#1976D2'
      });
    })
  }

  onTurnDialogSaved(turns: TurnDTO[]) {
    this.addTurnEvent(turns);
  }

  setTurnsFromBackend(turns: any[]) {
    console.log('Dentro de setTurnsFromBackend:', turns);
    const calendarApi = this.calendar?.getApi?.();
    if (!calendarApi) return;

    calendarApi.removeAllEvents();

    for (const turn of turns) {
      let title = '';
      if (turn.userName) title += turn.userName;
      if (turn.groupId) title += (title ? ' - ' : '') + 'Grupo ' + turn.groupId;
      if (turn.initHour || turn.endHour) {
        title += (title ? '\n' : '') + `${turn.initHour || ''} - ${turn.endHour || ''}`;
      }

      calendarApi.addEvent({
        title: title.trim(),
        start: turn.initDate,
        end: turn.endDate || turn.initDate, // Evento de un solo día
        allDay: true,
        extendedProps: {
          id: turn.id
        },
        backgroundColor: '#2196F3',
        borderColor: '#1976D2'
      });
    }
  }

  // Ya no se usa, pero se mantiene por si decides volver a eventos multiday
  addOneDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  private loadTurns(userId: number) {
    const turnsRequest$ = !!userId ? this.turnService.filterTurns({ userId }) : this.turnService.getTurns();
    turnsRequest$.pipe(
      delay(1000),
      first()
    ).subscribe(data => {
      this.setTurnsFromBackend(data);
    })
  }

  private getEventColor(turnType: string): string {
    const colors: Record<string, string> = {
      'Mañana': '#4CAF50',
      'Tarde': '#2196F3',
      'Noche': '#9C27B0'
    };
    return colors[turnType] || '#378006';
  }

  getAllTurns(): any[] {
    const calendarApi = this.calendar?.getApi?.();
    if (!calendarApi) return [];
    interface TurnEvent {
      title: string;
      start: string;
      end: string;
      allDay: boolean;
    }

    return calendarApi.getEvents().map((event: EventApi): TurnEvent => ({
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay
    }));
  }
}
