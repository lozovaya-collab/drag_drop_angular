import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/shared/api/swagger/swagger';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements  OnInit {

  public statuses = [
    {
      id: 1,
      name: 'сделать',
    },
    {
      id: 2,
      name: 'в процессе',
    },
    {
      id: 3,
      name: 'закончено',
    },
  ];
  public tasks: any = [];
  public users: any = [];

  onTasksChange(tasks: any[]) {
    this.tasks = tasks;
  }

  onUsersChange(users: any[]) {
    this.users = users;
  }

  ngOnInit() {
    apiService.tasks.Get().then((res) => {
      this.tasks = res.data;
    });

    apiService.users.Get().then((res) => {
      this.users = res.data;
    });
  }
}
