import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function endDateValidator(): ValidatorFn {
   
  return (control: AbstractControl): ValidationErrors | null => {
    const endDate: Date = new Date(control.value)
    endDate.setHours(0, 0, 0, 0)

    const startDate: Date = new Date(control?.parent?.get('onboardingStart').value)
    startDate.setHours(0, 0, 0, 0)

    if (endDate < startDate) {
      return {'invalidDateDiff': true}
    }

    const currDate: Date = new Date()
    currDate.setHours(0, 0, 0, 0)
    
    if (endDate < currDate) {
      return {'pastDate': true}    
    }

    return null

  }
}