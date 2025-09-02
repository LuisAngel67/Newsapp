import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/modules/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/modules/shared/components/button/button.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    UserFormComponent,
    CardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    UserFormComponent,
    CardComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
