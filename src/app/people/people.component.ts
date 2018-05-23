import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0
  }
  people: Person[];
  constructor(private peopleService: PeopleService) {
   }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

  addPerson(){
    if(this.person.name != '' && this.person.age > 0){
      this.peopleService.addPerson(this.person);
      this.person = {
        name: '',
        age: 0
      }
    }
  }

  deletePerson(person){
    this.peopleService.deletePerson(person);
  }

}
