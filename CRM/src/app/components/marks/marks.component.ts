import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/type';
import { ContactsService } from 'src/app/service/contacts.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  contacts:Contact[] = [];

  constructor(private contactService: ContactsService) { 
    this.contactService.gelAllMarksContacts()
        .then(contacts => this.contacts = contacts)
        .then(c => console.log(this.contacts));
  }

  ngOnInit(): void {
  }

}
