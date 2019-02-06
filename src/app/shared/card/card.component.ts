import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-card',
  template: `
    <figure>
      <img class="mdc-image-list__image card-img-top"
        [src]="result.thumbUrl"
        alt="{{result.description}}">
      <figcaption class="card-body">
        <h5 class="card-title font-weight-bold">{{ result.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted" *ngIf="result.owner">
          <i>by </i>{{result.owner}}
        </h6>
        <p class="font-weight-light">{{result.dateTaken}}</p>
        <hr>
        <details>
          <summary>Tags</summary>
          <span *ngFor="let tag of result.tags" class="badge badge-pill badge-light">{{ tag }} </span>
        </details>
        <hr>
        <a class="card-link" href="{{ result.link }}" target="_blank" *ngIf="result.link">View 
          <span *ngIf="result.title">"{{ result.title }}"</span> on flickr
        </a>
      </figcaption>
    </figure>
  `,
  styles: [`
    .badge-pill {
      margin-right: 4px;
    }
  `]
})
export class CardComponent {

  @Input() result: any;

}
