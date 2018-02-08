import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';

import { AuthModule } from '../auth';
import { GoodsModule } from '../goods';

import { AppComponent } from './app.component';

const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    RouterModule.forRoot(ROUTES),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,

    FlexLayoutModule,

    AuthModule,
    GoodsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
