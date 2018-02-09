import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'goods-entry',
  template: `
  <goods-container>
    <goods-toolbar>
      Goods
    </goods-toolbar>

    <form class="goods-entry-form">
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
              #newPostInput
              type="file"
              name="inputFile"
              accept="image/*"
              (change)="onFileUpload($event)" />
      </div>

      <!-- CONTENT -->
      <mat-list class="goods-file-upload-list">
        <mat-list-item *ngFor="let blobFs of blobFiles">
          <goods-file-upload
            [file]="blobFs"
            (complete)="onUploadComplete($event)"
            (error)="onUploadError($event)"
            (delete)="onBlobFileRemove($event)">
          </goods-file-upload>
        </mat-list-item>
      </mat-list>

      <button
        mat-raised-button
        color="primary"
        class="goods-form-submit goods-form-full-width">
        Insert
      </button>
    </form>
  </goods-container>
  `,
  styleUrls: ['./entry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsEntryComponent {
  blobFiles: Blob[];

  @ViewChild('newPostInput') newPostInput: ElementRef;

  constructor() {
    this.blobFiles = [];
  }

  triggerInputFileClick(evt) {
    const element = this.newPostInput.nativeElement as HTMLInputElement;
    if (element) {
      element.click();
    } else {
      console.error('Could not find the new post input field!');
    }

    evt.preventDefault();
  }
  onFileUpload(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.blobFiles.push(file);

      const element = this.newPostInput.nativeElement as HTMLInputElement;
      element.value = '';
    }
  }
  removeFile(file: Blob) {
    this.blobFiles = this.blobFiles.filter(f => f !== file);
  }

  onUploadComplete(evt) {
    console.log(evt);
  }

  onUploadError(evt) {
    console.log(evt);
  }

  onBlobFileRemove(evt) {
    this.blobFiles = this.blobFiles.filter(f => f !== evt.file);
  }
}
