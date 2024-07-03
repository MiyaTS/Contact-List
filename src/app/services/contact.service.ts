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
  private contacts: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '0957638254', birthDate: '1990-01-01', email: 'john.doe@example.com', address: '123 Main St' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', birthDate: '1985-05-15', email: 'jane.smith@example.com', address: '456 Oak Ave' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', phone: '0923456789', birthDate: '1992-03-22', email: 'alice.johnson@example.com', address: '789 Pine Rd' },
    { id: 4, firstName: 'Bob', lastName: 'Brown', phone: '0934567890', birthDate: '1988-08-08', email: 'bob.brown@example.com', address: '101 Maple St' },
    { id: 5, firstName: 'Charlie', lastName: 'Davis', phone: '0912345678', birthDate: '1995-12-12', email: 'charlie.davis@example.com', address: '202 Elm St' }
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
    } else {
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.saveToLocalStorage();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.saveToLocalStorage();
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.saveToLocalStorage();
  }
}
