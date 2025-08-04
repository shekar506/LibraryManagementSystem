import { Component, signal } from '@angular/core';
import { NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { ManageBooks } from './admin/manage-books/manage-books';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ManageBooks,RouterModule,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router, private authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

   this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    const token = localStorage.getItem('token');
    if (!token && event.url !== '/login' && event.url !== '/register') {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
});

  }
}

