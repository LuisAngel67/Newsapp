import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: any[] = [];

  value: any = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(event: any) {
    const selected = event.detail?.value ?? '';
    this.value = selected;
    this.onChange(selected);
    this.onTouched();
  }
}
