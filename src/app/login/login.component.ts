import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser ,GoogleLoginProvider } from "angularx-social-login";
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private googleLoginService: SocialAuthService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getUser()) {
      console.log('Already logged in')
      this.router.navigateByUrl('/core')
    }

    this.googleLoginService.authState.subscribe((user) => {
      this.authService.setUser(user)
      console.log(user)
      this.router.navigateByUrl('/core')
    });
  }

  signInWithGoogle(): void {
    this.googleLoginService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }
}
