import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-hist-quadrant',
  standalone: true,
  imports: [LogoComponent, TableModule],
  templateUrl: './hist-quadrant.component.html',
  styleUrl: './hist-quadrant.component.css'
})
export class HistQuadrantComponent {
  // Puedes definir aquí la variable cuadrantes si quieres mostrar datos reales
  cuadrantes = [
    { id: 1, fechaInicio: '2024-05-01', fechaFin: '2024-05-07', grupo: 'A' },
    { id: 2, fechaInicio: '2024-05-08', fechaFin: '2024-05-14', grupo: 'B' },
    { id: 3, fechaInicio: '2024-05-15', fechaFin: '2024-05-21', grupo: 'C' },
    { id: 4, fechaInicio: '2024-05-22', fechaFin: '2024-05-28', grupo: 'D' },
    { id: 5, fechaInicio: '2024-05-29', fechaFin: '2024-06-04', grupo: 'E' }
  ];
}
