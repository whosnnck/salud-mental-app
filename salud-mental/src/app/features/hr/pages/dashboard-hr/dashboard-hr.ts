import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { EmployeeService, Employee } from '../../../../core/services/employee.service';
import { Chart, ArcElement, Tooltip, Legend, ChartType, PieController } from 'chart.js';

@Component({
  selector: 'app-dashboard-hr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-hr.html',
  styleUrls: ['./dashboard-hr.css'],
})
export class DashboardHr implements OnInit {
  currentUser: any = null;
  employees: Employee[] = [];
  originalEmployees: Employee[] = [];
  isLoading = true;
  error: string | null = null;
  searchQuery: string = '';
  // Anonymized checkins data for HR
  anonymizedStats: any[] = [];
  anonymizedRecent: Array<{ mood: string; notes: string | null; created_at: string }> = [];
  // submenu state for anonymized section: 'summary' or 'recent'
  selectedAnonTab: 'summary' | 'recent' = 'summary';
  // Chart colors and labels mapping
  private moodMap: Record<string, { label: string; color: string }> = {
    good: { label: 'Bien', color: '#10B981' },
    neutral: { label: 'Normal', color: '#6B7280' },
    bad: { label: 'Mal', color: '#EF4444' },
    tired: { label: 'Cansado', color: '#F59E0B' },
  };

