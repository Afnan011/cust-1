import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import { NewCustomerComponent } from './customer/new-customer/new-customer.component';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CustomerComponent, NewCustomerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  customers: any[] = [];
  
  constructor(private homeService: HomeService) {
    this.loadCustomers();
  }
  
  loadCustomers() {
    this.homeService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  onCustomerCreated(newCustomer: any) {
    this.customers.push(newCustomer);
  }

  onCustomerDeleted(id: string) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  onCustomerUpdated(updatedCustomer: any) {
    this.customers = this.customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
  }

  getCustomerById(id: number) {
    console.log(this.customers);
    this.homeService.getCustomerById(id).subscribe((data) => {
      console.log(data);
    });
  }

}
