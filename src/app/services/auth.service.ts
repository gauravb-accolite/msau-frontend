import { Injectable, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: SocialUser

  constructor() { }

  setUser = (user: SocialUser): void => {
    if (user) {
      this.user = user
      localStorage.setItem("user", JSON.stringify(user))
    }
  }

  getUser = (): SocialUser => {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem("user"))
    }
    return this.user
  }

  unsetUser = (): void => {
    localStorage.removeItem("user")
  }

}
