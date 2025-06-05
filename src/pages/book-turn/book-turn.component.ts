import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { UserDTO, UserService } from '../../services/user.service';
import { GroupDTO, GroupService } from '../../services/group.service';
import { TurnService } from '../../services/turn.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-book-turn',
  imports: [DialogModule, ReactiveFormsModule, StyleClassModule, ButtonModule, FloatLabelModule, InputTextModule, DropdownModule, FormsModule],
  templateUrl: './book-turn.component.html',
  styleUrl: './book-turn.component.css'
})
export class BookTurnComponent implements OnInit, OnDestroy {

  users: UserDTO[] = [];
  groups: GroupDTO[] = [];        
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>()

  bookTurnForm = new FormGroup({
    initDate: new FormControl(''),
    endDate: new FormControl(''),
    userName: new FormControl(),
    initHour: new FormControl(''),
    endHour: new FormControl(''),
    groupName: new FormControl(),
    userId: new FormControl(''),
    groupId: new FormControl('')
  })

  visible = false;
  showModal = false;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly turnService: TurnService) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  ngOnInit(): void {
    this.subscribeToUsersGet()
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

  /** Opcional: cerrar desde TS */
  hideDialog() {
    this.visible = false;
  }

  onBookTurn() {
    const formData = this.bookTurnForm.value;
    this.visible = false;
    this.showModal = false;
    const payload = {
      initDate: formData.initDate,
      endDate: formData.endDate,
      userName: formData.userName,
      initHour: formData.initHour,
      endHour: formData.endHour,
      grouName: formData.groupName,
      userId: formData.userName?.id,
      groupId: formData.groupName?.id
    };



    
  }
}
