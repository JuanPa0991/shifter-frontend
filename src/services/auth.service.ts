import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  name: string;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email,
      password
    }
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  };

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  private userName: string = '';

  setUserName(name: string): void { // metodo para almacenar el nombre devuekto y poder renderizarlo en otras paginas
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  getUserName(): string {
    return this.userName || localStorage.getItem('userName') || ''; // metodo para recuperar el nombre almacenado y renderizarlo en otras paginas
  }

}
