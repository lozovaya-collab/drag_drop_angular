import { Component, Input, Output, DoCheck, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements DoCheck {
  @Input() task: any;
  @Input() index: number = 0;
  @Input() userLogin: any;
  @Output() deleteTask = new EventEmitter<number | null>();
  @Output() edit = new EventEmitter<number>();


  public top: string = "0px";
  public src: string = '../../../assets/images/delete.png';

  onDelete(id: number | null) {
    this.deleteTask.emit(id);
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  ngOnInit(): void {
    this.top = this.index * 40 + "px";
  }

  ngDoCheck(): void {
     this.top = this.index * 40 + "px";
  }
}
