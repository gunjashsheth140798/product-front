import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService
      .getProducts(this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.products = data.data;
          this.size = data.count;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  gotoDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/product-details', id]);
    } else {
      console.error('Product ID is undefined.');
    }
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
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.apiService.deleteProduct(product._id).subscribe(
            (data: any) => {
              if (data.success === true) {
                Swal.fire('Deleted!', data.message, 'success');
                this.ngOnInit();
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

  handlePageSizeChange(): void {
    this.page = 1;
    this.ngOnInit();
  }
}
