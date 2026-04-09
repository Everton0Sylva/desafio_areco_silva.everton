import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/model/product';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'areco-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;

  id!: string


  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      description: [null]
    });
  }


  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      if (this.id) {
        this.productService.getProductById(this.id).subscribe({
          next: (product) => {
            this.form.patchValue(product);
          }, error: (err) => {
            console.log(err);
            this.toastr.error('Erro ao carregar Produto!', 'Falha!');
          }
        })
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const formData = this.form.value;
      let that = this;
      if (this.id) {
        let product = new Product(formData);
        product.Id = this.id;
        this.productService.updateProduct(this.id, product)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              that.toastr.success('Produto atualizado com sucesso!', 'Sucesso!');
            }, error: (err: any) => {
              that.toastr.error('Erro ao atualizar Produto!', 'Falha!');
              console.log(err);
            }
          })
      } else {
        this.productService.createProduct(formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              that.toastr.success('Produto criado com sucesso!', 'Sucesso!');
            }, error: (err: any) => {
              that.toastr.error('Erro ao criar Produto!', 'Falha!');
              console.log(err);
            }
          })
      }
    }
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
