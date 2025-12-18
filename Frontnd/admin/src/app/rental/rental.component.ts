import { Component, OnInit } from '@angular/core';
import { RentalService } from './rental.service';
import { Rental } from './rental.model';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentalToEdit: Rental | null = null;
  showEditModal = false;
  showDeleteConfirm = false;
  selectedRental: Rental | null = null;

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe(data => {
      this.rentals = data;
    });
  }

  openEditModal(rental: Rental): void {
    this.rentalToEdit = { ...rental };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.rentalToEdit = null;
  }

  saveEdit(): void {
    if (this.rentalToEdit) {
      this.rentalService.updateRental(this.rentalToEdit.id, this.rentalToEdit).subscribe(() => {
        this.loadRentals();
        this.closeEditModal();
      });
    }
  }

  openDeleteModal(rental: Rental): void {
    this.selectedRental = rental;
    this.showDeleteConfirm = true;
  }

  closeDeleteModal(): void {
    this.showDeleteConfirm = false;
    this.selectedRental = null;
  }

  confirmDelete(): void {
    if (this.selectedRental) {
      this.rentalService.deleteRental(this.selectedRental.id).subscribe(() => {
        this.loadRentals();
        this.closeDeleteModal();
      });
    }
  }
}
