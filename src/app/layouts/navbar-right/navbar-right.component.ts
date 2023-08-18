import {Component, OnInit} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {HttpResponse} from "@angular/common/http";
import {IGenres} from "../../model/genre.model";
import {map} from "rxjs";

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss'],
})
export class NavbarRightComponent implements OnInit {
  genres: IGenres[];
  selectedGenres: IGenres[] = [];

  constructor(private themoviedbService: ThemoviedbService) {
    this.genres = [];
  }

  ngOnInit(): void {
    const genresLst = this.themoviedbService.getAllGenresOfMovie().subscribe(
      {
        next: value => {
          if (value) {
            this.genres = value.map(genre => ({ ...genre, checked: false }));
          }
        },
        error: err => {

        }
      }
    )


  }

  onCheckboxChange(): void {
    this.selectedGenres = this.genres.filter(genre => genre.checked);
  }
}
