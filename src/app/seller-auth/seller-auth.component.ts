import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  signUpForm!: FormGroup

  constructor(private seller: SellerService,private formBuilder : FormBuilder) { }
  showLogin= false;
  authError:string='';
  ngOnInit(): void{
    this.seller.reloadSeller();

    this.signUpForm = this.formBuilder.group({
        name: ['',Validators.required],
        email: ['', Validators.required],
        password:['', Validators.required]
      
    })
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
