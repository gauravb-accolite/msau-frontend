export interface Onboardee {
  name: string,
  email: string,
  phone: string,
  demandId: string,
  msHiringManager: string,
  onboardingStart: Date,
  onboardingEnd: Date,
  bgCheck: boolean,
  training: boolean,
  project: boolean,
  skills: Array<string>
}