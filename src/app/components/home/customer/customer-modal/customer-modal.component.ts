import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-modal.component.html',
})
export class CustomerModalComponent implements OnInit {
  @Input() modalId!: string;
  @Input() title: string = 'Create Customer';
  @Input() buttonText: string = 'Create';
  @Input() customer: any = null;
  @Output() formSubmit = new EventEmitter<any>();

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });

  ngOnInit() {
    if (this.customer) {
      this.customerForm.patchValue({
        name: this.customer.name,
        email: this.customer.email,
        phone: this.customer.phone
      });
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.formSubmit.emit(this.customerForm.value);
      if (!this.customer) {
        this.customerForm.reset();
      }
    }
  }
} 