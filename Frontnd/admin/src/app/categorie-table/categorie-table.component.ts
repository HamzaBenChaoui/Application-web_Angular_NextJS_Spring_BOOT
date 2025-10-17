import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie-table',
  templateUrl: './categorie-table.component.html',
  styleUrls: ['./categorie-table.component.css'],
})
export class CategorieTableComponent {
  // ✅ Données de test
  categories = [
    { name: 'Furniture', description: 'Tables, chairs, and sofas' },
    { name: 'Lighting', description: 'Lamps and bulbs' },
    { name: 'Decor', description: 'Wall art and plants' },
  ];

  // ✅ États pour les modals
  showModal: boolean = false;
  showDeleteConfirm: boolean = false;
  showEditModal: boolean = false; // Ajout pour le modal de modification

  // ✅ Variables pour ajout/édition
  newCategoryName: string = '';
  newCategoryDescription: string = '';
  categoryToEdit: any = null; // Ajout pour la catégorie en cours de modification

  // ✅ Catégorie sélectionnée pour suppression
  selectedCategory: any = null;

  // --- 📦 Fonctions pour le modal d’ajout ---
  openAddModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newCategoryName = '';
    this.newCategoryDescription = '';
  }

  saveCategory() {
    if (this.newCategoryName.trim()) {
      this.categories.push({
        name: this.newCategoryName,
        description: this.newCategoryDescription,
      });
      this.closeModal();
    }
  }

  // --- ✏️ Fonctions pour le modal de modification ---
  openEditModal(category: any) {
    this.categoryToEdit = { ...category }; // Crée une copie
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.categoryToEdit = null;
  }

  saveEdit() {
    if (this.categoryToEdit) {
      const index = this.categories.findIndex(c => c.name === this.categoryToEdit.name);
      if (index !== -1) {
        this.categories[index] = this.categoryToEdit;
      }
      this.closeEditModal();
    }
  }

  // --- 🗑️ Fonctions pour le modal de suppression ---
  openDeleteModal(category: any) {
    this.selectedCategory = category;
    this.showDeleteConfirm = true;
  }

  closeDeleteModal() {
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    if (this.selectedCategory) {
      this.categories = this.categories.filter(
        (c) => c !== this.selectedCategory
      );
      this.showDeleteConfirm = false;
      this.selectedCategory = null;
    }
  }
}
