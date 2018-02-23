import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Alert} from 'ionic-angular';
import { AlertController, AlertOptions } from 'ionic-angular';
import { LoadingController, LoadingOptions } from 'ionic-angular';
import { StorageService } from '../../providers/storage/storage';
import { ServerService } from '../../providers/server/server';

@IonicPage()
@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  Username : any;

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams, 
    private store : StorageService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private server: ServerService
  ) {}

  async ionViewDidLoad() {
    await this.initializeData();
  }

  async initializeData() {
    const user = await this.store.fetchDoc('loginuser');
    if (user != 'Failed') this.Username = user.username;
  }

  gotoNewPage(pageName) {
    (pageName === 'AccountPage') ? this.accountOpening() : this.navCtrl.push(pageName);
  }

  accountOpening() {
    const alertOptions: AlertOptions = {
      message: 'Enter your password',
      inputs: [
        {
          placeholder: 'Password',
          type: 'password',
          name: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: () => {
            alert.onDidDismiss(async (data) => {
              await this.validatePassword(data);
            });
          }
        }
      ]
    };
    const alert = this.alertCtrl.create(alertOptions);
    alert.present();
  }

  async validatePassword(data) {
    console.log(data);
    const loadingOptions: LoadingOptions = {
      content: 'Authenticating...'
    };
    const loader = this.loadingCtrl.create(loadingOptions);
    loader.present();
  }

}
