import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IMovie} from "../../model/movies.model";
import {ThemoviedbService} from "../../service/themoviedb-service";
import {IPersonModel} from "../../model/person.model";
import {ApplicationConfigService} from "../../config/application-config.service";
import {PosterSizesEnums, ProfileSizesEnums} from "../../enums/image.model";

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements  OnInit{
  porsonInfo!: IPersonModel;
  imageUrl = '';
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
    });
  }
}
