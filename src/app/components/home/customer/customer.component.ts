import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { HomeService } from '../home.service';
import { Customer } from './customer.interface';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, CustomerModalComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  @Input() customer!: Customer;
  @Output() customerDeleted = new EventEmitter<string>();
  @Output() customerUpdated = new EventEmitter<Customer>();

  constructor(private homeService: HomeService) {}

  updateCustomer(formData: Partial<Customer>) {
    this.homeService.updateCustomer(this.customer.id, formData).subscribe({
      next: (updatedCustomer) => {
        this.customerUpdated.emit(updatedCustomer);
        this.closeModal(this.customer.id);
      },
      error: (error) => {
        console.error('Error updating customer:', error);
      }
    });
  }

  deleteCustomer(id: string) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.homeService.deleteCustomer(id).subscribe({
        next: () => {
          this.customerDeleted.emit(id);
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
        }
      });
    }
  }

  private closeModal(id: string) {
    const modal = document.getElementById('updateCustomerModal' + id);
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}
