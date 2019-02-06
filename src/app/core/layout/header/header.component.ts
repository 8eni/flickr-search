import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flkr-header',
  template: `
    <header>
      <section id="search-bar" class="container">
        <input
          (keyup)="updateTerm($event)"
          [placeholder]="placeholderText"
          class="form-control input-lg">
          <div class="spinner-border text-dark" role="status" *ngIf="loading">
            <span class="sr-only">Loading...</span>
          </div>
      </section>
    </header>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() placeholderText: string;
  @Input() loading = false;
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  updateTerm(value: string): void {
    this.searchTerm.emit(value);
  }

}
