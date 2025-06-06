import { Component, inject, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupName,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TurnEventsService } from '../../services/turn-event.service';

@Component({
  selector: 'app-turn',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    DropdownModule,
  ],
  templateUrl: './turn.component.html',
  styleUrl: './turn.component.css',
})
export class TurnComponent {
  visible = false;
  showModal = false;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  turnForm = new FormGroup({
    initDate: new FormControl(''),
    endDate: new FormControl(''),
    userName: new FormControl(''),
    initHour: new FormControl(''),
    endHour: new FormControl(),
    userId: new FormControl(),
    groupId: new FormControl(),
  });

  @Output() turnSaved = new EventEmitter<any>();

  users: any[] = [];
  groups: any[] = [];

  constructor(private router: Router, private turnEvents: TurnEventsService) {
    this.initForm();
    this.loadUsersAndGroups();
  }

  private initForm() {
    console.log('entrando');
  }

  loadUsersAndGroups() {
    this.http
      .get<any[]>('http://localhost:8080/api/users')
      .subscribe((users) => {
        this.users = users.map((u) => ({
          ...u,
          fullName: `${u.name} ${u.lastName}`,
        }));
      });
    this.http.get<any[]>('http://localhost:8080/api/groups').subscribe((groups) => {
      this.groups = groups;
      console.log('Grupos recibidos:', this.groups);
    });
  }

  open() {
    this.showModal = true;
  }

  showDialog() {
    this.open();
    this.visible = true;
  }

  /** Opcional: cerrar desde TS */
  hideDialog() {
    this.visible = false;
  }

  onRegister() {
    const formData = this.turnForm.value;
    this.visible = false;
    this.showModal = false;
    const payload = {
      initDate: formData.initDate,
      endDate: formData.endDate,
      userName: formData.userName,
      initHour: formData.initHour,
      endHour: formData.endHour,
      userId: formData.userId,
      groupId: formData.groupId,
    };

    this.turnSaved.emit(payload);

    this.http.post('http://localhost:8080/api/turn', payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Turno registrado correctamente');
        this.turnEvents.notifyTurnCreated(); // Notifica a los suscriptores
      },
      error: (err) => {
        console.error('Error en el registro de turno:', err);
        alert('Hubo un error al registrar turno: ' + err.error.message);
      },
    });
  }
}
