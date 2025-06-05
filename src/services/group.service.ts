import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GroupDTO {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  registrarGrupo(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/turn`, payload);
  }

  getGroups(): Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(`${this.apiUrl}/group`);
  }
}