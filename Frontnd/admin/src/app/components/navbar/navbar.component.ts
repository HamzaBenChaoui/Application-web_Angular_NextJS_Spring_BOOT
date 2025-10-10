import { Component, OnInit, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[] = [];
    location: Location;
    isDarkMode = false;
    isOpen = false;

    constructor(
      location: Location,
      private element: ElementRef,
      private router: Router,
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private sidebarService: SidebarService
    ) {
      this.location = location;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
    }

    toggleSidebar() {
      this.sidebarService.toggleSidebar();
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        this.renderer.addClass(this.document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(this.document.documentElement, 'dark');
      }
    }

    toggleDropdown() {
      this.isOpen = !this.isOpen;
    }

    closeDropdown() {
      this.isOpen = false;
    }
}
