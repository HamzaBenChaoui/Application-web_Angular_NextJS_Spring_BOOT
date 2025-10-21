import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { CategorieTableComponent } from './categorie-table/categorie-table.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';

import { AdminComponent } from './layouts/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  {
    path: 'admin', // All admin pages will be under /admin
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default admin page
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-profile', component: UserProfilComponent },
      { path: 'product-table', component: ProductTableComponent },
      { path: 'categorie-table', component: CategorieTableComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  // Optional: Redirect any other path to signin
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
