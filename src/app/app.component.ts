import { Component } from '@angular/core';
import { SearchService } from './core/services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'flkr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  totalResults: number;
  currentResults: any[] = [];
  resultsPageNum = 1;
  searchTerm$ = new Subject<string>();
  noResults: boolean;

  loadingInit = false;
  loadingScroll = false;
  placeholder = 'Example: ocean, blue, galway';

  constructor(
    private searchService: SearchService
  ) {
    this.initSearchBar(this.resultsPageNum, this.searchTerm$);
  }

  searchTagMode(mode): void {
    this.searchService.tagModeAll = mode;
  }

  initSearchBar(page, searchTerm) {
    this.searchService.searchBarActivity(page, searchTerm).subscribe((results: any) => {
      this.setConfiguration(results);
      this.getAllPhotos(results);
    });
  }

  setConfiguration(searchResults) {
    this.resultsPageNum = 1;
    this.loadingInit = true;
    this.noResults = this.setNoResultsFromSearch(searchResults.photos.total, this.currentResults);
    if (searchResults && searchResults.photos) { this.totalResults = searchResults.photos.total; }
  }

  getAllPhotos(results, scroll = false) {
    this.searchService.getPhotos(results).subscribe(res => {
      this.currentResults = (scroll) ?
        this.getAllPhotosFromScroll(res, this.currentResults) :
        this.getAllPhotosFromSearch(res);
    });
  }

  getAllPhotosFromScroll(response, currentResults) {
    this.loadingScroll = false;
    return currentResults ? [ ...currentResults, ...this.searchService.formatPhoto(response) ] : this.searchService.formatPhoto(response);
  }

  getAllPhotosFromSearch(response) {
    this.loadingInit = false;
    return this.searchService.formatPhoto(response);
  }

  onScrollDown() {
    this.searchService.searchEntries(++this.resultsPageNum).subscribe(results => {
      this.loadingScroll = true;
      this.getAllPhotos(results, true);
    });
  }

  setNoResultsFromSearch(total: string, results): boolean {
    if (parseInt(total, 10) === 0) {
      results = [];
      return true;
    } else {
      return false;
    }
  }

}
