import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/type';
import { ContactsService } from 'src/app/service/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts:Contact[] = [];
  contactsAll:Contact[] = [];
  open:boolean = false;
  modify:boolean = false;
  contact:Contact = {name:"",email:"",contacted:false};

  constructor(private contactsService: ContactsService) {
    this.contactsService.getAllContacts()
        .then(req => this.contacts = req)
        .then(d => this.contactsAll = this.contacts)
        .then(c => console.log(this.contacts));  
  }

  ngOnInit(): void {
  }

  openAdd(){
    this.open = !this.open;
  }

  modifyOpen(contact:Contact){
    this.contact = contact;
    this.modify = !this.modify;
  }

  modifyContact(contact:Contact){
    this.contact.name = contact.name;
    this.contact.email = contact.email;
    if(this.contact.id != undefined){
      let id:number = this.contact.id
      this.contactsService.putContact(id,this.contact);
    }
    this.modify = !this.modify;
  }

  close(close:boolean){
    this.open = close;
    this.modify = close;
  }

  addContact(contact:Contact){
    this.contacts.push(contact);
    this.contactsService.postContact(contact);
    this.openAdd();
  }

  remove(email:string){
    let contact = this.contacts.filter(contact => contact.email == email).pop()?.id;
    console.log(contact);
    if(contact != undefined){
      this.contactsService.deleteContact(contact)
      this.contacts = this.contacts.filter(contact => contact.email != email);
    }
  }

  removeAll(){
    this.contacts.forEach(contact => {
      if(contact.id != undefined){
        this.contactsService.deleteContact(contact.id);
      }
    })
    this.contacts = [];

  }

  mark(contact:Contact){
    contact.contacted = !contact.contacted;
    if(contact.id != undefined){
      let id:number = contact.id
      this.contactsService.putContact(id,contact);
    }
  }

  markAll(){
    this.contacts.forEach(contact => {
      contact.contacted = true
      if(contact.id != undefined){
        this.contactsService.putContact(contact.id,contact);
      }
    });
  }

  hideMarks(){
    this.contacts = this.contacts.filter(contact => !contact.contacted);
  }

  showAll(){
    this.contacts = this.contactsAll;
  }

}
