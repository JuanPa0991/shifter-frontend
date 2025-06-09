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
import { LogoComponent } from '../../components/logo/logo.component';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { AddCalendarEventComponent } from '../../components/add-calendar-event/add-calendar-event.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { UserManagerComponent } from '../admin-panel/user-manager/user-manager.component';
import { GroupComponent } from '../group/group.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { TurnService } from '../../services/turn.service';
import { filter } from 'rxjs';

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
  @ViewChild(CalendarComponent)
  calendarComponent!: CalendarComponent;

  initDate: any = null;
  endDate: any = null;
  loading: boolean = false;
  turns: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private turnService: TurnService) { }

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
    this.initDate = this.route.snapshot.queryParams['initDate']
    this.endDate = this.route.snapshot.queryParams['endDate'];
    this.loadTurnsByFilterDates();
  }

  loadTurnsByFilterDates() {
    if (this.initDate && this.endDate) {
      const filters = { initDate: this.initDate, endDate: this.endDate }
      this.turnService.filterTurns(filters).subscribe((turns) => {
        this.turns = turns;
        console.log('Turnos recibidos:', this.turns);
        setTimeout(() => {
          console.log('Enviando turnos al calendario:', this.turns);
          this.calendarComponent?.setTurnsFromBackend(this.turns);
        }, 1000)
      }, error => {
        console.error('Error al cargar los turnos:', error);
      });
    }
  }

  onDateSelected(selectInfo: any) {
    console.log('Fecha seleccionada: ', selectInfo);
    const startDate = new Date(selectInfo.start);
    const endDate = new Date(selectInfo.end);
    this.addCalendarEventComp.showDialog(startDate, endDate);
  }

  confirmQuadrant() {
    if (confirm('Vas a generar un nuevo cuadrante, ¿estás seguro?') == true) {
      this.generatePDF();
      this.load();
    } else {
      alert('No se ha generado ningún cuadrante');
    }
  }

  generatePDF() {
    const turns = this.calendarComponent.getAllTurns();

    // PDF en vertical (portrait)
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' });
    // Captura el calendario como imagen
    const calendarElement = document.getElementById('calendar-capture');
    if (!calendarElement) {
      alert('No se pudo encontrar el calendario para capturar.');
      return;
    }

    html2canvas(calendarElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgProps = doc.getImageProperties(imgData);
      const imgWidth = pageWidth - 20; // Margen de 10mm a cada lado
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      doc.text('Cuadrante de Turnos', 14, 14);
      doc.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);

      // Si hay turnos, añade la tabla debajo
      if (turns.length > 0) {
        // Calcula la posición Y para la tabla
        const tableY = 30 + imgHeight;
        autoTable(doc, {
          head: [['Título', 'Fecha Inicio', 'Fecha Fin', 'Todo el día']],
          body: turns.map((turn) => [
            turn.title,
            turn.start,
            turn.end,
            turn.allDay ? 'Sí' : 'No',
          ]),
          startY: tableY,
        });
      }

      // Formatear fechas para el nombre del archivo
      const format = (dateStr: string | null) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };
      const fileName = `cuadrante-${format(this.initDate)}-${format(
        this.endDate
      )}.pdf`;

      doc.save(fileName);
    });
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  openCreateUser() {
    if (this.createUserComponent) {
      this.createUserComponent.showDialog();
    }
  }

  openUserManager() {
    if (this.userManagerComponent) {
      this.userManagerComponent.showDialog();
    }
  }

  openCreateGroup() {
    if (this.groupComponent) {
      this.groupComponent.showDialog();
    }
  }

  openGroupManager() {
    // Si tienes un componente para gestionar grupos, llama aquí a su showDialog()
    // Por ahora, puedes dejarlo como un log o implementar la lógica cuando tengas el componente
    alert('Funcionalidad de buscar grupos aún no implementada');
  }

  formatDateDMY(dateStr: string | null): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onTurnSaved(turn: any) {
    this.calendarComponent.addTurnEvent(turn);
  }
}
