import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private googleLoginService: SocialAuthService, public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.googleLoginService.signOut()
    this.authService.unsetUser()
    this.router.navigateByUrl('/core')
  }

}
