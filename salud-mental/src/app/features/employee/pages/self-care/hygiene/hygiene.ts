import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-self-care-hygiene',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="selfcare-page">
      <h1>Higiene Personal</h1>
      <a class="back-link" routerLink="/employee/self-care">Volver a Autocuidado</a>
      <p>Rutinas simples de higiene mejoran el bienestar y la confianza.</p>

      <section class="selfcare-section">
        <h2>Antes de iniciar</h2>
        <p>Un inicio ordenado ayuda a sentirte mas claro.</p>
        <ul>
          <li>Lava manos y rostro para activar el cuerpo.</li>
          <li>Usa desodorante y ropa comoda.</li>
          <li>Ten un kit basico en el trabajo si es posible.</li>
        </ul>
      </section>

      <section class="selfcare-section">
        <h2>Durante la jornada</h2>
        <p>Pequenos cuidados evitan fatiga y molestias.</p>
        <ul>
          <li>Hidratate para cuidar piel y garganta.</li>
          <li>Usa protector solar si sales al exterior.</li>
          <li>Ventila tu espacio para mejorar el aire.</li>
        </ul>
      </section>
    </div>
  `,
  styles: [
    `
      .selfcare-page {
        padding: 20px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
        padding: 8px 14px;
        border-radius: 999px;
        background: #e8f5e9;
        color: #1b5e20;
        border: 1px solid #c8e6c9;
        text-decoration: none;
        font-weight: 600;
      }

      .back-link:hover {
        background: #dcedc8;
      }

      .selfcare-section {
        background: white;
        border-radius: 12px;
        padding: 18px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        margin-top: 20px;
      }

      .selfcare-section h2 {
        color: #2e7d32;
        margin: 0 0 8px;
        font-size: 18px;
      }

      .selfcare-section p {
        color: #555;
        margin: 0 0 10px;
        font-size: 14px;
      }

      .selfcare-section ul {
        margin: 0;
        padding-left: 18px;
        color: #4b4b4b;
        font-size: 14px;
      }

      .selfcare-section li {
        margin: 6px 0;
      }
    `,
  ],
})
export class SelfCareHygieneComponent {}
