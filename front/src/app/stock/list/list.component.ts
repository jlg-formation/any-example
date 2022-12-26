import { ApplicationRef, Component, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/stock/services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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

  constructor(
    public articleService: ArticleService,
    private app: ApplicationRef
  ) {
    console.log('constructor');
    requestAnimationFrame(() => app.tick());
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    if (this.articleService.articles === undefined) {
      (async () => {
        await this.articleService.load();
        this.app.tick();
      })();
    }
  }

  async refresh() {
    try {
      this.errorMsg = '';
      this.isRefreshing = true;
      this.app.tick();
      await this.articleService.load();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
      this.app.tick();
    }
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      this.app.tick();
      const ids = [...this.selectedArticles].map((a) => a.id);
      await this.articleService.remove(ids);
      await this.articleService.load();
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
      this.app.tick();
    }
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      this.app.tick();
      return;
    }
    this.selectedArticles.add(a);
    this.app.tick();
  }
}
