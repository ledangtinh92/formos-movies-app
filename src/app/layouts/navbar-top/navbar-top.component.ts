import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from "../../shared/themes/themes.service";
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {IPage} from "src/app/model/page.model";
import {DiscoverType} from "../../enums/discover.type.model";
import {NgxSpinnerService} from "ngx-spinner";

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

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private themovideoService: ThemoviedbService,
    private spinner: NgxSpinnerService
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
    this.searchQuery = this.themovideoService.searchParams.search;
  }

  toggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

  onBlur(): void {
    if (this.searchQuery.trim() === '') {
      this.isSearchExpanded = false;
    }
  }

  doSearch(): void {
    this.spinner.show();
    if (this.searchQueryOld != this.searchQuery) {
      this.searchQueryOld = this.searchQuery;
      this.themovideoService.searchParams.search = this.searchQueryOld;
      this.themovideoService.searchParams.type = '';
      this.themovideoService.searchParams.page = 0;
      this.themovideoService.getMovieList().subscribe({
        next: result => {
          if (result) {
            this.themovideoService.sendMoviesData(result.results)
          }
          this.spinner.hide();
        },
        error:err => {
          this.spinner.hide();
        }
      });
      this.router.navigate(['/movie']);
    }
  }
}
