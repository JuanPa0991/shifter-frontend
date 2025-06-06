import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule, FloatLabelModule, InputTextModule],
  template: `
    <p-dialog header="Ajustes de usuario" [(visible)]="showModal" [modal]="true" [style]="{width: '28rem'}">
      <form [formGroup]="settingsForm" class="dialog-form">
        <div class="form-section">
          <label class="section-label" for="firstName">Nombre</label>
          <input pInputText id="firstName" formControlName="firstName" class="w-full" />
        </div>
        <div class="form-section">
          <label class="section-label" for="lastName">Apellidos</label>
          <input pInputText id="lastName" formControlName="lastName" class="w-full" />
        </div>
        <div class="form-section">
          <label class="section-label" for="dni">DNI</label>
          <input pInputText id="dni" formControlName="dni" class="w-full" />
        </div>
        <div class="form-section">
          <label class="section-label" for="companyName">Empresa</label>
          <input pInputText id="companyName" formControlName="companyName" class="w-full" />
        </div>
        <div class="form-section">
          <label class="section-label" for="email">Email</label>
          <input pInputText id="email" formControlName="email" type="email" class="w-full" />
        </div>
        <div class="form-actions">
          <p-button label="Guardar cambios" (onClick)="saveChanges()"></p-button>
        </div>
      </form>
    </p-dialog>
  `,
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
  showModal = false;

  settingsForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    companyName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  open(userData: any) {
    this.settingsForm.patchValue(userData);
    this.showModal = true;
  }

  saveChanges() {
    const updatedData = this.settingsForm.value;
    this.http.put('http://localhost:8080/api/user', updatedData).subscribe({
      next: () => {
        alert('Datos actualizados correctamente');
        this.showModal = false;
      },
      error: () => {
        alert('Error al actualizar los datos');
      }
    });
  }
}