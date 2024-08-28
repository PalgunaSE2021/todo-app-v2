// navbar.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  lastScrollTop = 0;
  navbarVisible = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // User is scrolling down
      this.navbarVisible = false;
    } else {
      // User is scrolling up
      this.navbarVisible = true;
    }

    this.lastScrollTop = scrollTop;
  }
}
