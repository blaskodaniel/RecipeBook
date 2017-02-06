import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { Helper } from '../functions/helper';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    private title: String;
    private food: Array<String>;
    isLoading = true;
    private helper: Helper = new Helper();


    constructor(private dataService:DataService){
        this.title = "This is a home component";
    }

    ngOnInit() {
        this.dataService.getRecipes().subscribe(
            data => {this.food = data;console.log(data);},
            error => console.log(error),
            () => this.isLoading = false
        );

    }
}