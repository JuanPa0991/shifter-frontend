import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {

  constructor(private router: Router) {}

  redirectToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }

}
