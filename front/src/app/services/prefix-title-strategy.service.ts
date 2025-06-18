import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TITLE_PREFIX } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PrefixTitleStrategyService extends TitleStrategy {
  title = inject(Title);
  prefix = inject(TITLE_PREFIX);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`${this.prefix} - ${title}`);
    }
  }
}
