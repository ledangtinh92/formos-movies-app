import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from "../../shared/themes/themes.service";

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchQuery: string;
  isSearchExpanded: boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.searchQuery = '';
  }

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  onBlur() {
    if (this.searchQuery.trim() === '') {
      this.isSearchExpanded = false;
    }
  }

  ngOnInit(): void {
  }

  toggle():void {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
