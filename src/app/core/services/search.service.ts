import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, timer } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface Photo {
  thumbUrl: string;
  link: string;
  title: string;
  tags: string[];
  description: string;
  owner: string;
  dateTaken: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  newTerm: string;
  apiKey = '92381dd83d844d05e8c198c87416409f';
  perPage = '20';
  baseUrl = `https://api.flickr.com/services/rest/?api_key=${this.apiKey}&format=json&nojsoncallback=1&method=flickr.photos.`;
  flickrPhotoSearch = `${this.baseUrl}search`;
  flickrPhotoGetInfo = `${this.baseUrl}getInfo`;
  searchTags = `&per_page=${this.perPage}&tags=`;
  searchPhotoId = `&photo_id=`;
  tagModeAll: false;

  constructor(
    private http: HttpClient
  ) { }

  search(page: number, terms: Observable<string>) {
    return terms.pipe(
      debounce(() => timer(400)),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(page, term))
    );
  }

  searchEntries(page: number, term = null): Observable<{}> {
    // Either 'any' for an OR combination of tags, or 'all' for an AND combination.
    // Defaults to 'any' if not specified
    const tagMode = this.tagModeAll ? '&tag_mode=all' : '';
    this.newTerm = term ? term : this.newTerm;
    return this.http.get(`${this.flickrPhotoSearch}${this.searchTags}${encodeURIComponent(this.newTerm)}&page=${page}${tagMode}`);
  }

  getPhotos(searchResults): Observable<{}[]> {
    return forkJoin( searchResults.photos.photo.map(val =>
      this.http.get(`${this.flickrPhotoGetInfo}&photo_id=${val.id}`)
    ) );
  }

  formatPhoto(response): Photo[] {
    const result =  Object.keys(response).reduce((results, item: string, i) => {
      results[i] = this.getPhotoObject(response[item].photo);
      return results;
    }, []);
    console.log('l ', result.length);
    
    return result;
  }

  getPhotoObject(data): Photo {
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
