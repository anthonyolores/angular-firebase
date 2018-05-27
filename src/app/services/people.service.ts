import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  peopleCollection: AngularFirestoreCollection<Person>;
  peopleObserver: Observable<Person[]>;
  personDocument: AngularFirestoreDocument<Person>;
  constructor(public angularFirestore:AngularFirestore) {
    //this.peopleObserver = this.angularFirestore.collection('people').valueChanges() as Observable<Person[]>;
    this.peopleCollection = this.angularFirestore.collection('people', arr => arr.orderBy('age', 'desc'));
    this.peopleObserver = this.peopleCollection.snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(temp => {
          const data = temp.payload.doc.data() as Person;
          data.id = temp.payload.doc.id;
          return data;
        });
      })
    );
   }

   getPeople(){
     return this.peopleObserver;
   }

   addPerson(person:Person){
     this.peopleCollection.add(person);
   }

   deletePerson(person:Person){
     this.personDocument = this.angularFirestore.doc(`people/${person.id}`);
     this.personDocument.delete();
   }

   updatePerson(person:Person){
    this.personDocument = this.angularFirestore.doc(`people/${person.id}`);
    this.personDocument.update(person);
   }
}
