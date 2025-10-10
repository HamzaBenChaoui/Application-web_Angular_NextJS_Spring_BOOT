import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfilComponent } from '../user-profil/user-profil.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { CategorieTableComponent } from '../categorie-table/categorie-table.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserProfilComponent,
    ProductTableComponent,
    CategorieTableComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule
  ]
})
export class AdminModule { }
