import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ThemoviedbService} from "@service/themoviedb-service";
import {NgxSpinnerService} from "ngx-spinner";
import {LocalStorageService} from "ngx-webstorage";
import {ThemeService} from "@shared/themes/themes.service";
import {THEMES_ACTIVE, THEMES_DARK, THEMES_LIGHT} from "@constant/storage.constant";
import {SearchModel} from "@model/search.model";
import {fadeAnimations} from "@shared/animations/fade-animations";

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'navbar-top.component.html',
  styleUrls: ['navbar-top.component.scss'],
  animations: fadeAnimations,
})
export class NavbarTopComponent implements OnInit {
  @Output() menuToggleDrawer = new EventEmitter<string>();
  @ViewChild('inputSearch', {static: false}) inputSearchElement?: ElementRef;
  searchQuery = '';
  searchQueryOld = '';
  isSearchExpanded = false;
  iconText = 'menu';
  themeSelect!: boolean;
  searchParam!: SearchModel;

  isInputVisible = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private themoviedbService: ThemoviedbService,
    private spinner: NgxSpinnerService,
    private storage: LocalStorageService,
  ) {
  }

  toggleDrawer(): void {
    this.menuToggleDrawer.emit();
    this.iconText = this.iconText === 'menu' ? 'keyboard_double_arrow_left' : 'menu';
  }

  toggleInputVisibility(): void {
    if (this.searchQuery != null && this.searchQuery.trim() !== '') {
        this.doSearch();
    } else {
      if (document.activeElement === this.inputSearchElement?.nativeElement) {
          return;
      } else {
        this.isInputVisible = !this.isInputVisible;
        if (this.isInputVisible) {
          this.inputSearchElement?.nativeElement.focus();
        }
      }
    }
  }

  ngOnInit(): void {
    this.searchParam = this.themoviedbService.searchParams;
    this.themoviedbService.getSearchParamData().subscribe(value => {
      this.searchQuery = value.search;
      if (this.searchQuery.trim() == '') {
        this.isSearchExpanded = false;
      }
    })

    const themeActive = this.storage.retrieve(THEMES_ACTIVE)
    if (themeActive) {
      this.themeService.setTheme(themeActive.name);
      this.themeSelect = themeActive.name !== THEMES_LIGHT;
    } else {
      this.storage.store(THEMES_ACTIVE, this.themeService.getActiveTheme());
    }
  }

  toggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === THEMES_LIGHT) {
      this.themeService.setTheme(THEMES_DARK);
    } else {
      this.themeService.setTheme(THEMES_LIGHT);
    }
    this.storage.store(THEMES_ACTIVE, this.themeService.getActiveTheme());
  }

  onBlur(): void {
    if (this.searchQuery.trim() === '') {
      this.isInputVisible = false;
    }
  }

  doSearch(): void {
    if (this.searchQueryOld != this.searchQuery) {
      this.spinner.show();
      this.searchQueryOld = this.searchQuery;
      this.themoviedbService.searchParams.setSearch(this.searchQueryOld);
      this.themoviedbService.sendSearchParam();
      this.router.navigate(['/movies/search']);
    }
  }

  clickHomeMenu(): void {
    this.themoviedbService.searchParams.clear();
    this.themoviedbService.sendSearchParam();
    this.router.navigate(['/']);
  }
}
