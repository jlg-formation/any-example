import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import {
  Observable,
  Subscription,
  catchError,
  finalize,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;
  isRemoving = false;
  refreshSubscription: Subscription | undefined;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      this.articleService.loadObs().subscribe();
    }
  }

  refresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = undefined;
      return;
    }
    this.refreshSubscription = of(undefined)
      .pipe(
        switchMap(() => {
          this.errorMsg = '';
          return this.articleService.loadObs();
        }),
        catchError((err) => {
          console.error('err: ', err);
          return of(undefined);
        }),
        finalize(() => {
          this.refreshSubscription = undefined;
        })
      )
      .subscribe();
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await this.articleService.remove(ids);
      await this.articleService.load();
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
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
