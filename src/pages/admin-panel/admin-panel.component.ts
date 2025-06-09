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
import { Router } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserListComponent } from '../user-list/user-list.component';
import { TurnListComponent } from '../turn-list/turn-list.component';
import { GroupListComponent } from '../group-list/group-list.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    GroupComponent,
    TurnComponent,
    CreateNewUserComponent,
    BookTurnComponent,
    SelectDatesPanelComponent,
    UserSettingsComponent,
    UserListComponent,
    UserListComponent,
    TurnListComponent,
    GroupListComponent,
    CalendarComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  @ViewChild(GroupComponent) groupComp!: GroupComponent; // Instancia de componenete grup parapoder usar el metodo de renderizacion de popup
  @ViewChild(TurnComponent) turnComp!: TurnComponent; // Instancia de componenete turn parapoder usar el metodo de renderizacion de popup
  @ViewChild(CreateNewUserComponent) userComp!: CreateNewUserComponent; // Instancia de componenete user parapoder usar el metodo de renderizacion de popup
  @ViewChild(BookTurnComponent) bookTurnComp!: BookTurnComponent; // Instancia de componenete bookTurn parapoder usar el metodo de renderizacion de popup
  @ViewChild(SelectDatesPanelComponent) selectDatesPanel!: SelectDatesPanelComponent; // Instancia de componente selectDates para poder usar el metodo de renderizacion de popup
  @ViewChild(UserSettingsComponent) userSettingsComp!: UserSettingsComponent;

  private authService = inject(AuthService); // Creando una instancia de Authservice para poder usar su metodos

  activeMenu: string | null = null;
  userName: string = ''; // Variable para guardar el nombre que se renderiza
  showProfileMenu = false;
  showUserList = false;
  showTurnList = false;
  showGroupList = false;

  constructor(private router: Router) {}

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

  openUserSettings() {
    // Recupera los datos actuales del usuario (puedes obtenerlos de localStorage, un servicio, etc.)
    const userData = {
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      dni: localStorage.getItem('dni') || '',
      companyName: localStorage.getItem('companyName') || '',
      email: localStorage.getItem('userEmail') || '',
    };
    this.userSettingsComp.open(userData);
  }

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
    this.showUserList = menu === 'usuarios';
  }

  ngOnInit() {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userName = userName;
    } else {
      this.userName = '';
    }
  }

  crearCuadrante() {
    console.log('Crear cuadrante');
  }

  verHistorialCuadrante() {
    console.log('Historial cuadrante');
  }

  nuevoUsuario() {
    console.log('Nuevo usuario');
  }

  buscarTurnos() {
    console.log('Buscar turnos');
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('userName'); // <-- Añade esta línea
    this.router.navigate(['/login']);
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  mostrarUsuarios() {
    this.showUserList = true;
    this.showTurnList = false;
    this.showGroupList = false;
  }
  mostrarTurnos() {
    this.showUserList = false;
    this.showTurnList = true;
    this.showGroupList = false;
  }
  mostrarGrupos() {
    this.showUserList = false;
    this.showTurnList = false;
    this.showGroupList = true;
  }

  goToHome() {
    this.activeMenu = null;
  }
}
