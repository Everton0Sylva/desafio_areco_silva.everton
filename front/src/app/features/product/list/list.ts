import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, map, takeUntil, Observable } from 'rxjs';
import { ITableColumn } from '../../../core/interface/itable-column';
import { ProductService } from '../../../core/services/product.service';
import { Table } from '../../../core/components/table/table';
import { IProduct } from '../../../core/interface/iproduct';

@Component({
  selector: 'areco-list',
  imports: [
    Table
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  dataList: WritableSignal<IProduct[]> = signal(<IProduct[]>[]);

  columns: ITableColumn[] = [
    { key: 'Name', header: 'Nome', sortable: true },
    { key: 'Description', header: 'Descrição', sortable: true },
    { key: 'price', header: 'Preço', sortable: false },
    { key: 'Quantity', header: 'Estoque', sortable: false },
  ];

  private productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts(1, 10);

    this.productService.products$.subscribe(list => {
      this.dataList.set(list);
    });
  }
  /*
  computeView() {
    const search = this.searchTerm?.toLowerCase() ?? '';
    let filtered = this.all.filter(p => p.name.toLowerCase().includes(search) || (p.sku ?? '').toLowerCase().includes(search));
    // aplicar sort se necessário
    const start = this.page.index * this.page.size;
    this.view = { total: filtered.length, data: filtered.slice(start, start + this.page.size) };
  }

  onSearch(term: string) { this.searchTerm = term; this.page.index = 0; this.computeView(); }
  onPageChange(i: number) { this.page.index = i; this.computeView(); }
  onPageSizeChange(s: number) { this.page.size = Number(s); this.page.index = 0; this.computeView(); }
  onSort(ev: SortEvent) { /* aplicar sort no this.all e computeView()  }
  onAction(ev: ActionEvent<Product>) {
    if (ev.type === 'delete') this.productService.delete(ev.row.id).subscribe(() => this.computeView());
    if (ev.type === 'edit') this.router.navigate(['/produtos', ev.row.id]);
  }*/

}
