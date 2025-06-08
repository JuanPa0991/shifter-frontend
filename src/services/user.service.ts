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
  groupId: number;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  registrarUsuarioNormal(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, payload);
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/users`);
  }

  getUsersByGroupId(groupId: number): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/user/byGroup?groupId=${groupId}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }
}
