import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from './customer/customer.interface';
import { AppState } from '../../store/app.state';
import * as CustomerActions from '../../store/customer.actions';
import { selectAllCustomers, selectLoading } from '../../store/customer.selectors';
import { CommonModule } from '@angular/common';
import { NewCustomerComponent } from './customer/new-customer/new-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { deleteCustomer } from '../../store/customer.actions';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CustomerComponent, NewCustomerComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.customers$ = this.store.select(selectAllCustomers);
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(CustomerActions.loadCustomers());
  }

  onCustomerDeleted(id: string) {
    this.store.dispatch(deleteCustomer({ id }));
  }

  onCustomerCreated(newCustomer: Customer) {
    this.store.dispatch(CustomerActions.createCustomer({ customer: newCustomer }));
  }

  onCustomerUpdated(updatedCustomer: Customer) {
    this.store.dispatch(CustomerActions.updateCustomer({ customer: updatedCustomer }));
  }

  getCustomerById(id: number) {
    console.log(this.customers$);
    this.store.dispatch(CustomerActions.getCustomerById({ id }));
  }
}
