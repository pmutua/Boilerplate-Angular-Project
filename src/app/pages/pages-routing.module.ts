import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home.component';
import { SupportPageComponent } from './components/support/support.component';
import { TermsAndConditionsPageComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy/privacy-policy.component';
import { NotFoundPageComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'help', component: SupportPageComponent },
  { path: 'terms', component: TermsAndConditionsPageComponent },
  { path: 'privacy', component: PrivacyPolicyPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
