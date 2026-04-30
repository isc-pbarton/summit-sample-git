import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RedditPost {
  title: string;
  selftext: string;
  author: string;
  url: string;
  created_utc: number;
}

@Injectable({ providedIn: 'root' })
export class RedditService {
  private apiBaseUrl = '/sampleapp/api';

  constructor(private http: HttpClient) {}

  getPosts(afterUtc: number): Observable<RedditPost[]> {
    return this.http.get<RedditPost[]>(`${this.apiBaseUrl}/REDDITPOST`, {
      params: { 'created_utc[gte]': afterUtc.toString() },
      responseType: 'json',
    });
  }
}
