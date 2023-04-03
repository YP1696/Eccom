import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/data-type';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  constructor( private product:ProductService) { }
  productList: undefined |product[];
  productMessage: undefined | string;
  // icon = faTrash;

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:number){
    console.log("test id",id);

    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is Deleted"
        this.list();
      }
    })

    setTimeout(()=>{
      this.productMessage =undefined
    },3000);
  }

  list(){
    this.product.allProductList()
      .subscribe((result) =>{
        if(result){
          this.productList= result;
        }
      });

  }

}


