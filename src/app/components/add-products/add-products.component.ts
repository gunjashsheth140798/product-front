import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  submitted = false;
  id: string = '';

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEditMode = true;
        this.apiService.getProduct(this.id).subscribe((product: any) => {
          this.productForm.patchValue({
            name: product.data.name,
            description: product.data.description,
            price: product.data.price,
          });
        });
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      console.log(JSON.stringify(this.productForm.value, null, 2));
      if (this.isEditMode) {
        this.apiService
          .editProduct(this.id, JSON.stringify(this.productForm.value, null, 2))
          .subscribe(
            (product: any) => {
              if (product.success === true) {
                Swal.fire('Success!', product.message, 'success');
                this.router.navigate(['/products']);
              }
            },
            (error: any) => {
              if (error.error.success == false) {
                Swal.fire('Fail!', error.error.message, 'error');
              }
            }
          );
      } else {
        this.apiService
          .addProduct(JSON.stringify(this.productForm.value, null, 2))
          .subscribe(
            (product: any) => {
              if (product.success === true) {
                Swal.fire('Success!', product.message, 'success');
                this.router.navigate(['/products']);
              }
            },
            (error: any) => {
              if (error.error.success == false) {
                Swal.fire('Fail!', error.error.message, 'error');
              }
            }
          );
      }
    }
  }
}
