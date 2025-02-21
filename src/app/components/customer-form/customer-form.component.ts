// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer-form',
//   imports: [],
//   templateUrl: './customer-form.component.html',
//   styleUrl: './customer-form.component.scss'
// })
// export class CustomerFormComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const customer = this.customerService.getCustomerById(id);
      if (customer) {
        this.customerForm.patchValue(customer);
        this.customerForm.get('id')?.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.value;
      if (this.isEditing) {
        formValue.id = this.route.snapshot.paramMap.get('id');
      }
      
      let success: boolean;
      if (this.isEditing) {
        success = this.customerService.updateCustomer(formValue);
      } else {
        success = this.customerService.addCustomer(formValue);
      }

      if (success) {
        this.router.navigate(['/customers']);
      } else {
        alert('Operation failed. ID, phone, or email already exists.');
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }
}
