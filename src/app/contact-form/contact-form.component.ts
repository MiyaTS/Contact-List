import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {Contact, ContactService} from "../services/contact.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactId = this.config.data?.contactId || null;
    if (this.contactId) {
      const contact = this.contactService.getContact(this.contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = { id: this.contactId ? this.contactId : Date.now(), ...this.contactForm.value };
      if (this.contactId) {
        this.contactService.updateContact(contact);
      } else {
        this.contactService.addContact(contact);
      }
      this.ref.close();
    }
  }
}
