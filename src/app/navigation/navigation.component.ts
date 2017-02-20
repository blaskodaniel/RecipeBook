import { Component } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent{
    private menuitems = [];

    constructor(){
        this.menuitems = [
            {'DisplayName':'Receptek','Azonosito':'home'},
            {'DisplayName':'Recept hozzáadása','Azonosito':'create'}
            ]
    }

}