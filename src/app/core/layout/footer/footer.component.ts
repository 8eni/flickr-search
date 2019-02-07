import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-footer',
  template: `
    <footer>
      <div class="container">
        <h5 class="font-weight-light" [hidden]="noResults" *ngIf="resultCount > 0">
          Showing <span class="font-weight-bold">{{resultCount}}</span>/{{totalCount}} results
          </h5>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #2b2b2b;
      color: white;
      padding: 15px 0 5px;
      min-height: 60px;
    }
  `]
})
export class FooterComponent {

  @Input() resultCount: number;
  @Input() totalCount: number;
  @Input() noResults: boolean;

}
