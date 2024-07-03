import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {Contact, ContactService} from "../services/contact.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  providers: [DialogService]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;
  ref: DynamicDialogRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    public dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactService.getContact(contactId);
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }

  editContact(contactId: number): void {
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
