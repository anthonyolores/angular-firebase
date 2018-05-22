import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Person } from '../models/Person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  peopleCollection: AngularFirestoreCollection<Person>;
  peopleObserve: Observable<Person[]>;
  constructor(public angularFirestore:AngularFirestore) {
    this.peopleObserve = this.angularFirestore.collection('people').valueChanges() as Observable<Person[]>;
   }

   getPeople(){
     return this.peopleObserve;
   }
}
