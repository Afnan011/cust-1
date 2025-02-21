import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersSubject = new BehaviorSubject<Customer[]>([]);

  constructor() {
    // Load initial data from localStorage
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
      this.customersSubject.next(this.customers);
    }
  }

  getCustomers(): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  addCustomer(customer: Customer): boolean {
    // Check for unique constraints
    if (this.isValueExists('id', customer.id) ||
        this.isValueExists('phone', customer.phone) ||
        this.isValueExists('email', customer.email)) {
      return false;
    }

    this.customers.push(customer);
    this.updateStorage();
    return true;
  }

  updateCustomer(customer: Customer): boolean {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index === -1) return false;

    // Check if updated phone or email conflicts with other customers
    const phoneExists = this.customers.some(c => c.id !== customer.id && c.phone === customer.phone);
    const emailExists = this.customers.some(c => c.id !== customer.id && c.email === customer.email);

    if (phoneExists || emailExists) return false;

    this.customers[index] = customer;
    this.updateStorage();
    return true;
  }

  deleteCustomer(id: string): void {
    this.customers = this.customers.filter(c => c.id !== id);
    this.updateStorage();
  }

  private isValueExists(field: 'id' | 'phone' | 'email', value: string): boolean {
    return this.customers.some(c => c[field] === value);
  }

  private updateStorage(): void {
    localStorage.setItem('customers', JSON.stringify(this.customers));
    this.customersSubject.next(this.customers);
  }
}