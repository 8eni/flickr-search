import { Component, Input } from '@angular/core';

@Component({
  selector: 'flkr-card',
  template: `
    <figure>
      <img class="mdc-image-list__image card-img-top"
      [src]="result.thumbUrl"
      alt="{{result.description}}">
      <figcaption class="card-body">
        <h6 class="card-subtitle mb-2" >
          <span class="owner" *ngIf="result.owner">{{result.owner}}</span>
          <span *ngIf="result.dateTaken">{{result.dateTaken}}</span>
        </h6>
        <h5 class="card-title">{{ result.title }}</h5>
        <hr>
        <div class="tag-wrapper">
          <details>
            <summary>View tags</summary>
            <span *ngFor="let tag of result.tags" class="badge badge-light">{{ tag }} </span>
          </details>
          <a class="card-link" href="{{ result.link }}" target="_blank" *ngIf="result.link">
            View on flickr
          </a>
        </div>
      </figcaption>
    </figure>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() result: any;

}
