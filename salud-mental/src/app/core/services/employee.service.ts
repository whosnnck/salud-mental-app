import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  full_name: string;
  email: string;
  department: string;
  role: string;
  created_at: string;
  lastMood?: string | null;
  lastCheckIn?: string | null;
  status?: 'Presente' | 'Ausente';
}

export interface EmployeeSummary {
  id: number;
  full_name: string;
  email: string;
  department: string;
  role: string;
  last_checkin: string | null;
  last_mood: string | null;
  checkin_count: number;
}

export interface EmployeeStatistics {
  total_employees: number;
  present_today: number;
  absent_today: number;
  pending_support_requests: number;
  positive_mood_percentage: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  // Obtener lista de todos los empleados (solo para HR)
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }

  // Obtener resumen de empleados (solo para HR)
  getEmployeeSummary(): Observable<EmployeeSummary[]> {
    return this.http.get<EmployeeSummary[]>(`${this.apiUrl}/summary`);
  }

  // Obtener empleados por departamento
  getEmployeesByDepartment(department: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/by-department/${department}`);
  }

  // Obtener empleados presentes hoy
  getPresentToday(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/present-today`);
  }

  // Obtener empleados ausentes hoy
  getAbsentToday(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/absent-today`);
  }

  // Obtener estadísticas generales
  getStatistics(): Observable<EmployeeStatistics> {
    return this.http.get<EmployeeStatistics>(`${this.apiUrl}/statistics`);
  }

  // Obtener check-ins anonimos y estadísticas (solo para HR)
  getAnonymizedCheckins(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkins`);
  }
}
