import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RedditService, RedditPost } from './reddit.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  posts: RedditPost[] = [];
  postsAfter = '';
  loading = false;
  error = '';

  constructor(private redditService: RedditService, private cdr: ChangeDetectorRef) {
    const now = new Date();
    now.setDate(now.getDate() - 7);
    this.postsAfter = this.toLocalDatetime(now);
  }

  fetchPosts() {
    const utcSeconds = Math.floor(new Date(this.postsAfter).getTime() / 1000);
    this.loading = true;
    this.error = '';
    this.redditService.getPosts(utcSeconds).subscribe({
      next: (data: RedditPost[]) => {
        this.posts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load posts.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private toLocalDatetime(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
