import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [OnboardingComponent, NotImplementedComponent, NavbarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ]
})
export class CoreModule { }
