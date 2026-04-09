import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ITableAction } from '../../interface/itable-action';
import { ITableColumn } from '../../interface/itable-column';
import { ITableSort } from '../../interface/itable-sort';
import { CurrPipe } from '../../../shared/pipes/currpipe.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IRestResponse } from '../../interface/irestresponse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'areco-table',
  imports: [
    CommonModule,
    FormsModule,
    CurrPipe,
    PaginationModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> {
  @Input() restResp: IRestResponse<T> = {
    data: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1
  };
  @Input() columns: ITableColumn[] = [];

  @Output() action = new EventEmitter();

  sort = { column: 'name', direction: '' as '' | 'asc' | 'desc' };
  page = { index: 0, size: 5 };


  sortState: ITableSort = { column: '', direction: '' };

  get total() { return this.restResp?.totalCount ?? 0; }
  get totalPages() { return this.restResp?.totalPages ?? Math.max(1, Math.ceil(this.total / this.restResp?.pageSize)); }

  get pageItems() {
    return this.restResp?.data as IRow[];
  }

  toggleSort(column: string) {
    let dir: ITableSort['direction'] = 'asc';
    if (this.sortState.column === column) {
      dir = this.sortState.direction === 'asc' ? 'desc' : this.sortState.direction === 'desc' ? '' : 'asc';
    }
    this.sortState = { column, direction: dir };
    // this.sort.emit(this.sortState);
  }

  // ações
  emitAction(type: string, row: IRow) {
    this.action.emit({ type, row });

  }

  pageChanged(event: any): void {
    // this.currentPage = event.page;
  }
}


export interface IRow { [key: string]: string }
