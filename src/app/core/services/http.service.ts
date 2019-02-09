import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiKey = environment.flickrApiKey;
  apiUrl = environment.flickrApiUrl;
  baseUrl = `${this.apiUrl}?api_key=${this.apiKey}&format=json&nojsoncallback=1&method=flickr.photos.`;
  flickrPhotoSearch = `${this.baseUrl}search&per_page=20&tags=`;
  flickrPhotoGetInfo = `${this.baseUrl}getInfo&photo_id=`;

  constructor(
    private http: HttpClient
  ) { }

  getFlickrPhotoSearch(term, page, tagMode) {
    return this.http.get(`${this.flickrPhotoSearch}${encodeURIComponent(term)}&page=${page}${tagMode}`);
  }

  getFlickrPhotoGetInfo(val) {
    return this.http.get(`${this.flickrPhotoGetInfo}&photo_id=${val.id}`);
  }

  getPhotoThumnail(data) {
    return `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_n.jpg`;
  }

}
