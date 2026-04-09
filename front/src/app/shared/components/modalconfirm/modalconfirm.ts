import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'areco-modalconfirm',
  imports: [],
  templateUrl: './modalconfirm.html',
  styleUrl: './modalconfirm.scss',
})
export class Modalconfirm {
  modalRef?: BsModalRef;

  title!: string;
  message!: string;

  subject!: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef
  ) { }

  confirm() {
    this.subject.next(true);
    this.subject.complete();
    this.bsModalRef.hide();
  }


  decline() {
    this.subject.next(false);
    this.subject.complete();
    this.bsModalRef.hide();
  }
}
