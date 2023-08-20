import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from "../../shared/themes/themes.service";

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'navbar-top.component.html',
  styleUrls: ['navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  searchQuery: string;
  isSearchExpanded: boolean = false;
  iconText = 'menu';
  @Output() menuToggleDrawer = new EventEmitter<string>();

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.searchQuery = '';
  }

  toggleDrawer() {
    this.menuToggleDrawer.emit();
    this.iconText = this.iconText === 'menu' ? 'keyboard_double_arrow_left' : 'menu';
  }

  toggleSearch():void {
    this.isSearchExpanded = !this.isSearchExpanded;
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
  onBlur() {
    if (this.searchQuery.trim() === '') {
      this.isSearchExpanded = false;
    }
  }

  doSearch():void {

  }
}
