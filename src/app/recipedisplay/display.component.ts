import { Component,OnInit,OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
    selector: 'display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
    routerapp: Router;
    id: number;

    constructor(private routers: ActivatedRoute,private dataService:DataService){
        
    }

    private ngOnDestroy() {
        console.log("ngOnDestroy");
    }


     ngOnInit() {
         var userId = null;
         this.routers.params.subscribe((params: Params) => {
            userId = params['id'];
            
        });
        console.log(userId);
        this.dataService.getRecipeByID(userId).subscribe(
            data => {console.log(data);},
            error => console.log(error)
        );
    }

}