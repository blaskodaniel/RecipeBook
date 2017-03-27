import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
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