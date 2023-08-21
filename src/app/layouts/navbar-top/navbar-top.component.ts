import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from "../../shared/themes/themes.service";
import {ThemoviedbService} from "src/app/service/themoviedb-service";
import {IPage} from "src/app/model/page.model";

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
  pageIndex = 1;
  @Output() menuToggleDrawer = new EventEmitter<string>();

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private themovideoService: ThemoviedbService,
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
    if(this.searchQueryOld != this.searchQuery) {
      this.themovideoService.searchMovieByName(this.searchQuery,this.pageIndex).subscribe((data: IPage):void => {
        this.searchQueryOld = this.searchQuery;
        this.themovideoService.sendMoviesData(data.results);
      })
    }
  }
}
