import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function startDateValidator(): ValidatorFn {
   
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate: Date = new Date(control.value)
    startDate.setHours(0, 0, 0, 0)

    const endDate: Date = new Date(control?.parent?.get('onboardingEnd').value)
    endDate.setHours(0, 0, 0, 0)

    if (endDate < startDate) {
      return {'invalidDateDiff': true}
    }

    const currDate: Date = new Date()
    currDate.setHours(0, 0, 0, 0)
    
    if (startDate < currDate) {
      return {'pastDate': true}    
    }

    return null

  }
}