import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-self-care-walks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="selfcare-page">
      <h1>Caminatas</h1>
      <a class="back-link" routerLink="/employee/self-care">Volver a Autocuidado</a>
      <p>Caminar un poco durante el dia reduce estres y mejora la energia.</p>

      <section class="selfcare-section">
        <h2>Mini caminata laboral</h2>
        <p>Una vuelta breve ayuda a despejar la mente.</p>
        <ul>
          <li>Sal 5 minutos cada 2 o 3 horas.</li>
          <li>Evita revisar el celular mientras caminas.</li>
          <li>Respira profundo y relaja la espalda.</li>
        </ul>
      </section>

      <section class="selfcare-section">
        <h2>Movilidad al aire libre</h2>
        <p>Si puedes, busca luz natural para recargar energia.</p>
        <ul>
          <li>Elige una ruta segura y tranquila.</li>
          <li>Observa el entorno y baja el ritmo mental.</li>
          <li>Regresa con un objetivo claro para la siguiente tarea.</li>
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
export class SelfCareWalksComponent {}
