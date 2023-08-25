import {Component, OnInit} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IGenresModel} from "../../model/genre.model";
import {DiscoverTypeEnums} from "../../enums/discover.type.enums";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss'],
})
export class NavbarRightComponent implements OnInit {
  genres: IGenresModel[] = [];
  selectedGenres: IGenresModel[] = [];
  discoverType = DiscoverTypeEnums;

  constructor(private themoviedbService: ThemoviedbService,
              private router: Router,
              private spinner: NgxSpinnerService,) {
  }

  ngOnInit(): void {
    this.themoviedbService.getAllGenresOfMovie().subscribe(
      {
        next: value => {
          if (value) {
            this.genres = value.map(genre => ({...genre, checked: false}));
          }
        }
      }
    )
    this.themoviedbService.getSearchParamData().subscribe(value => {
      if (value.genres.length == 0 && this.genres.length > 0) {
        this.genres.forEach(genre => genre.checked = false);
      }
    });
  }

  onCheckboxChange(): void {
    this.selectedGenres = this.genres.filter(genre => genre.checked);
    this.themoviedbService.searchParams.setGenres(this.selectedGenres);
    this.themoviedbService.sendSearchParam();
    const selectedGenresList = this.selectedGenres.map(genred => genred.name?.toLowerCase()).join(',');
    this.router.navigate(['/movies/' + DiscoverTypeEnums.GENRES], {queryParams: {list: selectedGenresList}});
  }

  routerLinkDiscover(POPULAR: DiscoverTypeEnums): void {
    this.spinner.show();
    this.themoviedbService.searchParams.setType(POPULAR);
    this.genres.forEach(item => item.checked = false);
    this.themoviedbService.sendSearchParam();
    this.router.navigate(['/movies/' + POPULAR]);
  }
}
