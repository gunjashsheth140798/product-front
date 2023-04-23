import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.apiService.getProduct(id).subscribe((product: any) => {
        this.product = product.data;
      });
    });
  }

  editDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/editproduct', id]);
    } else {
      console.error('Product ID is undefined.');
    }
  }

  deleteProduct(product: any | undefined): void {
    if (product) {
      Swal.fire({
        title: 'Do you want to delete the ' + product.name + ' ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.deleteProduct(product._id).subscribe(
            (data: any) => {
              if (data.success === true) {
                Swal.fire('Deleted!', data.message, 'success');
                this.router.navigate(['/']);
              }
            },
            (error: any) => {
              if (error.error.success == false) {
                Swal.fire('Fail!', error.error.message, 'error');
              }
            }
          );
        } else if (result.isDenied) {
          Swal.fire('Product are not Deleted', '', 'info');
        }
      });
    }
  }
}
