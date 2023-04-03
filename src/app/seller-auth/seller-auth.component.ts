import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService,) { }
  showLogin= false;
  authError:string='';
  ngOnInit(): void{
    this.seller.reloadSeller()
  }

  signUp(data: string ): void{
    console.warn(data);
    this.seller.userSignUp(data)  
  }
  logIn(data ): void{
    // console.warn(data);
    this.authError="";
    this.seller.userLogin(data);
    this.seller.isLoginError
      .subscribe((isError)=>{
        if(isError){
          this.authError='Email or password is not correct'
        }
      });
    
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }

}
