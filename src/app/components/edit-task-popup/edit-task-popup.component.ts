import { Component, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { apiService } from '../../../shared/api/swagger/swagger';


@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss']
})
export class EditTaskPopupComponent implements DoCheck {
  @Input() isOpen: boolean = false;
  @Input() taskId: any;
  @Input() tasks: any[] = [];
  @Input() user: any;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() tasksChange = new EventEmitter<any[]>();

  public task: any = {
    status_id: 0,
    title: '',
    description: ''
  };

  closePopup() {
    this.isOpenChange.emit(false);
  }

  ngDoCheck(): void {
    if (this.taskId && !this.task.status_id) {
      apiService.tasks.GetById(this.taskId).then(res => {
        this.task = res.data;
      });
    }
  }


  saveTask() {
    apiService.tasks
            .Update(this.task.id, {
                status_id: this.task.status_id,
                description: this.task.description,
                title: this.task.title,
            })
            .then(() => {
                apiService.tasks
                    .Get()
                    .then((res) => {
                      this.tasksChange.emit(res.data);
                    })
                    .then(() => {
                      this.closePopup();
                    });
            });
  }



  updateTask(updatedTask: any) {
    this.task = updatedTask; // Update the task object with the updated task
  }

  titleElement() {
    return `редактировать задачу`;
  }
}

