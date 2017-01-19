import { Component } from '@angular/core';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})

export class FilterComponent{
    private menuitems = [];

    constructor(){
        this.menuitems = ['Receptek','Bejelentkezés']
    }

}