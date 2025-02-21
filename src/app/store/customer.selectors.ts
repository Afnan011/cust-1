import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const selectCustomersState = createFeatureSelector<AppState['customers']>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  (state) => state.list
);

export const selectLoading = createSelector(
  selectCustomersState,
  (state) => state.loading
); 