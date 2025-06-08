import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserService, UserDTO } from '../../services/user.service';
import { UserEventsService } from '../../services/user-events.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="user-list-container">
      <h2>Usuarios registrados</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Empresa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{user.name}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.dni}}</td>
            <td>{{user.email}}</td>
            <td>{{user.companyName}}</td>
            <td>
              <button pButton icon="pi pi-trash" class="p-button-danger" (click)="deleteUser(user.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];

  constructor(private userService: UserService, private userEvents: UserEventsService) {}

  ngOnInit() {
    this.loadUsers();
    this.userEvents.userCreated$.subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }
}