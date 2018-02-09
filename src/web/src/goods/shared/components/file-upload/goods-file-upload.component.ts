import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'goods-file-upload',
  template: `
    <div class="goods-file-upload">
      <div class="goods-file-upload__info">
        <span>{{ file.name }}</span>
        <span class="goods-file-upload__info-spacer"></span>
        <button mat-icon-button (click)="onDelete()">
          <mat-icon aria-label="Remove file">delete</mat-icon>
        </button>
      </div>

      <mat-progress-bar
        [color]="'primary'"
        [value]="percentLoaded"
        [bufferValue]="percentLoaded"
        [mode]="'determinate'">
      </mat-progress-bar>
    </div>
  `,
  styleUrls: ['./goods-file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsFileUploadComponent implements OnInit {
  @Input() file: File;
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  percentLoaded = 0;
  ngOnInit(): void {
    const reader = new FileReader();
    const onerror$ = fromEvent(reader, 'error').subscribe(this.onError.bind(this));
    const onprogress$ = fromEvent(reader, 'progress').subscribe(this.updateProgress.bind(this));
    const onabort$ = fromEvent(reader, 'abort').subscribe(this.onabort.bind(this));
    const onloadstart$ = fromEvent(reader, 'onloadstart').subscribe(this.onError.bind(this));
    const onload$ = fromEvent(reader, 'load').pipe(map(e => reader.result))
                    .subscribe(this.onload.bind(this));
    reader.readAsDataURL(this.file);
  }

  onError(evt) {
    this.percentLoaded = 0;
    const {file} = this;
    this.error.emit({ file, evt });
  }

  updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      this.percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    }
  }

  onloadstart(evt) {
    this.percentLoaded = 0;
  }

  onabort(evt) {
    const {file} = this;
    this.error.emit({ file, evt });
  }

  onload(previewURL) {
    this.percentLoaded = 100;
    const {file} = this;
    this.complete.emit({ file, previewURL });
  }

  onDelete() {
    const {file} = this;
    this.delete.emit({ file });
  }
}
