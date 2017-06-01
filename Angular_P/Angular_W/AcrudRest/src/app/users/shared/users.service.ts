import { Injectable } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsersService {

  private url: string="http://localhost:8080/SpringRestService/user/";

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(this.url)
    .map(res=>res.json());
  }

  getUser(id){
    return this.http.get(this.getUserUrl(id))
    .map(res => res.json());
  }

  private getUserUrl(id){
    return this.url + id;
  }

  udpateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.getUserUrl(user.id),JSON.stringify(user),{headers:headers});
  }

  addUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url,JSON.stringify(user),{headers:headers});
  }

  deleteUser(id){
    return this.http.delete(this.getUserUrl(id))
      .map(res => res.json());
  }

}
