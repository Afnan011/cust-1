import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';  // JSON Server API
  constructor(private http: HttpClient) { }

   // Fetch all customers
   getCustomers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add a new customer
  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  // Update a customer
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }  
}
