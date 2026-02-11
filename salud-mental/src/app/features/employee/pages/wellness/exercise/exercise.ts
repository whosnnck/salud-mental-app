import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wellness-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wellness-page">
      <h1>Ejercicio</h1>
      <a class="back-link" routerLink="/employee/wellness">Volver</a>
      <p>Movimiento breve para activar cuerpo y mente sin salir del trabajo.</p>

      <section class="wellness-section">
        <h2>Pausas activas</h2>
        <p>Reduce rigidez y mejora la circulacion.</p>
        <ul>
          <li>Levantate cada 60 minutos y estira espalda.</li>
          <li>Sube y baja puntas de pies por 30 segundos.</li>
          <li>Abre el pecho llevando hombros hacia atras.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Caminata corta</h2>
        <p>Una vuelta breve ayuda a renovar energia mental.</p>
        <ul>
          <li>Camina 5 minutos en descansos.</li>
          <li>Respira profundo mientras avanzas.</li>
          <li>Evita revisar el celular durante la caminata.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Movilidad suave</h2>
        <p>Movimientos lentos para prevenir tension.</p>
        <ul>
          <li>Rota cuello y munecas con control.</li>
          <li>Inclina la cabeza a cada lado 10 segundos.</li>
          <li>Estira antebrazos apoyando palmas en la mesa.</li>
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
export class WellnessExerciseComponent {}
