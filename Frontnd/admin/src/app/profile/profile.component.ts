import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
    job: 'Team Manager',
    location: 'Arizona, United States',
    country: 'United States',
    city: 'Phoenix, Arizona, United States',
    postalCode: 'ERT 2489',
    taxId: 'AS4568384',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#'
    }
  };

  isModalOpen = false;
  editSection: string = '';
  editableUser: any = {};

  edit(section: string) {
    this.editSection = section;
    this.isModalOpen = true;
    // Clone des données de l'utilisateur
    this.editableUser = JSON.parse(JSON.stringify(this.user));
  }

  saveChanges() {
    this.user = { ...this.editableUser };
    this.isModalOpen = false;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
