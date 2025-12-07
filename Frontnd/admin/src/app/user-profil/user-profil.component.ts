import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserRoleEnum } from '../models/user.model';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  users: User[] = [];
  userRoles = Object.values(UserRoleEnum);

  showDeleteConfirm: boolean = false;
  selectedUser: User | null = null;

  showAddUserModal: boolean = false;
  newUser: Partial<User> = { role: this.userRoles[0] };

  showEditModal: boolean = false;
  userToEdit: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openAddUserModal() {
    this.newUser = { role: this.userRoles[0] };
    this.showAddUserModal = true;
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.closeAddUserModal();
    });
  }

  openEditModal(user: any) {
    this.userToEdit = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.userToEdit = null;
  }

  saveEdit() {
    if (this.userToEdit && this.userToEdit.id) {
      this.userService.updateUser(this.userToEdit.id, this.userToEdit).subscribe(() => {
        this.loadUsers();
        this.closeEditModal();
      });
    }
  }

  openDeleteModal(user: any) {
    this.selectedUser = user;
    this.showDeleteConfirm = true;
  }

  closeDeleteModal() {
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    if (this.selectedUser && this.selectedUser.id) {
      this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
        this.loadUsers();
        this.closeDeleteModal();
        this.selectedUser = null;
      });
    }
  }
}