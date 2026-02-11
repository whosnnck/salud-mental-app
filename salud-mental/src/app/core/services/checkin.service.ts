import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Checkin {
  id?: number;
  user_id?: number;
  mood: 'good' | 'neutral' | 'bad' | 'tired';
  notes?: string;
  created_at?: string;
}

export interface CheckinResponse {
  id: number;
  user_id: number;
  mood: string;
  notes: string | null;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  private apiUrl = 'http://localhost:3000/api/checkins';

  constructor(private http: HttpClient) {}

  // Obtener todos los check-ins del usuario autenticado
  getMyCheckins(): Observable<CheckinResponse[]> {
    return this.http.get<CheckinResponse[]>(`${this.apiUrl}/my`);
  }

  // Obtener check-ins recientes (últimos 10)
  getRecentCheckins(limit: number = 10): Observable<CheckinResponse[]> {
    return this.http.get<CheckinResponse[]>(`${this.apiUrl}/recent?limit=${limit}`);
  }

  // Crear un nuevo check-in
  createCheckin(checkin: Checkin): Observable<CheckinResponse> {
    return this.http.post<CheckinResponse>(this.apiUrl, checkin);
  }

  // Verificar si el usuario puede enviar un nuevo checkin (devuelve allowed y retryAfter)
  canSubmit(): Observable<{ allowed: boolean; retryAfter?: number }> {
    return this.http.get<{ allowed: boolean; retryAfter?: number }>(`${this.apiUrl}/can-submit`);
  }

  // Obtener check-ins de hoy
  getTodayCheckins(): Observable<CheckinResponse[]> {
    return this.http.get<CheckinResponse[]>(`${this.apiUrl}/today`);
  }

  // Obtener check-in más reciente
  getLatestCheckin(): Observable<CheckinResponse> {
    return this.http.get<CheckinResponse>(`${this.apiUrl}/latest`);
  }
}
