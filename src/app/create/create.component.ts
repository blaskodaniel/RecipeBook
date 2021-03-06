import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../services/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Hozzavalo } from './../../models/hozzavalo.model';
import { Helper } from '../functions/helper';
import { FileUploader } from 'ng2-file-upload';
import {IModal} from '../interface/IModal';
declare var jQuery:any;

const uploadURL = 'http://localhost:3100/upload';

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
    private hozzavalok: Array<Hozzavalo>;
    private helper: Helper = new Helper();
    private categorylist: Array<String>;
    
    public modalobject :IModal = {title:"",text:""};
    public uploader:FileUploader = new FileUploader({url: uploadURL});

    addRecipeForm: FormGroup;
    recipename = new FormControl('',Validators.required);
    description = new FormControl('',Validators.required);
    ujhozzavalo = new FormControl('',Validators.required);
    createdate = new FormControl();
    imagefilename = new FormControl();
    moifydate= new FormControl();
    category= new FormControl('',Validators.required);
    rate= new FormControl();
    recipecreatetime= new FormControl('',Validators.required);
    difficultlevel = new FormControl('',Validators.required);
    recipeload: {};

    constructor(private routers: ActivatedRoute,
    private http: Http,
    private dataService: DataService,
    private formBuilder: FormBuilder)
    {
        this.counter = 1;
        this.hozzavalo = new Hozzavalo();
        this.hozzavalo.name = "";
        this.hozzavalok = [];
        this.categorylist = ["Leves","Főzelék","Húsételek","Pörkölt","Tészta","Desszert","Saláta","Diétás","Egytálétel"];
        this.recipeload = {};
    }

    newItem(){
        console.log("Új hozzávaló: "+this.addRecipeForm.controls["ujhozzavalo"].value);
        let newitem = new Hozzavalo;
        newitem.name = this.addRecipeForm.controls["ujhozzavalo"].value;
        this.hozzavalok.push(newitem);
        this.addRecipeForm.controls["ujhozzavalo"].reset();
        //this.ujhozzavalo = "";
        
    }

    newItemWithParams(item){
        console.log("Új hozzávaló: "+item);
        let newitem = new Hozzavalo;
        newitem.name = item;
        this.hozzavalok.push(newitem);
        this.addRecipeForm.controls["ujhozzavalo"].reset();
        
    }

    removeItem(item){
        console.log("Hozzávaló törlése: "+item);
        this.hozzavalok.splice(this.hozzavalok.indexOf(item),1);
    }

    updateRecipe(){
        console.log("Frissítés lesz");
        this.ujhozzavalo.setValue(this.hozzavalok);
        this.moifydate.setValue(this.helper.getDateTime());
        console.log(this.addRecipeForm.value);
        this.dataService.editRecipe(this.addRecipeForm.value,this.recipeload).subscribe(
            data => {
               console.log("Siker");
                this.resetFormWithModal("Sikeres módosítás","Sikeresen frissítettük a receptet.");
            },
            error => console.log(error)
        );
    }

    ngOnInit() {
        var ID = null;
        this.routers.params.subscribe((params: Params) => {
            ID = params['id'];
            if(ID != null){
                console.log("Módosított recept ID: "+ID);
                this.getRecipeById(ID);
            }
            
        });
        this.addRecipeForm = this.formBuilder.group({
            recipename: this.recipename,
            description: this.description,
            ujhozzavalo: this.ujhozzavalo,
            createdate: this.createdate,
            moifydate:this.moifydate,
            imagefilename: this.imagefilename,
            category:this.category,
            rate:this.rate,
            recipecreatetime:this.recipecreatetime,
            difficultlevel: this.difficultlevel
        });
        console.log(this.hozzavalok.length);
        this.rate.setValue(0);
        this.difficultlevel.setValue(1);
        this.getRecipes();    
    }

    getRecipes() {
        this.dataService.getRecipes().subscribe(
            data => {this.food = data;console.log(data);},
            error => console.log(error),
            () => this.isLoading = false
        );
    }
 
    getRecipeById(recipeID){
        this.dataService.getRecipeByID(recipeID).subscribe(
            data => {
                this.recipeload = data;
                console.log("ADAT: "+JSON.stringify(data));
                this.recipename.setValue(data.recipename);
                this.description.setValue(data.description);
                this.imagefilename.setValue(data.imagefilename);
                for(let item of data.ujhozzavalo)
                {
                    this.newItemWithParams(item.name);
                }
                this.category.setValue(data.category);
                this.rate.setValue(data.rate);
                this.createdate.setValue(data.createdate);
                this.difficultlevel.setValue(data.difficultlevel);
                this.recipecreatetime.setValue(data.recipecreatetime);
            },
            error => console.log(error)
        );
        
    }

  fileUpload(){
      console.log("Fájlfeltöltés...");
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            if(status == 200)
            {
                console.log("Sikeres Fájlfeltöltés");
                var valasz = JSON.parse(item._xhr.response);
                var imagefilename = valasz.filename.filename;
                this.imagefilename.setValue(imagefilename);
                console.log("Imagename: "+imagefilename);
            }
            else{
                console.log("Sikertelen Fájlfeltöltés");
            }
            
        };
  }  


  addRecipe(){
      this.ujhozzavalo.setValue(this.hozzavalok);
      let nowtimedate = this.helper.getDateTime();
      this.createdate.setValue(nowtimedate);
      this.moifydate.setValue(nowtimedate);
      console.log(this.addRecipeForm.value);
      this.dataService.addRecipe(this.addRecipeForm.value).subscribe(
      res => {
        console.log("Sikeresen mentve lett a recept!");
        this.resetFormWithModal("Sikeres mentés","A receptet sikeresen elmentettük.");
      },
      error => console.log(error)
    );

  }

  resetFormWithModal(title:string,szoveg:string){
        this.modalobject.text = szoveg;
        this.modalobject.title = title;
        this.addRecipeForm.reset();
        this.hozzavalok = [];
        jQuery('.modal').modal();
  }
}