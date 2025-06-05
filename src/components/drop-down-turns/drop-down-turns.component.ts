import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface Turn {
  name: string,
  initHour: string,
  endHour: string
}

@Component({
  selector: 'app-drop-down-turns',
  imports: [FormsModule, MultiSelectModule],
  templateUrl: './drop-down-turns.component.html',
  styleUrl: './drop-down-turns.component.css'
})
export class DropDownTurnsComponent {
    turns!: Turn[];

    selectedTurn!: Turn[];

    ngOnInit() {
        this.turns = [
            {name: 'Mañana', initHour: '7:00', endHour: '15:00'},
            {name: 'Tarde', initHour: '15:00', endHour: '23:00'},
            {name: 'Noche', initHour: '23:00', endHour: '7:00'},
            {name: 'Mañana-Verano', initHour: '7:00', endHour: '14:00'},
            {name: 'Tarde-Verano', initHour: '14:00', endHour: '22:00'},
        ];
    }
}
