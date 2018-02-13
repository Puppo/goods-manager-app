import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { AuthService } from '../../../auth/shared/services/auth';
import { IGoods } from '../../models';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'goods-entry',
  template: `
  <goods-container>
    <goods-toolbar (exitApp)="onExitApp()">
      Goods
    </goods-toolbar>

    <form class="goods-entry-form"
      [formGroup]="form"
      novalidate
      (ngSubmit)="onSubmit()">
      <mat-form-field class="goods-form-full-width">
        <input matInput
        placeholder="Title"
        formControlName="title"
        autocomplete="off"
        [class.error]="titleControlInvalid">
      </mat-form-field>
      <mat-form-field class="goods-form-full-width">
        <input matInput
        placeholder="Subtitle"
        formControlName="subtitle"
        autocomplete="off"
        [class.error]="subtitleControlInvalid">
      </mat-form-field>

      <mat-form-field class="goods-form-full-width">
        <textarea matInput
        placeholder="Description"
        formControlName="description"
        autocomplete="off"
        [class.error]="descriptionControlInvalid"></textarea>
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
        class="goods-form-submit goods-form-full-width"
        [disabled]="form.invalid">
        Insert
      </button>
    </form>

    <goods-go-list (goList)="onTapList()">
    </goods-go-list>
  </goods-container>
  `,
  styleUrls: ['./entry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsEntryComponent implements OnInit, OnDestroy {
  @Output() save = new EventEmitter<IGoods>();
  blobFiles: File[];

  form: FormGroup;
  titleControl: AbstractControl;
  subtitleControl: AbstractControl;
  descriptionControl: AbstractControl;

  @ViewChild('newPostInput') newPostInput: ElementRef;

  goods: IGoods;
  goodsSubscription: Subscription;

  constructor(
    protected store: Store<fromStore.IStockState>,
    protected router: Router,
    protected auth: AuthService,
    protected fb: FormBuilder
  ) {
    this.blobFiles = [];
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.titleControl = this.form.get('title');
    this.subtitleControl = this.form.get('subtitle');
    this.descriptionControl = this.form.get('description');
  }

  ngOnInit(): void {
    this.goodsSubscription = this.store
      .select(fromStore.getStockSelectedGoodsSelector)
      .subscribe(goods => {
        if (!!goods) {
          this.goods = goods;
          this.form.patchValue(this.goods);
        }
      });
  }

  ngOnDestroy() {
    if (!!this.goodsSubscription && !this.goodsSubscription.closed) {
      this.goodsSubscription.unsubscribe();
    }
  }

  get titleControlInvalid(): boolean {
    return this.titleControl.invalid;
  }
  get subtitleControlInvalid(): boolean {
    return this.subtitleControl.invalid;
  }
  get descriptionControlInvalid(): boolean {
    return this.descriptionControl.invalid;
  }

  onTapList(): void {
    this.router.navigate(['goods']);
  }

  onExitApp(): void {
    this.auth.signOut();
    this.router.navigate(['auth']);
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
  removeFile(file: File) {
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

  onSubmit(): void {
    let goods: IGoods;
    if (!!this.goods) {
      goods = {
        title: this.titleControl.value,
        subtitle: this.subtitleControl.value,
        description: this.descriptionControl.value,
        images: this.blobFiles.map(f => f.name),
        $key: this.goods.$key
      };
      this.store.dispatch(new fromStore.GoodInsertAction(goods));
    } else {
      goods = {
        title: this.titleControl.value,
        subtitle: this.subtitleControl.value,
        description: this.descriptionControl.value,
        images: this.blobFiles.map(f => f.name)
      };
      this.store.dispatch(new fromStore.GoodInsertAction(goods));
    }
  }
}
