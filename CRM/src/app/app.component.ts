import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crm';
  login:boolean = false;
  hidden:boolean = false;

  signin() {
    this.login = true;
    this.hidden = true;
  }
}
