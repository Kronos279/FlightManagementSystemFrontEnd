import { Component } from '@angular/core';
import { SearchFlightComponent } from "../search-flight/search-flight.component";
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [RouterOutlet, SearchFlightComponent, ReactiveFormsModule, FormsModule]
})
export class HomeComponent {
  // products:Product[]=[];
  // productService = inject(ProductsService);


  // filteredProducts:Product[]=[];
  // ngOnInit(){
  //   this.productService.getProducts().subscribe((res) => {this.products = res as any[]})
  //   this.filteredProducts=this.products;
  // }
  // onView(event:Product["id"]){

  //   console.log("Product Id:- "+event)
  // }

  // onSearch(search:string){
  //   if(search.length){
  //     this.filteredProducts=this.products.filter(x=>x.name.toLowerCase().includes(search.toLowerCase()))
  //   }
  //   else{
  //     this.ngOnInit()
  //   }
  // }
}
