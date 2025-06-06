import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {
  id: number;
  name: string;
  lastName: string;
  dni: string;
  email: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
