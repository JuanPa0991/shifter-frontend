import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';
import { AuthService } from '../../services/auth.service'; // Importando la clase authservice
import { inject } from '@angular/core';
import { GroupComponent } from '../group/group.component'; 
import { TurnComponent } from '../turn/turn.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, LogoComponent, GroupComponent, TurnComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  @ViewChild(GroupComponent) groupComp!: GroupComponent; // Instancia de componenete grup parapoder usar el metodo de renderizacion de popup
  @ViewChild(TurnComponent) turnComp!: TurnComponent; // Instancia de componenete turn parapoder usar el metodo de renderizacion de popup

    private authService = inject(AuthService); // Creando una instancia de Authservice para poder usar su metodos

  activeMenu: string | null = null;
  userName: string = ''; // Variable para guardar el nombre que se renderiza

  // metodo para llamar al metodo del componente group que renderiza el popup
  openGroupDialog() {
    this.groupComp.showDialog();
  }

  // metodo para llamar al metodo del componente turn que renderiza el popup
  openTurnDialog() {
    this.turnComp.showDialog();
  }

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  ngOnInit() { // metodo para recuperar el nombre
    const token = this.authService.getToken();
  if (token) {
    this.userName = token; // Si el token existe, se asigna a userName
  } else {
    this.userName = ''; // Si el token es null, asignar un valor por defecto
  }
  }

  crearCuadrante() { console.log('Crear cuadrante'); }
  verHistorialCuadrante() { console.log('Historial cuadrante'); }
  nuevoUsuario() { console.log('Nuevo usuario'); }
  mostrarUsuarios() { console.log('Mostrar usuarios'); }
  buscarTurnos() { console.log('Buscar turnos'); }
}

