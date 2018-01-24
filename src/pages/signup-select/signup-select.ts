import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from "../signup/signup";

/**
 * Generated class for the SignupSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-select',
  templateUrl: 'signup-select.html',
})
export class SignupSelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  clickCustomer() {
    this.navCtrl.push(SignupPage, {
      isRestaurant: false
    });
  }

  clickRestaurant() {
    this.navCtrl.push(SignupPage, {
      isRestaurant: true
    });
  }
}
