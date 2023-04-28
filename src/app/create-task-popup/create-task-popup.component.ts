import { Component, Input, Output, EventEmitter } from '@angular/core';
import { apiService } from '../../shared/api/swagger/swagger';

@Component({
  selector: 'app-create-task-popup',
  templateUrl: './create-task-popup.component.html',
  styleUrls: ['./create-task-popup.component.scss']
})
export class CreateTaskPopupComponent {
  @Input() isOpen: boolean = false;
  @Input() statusId: any;
  @Input() tasks: any[] = [];

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() tasksChange = new EventEmitter<any[]>();

  public task = {
    status_id: '',
    title: '',
    description: ''
  };
  closePopup() {
    this.isOpenChange.emit(false);
  }

  saveTask() {
    apiService.tasks.Create({
      status_id: +this.task.status_id,
      title: this.task.title,
      description: this.task.description
    }).then(() => {
      apiService.tasks.Get().then((res) => {
        this.tasksChange.emit(res.data);
      }).then(() => {
        this.closePopup();
      });
    });
  }



  updateTask(value: any) {
    this.task = { ...this.task, ...value };
  }

  titleElement() {
    return `создать задачу`;
  }

  contentElement() {
    return `
      <h1>eooeoeoeoeoeoe</h1>
    `;
  }

  actionsElement() {
    return `
      <app-button (click)="closePopup()" type="text">ОТМЕНА</app-button>
      <app-button (click)="saveTask()">СОХРАНИТЬ</app-button>
    `;
  }
}
