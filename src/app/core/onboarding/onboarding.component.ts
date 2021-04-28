import { Component, OnInit } from '@angular/core';
import { Onboardee } from '../entities/onboardee';
import { OnboardeeService } from '../services/onboardee.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  onboardees: Array<Onboardee>

  constructor(private onboardeeService: OnboardeeService) { }

  ngOnInit(): void {
    this.onboardeeService.getAllOnboardees().subscribe(
      (onboardees: Array<Onboardee>) => {
        this.onboardees = onboardees
        console.log(this.onboardees);
      }
    )
  }

  extractLocation = (demandId: String): String => (demandId.slice(0, 3) == 'MUM' ? 'Mumbai' : 'Bangalore')

  displayOnboardee = (email: String): void => console.log(email)

}
