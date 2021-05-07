import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Onboardee } from '../entities/onboardee';
import { OnboardeeService } from '../services/onboardee.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  onboardees: Array<Onboardee>
  error: string
  success: string

  constructor(private onboardeeService: OnboardeeService, private router: Router) { 
    const nav: Navigation = this.router.getCurrentNavigation()
    const state = nav.extras.state
    if (state) {
      if ('error' in state) {
        this.error = state.error
      } else if ('success' in state) {
        this.success = state.success
      }  
    }
  }

  ngOnInit(): void {
    this.onboardeeService.getAllOnboardees().subscribe(
      (onboardees: Array<Onboardee>) => {
        this.onboardees = onboardees
      }
    )
  }

  extractLocation = (demandId: String): String => (demandId.slice(0, 3) == 'MUM' ? 'Mumbai' : 'Bangalore')

}
