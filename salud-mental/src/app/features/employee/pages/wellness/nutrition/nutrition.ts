import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wellness-nutrition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wellness-page">
      <h1>Nutricion</h1>
      <a class="back-link" routerLink="/employee/wellness">Volver</a>
      <p>Alimentacion que sostiene la claridad mental durante la jornada.</p>

      <section class="wellness-section">
        <h2>Hidratacion</h2>
        <p>La energia baja cuando falta agua.</p>
        <ul>
          <li>Ten agua visible y bebe sorbos cada hora.</li>
          <li>Agrega rodajas de fruta si te cuesta tomar agua.</li>
          <li>Alterna cafe con agua para evitar deshidratacion.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Snacks balanceados</h2>
        <p>Combina fibra y proteina para energia estable.</p>
        <ul>
          <li>Fruta con frutos secos o yogurt natural.</li>
          <li>Sandwich pequeno con proteina magra.</li>
          <li>Evita azucar en exceso al medio dia.</li>
        </ul>
      </section>

      <section class="wellness-section">
        <h2>Horarios claros</h2>
        <p>Comer a tiempo ayuda a la concentracion.</p>
        <ul>
          <li>Evita saltar comidas en horas de mas demanda.</li>
          <li>Programa recordatorios para pausas de comida.</li>
          <li>Prepara opciones simples la noche anterior.</li>
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
export class WellnessNutritionComponent {}
