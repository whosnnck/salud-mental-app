import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="support-container">
      <h1>Recursos de apoyo</h1>
      <p>Solicita ayuda profesional cuando la necesites.</p>

      <div class="support-options">
        <div class="support-card">
          <span class="emoji">👔</span>
          <h3>Contactar RRHH</h3>
          <p>Comunícate con el departamento de Recursos Humanos</p>
          <button class="support-btn">Solicitar Contacto</button>
        </div>
        <div class="support-card">
          <span class="emoji">🏥</span>
          <h3>Ayuda Psicológica</h3>
          <p>Accede a atención psicológica profesional</p>
          <button class="support-btn">Solicitar Ayuda</button>
        </div>
        <div class="support-card">
          <span class="emoji">✍️</span>
          <h3>Escribir Cómo Me Siento</h3>
          <p>Expresa tus sentimientos de forma anónima</p>
          <button class="support-btn">Escribir</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .support-container {
        padding: 20px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .support-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .support-card {
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

      .support-card h3 {
        color: #2e7d32;
        margin: 10px 0;
      }

      .support-card p {
        color: #666;
        margin: 10px 0;
        font-size: 14px;
      }

      .support-btn {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.2s;
        margin-top: 10px;
      }

      .support-btn:hover {
        transform: scale(1.05);
      }
    `,
  ],
})
export class SupportComponent {}
