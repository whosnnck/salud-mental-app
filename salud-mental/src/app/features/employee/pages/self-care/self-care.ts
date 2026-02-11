import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-self-care',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="selfcare-container">
      <h1>Autocuidado</h1>
      <p>Actividades y hábitos para cuidar de ti mismo.</p>

      <div class="selfcare-grid">
        <a class="selfcare-card" routerLink="/employee/self-care/reading">
          <span class="emoji">📖</span>
          <h3>Lectura</h3>
          <p>Artículos y libros recomendados</p>
        </a>
        <a class="selfcare-card" routerLink="/employee/self-care/music">
          <span class="emoji">🎵</span>
          <h3>Música</h3>
          <p>Playlists relajantes y motivadoras</p>
        </a>
        <a class="selfcare-card" routerLink="/employee/self-care/walks">
          <span class="emoji">🚶</span>
          <h3>Caminatas</h3>
          <p>Beneficios del movimiento al aire libre</p>
        </a>
        <a class="selfcare-card" routerLink="/employee/self-care/hygiene">
          <span class="emoji">🧴</span>
          <h3>Higiene Personal</h3>
          <p>Rutinas de cuidado personal</p>
        </a>
        <a class="selfcare-card" routerLink="/employee/self-care/breaks">
          <span class="emoji">☕</span>
          <h3>Momentos de Pausa</h3>
          <p>Técnicas de relajación rápida</p>
        </a>
        <a class="selfcare-card" routerLink="/employee/self-care/nature">
          <span class="emoji">🌿</span>
          <h3>Naturaleza</h3>
          <p>Conexión con el entorno natural</p>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .selfcare-container {
        padding: 20px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      .selfcare-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .selfcare-card {
        display: block;
        color: inherit;
        text-decoration: none;
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.2s;
        cursor: pointer;
      }

      .selfcare-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .emoji {
        font-size: 40px;
        display: block;
        margin-bottom: 10px;
      }

      .selfcare-card h3 {
        color: #2e7d32;
        margin: 10px 0;
        font-size: 16px;
      }

      .selfcare-card p {
        color: #666;
        margin: 0;
        font-size: 13px;
      }
    `,
  ],
})
export class SelfCareComponent {}
