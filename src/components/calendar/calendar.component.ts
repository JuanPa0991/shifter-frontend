import { Component, signal, ViewChild, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AddCalendarEventComponent } from '../add-calendar-event/add-calendar-event.component';
import { TurnComponent } from '../../pages/turn/turn.component'; // Asegúrate de la ruta
import esLocale from '@fullcalendar/core/locales/es'; // Añade esta línea

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
    locale: esLocale // <-- Añade esta línea
  });

  ngOnInit() {
    this.updateCalendarRange();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateCalendarRange();
  }

  updateCalendarRange() {
    if (this.initDate && this.endDate) {
      // FullCalendar espera que end sea el día siguiente al último visible
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
      // Normaliza fechas a solo día (sin hora)
      const start = new Date(selectInfo.start);
      start.setHours(0, 0, 0, 0);
      const init = new Date(this.initDate);
      init.setHours(0, 0, 0, 0);
      const end = new Date(this.endDate);
      end.setHours(0, 0, 0, 0);

      // Permite seleccionar desde el primer hasta el último día (inclusive)
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
      clickInfo.event.remove();
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
      backgroundColor: this.getEventColor(eventData.turn)
    });
  }

  addTurnEvent(turn: any) {
    // Asegúrate de tener la referencia al calendario
    const calendarApi = this.calendar?.getApi?.();
    if (!calendarApi) return;

    // Construye el título con los datos del turno
    let title = '';
    if (turn.userName) title += turn.userName;
    if (turn.groupId) title += (title ? ' - ' : '') + 'Grupo ' + turn.groupId;
    if (turn.initHour || turn.endHour) {
      title += (title ? '\n' : '') + `${turn.initHour || ''} - ${turn.endHour || ''}`;
    }

    calendarApi.addEvent({
      title: title.trim(),
      start: turn.initDate,
      end: turn.endDate ? this.addOneDay(turn.endDate) : undefined,
      allDay: true,
      backgroundColor: '#2196F3', // Personaliza el color si lo deseas
      borderColor: '#1976D2'
    });
  }

  onTurnDialogSaved(turn: any) {
    this.addTurnEvent(turn);
  }

  setTurnsFromBackend(turns: any[]) {
    const calendarApi = this.calendar?.getApi?.();
    if (!calendarApi) return;

    // Limpia eventos previos
    calendarApi.removeAllEvents();

    // Añade los turnos recibidos
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
        end: turn.endDate ? this.addOneDay(turn.endDate) : undefined,
        allDay: true,
        backgroundColor: '#2196F3',
        borderColor: '#1976D2'
      });
    }
  }

  // Utilidad para sumar un día a la fecha (formato YYYY-MM-DD)
  addOneDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
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
    // Devuelve los eventos actuales en formato array
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