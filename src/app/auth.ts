import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usa el puerto exacto de tu consola de .NET
  private apiUrl = 'http://192.168.100.149:5271/api'; 

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    // Hace un POST a tu endpoint y le envía los datos
    return this.http.post(`${this.apiUrl}users/register`, userData);
  }
}