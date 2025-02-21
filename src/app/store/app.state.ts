import { Customer } from '../components/home/customer/customer.interface';

export interface AppState {
  customers: {
    list: Customer[];
    loading: boolean;
    error: string | null;
  };
} 