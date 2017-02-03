import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DefaultFunctons } from '../functions/default';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    private title: String;
    private food: Array<String>;
    isLoading = true;

    constructor(private dataService:DataService, private defaultfunctions:DefaultFunctons){
        this.title = "This is a home component"
    }

    ngOnInit() {
        this.dataService.getRecipes().subscribe(
            data => {this.food = data;console.log(data);},
            error => console.log(error),
            () => this.isLoading = false
        );

        this.defaultfunctions.testMethode();
    }
}