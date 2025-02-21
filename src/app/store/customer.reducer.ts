import { createReducer, on } from '@ngrx/store';
import { Customer } from '../components/home/customer/customer.interface';
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  list: [],
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    list: customers,
    loading: false
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({ ...state, error })),
  on(CustomerActions.createCustomerSuccess, (state, { customer }) => ({ ...state, list: [...state.list, customer] })),
  on(CustomerActions.deleteCustomerSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(customer => customer.id !== id)
  })),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    list: state.list.map(c => c.id === customer.id ? customer : c)
  }))
);
