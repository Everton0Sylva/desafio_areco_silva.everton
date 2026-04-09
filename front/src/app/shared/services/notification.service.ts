import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Modalconfirm } from '../components/modalconfirm/modalconfirm';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private modalService: BsModalService) { }

  confirm(title: string, message: string): Promise<boolean> {
    const subject = new Subject<boolean>();
    const modalRef: BsModalRef = this.modalService.show(Modalconfirm, {
      initialState: { title, message, subject }
    });

    return subject.toPromise() as Promise<boolean>;
  }
}

