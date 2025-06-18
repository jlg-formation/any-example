import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';

import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { AsyncBtnComponent } from '../../widgets/async-btn/async-btn.component';
import { getErrorMessage } from '../../utils/getErrorMessage.utils';
import { blackListValidator } from '../../validators/black-list.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [FontAwesomeModule, ReactiveFormsModule, AsyncBtnComponent],
})
export default class CreateComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  errorMsg = signal('');
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.maxLength(10),
      blackListValidator,
    ]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  getErrorMessage = getErrorMessage;

  ngOnInit(): void {}

  setErrorMsg(message: string) {
    this.errorMsg.set(message);
  }

  submit(): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() => this.articleService.add(this.f.value as NewArticle)),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
    );
  }
}
