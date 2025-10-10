import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { CategorieTableComponent } from './categorie-table/categorie-table.component';
import { SigninComponent } from './signin/signin.component';

import { AdminModule } from './layouts/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
