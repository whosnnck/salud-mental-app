import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-hr',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div class="contact-container">
      <h1>Contactar RRHH</h1>
      <p>Solicita una reunión con el departamento de Recursos Humanos</p>

      <form class="contact-form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="topic">Asunto:</label>
          <select id="topic" [(ngModel)]="formData.topic" name="topic" required>
            <option value="">Selecciona un asunto</option>
            <option value="general">Consulta general</option>
            <option value="benefits">Beneficios</option>
            <option value="leave">Solicitud de licencia</option>
            <option value="development">Desarrollo profesional</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Mensaje:</label>
          <textarea
            id="message"
            [(ngModel)]="formData.message"
            name="message"
            required
            rows="6"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="phone">Teléfono de contacto:</label>
          <input
            type="tel"
            id="phone"
            [(ngModel)]="formData.phone"
            name="phone"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <button type="submit" class="submit-btn">Solicitar Contacto</button>
      </form>
    </div>
  `,
  styles: [
    `
      .contact-container {
        padding: 20px;
        max-width: 600px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .contact-form {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
      }

      .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
      }

      label {
        font-weight: 600;
        color: #2e7d32;
        margin-bottom: 8px;
      }

      select,
      input,
      textarea {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
      }

      textarea {
        resize: vertical;
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
export class ContactHrComponent {
  formData = {
    topic: '',
    message: '',
    phone: '',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Always mark as 'contact_hr' so it matches DB enum; use the topic as subject
    const payload = {
      request_type: 'contact_hr',
      subject: this.formData.topic || 'Consulta general',
      message: this.formData.message || '',
      phone_contact: this.formData.phone || null,
      urgency: 'low',
    } as any;

    this.http.post('http://localhost:3000/api/support', payload).subscribe(
      (res) => {
        console.log('Support request created:', res);
        alert('Tu solicitud ha sido enviada. RRHH se contactará pronto.');
        this.formData = { topic: '', message: '', phone: '' };
      },
      (err) => {
        console.warn('Error creating support request:', err);
        alert('No se pudo enviar la solicitud. Intenta de nuevo.');
      },
    );
  }
}
