import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  errorData?: any;
  errorMessage: string | null;
  errorTitle?: string;
  constructor( private route: ActivatedRoute,private activatedRoute: ActivatedRoute) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.errorMessage = params.get('error');
    });
    this.route.data.subscribe(routeData => {
      if (routeData) {
        this.errorData = routeData;
        this.errorTitle = routeData['errorTitle'];
      }
    });
  }
}
