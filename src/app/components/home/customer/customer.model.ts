import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal fade" [id]="modalId" tabindex="-1" [attr.aria-labelledby]="modalId + 'Label'" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" [id]="modalId + 'Label'">{{title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  formControlName="name"
                  placeholder="Enter customer name"
                >
                <div class="form-text text-danger" *ngIf="customerForm.get('name')?.errors?.['required'] && customerForm.get('name')?.touched">
                  Name is required
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  formControlName="email"
                  placeholder="Enter email address"
                >
                <div class="form-text text-danger" *ngIf="customerForm.get('email')?.errors?.['required'] && customerForm.get('email')?.touched">
                  Email is required
                </div>
                <div class="form-text text-danger" *ngIf="customerForm.get('email')?.errors?.['email'] && customerForm.get('email')?.touched">
                  Please enter a valid email address
                </div>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="phone" 
                  formControlName="phone"
                  placeholder="Enter phone number"
                >
                <div class="form-text text-danger" *ngIf="customerForm.get('phone')?.errors?.['required'] && customerForm.get('phone')?.touched">
                  Phone number is required
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="!customerForm.valid"
                >
                  {{submitButtonText}}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CustomerModalComponent implements OnInit {
  @Input() modalId!: string;
  @Input() title!: string;
  @Input() submitButtonText!: string;
  @Input() initialData: any = null;
  @Output() formSubmit = new EventEmitter<any>();

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });

  ngOnInit() {
    if (this.initialData) {
      this.customerForm.patchValue(this.initialData);
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.formSubmit.emit(this.customerForm.value);
      this.customerForm.reset();
    }
  }
}