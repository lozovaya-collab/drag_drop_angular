import { Component, Input, Output, OnInit, EventEmitter, DoCheck} from '@angular/core';
import { apiService } from 'src/shared/api/swagger/swagger';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: []
})


export class DeskComponent implements OnInit,  DoCheck{
  @Input() title: string = "";
  @Input() statusID: number = 0;
  @Input() tasks: any[] = []; // or create an interface for the task object and use that type instead
  @Input() users: any[] = []; // same as above, or import the User type from your ApiService

  @Output() tasksChange = new EventEmitter<any[]>();
  @Output() usersChange = new EventEmitter<any[]>();

  public filteredTasks: any[] = [];
  public currTask: any = null;
  public selectedStatus: any;
  public selectedTaskId: any;

  localUser = localStorage.getItem('user');

  currentUser: any;

  ngOnInit() {
      const userFromStorage = localStorage.getItem('user');
      if (userFromStorage) {
          this.currentUser = JSON.parse(userFromStorage);
      } else {
          this.currentUser = null; // or ''
      }

    this.filteredTasks = this.tasks.filter(task => task.status_id === this.statusID);
  }

  ngDoCheck() {
    this.filteredTasks = this.tasks.filter(task => task.status_id === this.statusID);
  }


  openCreateTask(statusId: number) {
    this.selectedStatus = statusId;
    this.selectedTaskId = null;
  }

  openEditPopup(event: any) {
    this.selectedStatus = null;
    this.selectedTaskId = event.detail.id;
  }

  deleteTask(event: any) {
    const id = event.detail.id;

    if (id) {
      apiService.tasks.Delete(id).then(() => {
        apiService.tasks.Get().then((res) => {
          this.tasks = res.data;
        });
      });
    }
  }

  onDragStart(event: DragEvent, task: any) {
    if(event.dataTransfer)
    {
      event.dataTransfer.dropEffect = 'none';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('taskId', task.id.toString());
    }
  }

  onDragOver(task: any, event: any) {
    this.currTask = task;
  }

  onDragOverPrevent(event: DragEvent) {
    event.preventDefault();

  }

onDragEnterPrevent(event: DragEvent) {
  event.preventDefault();
}

  onDrop(event: any, statusId: number) {
    event.dataTransfer.dropEffect = 'move';
    const taskId = parseInt(event.dataTransfer.getData('taskId'));
    let arr = [...this.tasks]
    arr = arr.map((x) => {
      if (x.id == taskId) {
        this.addTaskToArray(this.currTask, x, this.tasks);
        x.status_id = statusId;

        apiService.tasks.Update(x.id, {
          status_id: x.status_id,
          description: x.description,
          title: x.title,
        });

      }
      return x;
    });
    this.tasksChange.emit(arr);
  }

  addTaskToArray(inputTask: any, pointerTask: any, arr: any[]) {
    const index = arr.findIndex((el) => el.id === pointerTask.id);

    return index !== -1
      ? [...arr.slice(0, index + 1), inputTask, ...arr.slice(index + 1 )]
      : arr;
  }

  getUserLogin(task: any) {
    if (task.author_id === this.currentUser.id) {
      return -1;
    } else if (this.users.find((item) => item.id === task.author_id)) {
      return this.users.find((item) => item.id === task.author_id).login;
    }
    return null;
  }

  getTaskIndex(taskId: number): number {
    return this.filteredTasks.findIndex(task => task.id === taskId);
  }


  get height() {
    return (
      82 +
      (this.tasks.filter((item) => item.status_id === this.statusID).length - 1) *
        42 +
      42 +
      'px'
    );
  }

  get top() {
    return (
      this.tasks.filter((item) => item.status_id === this.statusID).length * 40 +
      'px'
    );
  }




}
