import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom, timer } from 'rxjs';
import { getErrorMsg } from '../../../utils/getErrorMsg';
import { ArticleService } from '../../services/article.service';
import { blackListValidator } from '../../validators/blacklist.validator';
import { AutofocusDirective } from '../../widgets/autofocus.directive';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, AutofocusDirective],
})
export class CreateComponent implements OnInit {
  errorMsg = '';
  f = new FormBuilder().nonNullable.group({
    name: ['Truc', [Validators.required, Validators.minLength(4), blackListValidator]],
    price: [0, [Validators.required]],
    qty: [0, [Validators.required]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;
  getErrorMsg = getErrorMsg;
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  async submit() {
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(this.f.getRawValue());
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
