import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactDetailComponent} from "./contact-detail/contact-detail.component";
import {ContactFormComponent} from "./contact-form/contact-form.component";

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'add-contact', component: ContactFormComponent },
  { path: 'edit-contact/:id', component: ContactFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
