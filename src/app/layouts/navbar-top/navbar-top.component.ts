import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {NgxSpinnerService} from "ngx-spinner";
import {LocalStorageService} from "ngx-webstorage";
import {ThemeService} from "../../shared/themes/themes.service";
import {THEMES_ACTIVE, THEMES_DARK, THEMES_LIGHT} from "../../constant/storage.constant";
import {SearchModel} from "../../model/search.model";

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'navbar-top.component.html',
  styleUrls: ['navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  @Output() menuToggleDrawer = new EventEmitter<string>();
  @ViewChild('inputSearch', { static: false }) inputSearchElement?: ElementRef;
  searchQuery = '';
  searchQueryOld = '';
  isSearchExpanded = false;
  iconText = 'menu';
  themeSelect!: boolean;
  searchParam!: SearchModel;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private themoviedbService: ThemoviedbService,
    private spinner: NgxSpinnerService,
    private storage: LocalStorageService,
    private renderer: Renderer2
  ) {
  }

  toggleDrawer(): void {
    this.menuToggleDrawer.emit();
    this.iconText = this.iconText === 'menu' ? 'keyboard_double_arrow_left' : 'menu';
  }

  toggleSearch(): void {
    if (this.searchQuery != null && this.searchQuery.trim() !== '') {
      this.doSearch();
    } else {
      this.isSearchExpanded = !this.isSearchExpanded;
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
      if (themeActive.name === THEMES_LIGHT) {
        this.themeSelect = false;
      } else {
        this.themeSelect = true;
      }
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
      this.isSearchExpanded = false;
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

  resetSearchValue(): void {
    this.searchQuery = '';
    this.renderer.selectRootElement(this.inputSearchElement?.nativeElement).focus();
  }
}
