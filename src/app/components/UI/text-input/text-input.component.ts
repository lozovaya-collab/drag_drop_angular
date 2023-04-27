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
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  updateValue(target: any) {
    const inputValue = target.value;

    if (inputValue !== this.value) {
      this.value = inputValue;
      this.onChange(inputValue);
      this.onTouched();
      this.valueChange.emit(inputValue);
    }
  }
}
