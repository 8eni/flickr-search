import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flkr-header',
  template: `
    <header>
      <section id="search-bar" class="container">
        <div class="input-group">
          <input
            (keyup)="updateTerm($event)"
            [placeholder]="placeholderText"
            class="form-control input-lg"
            aria-label="Search by tags">
          <div class="input-group-append">
            <p class="text-right padding-left">Must include </p>
            <div class="btn-group btn-group-toggle">
              <button
                [ngClass]="(tagMode ? '' : 'active') + ' btn btn-secondary'"
                type="button"
                (click)="updateTagMode(false)">any
              </button>
              <button
                [ngClass]="(!tagMode ? '' : 'active') + ' btn btn-secondary'"
                type="button"
                (click)="updateTagMode(true)">all
              </button>
            </div>
            <p> tags</p>
            <div class="spinner-border text-dark" role="status" [hidden]="noResults" *ngIf="loading">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    </header>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  tagMode = false;
  tagText = 'any';

  @Input() placeholderText: string;
  @Input() loading = false;
  @Input() noResults: boolean;
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchTagMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateTerm(value: string): void {
    this.searchTerm.emit(value);
  }

  updateTagMode(tagModeAll): void {
    this.tagMode = tagModeAll;
    this.tagText = this.tagMode ? 'all' : 'any';
    this.searchTagMode.emit(this.tagMode);
  }

}
