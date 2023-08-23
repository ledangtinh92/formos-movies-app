import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {NgxSpinnerService} from "ngx-spinner";
import {LocalStorageService} from "ngx-webstorage";
import {ThemeService} from "../../shared/themes/themes.service";
import {THEMES_ACTIVE} from "../../constant/storage.constant";
import {SearchModel} from "../../model/search.model";

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'navbar-top.component.html',
  styleUrls: ['navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  searchQuery: string;
  searchQueryOld: string;
  isSearchExpanded: boolean = false;
  iconText = 'menu';
  @Output() menuToggleDrawer = new EventEmitter<string>();
  themeSelect!: boolean;
  searchPamra! : SearchModel;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private themoviedbService: ThemoviedbService,
    private spinner: NgxSpinnerService,
    private storage: LocalStorageService,
  ) {
    this.searchQuery = '';
    this.searchQueryOld = '';
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
    this.searchPamra = this.themoviedbService.searchParams;
    this.themoviedbService.getSearchParamData().subscribe(value => {
      this.searchQuery = value.search;
    })

    const themeActive = this.storage.retrieve(THEMES_ACTIVE)
    if(themeActive){
      this.themeService.setTheme(themeActive.name);
      if (themeActive.name === 'light') {
        this.themeSelect = false;
      } else {
        this.themeSelect = true;
      }
    }else {
      this.storage.store(THEMES_ACTIVE,this.themeService.getActiveTheme());
    }
  }

  toggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
    this.storage.store(THEMES_ACTIVE,this.themeService.getActiveTheme());
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
      this.themoviedbService.searchParams.search = this.searchQueryOld;
      this.themoviedbService.searchParams.type = '';
      this.themoviedbService.searchParams.page = 0;
      this.themoviedbService.searchParams.genres = [];
      this.themoviedbService.sendSearchParam();
      this.themoviedbService.getMovieList().subscribe({
        next: result => {
          this.spinner.hide();
          if (result) {
            this.themoviedbService.sendMoviesData(result.results)
          }
        },
        error:err => {
          this.spinner.hide();
        }
      });
      this.router.navigate(['/movie']);
    }
  }

  clickHomeMenu():void {
    this.themoviedbService.searchParams.search = '';
    this.themoviedbService.searchParams.type = '';
    this.themoviedbService.searchParams.page = 0;
    this.themoviedbService.searchParams.genres = [];
    this.themoviedbService.sendSearchParam();
    this.router.navigate(['/']);
  }
}
