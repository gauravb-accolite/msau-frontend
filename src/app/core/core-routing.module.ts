import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

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
