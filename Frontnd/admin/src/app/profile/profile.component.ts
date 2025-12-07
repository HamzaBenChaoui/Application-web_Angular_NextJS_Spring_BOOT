import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: '',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    firstName: '',
    lastName: '',
    email: '',
  };

  isModalOpen = false;
  editSection: string = '';
  editableUser: any = {};
  oldPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  statusMessage = '';

  // Password visibility properties
  showOldPassword = false;
  oldPasswordType = 'password';
  showNewPassword = false;
  newPasswordType = 'password';
  showConfirmNewPassword = false;
  confirmNewPasswordType = 'password';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getConnectedUser().subscribe(data => {
      this.user = {
        ...this.user, // Keep photo and other potential frontend-only fields
        id: data.id,
        email: data.email,
        // Assuming the backend doesn't send these, we clear them or set defaults
        firstName: data.firstName || 'Admin', 
        lastName: data.lastName || 'User'
      };
    });
  }

  edit(section: string) {
    this.editSection = section;
    this.isModalOpen = true;
    this.editableUser = JSON.parse(JSON.stringify(this.user));
    this.statusMessage = '';
    // Reset password fields when opening modal
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

    // Reset password visibility states
    this.showOldPassword = false;
    this.oldPasswordType = 'password';
    this.showNewPassword = false;
    this.newPasswordType = 'password';
    this.showConfirmNewPassword = false;
    this.confirmNewPasswordType = 'password';
  }

  saveChanges() {
    if (this.editSection === 'Personal Information') {
      const adminData = { id: this.editableUser.id, email: this.editableUser.email };
      this.authService.updateAdmin(adminData.id, adminData).subscribe(() => {
        this.loadUserData(); // Reload data to show changes
        this.isModalOpen = false;
      });
    } else if (this.editSection === 'Security') {
      if (this.newPassword !== this.confirmNewPassword) {
        this.statusMessage = "New passwords do not match.";
        return;
      }
      const passwordData = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.authService.changePassword(passwordData).subscribe(
        response => {
          this.statusMessage = 'Password changed successfully';
          this.isModalOpen = false;
        },
        error => {
          this.statusMessage = error.error || 'Failed to change password';
        }
      );
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Toggle password visibility methods
  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
    this.oldPasswordType = this.showOldPassword ? 'text' : 'password';
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
    this.newPasswordType = this.showNewPassword ? 'text' : 'password';
  }

  toggleConfirmNewPasswordVisibility() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
    this.confirmNewPasswordType = this.showConfirmNewPassword ? 'text' : 'password';
  }
}
