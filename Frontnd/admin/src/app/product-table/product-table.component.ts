import { Component } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent {
  products = [
    { name: 'Product 1', price: 100, stock: 10 },
    { name: 'Product 2', price: 200, stock: 5 },
    { name: 'Product 3', price: 150, stock: 8 },
  ];

  showDeleteConfirm: boolean = false;
  selectedProduct: any = null;

  // Nouveau : modal pour ajouter produit
  showAddProductModal: boolean = false;

  // États pour le modal de modification
  showEditModal: boolean = false;
  productToEdit: any = null;

  // Ouvrir modal ajouter produit
  openAddProductModal() {
    this.showAddProductModal = true;
  }

  // Fermer modal ajouter produit
  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  // Ouvrir le modal de modification
  openEditModal(product: any) {
    this.productToEdit = { ...product }; // Crée une copie pour éviter la liaison de données bidirectionnelle non désirée
    this.showEditModal = true;
  }

  // Fermer le modal de modification
  closeEditModal() {
    this.showEditModal = false;
    this.productToEdit = null;
  }

  // Sauvegarder les modifications
  saveEdit() {
    if (this.productToEdit) {
      const index = this.products.findIndex(p => p.name === this.productToEdit.name); // Simple find by name
      if (index !== -1) {
        this.products[index] = this.productToEdit;
      }
      this.closeEditModal();
    }
  }

  // 🗑️ Modal suppression
  openDeleteModal(product: any) {
    this.selectedProduct = product;
    this.showDeleteConfirm = true;
  }

  closeDeleteModal() {
    this.showDeleteConfirm = false;
  }

  confirmDelete() {
    if (this.selectedProduct) {
      this.products = this.products.filter((p) => p !== this.selectedProduct);
      this.showDeleteConfirm = false;
      this.selectedProduct = null;
    }
  }
}
