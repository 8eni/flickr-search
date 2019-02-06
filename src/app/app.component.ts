import { Component } from '@angular/core';
import { SearchService } from './core/services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'flkr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  total: number;
  results: any[];
  count = 1;
  searchTerm$ = new Subject<string>();

  // storeResults: any;

  loadingInit = false;
  loadingScroll = false;
  placeholder = 'Add space to seperate tags e.g. ocean drive';

  constructor(
    private searchService: SearchService
  ) {
    this.getAllPhotos(this.count, this.searchTerm$);
  }

  getAllPhotos(page, searchTerm) {
    this.results = [];
    this.searchService.search(page, searchTerm).subscribe((results: any) => {
      this.loadingInit = true;
      this.count = 1;
      // this.storeResults = results;
      if (results && results.photos) { this.total = results.photos.total; }
      this.searchService.getPhotos(results).subscribe(res => {
        // console.log('res ', res);
        this.results = this.searchService.formatPhoto(res);
        this.loadingInit = false;
        // console.log('results ', this.results);
      });
    });
  }

  getPaginatedResults(results) {
    this.searchService.getPhotos(results).subscribe(res => {
      this.results = this.results ? [ ...this.results, ...this.searchService.formatPhoto(res) ] : this.searchService.formatPhoto(res);
      this.loadingScroll = false;
    });
  }

  onScrollDown() {
    this.searchService.searchEntries(++this.count).subscribe(results => {
      this.loadingScroll = true;
      this.getPaginatedResults(results);
    });
  }

}