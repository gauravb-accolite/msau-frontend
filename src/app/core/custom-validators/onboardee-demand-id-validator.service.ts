import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DemandService } from '../services/demand.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeDemandIdValidatorService {

  demands: Array<String>

  constructor(private demandService: DemandService) { }

  populateDemands(): void {
    if (!this.demands) {
      this.demandService.getAllDemandIDs().subscribe(
        (demands: Array<string>) => {
          this.demands = demands
          console.log(this.demands.length, `demand IDs`);
        }
      )  
    }
  }

  onboardeeDemandIDValidator(): ValidatorFn {
   
    return (control: AbstractControl): ValidationErrors | null => {
      const demandId : string = control.value

      if(demandId.length == 0) {
        return {'required': true}
      }

      this.populateDemands()
        
      if (this.demands?.includes(demandId)) {
        return null
      }
  
      return {'demandID': true}
    }
  }

}
