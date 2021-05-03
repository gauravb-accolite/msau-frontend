import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnboardeeDemandIdValidatorService } from '../custom-validators/onboardee-demand-id-validator.service';
import { OnboardeeEmailValidatorService } from '../custom-validators/onboardee-email-validator.service';
import { startDateValidator } from '../custom-validators/start-date.validator';
import { endDateValidator } from '../custom-validators/end-date.validator';
import { Demand } from '../entities/demand';
import { Employee } from '../entities/employee';
import { DemandService } from '../services/demand.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-new-onboardee',
  templateUrl: './new-onboardee.component.html',
  styleUrls: ['./new-onboardee.component.css']
})

export class NewOnboardeeComponent implements OnInit {

  employee: Employee
  demand: Demand

  constructor(private emailValidator: OnboardeeEmailValidatorService, private employeeService: EmployeeService, private demandIdValidator: OnboardeeDemandIdValidatorService, private demandService: DemandService) { }

  ngOnInit(): void {
    // subscrible to event for detecting email changes
    this.onboardeeForm.get('email').valueChanges.subscribe(val => {

      if (this.onboardeeForm.controls.email.valid) {
        console.log('valid', val)

        // get employee details
        this.employeeService.getEmployee(val).subscribe(
          (employee: Employee) => {
            this.employee = employee
            console.log(this.employee)
            this.onboardeeForm.controls.name.setValue(this.employee.name)
            this.onboardeeForm.controls.phone.setValue(this.employee.phone)
          }
        )
      }
    })

    // subscrible to event for detecting demand ID changes
    this.onboardeeForm.get('demandId').valueChanges.subscribe(val => {

      if (this.onboardeeForm.controls.demandId.valid) {
        console.log('valid', val)

        // get employee details
        this.demandService.getDemand(val).subscribe(
          (demand: Demand) => {
            this.demand = demand
            console.log(this.demand)
            this.onboardeeForm.controls.msHiringManager.setValue(this.demand.msHiringManager)
          }
        )
      }
    })

  }

  onboardeeForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, this.emailValidator.onboardeeEmailValidator()]),
    phone: new FormControl(),
    demandId: new FormControl('', [Validators.required, this.demandIdValidator.onboardeeDemandIDValidator()]),
    msHiringManager: new FormControl(),
    onboardingStart: new FormControl('', [Validators.required, startDateValidator()]),
    onboardingEnd: new FormControl('', [Validators.required, endDateValidator()]),
    skills: new FormControl()
  })

  onSubmit() {
    console.log(this.onboardeeForm.value);
  }  

}
