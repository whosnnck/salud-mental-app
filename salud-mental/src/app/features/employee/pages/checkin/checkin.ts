import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CheckinService, CheckinResponse } from '../../../../core/services/checkin.service';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkin-container">
      <h1>¿Cómo te sientes hoy?</h1>
      <p class="subtitle">Solo te tomará 30 segundos compartir tu estado emocional</p>

      <div class="checkin-card">
        <div class="mood-section">
          <h3>Selecciona tu estado emocional:</h3>
          <div class="mood-buttons">
            <button
              *ngFor="let mood of moods"
              (click)="selectMood(mood.value)"
              [class.selected]="selectedMood === mood.value"
              class="mood-btn"
              [title]="mood.label"
            >
              <span class="mood-emoji">{{ mood.emoji }}</span>
              <span class="mood-label">{{ mood.label }}</span>
            </button>
          </div>
        </div>

        <div class="notes-section">
          <label for="notes">Notas Opcionales:</label>
          <textarea
            id="notes"
            [(ngModel)]="notes"
            placeholder="¿Hay algo más que quieras compartir? (opcional)"
            rows="4"
          ></textarea>
          <span class="char-count">{{ notes.length }}/500</span>
        </div>

        <div class="button-group">
          <button
            (click)="submitCheckin()"
            class="submit-btn"
            [disabled]="!selectedMood || isLoading"
          >
            {{ isLoading ? 'Enviando...' : 'Enviar Check-in' }}
          </button>
          <button (click)="reset()" class="reset-btn">Limpiar</button>
        </div>
      </div>

      <div class="recent-section" *ngIf="recentCheckins.length > 0">
        <h3>Mis Check-ins Recientes</h3>
        <div class="recent-list">
          <div class="recent-item" *ngFor="let checkin of recentCheckins">
            <span class="recent-emoji">{{ getMoodEmoji(checkin.mood) }}</span>
            <div class="recent-info">
              <span class="recent-label">{{ getMoodLabel(checkin.mood) }}</span>
              <span class="recent-date">{{ checkin.created_at | date: 'short' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .checkin-container {
        padding: 20px;
        max-width: 700px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
        font-size: 28px;
      }

      .subtitle {
        color: #999;
        margin-bottom: 30px;
        font-size: 16px;
      }

      .checkin-card {
        background: white;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
      }

      .mood-section {
        margin-bottom: 30px;
      }

      .mood-section h3 {
        color: #2e7d32;
        margin-bottom: 20px;
        font-size: 18px;
      }

      .mood-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 15px;
      }

      .mood-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border: 2px solid #ddd;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 600;
        color: #666;
      }

      .mood-btn:hover {
        border-color: #4caf50;
        background: rgba(76, 175, 80, 0.05);
        transform: translateY(-2px);
      }

      .mood-btn.selected {
        border-color: #4caf50;
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }

      .mood-emoji {
        font-size: 32px;
      }

      .mood-label {
        font-size: 14px;
      }

      .notes-section {
        margin-bottom: 25px;
        display: flex;
        flex-direction: column;
      }

      .notes-section label {
        font-weight: 600;
        color: #2e7d32;
        margin-bottom: 10px;
      }

      textarea {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        resize: vertical;
      }

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
        margin-top: 20px;
      }

      .submit-btn,
      .reset-btn {
        flex: 1;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        font-size: 16px;
      }

      .submit-btn {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
      }

      .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
      }

      .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .reset-btn {
        background: #f0f0f0;
        color: #333;
      }

      .reset-btn:hover {
        background: #e0e0e0;
      }

      .recent-section {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .recent-section h3 {
        color: #2e7d32;
        margin-top: 0;
        margin-bottom: 15px;
      }

      .recent-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .recent-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: #f9f9f9;
        border-left: 4px solid #4caf50;
        border-radius: 4px;
      }

      .recent-emoji {
        font-size: 24px;
      }

      .recent-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .recent-label {
        font-weight: 600;
        color: #2e7d32;
        font-size: 14px;
      }

      .recent-date {
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class Checkin implements OnInit {
  selectedMood: string | null = null;
  notes: string = '';
  currentUser: any = null;
  recentCheckins: CheckinResponse[] = [];
  isLoading = false;
  // Rate-limit / blocking
  canSubmitCheckin: boolean = true;
  retryAfterSeconds: number | null = null;
  private retryTimerId: any = null;

  moods = [
    { emoji: '😊', label: 'Bien', value: 'good' },
    { emoji: '😐', label: 'Normal', value: 'neutral' },
    { emoji: '😞', label: 'Mal', value: 'bad' },
    { emoji: '😴', label: 'Cansado', value: 'tired' },
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private checkinService: CheckinService,
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar check-ins recientes
    this.loadRecentCheckins();
    // Check rate limit / whether user can submit
    this.checkCanSubmit();
  }

  ngOnDestroy() {
    if (this.retryTimerId) {
      clearInterval(this.retryTimerId);
    }
  }

  checkCanSubmit() {
    this.checkinService.canSubmit().subscribe(
      (res) => {
        this.canSubmitCheckin = !!res.allowed;
        if (!this.canSubmitCheckin && res.retryAfter) {
          this.retryAfterSeconds = res.retryAfter;
          this.startRetryCountdown();
        } else {
          this.retryAfterSeconds = null;
          if (this.retryTimerId) {
            clearInterval(this.retryTimerId);
            this.retryTimerId = null;
          }
        }
      },
      (err) => {
        console.warn('Error checking canSubmit:', err);
        // fallback: allow submit but rely on server to block
        this.canSubmitCheckin = true;
      },
    );
  }

  startRetryCountdown() {
    if (this.retryTimerId) {
      clearInterval(this.retryTimerId);
    }
    this.retryTimerId = setInterval(() => {
      if (this.retryAfterSeconds && this.retryAfterSeconds > 0) {
        this.retryAfterSeconds!--;
      } else {
        clearInterval(this.retryTimerId);
        this.retryTimerId = null;
        this.checkCanSubmit();
      }
    }, 1000);
  }

  loadRecentCheckins() {
    this.checkinService.getRecentCheckins(5).subscribe(
      (data) => {
        this.recentCheckins = data;
      },
      (error) => {
        console.error('Error loading recent checkins:', error);
      },
    );
  }

  selectMood(mood: string) {
    this.selectedMood = mood;
  }

  submitCheckin() {
    if (!this.selectedMood) {
      alert('Por favor selecciona tu estado emocional');
      return;
    }
    if (!this.canSubmitCheckin) {
      const secs = this.retryAfterSeconds || 0;
      const mins = Math.floor(secs / 60);
      const s = secs % 60;
      alert(
        `No puedes enviar más solicitudes por el periodo configurado. Intenta de nuevo en ${mins}m ${s}s`,
      );
      return;
    }

    this.isLoading = true;

    this.checkinService
      .createCheckin({
        mood: this.selectedMood as 'good' | 'neutral' | 'bad' | 'tired',
        notes: this.notes,
      })
      .subscribe(
        (response) => {
          this.isLoading = false;
          alert('✅ Gracias por completar tu check-in 💙');
          this.reset();
          this.loadRecentCheckins();
          // Re-check rate-limit immediately after successful submit
          this.checkCanSubmit();
        },
        (error) => {
          this.isLoading = false;
          console.error('Error creating checkin:', error);
          // If server responds with 429 include retry info
          const retry = error?.error?.retryAfter || error?.error?.details || null;
          if (error?.status === 429) {
            const retryAfter = error?.error?.retryAfter || null;
            this.canSubmitCheckin = false;
            this.retryAfterSeconds = retryAfter;
            this.startRetryCountdown();
            alert(error?.error?.friendly || 'No puedes enviar más check-ins ahora.');
            return;
          }
          alert('❌ Error al enviar el check-in. Intenta de nuevo.');
        },
      );
  }

  reset() {
    this.selectedMood = null;
    this.notes = '';
  }

  getMoodEmoji(value: string): string {
    const mood = this.moods.find((m) => m.value === value);
    return mood?.emoji || '😊';
  }

  getMoodLabel(value: string): string {
    const mood = this.moods.find((m) => m.value === value);
    return mood?.label || 'Desconocido';
  }
}
