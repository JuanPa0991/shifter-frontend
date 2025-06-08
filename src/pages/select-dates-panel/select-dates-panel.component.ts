import { Component, EventEmitter, inject, Output } from '@angular/core';
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

@Component({
  selector: 'app-select-dates-panel',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './select-dates-panel.component.html',
  styleUrl: './select-dates-panel.component.css',
})
export class SelectDatesPanelComponent {
  showSelectDatesPanel = false;

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  today: string = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();
  
  @Output() dateSelected = new EventEmitter<{
    initDate: string;
    endDate: string;
  }>();

  minEndDate: string = this.today;

  datePanelForm = new FormGroup({
    initDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(private router: Router) {
    this.initForm();

    // Suscríbete a los cambios de initDate
    this.datePanelForm.get('initDate')?.valueChanges.subscribe((value) => {
      if (value) {
        this.minEndDate = value;
        // Si endDate es anterior a initDate, actualízala
        const endDate = this.datePanelForm.get('endDate')?.value;
        if (!endDate || endDate < value) {
          this.datePanelForm.get('endDate')?.setValue(value);
        }
      } else {
        this.minEndDate = this.today;
      }
    });
  }

  initForm() {
    console.log('Abriendo panel de seleccion de fecha');
  }

  open() {
    this.showSelectDatesPanel = true;
  }

  showDialog() {
    this.open();
    this.showSelectDatesPanel = true;
  }

  closeSelectDatePanel() {
    this.showSelectDatesPanel = false;
  }

  generateQuadrant() {
    const initDate = this.datePanelForm.get('initDate')?.value;
    const endDate = this.datePanelForm.get('endDate')?.value;

    if (initDate && endDate) {
      this.showSelectDatesPanel = false;
      this.router.navigate(['/create-quadrant', { initDate, endDate }]); // Navegar con las fechas
    } else {
      alert('Por favor, introduce ambas fechas');
    }
  }
}
