import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';
import { AuthService } from '../../services/auth.service'; // Importando la clase authservice
import { inject } from '@angular/core';
import { GroupComponent } from '../group/group.component';
import { TurnComponent } from '../turn/turn.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { BookTurnComponent } from '../book-turn/book-turn.component';
import { SelectDatesPanelComponent } from '../select-dates-panel/select-dates-panel.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, LogoComponent, GroupComponent, TurnComponent, CreateNewUserComponent, BookTurnComponent, SelectDatesPanelComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  @ViewChild(GroupComponent) groupComp!: GroupComponent; // Instancia de componenete grup parapoder usar el metodo de renderizacion de popup
  @ViewChild(TurnComponent) turnComp!: TurnComponent; // Instancia de componenete turn parapoder usar el metodo de renderizacion de popup
  @ViewChild(CreateNewUserComponent) userComp!: CreateNewUserComponent; // Instancia de componenete user parapoder usar el metodo de renderizacion de popup
  @ViewChild(BookTurnComponent) bookTurnComp!: BookTurnComponent; // Instancia de componenete bookTurn parapoder usar el metodo de renderizacion de popup
  @ViewChild(SelectDatesPanelComponent) selectDatesPanel!: SelectDatesPanelComponent; // Instancia de componente selectDates para poder usar el metodo de renderizacion de popup


  private authService = inject(AuthService); // Creando una instancia de Authservice para poder usar su metodos

  activeMenu: string | null = null;
  userName: string = ''; // Variable para guardar el nombre que se renderiza

  // metodo para llamar al metodo del componente group que renderiza el popup
  openGroupDialog() {
    this.groupComp.showDialog();
  }

  // metodo para llamar al metodo del componente createuser que renderiza el popup
  openUserDialog() {
    this.userComp.showDialog();
  }

  // metodo para llamar al metodo del componente turn que renderiza el popup
  openTurnDialog() {
    this.turnComp.showDialog();
  }

  // metodo para llamar al metodo del componente bookturn que renderiza el popup
    openBookTurnDialog() {
    this.bookTurnComp.showDialog();
  }

  // metodo para abrir el panel de seleccion de fecha
  openSelectDatePanel() {
    this.selectDatesPanel.showDialog();
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

