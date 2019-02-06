import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-footer',
  template: `
    <footer>
      <div class="container">
        <p *ngIf="resultCount > 0">Showing: {{resultCount}}/{{totalCount}} results</p>
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
      padding: 10px;
    }
  `]
})
export class FooterComponent {

  @Input() resultCount: number;
  @Input() totalCount: number;

}
