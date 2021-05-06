import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Contact, User } from '../model/type';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookies: CookieService) { }

  loginUser(userName:string, password:string): Promise<string> {
    return axios.post('http://localhost:3000/login',{userName: userName,password: password})
         .then(res => res.data)
         .then(data => data.token)
         .catch(error => console.log(error));
  }

  getUser(userName:string): Promise<User>{
    return axios.get<User>(`http://localhost:3000/users/${userName}`, { headers: { Authorization: `Bearer ${this.getToken()}`  } })
                .then(res => res.data);
  }

  setCookies(token:string,userName:string) : void{
    this.cookies.set('token',token);
    this.cookies.set('userName',userName);
  }

  getToken() : string {
    return this.cookies.get('token');
  }

  getUserName() : string {
    return this.cookies.get('userName');
  }
}
