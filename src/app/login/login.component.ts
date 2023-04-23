import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService
  ) {}

  loginform: FormGroup = new FormGroup({});
  submitted = false;
  formvalue: any;

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginform.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
      return;
    } else {
      this.apiService
        .getuser(
          this.loginform.value.phoneNumber,
          this.loginform.value.password
        )
        .subscribe(
          (data: any) => {
            if (data.success == true) {
              Swal.fire('Success!', data.message, 'success');
              localStorage.setItem('token', data.token);
              localStorage.setItem(
                'username',
                this.loginform.value.phoneNumber
              );
              setTimeout(() => {
                localStorage.removeItem('token');
              }, 3.6e6);
              localStorage.setItem('id', data.userId);
              this.router.navigate(['/products']);
            }
          },
          (error) => {
            console.log(error);
            if (error.error.success == false) {
              Swal.fire('Fail!', error.error.message, 'error');
            }
          }
        );
    }
  }
}
