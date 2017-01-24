import { Component, OnInit } from '@angular/core';
import { Hozzavalo } from './../../models/hozzavalo.model';

@Component({
    selector: 'createrecipe',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
    private food: Array<String>;
    private counter: Number;
    private hozzavalo: Hozzavalo;
    recipename: String;ujhozzavalo:String;
    private hozzavalok: Array<Hozzavalo>;

    constructor(){
        this.counter = 1;
        this.hozzavalo = new Hozzavalo();
        this.hozzavalo.name = "";
        this.hozzavalok = [];
    }

    newItem(item){
        console.log("Új hozzávaló: "+item);
        let newitem = new Hozzavalo;
        newitem.name = item;
        this.hozzavalok.push(newitem);
        this.ujhozzavalo = "";
    }

    removeItem(item){
        console.log("Hozzávaló törlése: "+item);
        this.hozzavalok.splice(this.hozzavalok.indexOf(item),1);
    }

    ngOnInit() {
        console.log(this.hozzavalok.length);
    }
}