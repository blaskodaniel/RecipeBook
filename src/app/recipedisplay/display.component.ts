import { Component,OnInit,OnDestroy,Pipe, PipeTransform } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
    selector: 'display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
    private recipeload: {};

    constructor(private routers: ActivatedRoute,private dataService:DataService){
        this.recipeload = {};
    }

     ngOnInit() {
         var ID = null;
         
         this.routers.params.subscribe((params: Params) => {
            ID = params['id'];
            console.log("ID: "+ID);
            this.getRecipeById(ID);
        });
        
    }

    getRecipeById(recipeID){
        this.dataService.getRecipeByID(recipeID).subscribe(
            data => {
                this.recipeload = data;
                console.log("ADAT: "+JSON.stringify(data));
            },
            error => console.log(error)
        );
        
    }

}