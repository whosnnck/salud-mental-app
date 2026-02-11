import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wellness-meditation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wellness-page">
      <h1>Meditacion</h1>
      <a class="back-link" routerLink="/employee/wellness">Volver</a>
      <p>Practicas cortas para recuperar enfoque y calma durante la jornada laboral.</p>

      <section class="wellness-section">
        <h2>Respiracion guiada (2 minutos)</h2>
        <p>Una pausa breve reduce estres y mejora la claridad mental.</p>
        <ul>
          <li>Inhala 4 segundos, sosten 4, exhala 4.</li>
          <li>Repite 6 veces, sentado con espalda recta.</li>
          <li>Relaja hombros y suelta la mandibula.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Atencion plena en tareas</h2>
        <p>Vuelve al presente cuando aparezcan distracciones.</p>
        <ul>
          <li>Elige una tarea y define un objetivo claro.</li>
          <li>Nota pensamientos y vuelve a la accion.</li>
          <li>Cierra notificaciones durante 15 minutos.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>En tu escritorio</h2>
        <p>Ajustes simples mejoran postura y reducen fatiga.</p>
        <ul>
          <li>Pantalla a la altura de los ojos.</li>
          <li>Pies apoyados, rodillas a 90 grados.</li>
          <li>Respira lento por la nariz antes de volver a teclear.</li>
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
export class WellnessMeditationComponent {}
