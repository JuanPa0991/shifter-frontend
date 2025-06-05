import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Turn {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-calendar-event',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './add-calendar-event.component.html'
})
export class AddCalendarEventComponent {
  @Output() eventSaved = new EventEmitter<any>();
  
  visible = false;
  eventForm: FormGroup;
  enableEndDate = false;

  turns = [
    { name: 'Mañana', code: 'morning', initHour: '07:00', endHour: '15:00' },
    { name: 'Tarde', code: 'afternoon', initHour: '15:00', endHour: '23:00' },
    { name: 'Noche', code: 'night', initHour: '23:00', endHour: '07:00' }
  ];

  groups: any[] = []; // Aquí cargarás los grupos desde tu API
  users: any[] = []; // Aquí cargarás los usuarios desde tu API

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.eventForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: [''],
      turn: ['', Validators.required],
      group: [''],
      user: [[]],
      enableMultiDay: [false]
    });

    // Observador para el checkbox de múltiples días
    this.eventForm.get('enableMultiDay')?.valueChanges.subscribe(value => {
      this.enableEndDate = value;
      if (!value) {
        this.eventForm.patchValue({
          endDate: this.eventForm.get('startDate')?.value
        });
      }
    });

    // Cargar grupos y usuarios al iniciar
    this.loadGroups();
    this.loadUsers();
  }

  private loadGroups() {
    this.http.get('http://localhost:8080/api/groups').subscribe({
      next: (groups: any) => this.groups = groups,
      error: (err) => console.error('Error cargando grupos:', err)
    });
  }

  private loadUsers() {
    this.http.get('http://localhost:8080/api/users').subscribe({
      next: (users: any) => this.users = users,
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  showDialog(startDate: Date, endDate: Date) {
    this.eventForm.patchValue({
      startDate: startDate,
      endDate: startDate,
      enableMultiDay: false
    });
    this.visible = true;
  }

  saveEvent() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      this.eventSaved.emit(formData);
      this.visible = false;
      this.eventForm.reset();
    }
  }

    hideDialog() {
    this.visible = false;
    this.eventForm.reset();
  }
  
}
