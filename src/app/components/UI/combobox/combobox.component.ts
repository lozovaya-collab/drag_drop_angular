import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent {
  @Input() value = -1;
  @Input() list: Option[] = [];

  @Output() valueChange = new EventEmitter<any>();

  defaultOption: Option = {
    id: -1,
    name: "Выберите один из вариантов",
  };
}
