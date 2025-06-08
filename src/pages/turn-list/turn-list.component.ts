import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TurnService, TurnDTO } from '../../services/turn.service';
import { TurnEventsService } from '../../services/turn-event.service';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="turn-list-container">
      <h2>Turnos registrados</h2>
      <table class="turn-table">
        <thead>
          <tr>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Usuario</th>
            <th>ID Usuario</th>
            <th>Grupo</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th class="acciones-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let turn of turns">
            <td>{{turn.initDate}}</td>
            <td>{{turn.endDate}}</td>
            <td>{{turn.userName}}</td>
            <td>{{turn.userId}}</td>
            <td>{{turn.groupId}}</td>
            <td>{{turn.initHour}}</td>
            <td>{{turn.endHour}}</td>
            <td class="acciones-col">
              <button pButton icon="pi pi-trash" class="p-button-danger" (click)="deleteTurn(turn.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./turn-list.component.css']
})
export class TurnListComponent implements OnInit {
  turns: TurnDTO[] = [];

  constructor(private turnService: TurnService, private turnEvents: TurnEventsService) {}

  ngOnInit() {
    this.loadTurns();
    this.turnEvents.turnCreated$.subscribe(() => {
      this.loadTurns();
    });
  }

  loadTurns() {
    this.turnService.getTurns().subscribe(turns => {
      this.turns = turns;
    });
  }

  deleteTurn(id: number) {
    if (confirm('¿Seguro que quieres eliminar este turno?')) {
      this.turnService.deleteTurn(id).subscribe(() => {
        this.turns = this.turns.filter(t => t.id !== id);
      });
    }
  }
}