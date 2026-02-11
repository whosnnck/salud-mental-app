import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupportRequest {
  id?: number;
  user_id?: number;
  request_type: 'contact_hr' | 'psychological' | 'general';
  subject?: string;
  message: string;
  urgency?: 'low' | 'medium' | 'high' | 'crisis';
  phone_contact?: string;
  status?: 'pending' | 'in_progress' | 'resolved';
  created_at?: string;
}

export interface SupportRequestResponse {
  id: number;
  user_id: number;
  request_type: string;
  type?: string | null;
  subject: string | null;
  message: string;
  description?: string | null;
  urgency: string;
  phone_contact: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private apiUrl = 'http://localhost:3000/api/support';

  constructor(private http: HttpClient) {}

  // Obtener todas las solicitudes del usuario
  getMyRequests(): Observable<SupportRequestResponse[]> {
    return this.http.get<SupportRequestResponse[]>(`${this.apiUrl}/my`);
  }

  // Obtener solicitudes recientes (últimas 20)
  getRecentRequests(limit: number = 20): Observable<SupportRequestResponse[]> {
    return this.http.get<SupportRequestResponse[]>(`${this.apiUrl}/recent?limit=${limit}`);
  }

  // Crear una nueva solicitud de apoyo
  createRequest(request: SupportRequest): Observable<SupportRequestResponse> {
    return this.http.post<SupportRequestResponse>(this.apiUrl, request);
  }

  // Obtener una solicitud específica
  getRequest(id: number): Observable<SupportRequestResponse> {
    return this.http.get<SupportRequestResponse>(`${this.apiUrl}/${id}`);
  }

  // Obtener solicitudes por urgencia
  getRequestsByUrgency(urgency: string): Observable<SupportRequestResponse[]> {
    return this.http.get<SupportRequestResponse[]>(`${this.apiUrl}/urgency/${urgency}`);
  }

  // Obtener solicitudes pendientes
  getPendingRequests(): Observable<SupportRequestResponse[]> {
    return this.http.get<SupportRequestResponse[]>(`${this.apiUrl}/status/pending`);
  }

  // Para HR: obtener todas las solicitudes de todos los usuarios
  getAllRequests(): Observable<SupportRequestResponse[]> {
    return this.http.get<SupportRequestResponse[]>(`${this.apiUrl}/all`);
  }

  // Para HR: eliminar una solicitud
  deleteRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Para HR: actualizar estado de una solicitud
  updateRequestStatus(
    id: number,
    status: 'pending' | 'in_progress' | 'resolved',
  ): Observable<SupportRequestResponse> {
    return this.http.patch<SupportRequestResponse>(`${this.apiUrl}/${id}/status`, { status });
  }
}
