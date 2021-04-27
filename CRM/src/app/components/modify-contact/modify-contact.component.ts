import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/model/type';

@Component({
  selector: 'app-modify-contact',
  templateUrl: './modify-contact.component.html',
  styleUrls: ['./modify-contact.component.css']
})
export class ModifyContactComponent implements OnInit {
  @Input() contacts:Contact[] = [];
  @Input() modify:boolean = false;
  @Output() addContactParent = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() name:string = '';
  @Input() email:string = '';
  exist:boolean = false;
  correct:boolean = true;
  correctName:boolean = true;
  @Input() contact:Contact = {name:"",email:"",contacted:false};

  constructor() {}

  ngOnInit(): void {
    console.log(this.contact);
    this.name = this.contact.name;
    this.email = this.contact.email;
  }

  modifyContact(){
    this.exist = this.contacts.filter(contact => contact.email == this.email).length == 1;

    if(!this.exist || this.contact.email == this.email){
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
