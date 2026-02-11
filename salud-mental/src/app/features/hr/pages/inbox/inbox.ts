import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportService, SupportRequestResponse } from '../../../../core/services/support.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-hr-inbox',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inbox.html',
  styleUrls: ['./inbox.css'],
})
export class HrInbox implements OnInit, OnDestroy {
  requests: SupportRequestResponse[] = [];
  selected: SupportRequestResponse | null = null;
  loading = false;
  error: string | null = null;
  private navSub?: Subscription;

  constructor(
    private support: SupportService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadRequests();
    this.navSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/hr/inbox')) {
          this.loadRequests();
        }
      });
  }

  ngOnDestroy() {
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
  }

  loadRequests() {
    this.loading = true;
    this.error = null;
    this.support.getAllRequests().subscribe(
      (res) => {
        this.requests = res || [];
        this.loading = false;
        // Ensure view updates with loaded requests
        this.cdr.detectChanges();
      },
      (err) => {
        console.warn('Error loading support requests:', err);
        this.error = 'Error al cargar mensajes';
        this.loading = false;
        // Ensure view updates with error message
        this.cdr.detectChanges();
      },
    );
  }

  openRequest(r: SupportRequestResponse) {
    this.selected = r;
  }

  markResolved(id: number) {
    // Delete the request when HR marks it resolved
    this.support.deleteRequest(id).subscribe(
      () => {
        // Refresh the list from server so UI is in sync
        this.selected = null;
        this.loadRequests();
      },
      (err) => console.warn('Error deleting support request:', err),
    );
  }
}
