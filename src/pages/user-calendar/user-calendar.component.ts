import { Component, NgModule} from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  providers: [],
  styleUrls: ['./user-calendar.component.css'],
  imports: [LogoComponent, CommonModule, CalendarModule, FormsModule, DatePicker],
  standalone: true
})
export class UserCalendarComponent {
  date: Date[] | undefined;
  nombre = 'Paquito Morenito'; 
  profileImgUrl = 'public/assets/fotoperfilIA.jpg';

  onAddEvent() { /* lógica */ }
  onViewQuadrant() { /* lógica */ }
  onHistory() { /* lógica */ }
  onEditProfile() { /* lógica */ }
}



