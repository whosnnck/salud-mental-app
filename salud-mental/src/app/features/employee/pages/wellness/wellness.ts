import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wellness-container">
      <h1>Mi Bienestar</h1>
      <p>Herramientas y recursos para mejorar tu bienestar mental y fisico.</p>

      <div class="wellness-grid">
        <a class="wellness-card" routerLink="/employee/wellness/meditation">
          <span class="emoji">🧘</span>
          <h3>Meditacion</h3>
          <p>Ejercicios de meditacion y mindfulness</p>
        </a>
        <a class="wellness-card" routerLink="/employee/wellness/exercise">
          <span class="emoji">💪</span>
          <h3>Ejercicio</h3>
          <p>Rutinas de ejercicio y movimiento</p>
        </a>
        <a class="wellness-card" routerLink="/employee/wellness/rest">
          <span class="emoji">😴</span>
          <h3>Descanso</h3>
          <p>Consejos para mejorar tu sueno</p>
        </a>
        <a class="wellness-card" routerLink="/employee/wellness/nutrition">
          <span class="emoji">🍎</span>
          <h3>Nutricion</h3>
          <p>Guias de alimentacion saludable</p>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .wellness-container {
        padding: 20px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .wellness-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .wellness-card {
        display: block;
        text-decoration: none;
        color: inherit;
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.2s;
        cursor: pointer;
      }

      .wellness-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .emoji {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .wellness-card h3 {
        color: #2e7d32;
        margin: 10px 0;
      }

      .wellness-card p {
        color: #666;
        margin: 0;
        font-size: 14px;
      }
    `,
  ],
})
export class WellnessComponent {}
