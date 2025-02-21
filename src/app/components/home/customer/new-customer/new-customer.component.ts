import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { createCustomer } from '../../../../store/customer.actions';
import { Customer } from '../customer.interface';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CustomerModalComponent],
  templateUrl: './new-customer.component.html'
})
export class NewCustomerComponent {
  @Output() customerCreated = new EventEmitter<Customer>();

  constructor(private store: Store<AppState>) {}

  createCustomer(formData: Partial<Customer>) {
    this.store.dispatch(createCustomer({
      customer: {
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone!
      }
    }));
    this.closeModal();
  }

  private closeModal() {
    const modal = document.getElementById('newCustomerModal');
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}
