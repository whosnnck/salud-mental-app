import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiaryService, DiaryEntryResponse } from '../../../../../core/services/diary.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-write-feelings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="write-container">
      <h1>Escribir Cómo Me Siento</h1>
      <p>Expresa tus sentimientos de forma anónima y confidencial</p>

      <div class="write-card">
        <!-- Tabs -->
        <div class="tabs">
          <button
            type="button"
            (click)="selectTab('diary')"
            [class.active]="selectedTab === 'diary'"
          >
            Diario
          </button>
          <button type="button" (click)="selectTab('new')" [class.active]="selectedTab === 'new'">
            Agregar nueva entrada
          </button>
        </div>

        <div class="tab-content">
          <div *ngIf="selectedTab === 'new'">
            <h3>Nueva Entrada</h3>
            <p class="subtitle">Tus escritos serán completamente privados y anónimos</p>

            <form (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="emotion">¿Cómo te sientes?</label>
                <input
                  type="text"
                  id="emotion"
                  [(ngModel)]="formData.emotion"
                  name="emotion"
                  placeholder="Ej: Ansioso, Feliz, Triste, Confundido"
                />
              </div>

              <div class="form-group">
                <label for="content">Escribe lo que sientes:</label>
                <textarea
                  id="content"
                  [(ngModel)]="formData.content"
                  name="content"
                  rows="10"
                  placeholder="Aquí puedes expresar libremente tus emociones, pensamientos y sentimientos..."
                ></textarea>
                <span class="char-count">{{ formData.content.length }}/5000</span>
              </div>

              <div class="form-group checkbox">
                <input
                  type="checkbox"
                  id="share"
                  [(ngModel)]="formData.shareable"
                  name="shareable"
                />
                <label for="share"
                  >Permitir que RRHH y profesionales vean mi mensaje (opcional)</label
                >
              </div>

              <div class="button-group">
                <button type="submit" class="submit-btn">Guardar Diario</button>
                <button type="button" class="clear-btn" (click)="clearForm()">Limpiar</button>
              </div>
            </form>
          </div>

          <div *ngIf="selectedTab === 'diary'">
            <h3>Mi Diario de Emociones</h3>
            <div class="saved-entries" *ngIf="entries.length > 0; else noEntries">
              <div class="entries-list">
                <div class="entry" *ngFor="let entry of entries">
                  <span class="emotion-tag">{{ entry.emotion }}</span>
                  <p class="entry-preview">{{ entry.content | slice: 0 : 100 }}...</p>
                  <span class="entry-date">{{ entry.created_at | date: 'short' }}</span>
                </div>
              </div>
            </div>
            <ng-template #noEntries>
              <p class="muted">
                No hay entradas aún. Agrega una nueva en la pestaña "Agregar nueva entrada".
              </p>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .write-container {
        padding: 20px;
        max-width: 700px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }

      /* Use shared card style from app */
      .write-card,
      .card {
        background: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 6px 24px rgba(15, 23, 42, 0.04);
        margin-top: 16px;
      }

      .write-card h3,
      .card-title {
        color: #2e7d32;
        margin-top: 0;
        font-weight: 700;
      }

      .subtitle {
        color: #6b7280;
        font-size: 13px;
        margin: 6px 0 14px 0;
      }

      .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
      }

      .form-group.checkbox {
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }

      .form-group.checkbox input {
        width: auto;
        margin: 0;
      }

      .form-group.checkbox label {
        margin: 0;
        font-weight: normal;
      }

      label {
        font-weight: 600;
        color: #2e7d32;
        margin-bottom: 8px;
      }

      input[type='text'],
      textarea {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        resize: vertical;
      }

      input[type='text']:focus,
      textarea:focus {
        outline: none;
        border-color: #4caf50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
      }

      .char-count {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
        text-align: right;
      }

      .button-group {
        display: flex;
        gap: 10px;
        margin-top: 18px;
      }

      .submit-btn,
      .clear-btn {
        flex: 1;
        padding: 12px 18px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        transition: transform 0.12s ease;
      }

      .submit-btn {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        box-shadow: 0 6px 18px rgba(66, 165, 245, 0.08);
      }

      .clear-btn {
        background: #f8faf9;
        color: #374151;
        border: 1px solid #eef2f6;
      }

      .submit-btn:hover {
        transform: translateY(-1px);
      }

      .clear-btn:hover {
        transform: translateY(-1px);
      }

      .saved-entries {
        margin-top: 30px;
        padding-top: 30px;
        border-top: 1px solid #eee;
      }

      .saved-entries h4 {
        color: #2e7d32;
        margin-top: 0;
      }

      .entries-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .entry {
        background: #ffffff;
        border-left: 4px solid #4caf50;
        padding: 12px 14px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      }

      .emotion-tag {
        display: inline-block;
        background: #e8f5e9;
        color: #2e7d32;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
      }

      /* Tabs style consistent with HR dashboard */
      .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }

      .tabs button {
        background: transparent;
        border: 1px solid transparent;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        color: #374151;
      }

      .tabs button.active {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
      }

      .entry-preview {
        margin: 8px 0;
        color: #666;
        font-size: 13px;
      }

      .entry-date {
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class WriteFeeingsComponent implements OnInit {
  formData = {
    emotion: '',
    content: '',
    shareable: false,
  };
  entries: DiaryEntryResponse[] = [];
  selectedTab: 'diary' | 'new' = 'diary';

  constructor(
    private diary: DiaryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries() {
    this.diary.getMyEntries().subscribe(
      (rows) => {
        this.entries = rows || [];
        try {
          this.cdr.detectChanges();
        } catch (e) {}
      },
      (err) => {
        console.error('Error loading diary entries:', err);
        this.entries = [];
      },
    );
  }

  selectTab(tab: 'diary' | 'new') {
    this.selectedTab = tab;
  }

  onSubmit() {
    if (this.formData.emotion && this.formData.content) {
      const payload = {
        emotion: this.formData.emotion,
        content: this.formData.content,
        is_shareable: !!this.formData.shareable,
      };
      this.diary.createEntry(payload as any).subscribe(
        (created) => {
          // prepend created entry
          this.entries.unshift(created);
          // switch to diary tab to show the updated list
          this.selectedTab = 'diary';
          try {
            this.cdr.detectChanges();
          } catch (e) {}
          alert('Tu entrada ha sido guardada de forma segura.');
          this.clearForm();
        },
        (err) => {
          console.error('Error creating diary entry:', err);
          alert('Error guardando la entrada. Intenta de nuevo.');
        },
      );
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  clearForm() {
    this.formData = { emotion: '', content: '', shareable: false };
  }
}
