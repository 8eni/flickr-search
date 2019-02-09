import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '@app/core/models/photo';
import { environment } from '@env/environment';

import { Observable, forkJoin, timer } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiKey = environment.flickrApiKey;
  apiUrl = environment.flickrApiUrl;
  baseUrl = `${this.apiUrl}?api_key=${this.apiKey}&format=json&nojsoncallback=1&method=flickr.photos.`;
  flickrPhotoSearch = `${this.baseUrl}search&per_page=20&tags=`;
  flickrPhotoGetInfo = `${this.baseUrl}getInfo&photo_id=`;
  newTerm: string;
  tagModeAll: false;

  constructor(
    private http: HttpClient
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
    return this.http.get(`${this.flickrPhotoSearch}${encodeURIComponent(this.newTerm)}&page=${page}${tagMode}`);
  }

  getPhotos(searchResults): Observable<{}[]> {
    return forkJoin( searchResults.photos.photo.map(val =>
      this.http.get(`${this.flickrPhotoGetInfo}&photo_id=${val.id}`)
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
      thumbUrl: `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_n.jpg`,
      link: data.urls.url[0]._content,
      title: data.title._content,
      description: data.description._content,
      tags: data.tags.tag.map(v => v.raw),
      owner: data.owner.realname,
      dateTaken: data.dates.taken.split(' ')[0],
    };
  }

}
