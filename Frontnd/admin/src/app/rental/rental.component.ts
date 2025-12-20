import { Component, OnInit } from '@angular/core';
import { RentalService } from './rental.service';
import { Rental } from './rental.model';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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

  constructor(
    private rentalService: RentalService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals().pipe(
      switchMap((rentalsFromApi: any[]) => {
        if (!rentalsFromApi || rentalsFromApi.length === 0) {
          return of([]);
        }

        const observables = rentalsFromApi.map(rentalDto => {
          // Intelligently find the product and user IDs
          const productId = rentalDto.product?.id || rentalDto.productId;
          const userId = rentalDto.user?.id || rentalDto.userId;

          if (!productId || !userId) {
            // If we can't find an ID, return an observable with a partial object
            // to prevent the view from breaking.
            return of({ 
              ...rentalDto, 
              product: { nameProducts: 'N/A', image: '' }, 
              user: { nom: 'N/A', email: 'N/A' } 
            });
          }

          const product$ = this.productService.getProductById(productId);
          const user$ = this.userService.getUserById(userId);

          return forkJoin({ product: product$, user: user$ }).pipe(
            map(details => {
              // Now we build the full Rental object that the template expects.
              const fullRental: Rental = {
                id: rentalDto.id,
                startDate: rentalDto.startDate,
                endDate: rentalDto.endDate,
                status: rentalDto.status,
                product: details.product, // Full product object
                user: details.user        // Full user object
              };
              return fullRental;
            })
          );
        });
        return forkJoin(observables);
      })
    ).subscribe({
      next: (fullRentals: Rental[]) => {
        this.rentals = fullRentals;
      },
      error: (err) => {
        console.error('Error loading rental details:', err);
        this.rentals = []; // Clear data on error
      }
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
