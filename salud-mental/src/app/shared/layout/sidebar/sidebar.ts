import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter, Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit, OnDestroy {
  isClosed = false;
  currentUser: any = null;
  menuItems: MenuItem[] = [];
  private routerSub?: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.initializeMenu();
    this.expandActiveSubmenu();
    
    // Subscribe to route changes to update active state
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.expandActiveSubmenu();
      });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  expandActiveSubmenu() {
    // Auto-expand submenu if it contains the current active route
    // Close all others (accordion behavior)
    this.menuItems.forEach((item) => {
      if (this.isSubmenuActive(item)) {
        item.expanded = true;
      } else if (item.submenu) {
        item.expanded = false;
      }
    });
  }

  initializeMenu() {
    if (this.currentUser?.role === 'HR') {
      // Menú para HR
      this.menuItems = [
        {
          label: 'Dashboard',
          icon: '📊',
          route: '/hr/dashboard',
        },
        {
          label: 'Bandeja de entrada',
          icon: '📥',
          route: '/hr/inbox',
        },
      ];
    } else {
      // Menú para Empleado
      this.menuItems = [
        {
          label: 'Check-in',
          icon: '🧠',
          expanded: true,
          submenu: [
            {
              label: '¿Cómo te sientes hoy?',
              icon: '😊',
              route: '/employee/checkin',
            },
            {
              label: 'Ver resumen reciente',
              icon: '📈',
              route: '/employee/checkin-summary',
            },
          ],
        },
        {
          label: 'Mi Bienestar',
          icon: '💚',
          route: '/employee/wellness',
        },
        {
          label: 'Recursos de apoyo',
          icon: '💬',
          expanded: false,
          submenu: [
            {
              label: 'Contactar RRHH',
              icon: '👔',
              route: '/employee/support/contact-hr',
            },
            {
              label: 'Ayuda Psicológica',
              icon: '🏥',
              route: '/employee/support/psychological',
            },
            {
              label: 'Escribir Cómo Me Siento',
              icon: '✍️',
              route: '/employee/support/write',
            },
          ],
        },
        {
          label: 'Autocuidado',
          icon: '🧘',
          route: '/employee/self-care',
        },
        {
          label: 'Mi Perfil',
          icon: '👤',
          route: '/employee/profile',
        },
      ];
    }
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  toggleSubmenu(item: MenuItem) {
    if (item.submenu) {
      // If opening this submenu, close all others (accordion behavior)
      if (!item.expanded) {
        this.menuItems.forEach((menuItem) => {
          if (menuItem !== item && menuItem.submenu) {
            menuItem.expanded = false;
          }
        });
      }
      item.expanded = !item.expanded;
    }
  }

  isActive(route?: string): boolean {
    return route ? this.router.url.includes(route) : false;
  }

  isSubmenuActive(item: MenuItem): boolean {
    if (!item.submenu) return false;
    // Check if any submenu item's route is active
    return item.submenu.some((subitem) => subitem.route && this.router.url.includes(subitem.route));
  }

  closeAllSubmenus() {
    // Close all submenus when navigating to a main menu item
    this.menuItems.forEach((item) => {
      if (item.submenu) {
        item.expanded = false;
      }
    });
  }
}
