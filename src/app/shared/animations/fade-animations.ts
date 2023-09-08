import {trigger, state, style, animate, transition} from '@angular/animations';

export const fadeAnimations = [
  trigger('fadeInOut', [
    state('in', style({display: 'flex', width: 300, opacity: 1}),),
    state('out', style({display: 'flex', width: 0, opacity: 0})),
    transition('in => out', animate('1s ease-out')),
    transition('out => in', animate('1s ease-in')),
  ]),
];
