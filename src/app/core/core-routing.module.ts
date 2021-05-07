import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditOnboardeeComponent } from './edit-onboardee/edit-onboardee.component';
import { NewOnboardeeComponent } from './new-onboardee/new-onboardee.component';

import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { TrendsComponent } from './trends/trends.component';

const routes: Routes = [
  {
    path: 'opportunity',
    component: NotImplementedComponent
  },
  {
    path: 'candidate',
    component: NotImplementedComponent
  },
  {
    path: 'course',
    component: NotImplementedComponent
  },
  {
    path: 'assessments',
    component: NotImplementedComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 'onboarding/new',
    component: NewOnboardeeComponent
  },
  {
    path: 'onboarding/:email',
    component: EditOnboardeeComponent
  },
  {
    path: 'trends',
    component: TrendsComponent
  },
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
