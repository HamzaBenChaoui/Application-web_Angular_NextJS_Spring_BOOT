import { Component } from '@angular/core';

export interface Category {
  name: string;
  description: string;
}

@Component({
  selector: 'app-categorie-table',
  templateUrl: './categorie-table.component.html',
  styleUrls: ['./categorie-table.component.css']
})
export class CategorieTableComponent {
  showModal = false;
  isEditMode = false;
  categories: Category[] = [
    { name: 'Furniture', description: 'Tables, chairs, and sofas' },
    { name: 'Lighting', description: 'Lamps, bulbs, and chandeliers' },
    { name: 'Decor', description: 'Wall art and decorative pieces' }
  ];
  editedCategory: Category = { name: '', description: '' };
  categoryToEdit: Category | null = null;

  openAddModal() {
    this.isEditMode = false;
    this.editedCategory = { name: '', description: '' };
    this.showModal = true;
  }

  openEditModal(category: Category) {
    this.isEditMode = true;
    this.categoryToEdit = category;
    this.editedCategory = { ...category };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.categoryToEdit = null;
  }

  saveCategory() {
    if (this.isEditMode && this.categoryToEdit) {
      // Update existing category
      const index = this.categories.findIndex(c => c === this.categoryToEdit);
      if (index !== -1) {
        this.categories[index] = this.editedCategory;
      }
    } else {
      // Add new category
      this.categories.push(this.editedCategory);
    }
    this.closeModal();
  }
}
