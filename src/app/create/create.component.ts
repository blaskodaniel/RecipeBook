import { Component } from '@angular/core';

@Component({
    selector: 'createrecipe',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent{
    private food: Array<String>;
    private counter: Array<Number>;

    constructor(){
        this.counter = [1];
        this.food = []
    }

    newItem($event,item){
        console.log(item);
    }

}