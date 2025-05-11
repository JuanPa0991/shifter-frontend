import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, LogoComponent],
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

