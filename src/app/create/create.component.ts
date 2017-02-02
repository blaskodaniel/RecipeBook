import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../services/data.service';
import { Hozzavalo } from './../../models/hozzavalo.model';

@Component({
    selector: 'createrecipe',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
    isLoading = true;
    isEditing = false;
    private food: Array<String>;
    private counter: Number;
    private hozzavalo: Hozzavalo;
    //recipename: String;ujhozzavalo:String;
    private hozzavalok: Array<Hozzavalo>;
    //ujhozzavalo:string;

    addRecipeForm: FormGroup;
    recipename = new FormControl('',Validators.required);
    description = new FormControl('',Validators.required);
    ujhozzavalo = new FormControl('',Validators.required);

    constructor(private http: Http,private dataService: DataService,private formBuilder: FormBuilder){
        this.counter = 1;
        this.hozzavalo = new Hozzavalo();
        this.hozzavalo.name = "";
        this.hozzavalok = [];
    }

    newItem(){
        console.log("Új hozzávaló: "+this.addRecipeForm.controls["ujhozzavalo"].value);
        let newitem = new Hozzavalo;
        newitem.name = this.addRecipeForm.controls["ujhozzavalo"].value;
        this.hozzavalok.push(newitem);
        //this.ujhozzavalo = "";
        
    }

    removeItem(item){
        console.log("Hozzávaló törlése: "+item);
        this.hozzavalok.splice(this.hozzavalok.indexOf(item),1);
    }

    ngOnInit() {
        this.addRecipeForm = this.formBuilder.group({
            recipename: this.recipename,
            description: this.description,
            ujhozzavalo: this.ujhozzavalo
        });
        console.log(this.hozzavalok.length);
        this.getRecipes();    
    }

    getRecipes() {
        this.dataService.getRecipes().subscribe(
            data => {this.food = data;console.log(data);},
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    /*addRecipe(recipe) {
    this.dataService.addRecipe(recipe).subscribe(
      res => {
        console.log("Sikeresen mentve lett a recept!");
      },
      error => console.log(error)
    );
  }*/


  addRecipe(){
      this.ujhozzavalo.setValue(this.hozzavalok);
      console.log(this.addRecipeForm.value);
      this.dataService.addRecipe(this.addRecipeForm.value).subscribe(
      res => {
        console.log("Sikeresen mentve lett a recept!");
      },
      error => console.log(error)
    );
  }
}