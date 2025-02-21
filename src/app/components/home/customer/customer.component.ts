import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { deleteCustomer, updateCustomer } from '../../../store/customer.actions';
import { Customer } from './customer.interface';
import * as CustomerActions from '../../../store/customer.actions';

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

  constructor(private store: Store<AppState>) {}

  updateCustomer(formData: Partial<Customer>) {
    const updatedCustomer = { ...this.customer, ...formData };
    this.store.dispatch(CustomerActions.updateCustomer({ customer: updatedCustomer }));
    this.closeModal(this.customer.id);
  }

  deleteCustomer() {
    if (confirm('Are you sure?')) {
      this.customerDeleted.emit(this.customer.id);
    }
  }

  closeModal(id: string) {
    // Close modal using vanilla JavaScript
    const modalElement = document.getElementById('updateCustomerModal' + id);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
