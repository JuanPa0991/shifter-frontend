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
import { group } from '@angular/animations';

@Component({
  selector: 'app-turn',
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, FloatLabelModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './turn.component.html',
  styleUrl: './turn.component.css'
})
export class TurnComponent implements OnInit, OnDestroy {
  users: UserDTO[] = [];
  groups: GroupDTO[] = [];
  visible = false;
  showModal = false;

  protected isSaveDisabled = true;
  private destroy$ = new Subject<void>();

  @Output() turnSaved = new EventEmitter<any>();

  turnForm = new FormGroup({
    id: new FormControl<number>(null),
    initDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    initHour: new FormControl<string>(''),
    endHour: new FormControl<string>(''),
    user: new FormControl<UserDTO>(null),
    group: new FormControl<GroupDTO>(null),
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
    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  private subscribeToFormChanges() {
    this.turnForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((values) => {
      this.isSaveDisabled = !values.group && !values.user;
    })
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
      userName: `${formData.user?.name} ${formData.user?.lastName}`,
      initHour: formData.initHour,
      endHour: formData.endHour,
      userId: +formData.user?.id,
      groupId: +formData.group?.id
    } as TurnDTO;

    const request = !payload.groupId
      ? this.turnService.registrarTurno(payload)
      : this.turnService.registrarTurnoMasivo(payload);

    request.subscribe({
      next: (res) => {
        if (!payload.groupId) {
          this.turnSaved.emit([res]);
        } else {
          this.turnSaved.emit(res);
        }
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
