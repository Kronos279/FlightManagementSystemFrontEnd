import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  navbarOpen = false;
  router = inject(Router)

  token:boolean;
  constructor(private authService:AuthServiceService){
    this.token = authService.isAuthenticated();

  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout(){
    this.authService.Logout();
    console.log(this.authService.isAuthenticated());
    this.router.navigate(["/"])
    alert("Your are now LoggedOut")
  }

  ngOnInit(){
    this.authService.loggedIn$.subscribe((res)=>{this.token=res});
  }
}
