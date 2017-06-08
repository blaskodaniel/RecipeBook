import { Component,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    private menuitems = [];

    LoginForm: FormGroup;
    username = new FormControl('',Validators.required);
    password = new FormControl('',Validators.required);
    public loggedIN;

    constructor(private http: Http,
    private dataService: DataService,private formBuilder: FormBuilder){
        this.loggedIN = true;
    }

     ngOnInit() {
        this.loggedIN = false;
        this.GetCookie();
        this.LoginForm = this.formBuilder.group({
            username: this.username,
            password:this.password
        });  
    }

    Login(){
        this.dataService.Login(this.LoginForm.value).subscribe(
            data => {
                if(data._body != "null")
                {
                    var user = JSON.parse(data._body);
                    console.log(user);
                    this.loggedIN = true;
                }
                else{
                    console.log("Rossz felhasználónév vagy jelszó");
                    this.loggedIN = false;
                }
                
            },
            error => console.log(error)
        );
    }

    GetCookie(){
        this.dataService.GetCookie().subscribe(
            data => {
                if(data._body != "null")
                {
                    console.log(data._body);
                    this.loggedIN = true;
                }
                else{
                    console.log("Nincs cookie");
                    this.loggedIN = false;
                }
                
            },
            error => console.log(error)
        );
    }

}