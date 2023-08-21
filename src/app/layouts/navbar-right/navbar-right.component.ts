import {Component, OnInit} from '@angular/core';
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IGenres} from "../../model/genre.model";
import {DiscoverType} from "../../enums/discover.type.model";

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss'],
})
export class NavbarRightComponent implements OnInit {
  genres: IGenres[];
  selectedGenres: IGenres[] = [];
  isChecked = true;
  discoverType = DiscoverType;

  constructor(private themoviedbService: ThemoviedbService) {
    this.genres = [];
  }

  ngOnInit(): void {
    const genresLst = this.themoviedbService.getAllGenresOfMovie().subscribe(
      {
        next: value => {
          if (value) {
            this.genres = value.map(genre => ({ ...genre, checked: false }));
            this.themoviedbService.sendGenresData(this.selectedGenres)
          }
        },
        error: err => {

        }
      }
    )
  }

  onCheckboxChange(): void {
    this.selectedGenres = this.genres.filter(genre => genre.checked);
    this.themoviedbService.sendGenresData(this.selectedGenres);
  }

  onRadioChange($event: Event) {
    $event.target
    if($event.target){
      $event.currentTarget
    } else {
      //$event.currentTarget.checked = true;
    }
  }
}
