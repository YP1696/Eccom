import { product } from 'src/data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  popularProducts: undefined | product[]
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private product: ProductService) { }

  

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts=data;
    })
  }
}
