import { Component, OnInit } from '@angular/core';
import { LinkItemsService } from 'src/app/services/link-items.service';
import { HttpBackend } from '@angular/common/http';
import {Product} from '../../../types/Products'
import { Ingredient } from 'src/app/types/Ingredient';


@Component({
  selector: 'app-link-items',
  templateUrl: './link-items.component.html',
  styleUrls: ['./link-items.component.css']
})
export class LinkItemsComponent implements OnInit {
  
  constructor(private http: LinkItemsService) { }
  products: Product[];
  ingredient: Ingredient;
  prompt:boolean = false;
  selectedProduct: Product;
  searchValue:string;
  formValues ={
    householdQuantity: 0,
    ingredientQuantity: 0,
    servingWeightQuantity:0
  };
  ngOnInit() {
    this.getUnlinkedIngredient();
    this.getProducts();
    this.searchValue = '';
  }

  link(product:Product):void{
    this.selectedProduct = product;
    this.formValues.householdQuantity=product.householdServingQuantity;
    this.formValues.servingWeightQuantity=product.servingQuantity;

    this.prompt = true;
    
    
  }
  queries:number = 0;
  getProducts(strVal:string = '',searchNow:boolean=false):void{
    if(strVal !='' && !searchNow){
      this.queries ++;
      setTimeout(() => {
        this.queries --;
        if(this.queries<=0){
          this.queries =0;
          this.http.getProducts(strVal).subscribe(results=>{
            this.products = results;
          });
        }
      }, 50);
      return;
    }
    this.http.getProducts(strVal).subscribe(results=>{
      this.products = results;
    });
  }
  getUnlinkedIngredient() :void{
    this.http.getUnlinkedIngredient().subscribe(results=>{
      this.ingredient = results[0];
      this.searchValue = this.ingredient.ingredient;
      this.getProducts(this.searchValue,true);
    })
  }
  save():void{
    this.prompt=false;
    console.log({
      "productID": this.selectedProduct.productID,
      "ingredientID": this.ingredient.ingredientID,
      "conversionFactor" : this.formValues.ingredientQuantity,
      "ingredient": this.ingredient.ingredient
    });
    this.http.setIngredientProperties({
      "productID": this.selectedProduct.productID,
      "ingredientID": this.ingredient.ingredientID,
      "conversionFactor" : this.formValues.ingredientQuantity,
      "ingredient": this.ingredient.ingredient
    }).subscribe(result=>{
      this.getUnlinkedIngredient();
    });
  }
}
