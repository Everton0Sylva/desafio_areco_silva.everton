import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'areco-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;

  id!: string


  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      descricao: ['']
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    })
  }

  onSubmit() {
    if (this.form.valid) {
      debugger
    }

  }
}
