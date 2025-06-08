import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TurnEventsService } from '../../services/turn-event.service';
import { UserDTO, UserService } from '../../services/user.service';
import { GroupDTO, GroupService } from '../../services/group.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { first, Subject, takeUntil } from 'rxjs';
import { TurnDTO, TurnService } from '../../services/turn.service';

@Component({
  selector: 'app-turn',
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './turn.component.html',
  styleUrl: './turn.component.css'
})
export class TurnComponent implements OnInit {
  users: UserDTO[] = [];
  groups: GroupDTO[] = [];
  visible = false;
  showModal = false;

  @Output() turnSaved = new EventEmitter<any>();

  turnForm = new FormGroup({
    id: new FormControl<number>(null),
    initDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    initHour: new FormControl<string>(''),
    endHour: new FormControl<string>(''),
    user: new FormControl<UserDTO>({} as UserDTO),
    group: new FormControl<GroupDTO>({} as GroupDTO),
  });

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly turnService: TurnService,
    private turnEvents: TurnEventsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.subscribeToUsersGet();
  }

  private subscribeToUsersGet() {
    this.userService.getUsers().pipe(
      first()
    ).subscribe(data => {
      this.users = data;
    });
    this.groupService.getGroups().pipe(
      first()
    ).subscribe(data => {
      this.groups = data;
    });

  }

  private initForm() {
    console.log("entrando");

  }

  open() {
    this.showModal = true;
  }

  showDialog() {
    this.open();
    this.visible = true;
  }

  onRegister() {
    const formData = this.turnForm.value;
    this.visible = false;
    this.showModal = false;
    const payload = {
      id: formData.id,
      initDate: formData.initDate,
      endDate: formData.endDate,
      userName: `${formData.user.name} ${formData.user.lastName}`,
      initHour: formData.initHour,
      endHour: formData.endHour,
      userId: +formData.user?.id,
      groupId: +formData.group?.id
    } as TurnDTO;

    this.turnSaved.emit(payload);

    this.turnService.registrarTurno(payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Turno registrado correctamente');
        this.turnEvents.notifyTurnCreated(); // Notifica a los suscriptores
      },
      error: (err) => {
        console.error('Error en el registro de turno:', err);
        alert('Hubo un error al registrar turno: ' + err.error.message);
      }
    });
  }
}
