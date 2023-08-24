import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IMovie} from "../../model/movies.model";
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IPersonModel} from "../../model/person.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {PosterSizesEnums, ProfileSizesEnums} from "../../enums/image.quality.enums";
import {SortTypeEnums} from "../../enums/sort.type.enums";
import {ImageSliderModel} from "../../shared/image-slider/image-slider.model";

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {
  protected readonly PosterSizesEnums = PosterSizesEnums;
  protected readonly ProfileSizesEnums = ProfileSizesEnums;
  personInfo!: IPersonModel;
  personMovieLst: IMovie[] = [];
  sortTypeValues = Object.entries(SortTypeEnums).map(([key, value]) => ({
    key: key,
    value: value
  }));
  sortTypeSelect = SortTypeEnums.POPULARITY;
  personMovieImageLst: ImageSliderModel[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private applicationConfigService: ApplicationConfigService,
              private themoviedbService: ThemoviedbService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const personId = params['id'];
      if (personId == '') {
        this.router.navigate(['404']);
      }
      this.themoviedbService.getActorInfo(personId).subscribe({
        next: value => {
          if (value) {
            this.personInfo = value;
          }
        },
        error: err => {
          console.log("getActorInfo: " + err);
          this.router.navigate(['404']);
        }
      });
      this.themoviedbService.getPersonMoviesLst(personId)
        .subscribe({
          next: value => {
            this.personMovieLst = value;
            this.personMovieLst = this.personMovieLst.sort((a, b) => a.popularity - b.popularity)
            this.getPersonMovieImageLst();
          },
          error: err => {
            console.log("getPersonMoviesLst: " + err);
            this.router.navigate(['404']);
          }
        });
    });
  }

  goActorBack(): void {
    window.history.back();
  }

  changeSort(): void {
    if (this.personMovieLst) {
      switch (this.sortTypeSelect) {
        case SortTypeEnums.POPULARITY:
          this.personMovieLst = this.personMovieLst.sort((a, b) => a.popularity - b.popularity);
          break;
        case SortTypeEnums.VOTES_AVERAGE:
          this.personMovieLst = this.personMovieLst.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case SortTypeEnums.ORIGINAL_TITLE:
          this.personMovieLst = this.personMovieLst.sort((a, b) => a.original_title.localeCompare(b.original_title));
          break;
        case SortTypeEnums.RELEASE_DATE:
          this.personMovieLst = this.personMovieLst.sort((a, b) => a.release_date.localeCompare(b.release_date));
          break;
        default:
          this.personMovieLst = this.personMovieLst.sort((a, b) => a.popularity - b.popularity);
          break;
      }
      this.getPersonMovieImageLst();
    }
  }

  private getPersonMovieImageLst(): void {
    this.personMovieImageLst = this.personMovieLst.filter(movies => movies.poster_path).map(movies => {
      return {
        imageUrl: movies.poster_path,
        title: movies.title,
        routerLink: '/movie' + movies.id + 'detail',
        quality: PosterSizesEnums.W500,
      } as ImageSliderModel
    })
  }
}
