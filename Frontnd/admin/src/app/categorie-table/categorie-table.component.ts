import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../Categorie.service';

@Component({
  selector: 'app-categorie-table',
  templateUrl: './categorie-table.component.html',
  styleUrls: ['./categorie-table.component.css'],
})

export class CategorieTableComponent implements OnInit  {
  categories: any[] = [];

  showDeleteConfirm: boolean = false;
  selectedCategory: any = null;

  // Nouveau : modal pour ajouter produit
  showAddCategoryModal: boolean = false;
  newCategory: any = {};

  // États pour le modal de modification
  showEditModal: boolean = false;
  categoryToEdit: any = null;

  constructor(private CategorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.CategorieService.getCategory().subscribe(data => {
      this.categories = data;
    });
  }

  // Ouvrir modal ajouter produit
  openAddCategoryModal() {
    this.newCategory = {};
    this.showAddCategoryModal = true;
  }

  // Fermer modal ajouter produit
  closeAddCategoryModal() {
    this.showAddCategoryModal = false;
  }

  addCategory(): void {
    this.CategorieService.addCategory(this.newCategory).subscribe(() => {
      this.loadCategory();
      this.closeAddCategoryModal();
    });
  }

  // Ouvrir le modal de modification
  openEditModal(product: any) {
    this.categoryToEdit = { ...product }; // Crée une copie pour éviter la liaison de données bidirectionnelle non désirée
    this.showEditModal = true;
  }

  // Fermer le modal de modification
  closeEditModal() {
    this.showEditModal = false;
    this.categoryToEdit = null;
  }

  // Sauvegarder les modifications
  saveEdit() {
    if (this.categoryToEdit) {
      this.CategorieService.updateCategory(this.categoryToEdit.id, this.categoryToEdit).subscribe(() => {
        this.loadCategory();
        this.closeEditModal();
      });
    }
  }

  // 🗑️ Modal suppression
  openDeleteModal(product: any) {
    this.selectedCategory = product;
    this.showDeleteConfirm = true;
  }

  closeDeleteModal() {
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    if (this.selectedCategory) {
      this.CategorieService.deleteCategory(this.selectedCategory.id).subscribe(() => {
        this.loadCategory();
        this.closeDeleteModal();
        this.selectedCategory = null;
      });
    }
  }
}
