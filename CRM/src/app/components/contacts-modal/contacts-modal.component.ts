import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/model/type';

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.component.html',
  styleUrls: ['./contacts-modal.component.css']
})
export class ContactsModalComponent implements OnInit {
  @Input() contacts:Contact[] = [];
  @Input() open:boolean = false;
  @Output() addContactParent = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  name:string = '';
  email:string = '';
  exist:boolean = false;
  correct:boolean = true;
  correctName:boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.contacts);
  }

  addContact(){
    this.exist = this.contacts.filter(contact => contact.email == this.email).length == 1;

    if(!this.exist){
      let contact:Contact = {
        name:this.name,
        email:this.email,
        contacted: false
      };

      this.addContactParent.emit(contact);
      this.email = '';
      this.name = '';
    }
  }

  comprobeMail(){
    if(!this.email.endsWith('@gmail.com')){
      if(!this.email.endsWith('@hotmail.com')){
        if(!this.email.endsWith('@outlook.com')){
          this.correct = false;
        } else {
          this.correct = true;
        }
      } else {
        this.correct = true;
      }
    } else {
      this.correct = true;
    }
  }

  comprobeName(){
    if(this.name.length < 6){
      this.correctName = false;
    } else {
      this.correctName = true;
    }

  }


  close(){
    this.closeModal.emit(false);
  }
}
