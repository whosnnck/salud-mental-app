import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h1>Mi Perfil</h1>

      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar">👤</div>
          <div class="user-info">
            <h2>{{ getDisplayName() }}</h2>
            <p class="email">{{ getDisplayEmail() }}</p>
            <p class="role-badge">{{ getRoleLabel() }}</p>
          </div>
        </div>

        <div class="profile-details">
          <h3>Información Personal</h3>
          <div class="detail-row">
            <span class="label">Nombre:</span>
            <span class="value">{{ getDisplayName() }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">{{ getDisplayEmail() }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Rol:</span>
            <span class="value">{{ getRoleLabel() }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Departamento:</span>
            <span class="value">{{ getDisplayDepartment() }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        padding: 20px;
        max-width: 600px;
      }

      h1 {
        color: #2e7d32;
        margin-bottom: 20px;
      }

      .profile-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .profile-header {
        background: linear-gradient(90deg, #4caf50, #42a5f5);
        color: white;
        padding: 30px 20px;
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .avatar {
        font-size: 60px;
        background: rgba(255, 255, 255, 0.2);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-info {
        flex: 1;
      }

      .user-info h2 {
        margin: 0 0 5px 0;
        font-size: 24px;
      }

      .email {
        margin: 0;
        opacity: 0.9;
      }

      .role-badge {
        margin: 5px 0 0 0;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }

      .profile-details {
        padding: 30px 20px;
        border-bottom: 1px solid #eee;
      }

      .profile-details h3 {
        color: #2e7d32;
        margin-top: 0;
      }

      .detail-row {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .label {
        font-weight: 600;
        color: #666;
        min-width: 120px;
      }

      .value {
        color: #333;
      }
    `,
  ],
})
export class ProfileComponent {
  currentUser: any = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  getRoleLabel(): string {
    return this.currentUser?.role === 'HR' ? 'Recursos Humanos' : 'Empleado';
  }

  getDisplayName(): string {
    return this.currentUser?.full_name || this.currentUser?.name || 'Usuario';
  }

  getDisplayEmail(): string {
    return this.currentUser?.email || 'N/A';
  }

  getDisplayDepartment(): string {
    return this.currentUser?.department || '-';
  }
}
