import { Component, OnInit } from '@angular/core';
import { Contact, User } from 'src/app/model/type';
import { ContactsService } from 'src/app/service/contacts.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact:Contact = {name: "",email:"",contacted:false};
  toSearch:string = "";
  user:User = {userName: "",email:""};
  userName:string = "";

  constructor(private userService:UserService, private contactService: ContactsService) { 
    
  }

  ngOnInit(): void {
    this.userName = this.userService.getUserName();
    this.userService.getUser(this.userName)
        .then(user => {
          this.user = {userName:user.userName,email:user.email,name:user.name,}
        })
        .then(s => console.log(this.user));
  }

  async search(){
    this.contact = await this.contactService.getContact(this.toSearch,this.userName)

    this.toSearch = "";
  }

}
