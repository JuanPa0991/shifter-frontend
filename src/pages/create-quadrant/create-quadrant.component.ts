import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectDatesPanelComponent } from '../select-dates-panel/select-dates-panel.component';
import { LogoComponent } from '../../components/logo/logo.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupName,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { Calendar } from '@fullcalendar/core/index.js';
import { AddCalendarEventComponent } from '../../components/add-calendar-event/add-calendar-event.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { UserManagerComponent } from '../admin-panel/user-manager/user-manager.component';
import { GroupComponent } from '../group/group.component';

@Component({
  selector: 'app-create-quadrant',
  standalone: true,
  imports: [
    LogoComponent,
    DialogModule,
    ButtonModule,
    StyleClassModule,
    InputTextModule,
    CalendarComponent,
    AddCalendarEventComponent,
    CreateNewUserComponent,
    UserManagerComponent,
    GroupComponent,
  ],
  templateUrl: './create-quadrant.component.html',
  styleUrls: ['./create-quadrant.component.css'],
})
export class CreateQuadrantComponent implements AfterViewInit {
  @ViewChild('addEventDialog')
  addCalendarEventComp!: AddCalendarEventComponent;
  @ViewChild('createUserComponent')
  createUserComponent!: CreateNewUserComponent;
  @ViewChild('userManagerComponent')
  userManagerComponent!: UserManagerComponent;
  @ViewChild('groupComponent')
  groupComponent!: GroupComponent;

  initDate: any = null;
  endDate: any = null;
  loading: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    // Verificar que los componentes están disponibles
    console.log('Components loaded:', {
      addCalendarEvent: this.addCalendarEventComp,
      createUser: this.createUserComponent,
      userManager: this.userManagerComponent,
      group: this.groupComponent,
    });
  }

  ngOnInit() {
    // Obtenemos las fechas introducidas en el select-dates-panel
    this.initDate = this.route.snapshot.paramMap.get('initDate');
    this.endDate = this.route.snapshot.paramMap.get('endDate');
    console.log('Fechas recibidas: ', this.initDate, this.endDate);
  }

  onDateSelected(selectInfo: any) {
    console.log('Fecha seleccionada: ', selectInfo);
    const startDate = new Date(selectInfo.start);
    const endDate = new Date(selectInfo.end);
    this.addCalendarEventComp.showDialog(startDate, endDate);
  }

  confirmQuadrant() {
    if (confirm('Vas a generar un nuevo cuadrante, ¿estás seguro?') == true) {
      this.load();
    } else {
      alert('No se ha generado ningún cuadrante');
    }
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  openCreateUser() {
    console.log('Opening create user dialog');
    if (this.createUserComponent) {
      this.createUserComponent.showDialog();
    } else {
      console.error('Create user component not initialized');
    }
  }

  openUserManager() {
    console.log('Opening user manager dialog');
    if (this.userManagerComponent) {
      this.userManagerComponent.showDialog();
    } else {
      console.error('User manager component not initialized');
    }
  }

  openCreateGroup() {
    console.log('Opening create group dialog');
    if (this.groupComponent) {
      this.groupComponent.showDialog();
    } else {
      console.error('Group component not initialized');
    }
  }

  openGroupManager() {
    console.log('Group manager not implemented yet');
  }
}
