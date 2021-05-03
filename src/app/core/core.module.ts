import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditOnboardeeComponent } from './edit-onboardee/edit-onboardee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewOnboardeeComponent } from './new-onboardee/new-onboardee.component';


@NgModule({
  declarations: [
    OnboardingComponent, 
    NotImplementedComponent, 
    NavbarComponent, 
    EditOnboardeeComponent,
    NewOnboardeeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
