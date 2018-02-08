import { Component, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'goods-insert',
  template: `
  <goods-container>
    <goods-toolbar>
      Goods insert
    </goods-toolbar>

    <form class="goods-insert-form">
      <mat-form-field class="goods-form-full-width">
        <input matInput placeholder="Name">
      </mat-form-field>

      <mat-form-field class="goods-form-full-width">
        <textarea matInput placeholder="Description"></textarea>
      </mat-form-field>

      <!-- UPLOAD -->
      <div class="goods-upload goods-form-full-width">
        <button mat-mini-fab color="primary" class="upload" (click)="triggerInputFileClick($event)">
          <mat-icon>attach_file</mat-icon>
        </button>
        <input id="new-post-input"
              type="file"
              name="inputFile"
              accept="image/*"
              (change)="previewFile($event)" />
      </div>

      <!-- CONTENT -->
      <div class="preview" [class.open]="previewURL" *ngIf="previewURL">
        <img [src]="previewURL | async" />
        <div class="input-buffer">
          <button mat-icon-button
            aria-label="Delete File"
            color="primary"
            (click)="removeFile($event)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>

      <button
        mat-raised-button
        color="primary"
        class="goods-form-submit goods-form-full-width">
        Insert
      </button>
    </form>
  </goods-container>
  `,
  styleUrls: ['./insert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsInsertComponent {
  previewURL: Observable<string>;
  file: Blob;
  uploadPercent: Observable<number>;
  uploadURL: Observable<string>;
  downloadURL: Observable<string>;

  /** STORAGE **/
  triggerInputFileClick(evt) {
    const element = document.getElementById('new-post-input');

    if (element) {
      element.click();
    } else {
      console.error('Could not find the new post input field!');
    }

    evt.preventDefault();
  }
  previewFile(event) {
    const reader = new FileReader();
    this.file = event.target.files[0];
    this.previewURL = fromEvent(reader, 'load').pipe(map(e => reader.result));
    reader.readAsDataURL(this.file);
  }
  removeFile(event) {
    this.file = null;
    this.previewURL = null;
  }
}
