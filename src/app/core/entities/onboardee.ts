export interface Onboardee {
  name: string,
  email: string,
  phone: string,
  demandId: string,
  onboardingStart: Date,
  onboardingEnd: Date,
  bgCheck: boolean,
  training: boolean,
  project: boolean
}