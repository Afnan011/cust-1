import { createAction, props } from '@ngrx/store';
import { Customer } from '../components/home/customer/customer.interface';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: Customer[] }>()
);
export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>()
);

export const createCustomer = createAction(
  '[Customer] Create Customer',
  props<{ customer: Omit<Customer, 'id'> }>()
);
export const createCustomerSuccess = createAction(
  '[Customer] Create Customer Success',
  props<{ customer: Customer }>()
);
export const createCustomerFailure = createAction(
  '[Customer] Create Customer Failure',
  props<{ error: string }>()
);

export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ customer: Customer }>()
);
export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success',
  props<{ customer: Customer }>()
);
export const updateCustomerFailure = createAction(
  '[Customer] Update Customer Failure',
  props<{ error: string }>()
);

export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id: string }>()
);
export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ id: string }>()
);
export const deleteCustomerFailure = createAction(
  '[Customer] Delete Customer Failure',
  props<{ error: string }>()
);

export const getCustomerById = createAction(
  '[Customer] Get Customer',
  props<{ id: number }>()
);
