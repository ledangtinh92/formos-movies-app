import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IMovie} from "../../model/movies.model";
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IPersonModel} from "../../model/person.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {PosterSizesEnums, ProfileSizesEnums} from "../../enums/image.model";
import {SortType} from "src/app/enums/sort.type";

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements  OnInit{
  porsonInfo!: IPersonModel;
  personMovisLst: IMovie[] = [];
  imageUrl = '';
  sortTypeValues = Object.entries(SortType).map(([key, value]) => ({
    key: key,
    value: value
  }));
  sortTypeSelect = SortType.POPULARITY;
  constructor(private activeRoute: ActivatedRoute,
              private applicationConfigService: ApplicationConfigService,
              private themoviedbService: ThemoviedbService) {
    this.imageUrl = this.applicationConfigService.getEndpointImage(ProfileSizesEnums.H632);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.themoviedbService.getActorInfo(params['id']).subscribe(value => {
          this.porsonInfo = value;
      });

      this.themoviedbService.getPersonMoviesLst(params['id']).subscribe(value => {
        this.personMovisLst = value;
        this.personMovisLst = this.personMovisLst.sort((a, b) => a.popularity - b.popularity)
      });
    });
  }

  goBack() {
    window.history.back();
  }

  changeSort() {
    if(this.personMovisLst){
      switch (this.sortTypeSelect) {
        case "Popularity":
          this.personMovisLst = this.personMovisLst.sort((a, b) => a.popularity - b.popularity);
          break;
        case "Votes Average":
          this.personMovisLst = this.personMovisLst.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case "Original Title":
          this.personMovisLst = this.personMovisLst.sort((a, b) => a.original_title.localeCompare(b.original_title));
          break;
        case "Release Date":
          this.personMovisLst = this.personMovisLst.sort((a, b) => a.release_date.localeCompare(b.release_date));
          break;
        default:
          this.personMovisLst = this.personMovisLst.sort((a, b) => a.popularity - b.popularity);
          break;
      }
    }
  }
}
