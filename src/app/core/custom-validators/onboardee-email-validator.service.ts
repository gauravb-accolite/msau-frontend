import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { EmployeeService } from '../services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeEmailValidatorService {

  employees: Array<String>

  constructor(private employeeService: EmployeeService) { }

  populateEmails(): void {
    if (!this.employees) {
      this.employeeService.getAllEmployeeEmails().subscribe(
        (employees: Array<string>) => {
          this.employees = employees
          console.log(this.employees.length, `emails`);
        }
      )  
    }
  }

  onboardeeEmailValidator(): ValidatorFn {
   
    return (control: AbstractControl): ValidationErrors | null => {
      const email : string = control.value

      if(email.length == 0) {
        return {'required': true}
      }

      this.populateEmails()
        
      if (this.employees?.includes(email)) {
        return null
      }
  
      return {'employeeEmail': true}
    }
  }

}
