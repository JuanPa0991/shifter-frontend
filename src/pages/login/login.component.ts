import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

}
