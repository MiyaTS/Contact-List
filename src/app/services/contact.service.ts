import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  email: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsKey = 'contacts';

  constructor() {
    this.initializeContacts();
  }

  private initializeContacts() {
    const contacts = this.getContacts();
    if (contacts.length === 0) {
      const initialContacts: Contact[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789', birthDate: '1990-01-01', email: 'john.doe@example.com', address: '123 Main St' },
        // додайте більше початкових контактів тут
      ];
      this.saveContacts(initialContacts);
    }
  }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.contactsKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  getContact(id: number): Contact | undefined {
    return this.getContacts().find(contact => contact.id === id);
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(contact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index > -1) {
      contacts[index] = contact;
      this.saveContacts(contacts);
    }
  }

  deleteContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter(contact => contact.id !== id);
    this.saveContacts(contacts);
  }
}
