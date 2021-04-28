import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: String = 'Morgan Stanley - AU';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if(!this.authService.getUser()) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/core')
    }
  }

}
