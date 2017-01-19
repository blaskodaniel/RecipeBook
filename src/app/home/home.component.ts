import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent{
    private title: String;

    constructor(){
        this.title = "This is a home component"
    }

}