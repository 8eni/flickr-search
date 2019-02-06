import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-loading',
  template: `
    <section class="blackout" *ngIf="loading"><strong>LOADING...</strong></section>
  `,
  styles: [`
    .blackout {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 8;
      text-align: center;
      line-height: 290px;
      color: white;
      font-size: 24px;
    }
  `]
})
export class LoadingComponent {

  @Input() loading = false;


}
