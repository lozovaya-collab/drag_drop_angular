import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { apiService } from 'src/shared/api/swagger/swagger';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: [],
})
export class MainHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    apiService.logout.Logout();

    localStorage.removeItem('user');

    this.router.navigateByUrl('/auth');
  }
}
