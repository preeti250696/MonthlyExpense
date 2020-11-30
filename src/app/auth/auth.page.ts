import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = false;
  form:FormGroup;
  constructor( private authService:AuthService, private loadingCtrl:LoadingController, private alertCtrl:AlertController, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn:'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn:'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    })
  }

  switchAction(){
    this.isLogin = !this.isLogin
  }
  authenticate(){
    if(!this.form.valid){
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    if(this.isLogin){
      this.loadingCtrl.create({
        message:'Logging in'
      }).then(loadingEl =>{
        loadingEl.present();
        
        this.authService.signIn(email,password).subscribe(()=>{
          loadingEl.dismiss();
          this.router.navigate(['/departments']);
        }, error =>{
          loadingEl.dismiss();
           this.showAlert();
        })
      })
    } else{
      this.loadingCtrl.create({
        message:'Creating user'
      }).then(loadingEl =>{
        loadingEl.present();

        this.authService.signup(email,password).subscribe(()=>{
          loadingEl.dismiss();
          this.router.navigate(['/departments']);
        }, error =>{
          loadingEl.dismiss();
           this.showAlert();
        })
      })
       
    }
  } 
  showAlert(){
   this.alertCtrl.create({
     header:'Authentication Failed',
     message:'Something went wrong',
     buttons: ['Okay']
   }).then( alertEl =>{
     alertEl.present();
   })
  }
}
