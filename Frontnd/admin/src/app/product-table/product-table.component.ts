import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];

  showDeleteConfirm: boolean = false;
  selectedProduct: any = null;

  // Nouveau : modal pour ajouter produit
  showAddProductModal: boolean = false;
  newProduct: any = {};

  // États pour le modal de modification
  showEditModal: boolean = false;
  productToEdit: any = null;
  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
 onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // When a file is selected, clear the image URL.
      if (this.showAddProductModal) {
        this.newProduct.image = '';
      }
      if (this.showEditModal) {
        this.productToEdit.image = '';
      }
    }
  }
  // Ouvrir modal ajouter produit
  openAddProductModal() {
    this.newProduct = {};
    this.selectedFile = null; // Reset selected file on opening add modal
    this.showAddProductModal = true;
  }

  // Fermer modal ajouter produit
  closeAddProductModal() {
    this.showAddProductModal = false;
    this.selectedFile = null; // Reset selected file on closing add modal
  }

  addProduct(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    
    // Convert product object to a JSON string and append it as a single part
    formData.append('product', JSON.stringify(this.newProduct));
    
    this.productService.addProduct(formData).subscribe(() => {
      this.loadProducts();
      this.closeAddProductModal();
    });
  }

  // Ouvrir le modal de modification
  openEditModal(product: any) {
    this.productToEdit = { ...product }; // Crée une copie pour éviter la liaison de données bidirectionnelle non désirée
    this.selectedFile = null; // Reset selected file on opening edit modal
    this.showEditModal = true;
  }

  // Fermer le modal de modification
  closeEditModal() {
    this.showEditModal = false;
    this.productToEdit = null;
    this.selectedFile = null; // Reset selected file on closing edit modal
  }

  // Sauvegarder les modifications
  saveEdit() {
    if (this.productToEdit) {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      }
      
      // Append product data as a single JSON string
      formData.append('product', JSON.stringify(this.productToEdit));
      
      this.productService.updateProduct(this.productToEdit.id, formData).subscribe(() => {
        this.loadProducts();
        this.closeEditModal();
      });
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
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(() => {
        this.loadProducts();
        this.closeDeleteModal();
        this.selectedProduct = null;
      });
    }
  }
}
