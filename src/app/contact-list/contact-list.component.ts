import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {Contact, ContactService} from "../services/contact.service";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [DialogService]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private contactService: ContactService, private router: Router, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  searchContacts(): void {
    const term = this.searchTerm.toLowerCase();
    this.contacts = this.contactService.getContacts().filter(contact =>
      contact.firstName.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.phone.includes(term)
    );
  }

  viewContact(contactId: number): void {
    this.router.navigate(['/contact', contactId]);
  }

  deleteContact(contactId: number): void {
    this.contactService.deleteContact(contactId);
    this.contacts = this.contactService.getContacts();
  }

  showAddContactDialog(): void {
    this.ref = this.dialogService.open(ContactFormComponent, {
      header: 'Add Contact',
      width: '80%',
      contentStyle: {"max-height": "1000px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() => {
      this.contacts = this.contactService.getContacts();
    });
  }

  showEditContactDialog(contactId: number): void {
    this.ref = this.dialogService.open(ContactFormComponent, {
      header: 'Edit Contact',
      width: '80%',
      contentStyle: {"max-height": "1000px", "overflow": "auto"},
      baseZIndex: 10000,
      data: {
        contactId: contactId
      }
    });

    this.ref.onClose.subscribe(() => {
      this.contacts = this.contactService.getContacts();
    });
  }
}
