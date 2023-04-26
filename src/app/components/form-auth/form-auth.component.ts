import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormAuthComponent),
      multi: true,
    }
  ]
})
export class FormAuthComponent {
  @Input() user: any = { login: "", password: "" };

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    if (value) {
      this.user = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
