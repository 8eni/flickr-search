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
              <button
                [ngClass]="(tagMode ? 'active' : '') + ' btn btn-outline-secondary'"
                type="button"
                (click)="updateTagMode()">All tags required
              </button>
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

  @Input() placeholderText: string;
  @Input() loading = false;
  @Input() noResults: boolean;
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagModeAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateTerm(value: string): void {
    this.searchTerm.emit(value);
  }

  updateTagMode(): void {
    this.tagMode = !this.tagMode;
    this.tagModeAll.emit(this.tagMode);
  }

}
