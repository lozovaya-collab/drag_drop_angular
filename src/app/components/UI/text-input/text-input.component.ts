import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    }
  ]
})
export class TextInputComponent {
  @Input() type: string = "default";
  @Input() placeholder: string = "";
  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();
}
