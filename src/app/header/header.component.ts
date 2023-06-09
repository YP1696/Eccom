import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string='default';
  sellerName: string ='';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        console.warn(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.warn('this is seller area');
          this.menuType='seller'
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData = localStorage && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        }else{
          console.warn('Outside the seller area');
          this.menuType='default'
        }
      }
    });
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
