import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa esto

@Component({
  selector: 'app-admin-panel',
  standalone: true, // 👈 Si es standalone, debes especificarlo
  imports: [CommonModule], // 👈 Asegúrate de incluirlo aquí
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  activeMenu: string | null = null;

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  crearCuadrante() { console.log('Crear cuadrante'); }
  verHistorialCuadrante() { console.log('Historial cuadrante'); }
  nuevoUsuario() { console.log('Nuevo usuario'); }
  mostrarUsuarios() { console.log('Mostrar usuarios'); }
  buscarTurnos() { console.log('Buscar turnos'); }
}

