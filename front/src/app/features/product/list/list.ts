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
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../shared/services/notification.service';

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

  private toastr: ToastrService = inject(ToastrService);

  private notificationService: NotificationService = inject(NotificationService);

  ngOnInit() {
    this.themeService.isDark$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isDark.set(value);
      });


    this.getProductsList(1);

    this.productService.products$.subscribe(list => {
      this.dataList.set(list);
    });
  }

  action(type: string, row: any) {
    let id = row?.id;
    if (type === 'delete') {
      let that = this;
      this.notificationService.confirm("Exclusão", "Deseja realmente deletar este produto?").then(confirmed => {
        if (confirmed) {
          this.productService.deleteProduct(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                that.toastr.success('Produto Deletado com sucesso!', 'Sucesso!');
                that.getProductsList(1);
              }, error: (err: any) => {
                that.toastr.error('Erro ao deletar Produto!', 'Falha!');
                console.log(err);
              }
            })
        }
      })
    } else if (type === 'edit') {
      if (id) this.router.navigate(['./edit', id], { relativeTo: this.route });
    }
  }
  getProductsList(page: number) {
    this.productService.getProducts(page, 10);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
