import { Component, OnInit, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom, timer } from 'rxjs';
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { BlacklistService } from '../../services/blacklist.service';
import { ErrorService } from '../../services/error.service';
import { blackListValidator } from '../../validators/black-list.validator';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, AsyncPipe],
})
export class CreateComponent implements OnInit {
  errorMsg = '';
  f = this.fb.group({
    name: [
      'Truc',
      [Validators.required, blackListValidator(inject(BlacklistService))],
    ],
    price: [0, [Validators.required]],
    qty: [1, [Validators.required]],
  });
  errors = {
    name: this.errorService.getErrors(this.f, 'name'),
    price: this.errorService.getErrors(this.f, 'price'),
    qty: this.errorService.getErrors(this.f, 'qty'),
  };
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    protected errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  async submit() {
    const newArticle: NewArticle = this.f.getRawValue();
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(newArticle);
      await this.articleService.load();
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof Error) {
        this.errorMsg = err.message;
      }
    } finally {
      this.isAdding = false;
    }
  }
}