  @ViewChild('pieCanvas', { static: false }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  private pieChart: Chart | null = null;

  get chartData() {
    const total = this.anonymizedStats.reduce((s: number, r: any) => s + (r.count || 0), 0);
    return this.anonymizedStats.map((r: any) => {
      const mood = r.mood || 'unknown';
      const count = r.count || 0;
      const percent = total > 0 ? Math.round((count / total) * 100) : 0;
      const meta = this.moodMap[mood] || { label: mood, color: '#9CA3AF' };
      return { mood, label: meta.label, color: meta.color, count, percent };
    });
  }

  // Compute SVG pie slices based on chartData
  get pieSlices() {
    const data = this.chartData.filter((d: any) => d.count > 0);
    const total = data.reduce((s: number, d: any) => s + d.count, 0);
    const cx = 80;
    const cy = 80;
    const r = 70;
    let startAngle = 0; // degrees

    if (total === 0) return [];

    return data.map((d: any, idx: number) => {
      const value = d.count;
      const angle = (value / total) * 360;
      const endAngle = startAngle + angle;

      // Convert angles to radians and adjust so 0deg is at top (-90deg)
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      let path = '';
      if (Math.round(angle) >= 360) {
        // full circle
        path = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
      } else {
        path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      }

      startAngle = endAngle;

      return {
        path,
        color: d.color,
        percent: d.percent,
        label: d.label,
        count: d.count,
      };
    });
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
  ) {
    // Ensure Chart.js components are registered as early as possible
    try {
      Chart.register(ArcElement, Tooltip, Legend, PieController);
    } catch (e) {}
  }

  ngAfterViewInit() {
    // register Chart.js components
    try {
      Chart.register(ArcElement, Tooltip, Legend, PieController);
    } catch (e) {}
  }

  ngOnDestroy() {
    if (this.pieChart) {
      try {
        this.pieChart.destroy();
      } catch (e) {}
    }
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    console.log('DashboardHr init, currentUser:', this.currentUser);
    console.log('Auth token:', this.auth.getToken());
    if (!this.currentUser || this.currentUser.role !== 'HR') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadEmployees();
    this.loadAnonymizedCheckins();
  }

  loadEmployees() {
    this.isLoading = true;
    this.error = null;

    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        console.debug('DashboardHr - employees received:', data && data.length);
        this.originalEmployees = data;
        this.employees = [...data];
        this.isLoading = false;
        // Ensure view updates immediately (fixes initial stale rendering)
        try {
          this.cdr.detectChanges();
        } catch (e) {}
      },
      (error) => {
        // Log completo para depuración en consola del navegador
        console.warn('Error loading employees (detailed):', error);
        this.error = 'Error al cargar los empleados';
        this.isLoading = false;
        try {
          this.cdr.detectChanges();
        } catch (e) {}
      },
    );
  }

  loadAnonymizedCheckins() {
    // fetch anonymized stats + recent entries for HR
    try {
      (this.employeeService as any).getAnonymizedCheckins().subscribe(
        (res: any) => {
          try {
            console.debug('anonymized checkins response:', res);
          } catch (e) {}
          const normalizeCount = (value: any) => {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
          };
          const normalizeMood = (value: any) => {
            const mood = (value || '').toString().toLowerCase();
            if (mood === 'happy' || mood === 'very_happy') return 'good';
            if (mood === 'sad' || mood === 'angry') return 'bad';
            return mood || 'unknown';
          };

          this.anonymizedStats = (res.stats || []).map((row: any) => ({
            mood: normalizeMood(row.mood),
            count: normalizeCount(row.count),
          }));
          this.anonymizedRecent = res.recent || [];

          // If stats are empty for today but we have recent entries, compute stats from recent entries
          const statsTotal = (this.anonymizedStats || []).reduce(
            (s: number, r: any) => s + (r.count || 0),
            0,
          );
          if (statsTotal === 0 && this.anonymizedRecent && this.anonymizedRecent.length > 0) {
            const counts: Record<string, number> = {};
            this.anonymizedRecent.forEach((entry: any) => {
              const m = normalizeMood(entry.mood);
              counts[m] = (counts[m] || 0) + 1;
            });
            this.anonymizedStats = Object.keys(this.moodMap).map((m) => ({
              mood: m,
              count: counts[m] || 0,
            }));
          }

          // If still empty, provide default moods with zeros so canvas exists
          if (!this.anonymizedStats || this.anonymizedStats.length === 0) {
            this.anonymizedStats = Object.keys(this.moodMap).map((m) => ({ mood: m, count: 0 }));
          }

          try {
            this.cdr.detectChanges();
          } catch (e) {}
          // render or update chart after data bound
          setTimeout(() => this.renderPieChart(), 0);
        },
        (err: any) => {
          try {
            console.warn('Error loading anonymized checkins:', err && err.status, err && err.error);
          } catch (e) {}
        },
      );
    } catch (e) {
      console.warn('Error calling anonymized checkins:', e);
    }
  }

  private renderPieChart() {
    // First ensure the canvas is in the DOM and ready
    if (!this.pieCanvas || !this.pieCanvas.nativeElement) {
      setTimeout(() => this.renderPieChart(), 50);
      return;
    }

    const canvas = this.pieCanvas.nativeElement;
    // Force canvas to be visible and properly sized
    canvas.style.display = 'block';
    canvas.style.width = '260px';
    canvas.style.height = '260px';

    // Trigger change detection to ensure canvas is rendered
    this.cdr.detectChanges();

    const data = this.chartData;
    const labels = data.map((d: any) => d.label);
    const values = data.map((d: any) => d.count);
    const colors = data.map((d: any) => d.color);

    try {
      console.debug('renderPieChart - labels:', labels, 'values:', values, 'colors:', colors);
    } catch (e) {}

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.debug('Could not get canvas 2d context');
      setTimeout(() => this.renderPieChart(), 50);
      return;
    }

    const total = values.reduce((s: number, v: number) => s + v, 0);

    // If there is no data yet, destroy any existing Chart and draw a placeholder
    if (total === 0) {
      if (this.pieChart) {
        try {
          this.pieChart.destroy();
        } catch (e) {}
        this.pieChart = null;
      }
      try {
        this.drawNoData(ctx, 260, 260);
      } catch (e) {}
      return;
    }

    if (this.pieChart) {
      this.pieChart.data.labels = labels as any;
      this.pieChart.data.datasets = [{ data: values, backgroundColor: colors } as any];
      this.pieChart.update();
      return;
    }

    try {
      console.debug(
        'renderPieChart - ctx:',
        !!ctx,
        this.pieCanvas.nativeElement.width,
        this.pieCanvas.nativeElement.height,
      );
    } catch (e) {}

    try {
      this.pieChart = new Chart(ctx as any, {
        type: 'pie' as ChartType,
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: { boxWidth: 12, padding: 8 },
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    } catch (e) {
      try {
        console.warn('Chart.js pie creation failed, falling back to manual draw:', e);
      } catch (e) {}
      // Fallback: draw simple pie using Canvas API
      try {
        this.drawManualPie(ctx, values, colors);
      } catch (e) {
        try {
          console.error('Manual pie draw failed:', e);
        } catch (e) {}
      }
    }
  }

  private drawNoData(ctx: CanvasRenderingContext2D, width: number, height: number) {
    try {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(cx, cy) - 8;

      // draw light ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#f3f4f6';
      ctx.fill();

      // draw inner circle to create ring effect
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // draw center text
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Inter, system-ui, -apple-system, "Segoe UI", Roboto';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Sin datos', cx, cy);
    } catch (e) {
      // ignore
    }
  }

  private drawManualPie(ctx: CanvasRenderingContext2D, values: number[], colors: string[]) {
    const total = values.reduce((s, v) => s + v, 0);
    const cw = this.pieCanvas.nativeElement.width;
    const ch = this.pieCanvas.nativeElement.height;
    const cx = cw / 2;
    const cy = ch / 2;
    const r = Math.min(cx, cy) - 4;
    let start = -Math.PI / 2;

    ctx.clearRect(0, 0, cw, ch);
    values.forEach((v, i) => {
      const angle = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = colors[i] || '#ccc';
      ctx.fill();
      start += angle;
    });
  }

  selectAnonTab(tab: 'summary' | 'recent') {
    this.selectedAnonTab = tab;
  }

  get totalEmployees(): number {
    return this.originalEmployees.length;
  }

  get presentCount(): number {
    return this.originalEmployees.filter((e) => e.status === 'Presente').length;
  }

  get absentCount(): number {
    return this.originalEmployees.filter((e) => e.status === 'Ausente').length;
  }

  search(event: any) {
    this.searchQuery = (event.target.value || '').toLowerCase();
    if (!this.searchQuery) {
      this.employees = [...this.originalEmployees];
      return;
    }
    this.employees = this.originalEmployees.filter((e) => {
      const name = (e.full_name || '').toLowerCase();
      const email = (e.email || '').toLowerCase();
      return name.includes(this.searchQuery) || email.includes(this.searchQuery);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
