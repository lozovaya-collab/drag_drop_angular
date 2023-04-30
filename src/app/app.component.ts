import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { apiService } from 'src/shared/api/swagger/swagger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.checkUser();
  }

  async checkUser() {
    try {
      const res = await apiService.me.Me();
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err: any) {
      console.log('Error:', err.message);
      if (err.response.status === 401) {
        this.router.navigate(['/auth']);
      }
    }
  }

  public isAuth() {
    return this.location.path() !== '/auth';
  }
}
