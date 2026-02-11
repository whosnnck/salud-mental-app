import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-psychological-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="help-container">
      <h1>Ayuda Psicológica</h1>
      <p>Accede a servicios de apoyo psicológico profesional</p>

      <div class="help-options">
        <div class="help-card">
          <span class="emoji">👨‍⚕️</span>
          <h3>Psicólogo en Línea</h3>
          <p>Consultas con un psicólogo profesional</p>
          <button class="help-btn" (click)="requestService('online')">Agendar Sesión</button>
        </div>

        <div class="help-card">
          <span class="emoji">🏢</span>
          <h3>Psicólogo Presencial</h3>
          <p>Encuentros en nuestras oficinas</p>
          <button class="help-btn" (click)="requestService('inperson')">Agendar Sesión</button>
        </div>

        <div class="help-card">
          <span class="emoji">☎️</span>
          <h3>Línea de Apoyo 24/7</h3>
          <p>Llamadas de emergencia disponibles</p>
          <button class="help-btn" (click)="callSupportLine()">Llamar Ahora</button>
        </div>
      </div>

      <div class="form-section" *ngIf="showForm">
        <h3>Formulario de Solicitud</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="urgency">Nivel de urgencia:</label>
            <select id="urgency" [(ngModel)]="formData.urgency" name="urgency" required>
              <option value="">Selecciona el nivel</option>
              <option value="low">Bajo</option>
              <option value="medium">Medio</option>
              <option value="high">Alto</option>
              <option value="crisis">Crisis (Emergencia)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="reason">Motivo de la consulta:</label>
            <textarea
              id="reason"
              [(ngModel)]="formData.reason"
              name="reason"
              required
              rows="4"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">Enviar Solicitud</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .help-container {
        padding: 20px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .help-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 30px 0;
      }

      .help-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .emoji {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .help-card h3 {
        color: #2e7d32;
        margin: 10px 0;
      }

      .help-btn {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 10px;
        transition: transform 0.2s;
      }

      .help-btn:hover {
        transform: scale(1.05);
      }

      .form-section {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        max-width: 500px;
      }

      .form-section h3 {
        color: #2e7d32;
        margin-top: 0;
      }

      .form-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
      }

      label {
        font-weight: 600;
        color: #2e7d32;
        margin-bottom: 8px;
      }

      select,
      textarea {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
      }

      .submit-btn {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s;
      }

      .submit-btn:hover {
        transform: scale(1.05);
      }
    `,
  ],
})
export class PsychologicalHelpComponent {
  showForm = false;
  formData = {
    urgency: '',
    reason: '',
  };

  requestService(type: string) {
    this.showForm = true;
  }

  callSupportLine() {
    alert('Conectando con línea de apoyo... 1-800-SUPPORT');
  }

  onSubmit() {
    console.log('Solicitud de ayuda:', this.formData);
    alert('Tu solicitud ha sido registrada. Nos contactaremos en breve.');
    this.formData = { urgency: '', reason: '' };
    this.showForm = false;
  }
}
