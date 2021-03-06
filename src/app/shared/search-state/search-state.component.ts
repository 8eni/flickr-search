import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-search-state',
  template: `
    <section class="state {{stateClass}}" *ngIf="stateCondition">
      <strong>{{stateText}}...</strong>
    </section>
  `,
  styles: [`
    .state {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 8;
      text-align: center;
      font-size: 21px;
      color: #888;
      text-transform: uppercase;
    }
    .blackout {
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
    }
    .state strong {
      padding: 200px 10px 0;
      display: inherit;
    }
  `]
})
export class SearchStateComponent {

  @Input() stateCondition = false;
  @Input() stateClass: string;
  @Input() stateText: string;

}
