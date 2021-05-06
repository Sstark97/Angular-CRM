import { Injectable } from '@angular/core';
import { Contact, User } from '../model/type';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private cookies: CookieService) { }

  getAllContacts(): Promise<Contact[]>{
    return axios.get<Contact[]>(`http://localhost:3000/${this.getUserName()}/contacts`,{ headers: { Authorization: `Bearer ${this.getToken()}`, userName:this.getUserName()}})
                .then(req => req.data);
  }

  gelAllMarksContacts() : Promise<Contact[]>{
    return axios.get<Contact[]>('http://localhost:3000/contacts')
                .then(req => req.data)
                .then(contacts => {
                  contacts = contacts.filter(contact => contact.contacted);
                  return contacts
                });
  }

  postContact(contact:Contact): void{
    axios.post<Contact[]>('http://localhost:3000/contacts',contact)
                .then(req => req.data);
  }

  deleteContact(id:number): void{
    axios.delete<Contact[]>(`http://localhost:3000/contacts/${id}`)
                .then(req => {console.log(req);return req.data});
  }

  putContact(id:number,contact:Contact): void{
    axios.put<Contact[]>(`http://localhost:3000/contacts/${id}`,contact)
                .then(req => req.data);
  }

  getContact(search:string,userName:string): Promise<any> | null{
    let toSearch:string = '';
    if(search.indexOf(' ') != -1){
      search = this.capitalize(search);
    } else {
      search = search.charAt(0).toUpperCase() + search.substring(1,search.length);
    }
    
    console.log(search);

    if(search.includes('@')){
      toSearch = 'email';
    } else {
      toSearch = 'contactName';
    }

    return axios.get(`http://localhost:3000/${this.getUserName()}/contacts/${search}`,{ headers: { Authorization: `Bearer ${this.getToken()}`  } })
                .then(req => req.data)
                .catch(err => console.log(err));
  }

  getUserName() : string {
    return this.cookies.get('userName');
  }

  getToken() : string {
    return this.cookies.get('token');
  }

  capitalize(name:string) : string{
    let names = name.split(' ');
    names[0] = names[0].charAt(0).toUpperCase() + names[0].substring(1,names[0].length);
    let capitalized = names[0];

    names.forEach((name,index) => {
      if(index != 0){
        name = name.charAt(0).toUpperCase() + name.substring(1,name.length);
        capitalized += ' ' + name;
      }
    })

    return capitalized;
  }
}
