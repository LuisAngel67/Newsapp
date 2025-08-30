import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [InputComponent, ButtonComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [InputComponent, ButtonComponent],
})
export class SharedModule {}
