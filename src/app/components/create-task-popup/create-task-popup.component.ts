import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { apiService } from '../../../shared/api/swagger/swagger';

@Component({
  selector: 'app-create-task-popup',
  templateUrl: './create-task-popup.component.html',
  styleUrls: ['./create-task-popup.component.scss']
})
export class CreateTaskPopupComponent implements DoCheck {
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

  ngDoCheck(): void {
    if (this.statusId && !this.task.status_id) {
      this.task = {
        status_id: this.statusId,
        title: '',
        description: ''
      }
    }
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



  updateTask(updatedTask: any) {
    this.task = updatedTask; // Update the task object with the updated task
  }

  titleElement() {
    return `создать задачу`;
  }
}
