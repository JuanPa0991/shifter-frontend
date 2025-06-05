import { Component, signal, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AddCalendarEventComponent } from '../add-calendar-event/add-calendar-event.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, AddCalendarEventComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() initDate?: string;
  @Input() endDate?: string;
  @ViewChild(AddCalendarEventComponent) addEventDialog!: AddCalendarEventComponent;
  @ViewChild('calendar') calendar: any;

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
    eventDisplay: 'block'
  });

  handleDateSelect(selectInfo: DateSelectArg) {
    this.addEventDialog.showDialog(selectInfo.start, selectInfo.end);
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

  private getEventColor(turnType: string): string {
    const colors: Record<string, string> = {
      'Mañana': '#4CAF50',
      'Tarde': '#2196F3',
      'Noche': '#9C27B0'
    };
    return colors[turnType] || '#378006';
  }
}