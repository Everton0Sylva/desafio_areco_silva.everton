import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, map, takeUntil, Observable } from 'rxjs';
import { ITableColumn } from '../../../core/interface/itable-column';
import { ProductService } from '../../../core/services/product.service';
import { Table } from '../../../core/components/table/table';
import { IProduct } from '../../../core/interface/iproduct';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { IRestResponse } from '../../../core/interface/irestresponse';

@Component({
  selector: 'areco-list',
  imports: [
    Table,
    RouterLink,
    CommonModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  dataList: WritableSignal<IRestResponse<IProduct>> = signal({
    data: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1
  });
  isDark = signal(false);
  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);


  columns: ITableColumn[] = [
    { key: 'name', header: 'Nome', sortable: true },
    { key: 'description', header: 'Descrição', sortable: true },
    { key: 'price', header: 'Preço', sortable: false, obs: 'currency' },
    { key: 'quantity', header: 'Estoque', sortable: false },
  ];

  private productService = inject(ProductService);
  private router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.themeService.isDark$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isDark.set(value);
      });


    this.productService.getProducts(1, 10);

    this.productService.products$.subscribe(list => {
      this.dataList.set(list);
    });
  }

  action(type: string, row: any) {
    if (type === 'delete') {
      this.productService.deleteProduct(row.id);
    } else if (type === 'edit') {
      let id = row?.id;
      if (id) this.router.navigate(['./edit', id], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
