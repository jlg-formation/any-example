import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, FontAwesomeModule, RouterLink],
})
export class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  selectedArticles = new Set<Article>();
  isRemoving = false;
  errorMsg = '';

  cdr = inject(ChangeDetectorRef);
  articleService = inject(ArticleService);

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      (async () => {
        await lastValueFrom(this.articleService.load2());
        this.cdr.markForCheck();
      })();
    }
  }

  async refresh() {
    try {
      this.errorMsg = '';
      this.isRefreshing = true;
      await lastValueFrom(this.articleService.load2());
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
      this.cdr.markForCheck();
    }
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await lastValueFrom(this.articleService.remove2(ids));
      await lastValueFrom(this.articleService.load2());
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
      this.cdr.markForCheck();
    }
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
