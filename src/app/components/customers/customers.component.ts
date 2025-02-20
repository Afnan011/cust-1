import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
  customers: any[] = [];
  newCustomer = { id: '0', name: '', email: '', phno: '', gender: '' };
  successMessage: string = '';
  errorMessage: string = '';

  isModalOpen: boolean = false; // Controls modal visibility
  selectedCustomer: any = {};   // Stores the customer being edited

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }
  
  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('Error fetching customers:', error)
    });
  }
  
  addCustomer(): void {
    if (!this.newCustomer.name || !this.newCustomer.email || !this.newCustomer.phno) return;
    const newId = this.customers.length > 0 ? Math.max(...this.customers.map(c => c.id)) + 1 : 1;
    this.newCustomer.id = newId.toString();
    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: (data) => {
        this.customers.push(data);
        this.newCustomer = { id: '0', name: '', email: '', phno: '', gender: '' };
        this.successMessage = 'Customer added successfully!';
        console.log('Customer added');
      },
      error: (error) => console.error('Error adding customer:', error)
    });
  }
  
  openUpdateModal(customer: any): void {
    this.selectedCustomer = { ...customer }; // Copy the customer object
    this.isModalOpen = true;
  }

  updateCustomer(customer: any): void {
    this.customerService.updateCustomer(customer.id, customer).subscribe({
      next: () => {
        const index = this.customers.findIndex((c) => c.id === customer.id);
        this.successMessage = 'Customer updated successfully!';
        console.log('Customer updated');
        if (index !== -1) this.customers[index] = { ...customer };
        this.closeModal();
      },
      error: (error) => console.error('Error updating customer:', error),
    });
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        (this.customers = this.customers.filter((c) => c.id !== id));
        this.successMessage = 'Customer deleted successfully!';
        console.log('Customer deleted');
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
        this.errorMessage = 'Error deleting customer. Please try again.';
      }
    });
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = {};
  }
}
