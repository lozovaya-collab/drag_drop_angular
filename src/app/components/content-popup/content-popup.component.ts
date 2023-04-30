import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-content-popup',
  templateUrl: './content-popup.component.html',
  styleUrls: ['./content-popup.component.scss']
})
export class ContentPopupComponent {
  @Input() task: any;
  @Output() taskChange = new EventEmitter<any>();

  updateTask() {
    this.taskChange.emit(this.task);
  }

  onValueChange(event: any){
    this.task.status_id = +event;
    this.taskChange.emit(this.task);
  }

  onTitleChange(event: any) {
    this.task.title = event;
    this.taskChange.emit(this.task);
  }

  onDescriptionChange(event: any) {
    this.task.description = event;
    this.taskChange.emit(this.task);
  }

  statuses: any[] = [
    {
      id: 1,
      name: "сделать",
    },
    {
      id: 2,
      name: "в процессе",
    },
    {
      id: 3,
      name: "закончено",
    },
  ];


}
