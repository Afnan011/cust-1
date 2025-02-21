import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HomeService } from '../components/home/home.service';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffects {

    private actions$ = inject(Actions);
    private homeService = inject(HomeService);

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() => this.homeService.getCustomers().pipe(
        map(customers => CustomerActions.loadCustomersSuccess({ customers })),
        catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
      ))
    )
  );

  createCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomer),
      mergeMap(({ customer }) => this.homeService.createCustomer(customer).pipe(
        map(createdCustomer => CustomerActions.createCustomerSuccess({ customer: createdCustomer })),
        catchError(error => of(CustomerActions.createCustomerFailure({ error: error.message })))
      ))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(({ customer }) => this.homeService.updateCustomer(customer.id, customer).pipe(
        map(updatedCustomer => CustomerActions.updateCustomerSuccess({ customer: updatedCustomer })),
        catchError(error => of(CustomerActions.updateCustomerFailure({ error: error.message })))
      ))
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(({ id }) => this.homeService.deleteCustomer(id).pipe(
        map(() => CustomerActions.deleteCustomerSuccess({ id })),
        catchError(error => of(CustomerActions.deleteCustomerFailure({ error: error.message })))
      ))
    )
  );

  getCustomerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.getCustomerById),
      mergeMap(({ id }) => this.homeService.getCustomerById(id).pipe(
        map(customer => CustomerActions.loadCustomersSuccess({ customers: [customer] })),
        catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
      ))
    )
  );
}