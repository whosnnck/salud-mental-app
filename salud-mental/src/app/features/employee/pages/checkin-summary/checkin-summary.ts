import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinService, CheckinResponse } from '../../../../core/services/checkin.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkin-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-container">
      <h1>Resumen de Check-ins</h1>
      <p>Resumen dinámico basado en tus respuestas recientes.</p>

      <div class="summary-card">
        <h3>Últimas respuestas ({{ recentCheckins.length }})</h3>
        <div class="stats">
          <div class="stat">
            <span class="emoji">😊</span>
            <span class="label">Bien</span>
            <span class="count">{{ counts.good }}</span>
          </div>
          <div class="stat">
            <span class="emoji">😐</span>
            <span class="label">Neutral</span>
            <span class="count">{{ counts.neutral }}</span>
          </div>
          <div class="stat">
            <span class="emoji">😔</span>
            <span class="label">Mal</span>
            <span class="count">{{ counts.bad }}</span>
          </div>
          <div class="stat">
            <span class="emoji">😴</span>
            <span class="label">Cansado</span>
            <span class="count">{{ counts.tired }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .summary-container {
        padding: 20px;
      }
      h1 {
        color: #2e7d32;
        margin-bottom: 10px;
      }
      .summary-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
      }
      .summary-card h3 {
        color: #2e7d32;
        margin-top: 0;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 15px;
        margin-top: 15px;
      }
      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 10px;
        text-align: center;
      }
      .emoji {
        font-size: 32px;
      }
      .label {
        font-size: 12px;
        color: #666;
      }
      .count {
        font-size: 24px;
        font-weight: bold;
        color: #2e7d32;
      }
      .recent-list {
        margin-top: 18px;
      }
      .recent-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .recent-list li {
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
      .row {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .mood {
        width: 80px;
        font-weight: 600;
      }
      .notes {
        flex: 1;
        color: #444;
      }
      .ts {
        color: #999;
        font-size: 12px;
        width: 140px;
        text-align: right;
      }
    `,
  ],
})
export class CheckinSummaryComponent implements OnInit {
  recentCheckins: CheckinResponse[] = [];
  counts = { good: 0, neutral: 0, bad: 0, tired: 0 };
  lastPerMood: { [k: string]: CheckinResponse | null } = {
    good: null,
    neutral: null,
    bad: null,
    tired: null,
  };

  constructor(
    private checkinService: CheckinService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadRecent();
  }

  loadRecent(limit = 12) {
    // Debug: log token presence
    try {
      const tk = this.auth.getToken();
      console.log('CheckinSummary - token present?', !!tk);
    } catch (e) {}

    this.checkinService.getRecentCheckins(limit).subscribe(
      (rows) => {
        console.log('CheckinSummary - recent rows:', rows);
        this.recentCheckins = rows || [];
        this.computeCounts();
        this.computeLastPerMood();
        try {
          this.cdr.detectChanges();
        } catch (e) {}
      },
      (err) => {
        console.error('Error loading recent checkins:', err);
        this.recentCheckins = [];
        this.counts = { good: 0, neutral: 0, bad: 0, tired: 0 };
      },
    );
  }

  computeCounts() {
    const c = { good: 0, neutral: 0, bad: 0, tired: 0 };
    for (const r of this.recentCheckins) {
      const m = (r.mood || '').toString();
      if (m === 'good') c.good++;
      else if (m === 'neutral') c.neutral++;
      else if (m === 'bad') c.bad++;
      else if (m === 'tired') c.tired++;
    }
    this.counts = c;
  }

  computeLastPerMood() {
    const map: { [k: string]: CheckinResponse | null } = {
      good: null,
      neutral: null,
      bad: null,
      tired: null,
    };
    for (const r of this.recentCheckins) {
      const m = (r.mood || '').toString();
      if (!map[m]) map[m] = r;
      else {
        const prev = new Date(map[m]!.created_at).getTime();
        const curr = new Date(r.created_at).getTime();
        if (curr > prev) map[m] = r;
      }
    }
    this.lastPerMood = map;
  }

  moodLabel(m: string) {
    if (!m) return 'Desconocido';
    switch (m) {
      case 'good':
        return 'Bien';
      case 'neutral':
        return 'Neutral';
      case 'bad':
        return 'Mal';
      case 'tired':
        return 'Cansado';
      default:
        return m;
    }
  }
}
