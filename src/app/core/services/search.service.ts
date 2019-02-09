import { Injectable } from '@angular/core';
import { Photo } from '@app/core/models/photo';
import { HttpService } from '@app/core/services/http.service';

import { Observable, forkJoin, timer } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  newTerm: string;
  tagModeAll: false;

  constructor(
    private httpService: HttpService
  ) { }

  searchBarInteraction(page: number, terms: Observable<string>) {
    return terms.pipe(
      debounce(() => timer(400)),
      distinctUntilChanged(),
      switchMap(term => this.getSearchResults(page, term))
    );
  }

  getSearchResults(page: number, term = null): Observable<{}> {
    const tagMode = this.tagModeAll ? '&tag_mode=all' : '';
    this.newTerm = term ? term : this.newTerm;
    return this.httpService.getFlickrPhotoSearch(term ? term : this.newTerm, page, tagMode);
  }

  getPhotos(searchResults): Observable<{}[]> {
    return forkJoin( searchResults.photos.photo.map(val =>
      this.httpService.getFlickrPhotoGetInfo(val)
    ) );
  }

  formatResults(response): Photo[] {
    return Object.keys(response).reduce((results, item: string, i) => {
      results[i] = this.formatPhoto(response[item].photo);
      return results;
    }, []);
  }

  formatPhoto(data): Photo {
    return {
      thumbUrl: this.httpService.getPhotoThumnail(data),
      link: data.urls.url[0]._content,
      title: data.title._content,
      description: data.description._content,
      tags: data.tags.tag.map(v => v.raw),
      owner: data.owner.realname,
      dateTaken: data.dates.taken.split(' ')[0],
    };
  }

}
