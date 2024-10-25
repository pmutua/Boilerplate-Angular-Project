import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './components/home/home.component';
import { SupportPageComponent } from './components/support/support.component';
import { TermsAndConditionsPageComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy/privacy-policy.component';
import { NotFoundPageComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SupportPageComponent,
    TermsAndConditionsPageComponent,
    PrivacyPolicyPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
