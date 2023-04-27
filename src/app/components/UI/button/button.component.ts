import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() disabled: boolean = false;
  @Input() type: string = "default";
  @Input() top: string = "0px"
  @Input() classOut: string = ""

}
