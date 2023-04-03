import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: string) {
    return this.http
      .post("http://localhost:3000/seller", data, { observe: "response" })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem("seller", JSON.stringify(result.body));
          this.router.navigate(["seller-home"]);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem("seller")) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(["seller-home"]);
    }
  }

  userLogin(data: any){
 this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{ observe: "response" })
    .subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length===1) {
        // this.isSellerLoggedIn.next(true);        
        this.isLoginError.emit(false)
        localStorage.setItem("seller", JSON.stringify(result.body));
        this.router.navigate(["seller-home"]);
      }else{
        console.warn("login failed");
        this.isLoginError.emit(true)
      }
    });
    
  }
}
