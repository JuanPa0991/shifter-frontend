import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router ,RouterLink} from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DropDownGroupsComponent } from "../../components/drop-down-groups/drop-down-groups.component";
import { UserDropDownComponent } from '../../components/user-drop-down/user-drop-down.component';


@Component({
  selector: 'app-book-turn',
  imports: [DialogModule, ReactiveFormsModule, StyleClassModule, ButtonModule, FloatLabelModule, InputTextModule, DropdownModule, DropDownGroupsComponent, UserDropDownComponent],
  templateUrl: './book-turn.component.html',
  styleUrl: './book-turn.component.css'
})
export class BookTurnComponent {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  bookTurnForm = new FormGroup({
    initDate: new FormControl(''),
    endDate: new FormControl(''),
    userName: new FormControl(''),
    initHour: new FormControl(''),
    endHour: new FormControl(''),
    groupName: new FormControl(''),
    userId: new FormControl(''),
    groupId: new FormControl('')
  })

  visible = false;
  showModal = false;

  users: any[] = [];
  groups: any[] = [];

  constructor(private router: Router) {
     this.initForm();
     this.loadUsersAndGroups();
  }

  private initForm () {
    console.log("entrando")
  }

  loadUsersAndGroups() {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe(users => {
      this.users = users.map(u => ({
        ...u,
        fullName: `${u.name} ${u.lastName}`
      }));
    });
    this.http.get<any[]>('http://localhost:8080/api/groups').subscribe(groups => {
      this.groups = groups;
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

  onBookTurn () {

  }
}
