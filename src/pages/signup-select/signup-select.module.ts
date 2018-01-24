import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupSelectPage } from './signup-select';

@NgModule({
  declarations: [
    SignupSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupSelectPage),
  ],
})
export class SignupSelectPageModule {}
