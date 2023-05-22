import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiErrorModule,
  ],
})
export class AuthModule {}
