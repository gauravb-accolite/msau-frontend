import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { endDateValidator } from '../custom-validators/end-date.validator';
import { OnboardeeDemandIdValidatorService } from '../custom-validators/onboardee-demand-id-validator.service';
import { startDateValidator } from '../custom-validators/start-date.validator';
import { Demand } from '../entities/demand';
import { Onboardee } from '../entities/onboardee';
import { DemandService } from '../services/demand.service';
import { OnboardeeService } from '../services/onboardee.service';

@Component({
  selector: 'app-edit-onboardee',
  templateUrl: './edit-onboardee.component.html',
  styleUrls: ['./edit-onboardee.component.css']
})
export class EditOnboardeeComponent implements OnInit {

  email: string
  onboardee: Onboardee
  demand: Demand;

  constructor(private activatedRoute: ActivatedRoute, private onboardeeService: OnboardeeService, private demandIdValidator: OnboardeeDemandIdValidatorService, private router: Router, private demandService: DemandService) { }

  onboardeeForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    demandId: new FormControl(),
    msHiringManager: new FormControl(),
    onboardingStart: new FormControl(),
    onboardingEnd: new FormControl(),
    bgCheck: new FormControl(),
    training: new FormControl(),
    project: new FormControl(),
    skills: new FormControl()
  })

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.paramMap.get('email')
    this.onboardeeService.getOnboardee(this.email).subscribe(
      onboardee => {
        this.onboardee = onboardee
        this.onboardeeForm.setValue({...this.onboardee})
        this.setValidators()
      }
    )
  }

  setValidators = () => {

    this.onboardeeForm.controls.demandId.valueChanges.subscribe(
      value => {
        if (!this.onboardeeForm.controls.demandId.validator) {
          this.onboardeeForm.controls.demandId.setValidators([Validators.required, this.demandIdValidator.onboardeeDemandIDValidator()])
          this.onboardeeForm.controls.demandId.updateValueAndValidity()
        }

        if (this.onboardeeForm.controls.demandId.valid) {
          // get demand details
          this.demandService.getDemand(value).subscribe(
            (demand: Demand) => {
              this.demand = demand
              console.log(this.demand)
              this.onboardeeForm.controls.msHiringManager.setValue(this.demand.msHiringManager)
            }
          )
        }
      }
    )
    

    this.onboardeeForm.controls.onboardingStart.valueChanges.subscribe(
      value => {
        if (!this.onboardeeForm.controls.onboardingStart.validator) {
          this.onboardeeForm.controls.onboardingStart.setValidators([Validators.required, startDateValidator()])
          this.onboardeeForm.controls.onboardingStart.updateValueAndValidity()
        }
      }
    )
    

    this.onboardeeForm.controls.onboardingEnd.valueChanges.subscribe(
      value => {
        if (!this.onboardeeForm.controls.onboardingEnd.validator) {
          this.onboardeeForm.controls.onboardingEnd.setValidators([Validators.required, endDateValidator()])
          this.onboardeeForm.controls.onboardingEnd.updateValueAndValidity()
        }
      }
    )
  }

  onSubmit(updatedOnboardee: Onboardee) {
    this.onboardeeService.updateOnboardee(updatedOnboardee).subscribe(
      responseCode => {
        let navigationExtras: NavigationExtras
        if (responseCode == 0) {
          console.log('onboardee updation failed');
          navigationExtras = {state: {error: 'Could not update the onboardee'} }
        } else {
          console.log('onboardee creation success');
          navigationExtras = {state: {success: 'Onboardee updated successfully'} }
        }
        this.router.navigateByUrl('/core', navigationExtras)
      }
    )
  }

  deleteOnboardee() {
    this.onboardeeService.deleteOnboardee(this.email).subscribe(
      responseCode => {
        let navigationExtras: NavigationExtras
        if (responseCode == 0) {
          console.log('onboardee deletion failed');
          navigationExtras = {state: {error: 'Could not delete the onboardee'} }
        } else {
          console.log('onboardee creation success');
          navigationExtras = {state: {success: 'Onboardee deleted successfully'} }
        }
        this.router.navigateByUrl('/core', navigationExtras)
      }
    )
  }

}
