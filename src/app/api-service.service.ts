import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  basePath2 = 'http://localhost:5000/api/v1/';
  // basePath2 =
  //   'http://product-back-9vo2w3tcg-gunjashsheth140798.vercel.app/api/v1/';
  a = window.location.hostname;
  basePath = this.a === 'localhost' ? this.basePath2 : environment.basePath;

  constructor(private router: Router, private http: HttpClient) {}

  getProducts(search: string, page: number, pagesize: number) {
    if (search) {
      return this.http.get<[]>(
        this.basePath +
          'products?searchTerm=' +
          search +
          '&page=' +
          page +
          '&limit=' +
          pagesize,
        {
          headers: { ['Content-Type']: 'application/json' },
        }
      );
    } else {
      return this.http.get<[]>(
        this.basePath + 'products?page=' + page + '&limit=' + pagesize,
        {
          headers: { ['Content-Type']: 'application/json' },
        }
      );
    }
  }

  getProduct(id: string) {
    return this.http.get<[]>(this.basePath + 'products/' + id, {
      headers: { ['Content-Type']: 'application/json' },
    });
  }

  addProduct(data: any) {
    return this.http.post<[]>(this.basePath + 'products', data, {
      headers: { ['Content-Type']: 'application/json' },
    });
  }

  editProduct(id: string, data: any) {
    return this.http.put<[]>(this.basePath + 'products/' + id, data, {
      headers: { ['Content-Type']: 'application/json' },
    });
  }

  deleteProduct(id: string) {
    return this.http.delete<[]>(this.basePath + 'products/' + id, {
      headers: { ['Content-Type']: 'application/json' },
    });
  }

  getuser(mobile: number, passwordValue: string) {
    return this.http.post<[]>(
      this.basePath + 'getuser',
      { phonenumber: mobile, password: passwordValue },
      { headers: { ['Content-Type']: 'application/json' } }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
