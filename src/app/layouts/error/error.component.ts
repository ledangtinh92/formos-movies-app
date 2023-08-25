import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  errorData?: any;
  errorMessage: string | null;
  errorTitle?: string;

  constructor(private route: ActivatedRoute, private activatedRoute: ActivatedRoute) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.errorMessage = params.get('error');
      });
    this.route.data.subscribe(routeData => {
      if (routeData) {
        this.errorData = routeData;
        this.errorTitle = routeData['errorTitle'];
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
