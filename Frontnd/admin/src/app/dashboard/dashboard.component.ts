import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductService } from '../product.service';
import { CategorieService } from '../Categorie.service';
import { RentalService } from '../rental/rental.service';
import { UserService } from '../user.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  // Stats
  productCount = 0;
  categoryCount = 0;
  userCount = 0;
  rentalCount = 0;

  constructor(
    private productService: ProductService,
    private categorieService: CategorieService,
    private rentalService: RentalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categorieService.getCategory(),
      rentals: this.rentalService.getRentals(),
      users: this.userService.getUsers()
    }).subscribe(({ products, categories, rentals, users }) => {
      // Set counts for summary cards
      this.productCount = products.length;
      this.categoryCount = categories.length;
      this.rentalCount = rentals.length;
      this.userCount = users.length;

      // Prepare chart data
      this.prepareProductsPerCategoryChart(products, categories);
      this.prepareRentalsByStatusChart(rentals);
    });
  }

  // Bar Chart: Products per Category
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { x: {}, y: { min: 0 } },
    plugins: { legend: { display: true, position: 'top' } },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Products per Category' }]
  };

  private prepareProductsPerCategoryChart(products: any[], categories: any[]): void {
    const categoryLabels = categories.map(c => c.name);
    const categoryCounts = categoryLabels.map(label => {
      const category = categories.find(c => c.name === label);
      return products.filter(p => p.category?.id === category.id).length;
    });

    this.barChartData = {
      labels: categoryLabels,
      datasets: [{
        data: categoryCounts,
        label: 'Products per Category',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
  }

  // Doughnut Chart: Rentals by Status
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true, position: 'top' } }
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  private prepareRentalsByStatusChart(rentals: any[]): void {
    const statusCounts: { [status: string]: number } = {};
    rentals.forEach(rental => {
      statusCounts[rental.status] = (statusCounts[rental.status] || 0) + 1;
    });
    
    this.doughnutChartData = {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ]
      }]
    };
  }
}
