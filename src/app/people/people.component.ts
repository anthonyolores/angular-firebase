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
  update: boolean;
  constructor(private peopleService: PeopleService) {
   }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

  addPerson(event){
    if(this.person.name != '' && this.person.age > 0){
      this.peopleService.addPerson(this.person);
      this.person = {
        name: '',
        age: 0
      }
    }
  }

  updatePerson(person:Person){
   this.peopleService.updatePerson(person);
   this.person = {
    name: '',
    age: 0
  }
   this.update = false;
  }

  editPerson(person:Person){
    this.update = true;
    this.person = person;
  }

  deletePerson(person:Person){
    this.peopleService.deletePerson(person);
    if(person.id == this.person.id){
      this.person = {
        name: '',
        age: 0
      }
    }
  }

}
