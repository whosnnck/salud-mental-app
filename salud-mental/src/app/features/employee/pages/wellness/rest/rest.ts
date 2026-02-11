import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wellness-rest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wellness-page">
      <h1>Descanso</h1>
      <a class="back-link" routerLink="/employee/wellness">Volver</a>
      <p>Recuperacion para rendir mejor y cuidar tu energia en el trabajo.</p>

      <section class="wellness-section">
        <h2>Micro pausas</h2>
        <p>Pequenas pausas reducen la fatiga visual y mental.</p>
        <ul>
          <li>Detente 60 segundos sin pantalla entre tareas.</li>
          <li>Mira un punto lejano para relajar la vista.</li>
          <li>Respira profundo y estira las manos.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Bloques de trabajo</h2>
        <p>Organiza energia con ciclos de foco y descanso.</p>
        <ul>
          <li>Trabaja 50 min y descansa 5 min.</li>
          <li>Reserva 10 min entre reuniones seguidas.</li>
          <li>Planifica tareas demandantes al inicio del dia.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Ritual nocturno</h2>
        <p>Un cierre claro mejora el descanso y la recuperacion.</p>
        <ul>
          <li>Apaga pantallas 30 min antes de dormir.</li>
          <li>Deja lista tu agenda para el dia siguiente.</li>
          <li>Evita cafe o bebidas energizantes por la noche.</li>
        </ul>
      </section>
    </div>
  `,
  styles: [
    `
      .wellness-page {
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

      .wellness-section {
        background: white;
        border-radius: 12px;
        padding: 18px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        margin-top: 20px;
      }

      .wellness-section h2 {
        color: #2e7d32;
        margin: 0 0 8px;
        font-size: 18px;
      }

      .wellness-section p {
        color: #555;
        margin: 0 0 10px;
        font-size: 14px;
      }

      .wellness-section ul {
        margin: 0;
        padding-left: 18px;
        color: #4b4b4b;
        font-size: 14px;
      }

      .wellness-section li {
        margin: 6px 0;
      }
    `,
  ],
})
export class WellnessRestComponent {}
