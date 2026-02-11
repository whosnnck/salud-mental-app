import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DiaryEntry {
  id?: number;
  user_id?: number;
  emotion: string;
  content: string;
  is_shareable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DiaryEntryResponse {
  id: number;
  user_id: number;
  emotion: string;
  content: string;
  is_shareable: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private apiUrl = 'http://localhost:3000/api/diary';

  constructor(private http: HttpClient) {}

  // Obtener todas las entradas del diario del usuario
  getMyEntries(): Observable<DiaryEntryResponse[]> {
    return this.http.get<DiaryEntryResponse[]>(`${this.apiUrl}/my`);
  }

  // Obtener entradas recientes (últimas 10)
  getRecentEntries(limit: number = 10): Observable<DiaryEntryResponse[]> {
    return this.http.get<DiaryEntryResponse[]>(`${this.apiUrl}/recent?limit=${limit}`);
  }

  // Crear una nueva entrada en el diario
  createEntry(entry: DiaryEntry): Observable<DiaryEntryResponse> {
    return this.http.post<DiaryEntryResponse>(this.apiUrl, entry);
  }

  // Obtener una entrada específica
  getEntry(id: number): Observable<DiaryEntryResponse> {
    return this.http.get<DiaryEntryResponse>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una entrada
  updateEntry(id: number, entry: Partial<DiaryEntry>): Observable<DiaryEntryResponse> {
    return this.http.put<DiaryEntryResponse>(`${this.apiUrl}/${id}`, entry);
  }

  // Eliminar una entrada
  deleteEntry(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
