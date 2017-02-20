import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit{
    private menuitems = [];

    SearchForm: FormGroup;
    searchname = new FormControl('',Validators.required);
    
    constructor(private formBuilder: FormBuilder){
        this.menuitems = ['Receptek','Bejelentkezés']
    }

     ngOnInit() {
        this.SearchForm = this.formBuilder.group({
            searchname: this.searchname
        });  
    }

    search(){
        console.log(this.searchname.value);
    }

}