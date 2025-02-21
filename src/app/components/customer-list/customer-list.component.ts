// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer-list',
//   imports: [],
//   templateUrl: './customer-list.component.html',
//   styleUrl: './customer-list.component.scss'
// })
// export class CustomerListComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id);
    }
  }

  showAddForm(): void {
    this.router.navigate(['/customers/add']);
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/customers/edit', customer.id]);
  }
}
