import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/type';
import { ContactsService } from 'src/app/service/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact:Contact = {name: "",email:"",contacted:false};
  toSearch:string = "";

  constructor(private contactService:ContactsService) { 
    
  }

  ngOnInit(): void {
  }

  search(){
    this.contactService.getContact(this.toSearch)
        .then(contact => this.contact = contact[0])
        .then(e => console.log(this.contact));
    this.toSearch = "";
  }

}
