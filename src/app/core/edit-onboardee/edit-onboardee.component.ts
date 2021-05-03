import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-onboardee',
  templateUrl: './edit-onboardee.component.html',
  styleUrls: ['./edit-onboardee.component.css']
})
export class EditOnboardeeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.onboardeeForm.value);
  }  

}
