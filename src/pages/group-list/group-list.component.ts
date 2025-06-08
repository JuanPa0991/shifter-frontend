import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GroupService, GroupDTO } from '../../services/group.service';
import { GroupEventsService } from '../../services/group-events.service';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="group-list-container">
      <h2>Grupos registrados</h2>
      <table class="group-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del grupo</th>
            <th class="acciones-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let group of groups">
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td class="acciones-col">
              <button
                pButton
                icon="pi pi-trash"
                class="p-button-danger"
                (click)="deleteGroup(group.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: GroupDTO[] = [];

  constructor(
    private groupService: GroupService,
    private groupEvents: GroupEventsService
  ) {}

  ngOnInit() {
    this.loadGroups();
    this.groupEvents.groupCreated$.subscribe(() => {
      this.loadGroups();
    });
  }

  loadGroups() {
    this.groupService.getGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

  deleteGroup(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
      this.groupService.deleteGroup(id).subscribe({
        next: () => {
          this.groups = this.groups.filter((group) => group.id !== id);
        },
        error: (err) => {
          alert('Error al eliminar el grupo');
          console.error(err);
        },
      });
    }
  }
}
