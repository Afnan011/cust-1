import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { HomeService } from '../../home.service';
import { Customer } from '../customer.interface';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, CustomerModalComponent],
  templateUrl: './new-customer.component.html',

})
export class NewCustomerComponent {
  @Output() customerCreated = new EventEmitter<Customer>();

  constructor(private homeService: HomeService) {}

  createCustomer(formData: Partial<Customer>) {
    this.homeService.createCustomer(formData).subscribe({
      next: (newCustomer) => {
        this.customerCreated.emit(newCustomer);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating customer:', error);
      }
    });
  }

  private closeModal() {
    const modal = document.getElementById('newCustomerModal');
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}
