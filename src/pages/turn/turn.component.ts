
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UserDTO, UserService } from '../../services/user.service';
import { GroupDTO, GroupService } from '../../services/group.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Subject, takeUntil } from 'rxjs';
import { TurnService } from '../../services/turn.service';

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
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>()

turnForm = new FormGroup({
  initDate: new FormControl<string>(''),
  endDate: new FormControl<string>(''),
  userName: new FormControl<UserDTO | null>({ value: null, disabled: true }),
  initHour: new FormControl<string>(''),
  endHour: new FormControl<string>(''),
  groupName: new FormControl<GroupDTO | null>(null)
});

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly turnService: TurnService
  ) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  ngOnInit(): void {
    this.subscribeToInitialData();
    this.setupGroupChangeListener();
  }

  private subscribeToInitialData() {
    this.groupService.getGroups().pipe(
      takeUntil(this.destroy$))
      .subscribe(data => {
        this.groups = data;
      });
  }

  private setupGroupChangeListener() {
  this.turnForm.get('groupName')?.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(group => {
      const userControl = this.turnForm.get('userName');

      if (group?.id) {
        this.userService.getUsersByGroupId(group.id).subscribe(users => {
          this.users = users;
          userControl?.enable();
        });
      } else {
        this.users = [];
        userControl?.reset();
        userControl?.disable();
      }
    });
}

  private subscribeToUsersGet() {
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.users = data;
    })
    this.groupService.getGroups().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.groups = data;
    })

  }

  private initForm() {
    console.log("entrando")

  }

  open() {
    this.showModal = true;
  }

  showDialog() {
    this.open();
    this.visible = true;
  }

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
      userId: formData.userName?.id,
      groupId: formData.groupName?.id
    };



    this.turnService.registrarTurno(payload).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        alert('Grupo registrado correctamente');
      },
      error: (err) => {
        console.error('Error en el registro de turno:', err);
        alert('Hubo un error al registrar turno: ' + err.error.message);
      }
    });
  }
}
