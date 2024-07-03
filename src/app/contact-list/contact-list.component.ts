import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {Contact, ContactService} from "../services/contact.service";
import { InputTextModule } from 'primeng/inputtext';
import {TranslateService} from "@ngx-translate/core";

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

  constructor(private contactService: ContactService, private router: Router, public dialogService: DialogService,   private translateService: TranslateService) {}

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
    this.translateService.get('CONTACT.ADD_CONTACT').subscribe((translatedText: string) => {
      this.ref = this.dialogService.open(ContactFormComponent, {
        header: translatedText,
        width: '80%',
        contentStyle: {"max-height": "1000px", "overflow": "auto"},
        baseZIndex: 10000
      });
    });
  }

  showEditContactDialog(contactId: number): void {
    this.translateService.get('CONTACT.EDIT_CONTACT').subscribe((translatedText: string) => {
      this.ref = this.dialogService.open(ContactFormComponent, {
        header: translatedText,
        width: '80%',
        contentStyle: {"max-height": "1000px", "overflow": "auto"},
        baseZIndex: 10000,
        data: {
          contactId: contactId
        }
      });
    });
  }
}
