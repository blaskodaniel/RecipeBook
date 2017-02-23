import { Component,OnInit,OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
    selector: 'display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
    recipeload: Object;

    constructor(private routers: ActivatedRoute,private dataService:DataService){

    }

     ngOnInit() {
         var userId = null;
         this.routers.params.subscribe((params: Params) => {
            userId = params['id'];
            
        });
        console.log(userId);
        this.dataService.getRecipeByID(userId).subscribe(
            data => {
                this.recipeload = data;
                console.log(data);
            },
            error => console.log(error)
        );
        console.log("OK");
    }

}