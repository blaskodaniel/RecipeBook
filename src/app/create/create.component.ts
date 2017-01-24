import { Component } from '@angular/core';
import { Hozzavalo } from './../../models/hozzavalo.model';

@Component({
    selector: 'createrecipe',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent{
    private food: Array<String>;
    private counter: Number;
    private hozzavalo: Hozzavalo;
    recipename: String;

    constructor(){
        this.counter = 1;
        this.hozzavalo = new Hozzavalo();
    }

    newItem($event){
        console.log("Új hozzávaló:");
        this.hozzavalo.name = "1 kg burgonya";
    }

}