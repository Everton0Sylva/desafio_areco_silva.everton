import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/model/product';
import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['Teste de Produto II', Validators.required],
      price: [29.25, Validators.required],
      quantity: [50, Validators.required],
      description: ['Descrição do Produto de Teste']
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const formData = this.form.value;
      if (this.id) {

        console.log('Criando novo produto:', formData);
      } else {
        let that = this;
        let product = new Product(formData);
        this.productService.createProduct(formData)
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
    debugger
  }

}
