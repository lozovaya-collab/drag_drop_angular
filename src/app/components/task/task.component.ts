import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements DoCheck {
  @Input() task: any;
  @Input() index: number = 0;
  @Input() userLogin: any;

  public top: string = "0px";
  public src: string = '../../../assets/images/delete.png';

  ngOnInit(): void {
    this.top = this.index * 40 + "px";
  }

  ngDoCheck(): void {
     this.top = this.index * 40 + "px";
  }
}
