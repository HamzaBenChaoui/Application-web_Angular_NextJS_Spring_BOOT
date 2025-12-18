import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SigninComponent } from './signin/signin.component';
import { AdminModule } from './layouts/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { ProductService } from './product.service';
import { JwtInterceptor } from './jwt.interceptor'; // Import the interceptor
import { RentalComponent } from './rental/rental.component';
import { RentalService } from './rental/rental.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProfileComponent,
    RentalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    AdminModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
    RentalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // Provide the interceptor
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
