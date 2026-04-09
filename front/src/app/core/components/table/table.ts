import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ITableAction } from '../../interface/itable-action';
import { ITableColumn } from '../../interface/itable-column';
import { ITableSort } from '../../interface/itable-sort';

@Component({
  selector: 'areco-table',
  imports: [
    CommonModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> {
  @Input() items: T[] = [];
  @Input() columns: ITableColumn[] = [];
  @Input() pageSize = 10;
  sort = { column: 'name', direction: '' as '' | 'asc' | 'desc' };
  page = { index: 0, size: 5 };



  currentPage = 0;
  currentPageSize = this.pageSize;
  selected = new Set<T>();
  sortState: ITableSort = { column: '', direction: '' };

  get total() { return this.items?.length ?? 0; }
  get totalPages() { return Math.max(1, Math.ceil(this.total / this.currentPageSize)); }
  get pageItems() {
    const start = this.currentPage * this.currentPageSize;
    return (this.items ?? []).slice(start, start + this.currentPageSize) as IRow[];
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
    // this.action.emit({ type, row });
  }
}


export interface IRow { [key: string]: string }
