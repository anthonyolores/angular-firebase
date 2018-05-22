import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[];
  constructor(private peopleService: PeopleService) {
   }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

}
