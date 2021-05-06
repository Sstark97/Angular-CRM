import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/type';
import { ContactsService } from 'src/app/service/contacts.service';
import {Router} from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userName: string = "";
  @Input() password: string = "";
  @Output() loginParent = new EventEmitter();

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

  //Añadiendo Login
  login(){
    this.userService.loginUser(this.userName,this.password)
        .then(token => this.userService.setCookies(token,this.userName))
        .then(res => this.loginParent.emit())
        .then(res => this.router.navigate(['home']));
  }

}
