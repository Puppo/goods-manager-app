import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { FirebaseError } from 'firebase/app';

export enum AuthProviders {
  Github = 0,
  Twitter = 1,
  Facebook = 2,
  Google = 3,
  Password = 4,
  Anonymous = 5,
  Custom = 6
}

@Injectable()
export class AuthService {
  constructor(protected afAuth: AngularFireAuth) {}

  signIn(providerId: number): Observable<firebase.auth.UserCredential> {
    let provider: firebase.auth.AuthProvider = null;

    switch (providerId) {
      case AuthProviders.Twitter:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case AuthProviders.Facebook:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthProviders.Google:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case AuthProviders.Custom:
        provider = new firebase.auth.EmailAuthProvider();
        break;
    }

    return fromPromise(this.afAuth.auth.signInWithPopup(provider));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
