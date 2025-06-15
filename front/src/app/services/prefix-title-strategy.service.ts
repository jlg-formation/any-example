import { Inject, inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TITLE_PREFIX } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PrefixTitleStrategyService extends TitleStrategy {
  constructor(
    private readonly title: Title,
    @Inject(TITLE_PREFIX) private readonly prefix: string,
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`${this.prefix} - ${title}`);
    }
  }
}
