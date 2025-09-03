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
import { SelectComponent } from './components/select/select.component';
import { PrincipalNewsComponent } from './components/principal-news/principal-news.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    UserFormComponent,
    CardComponent,
    ModalComponent,
    SelectComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SidebarComponent,
    ListComponent,
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
    SelectComponent,
    PrincipalNewsComponent,
    HeaderComponent,
    SidebarComponent,
    ListComponent,
  ],
})
export class SharedModule {}
