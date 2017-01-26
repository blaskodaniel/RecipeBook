import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getRecipes(): Observable<any> {
      console.log("getRecipes() függvény fut le: /recipe -re");
    return this.http.get('/recipe').map(res => res.json());
  }

  addRecipe(recipe): Observable<any> {
    return this.http.post('/newrecipe', JSON.stringify(recipe), this.options);
  }

  editRecipe(recipe): Observable<any> {
    return this.http.put(`/recipe/${recipe._id}`, JSON.stringify(recipe), this.options);
  }

  deleteRecipe(recipe): Observable<any> {
    return this.http.delete(`/recipe/${recipe._id}`, this.options);
  }

}