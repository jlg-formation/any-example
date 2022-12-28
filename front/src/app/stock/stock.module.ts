import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';

import { CreateComponent } from './create/create.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { ListComponent } from './list/list.component';
import { ArticleService } from './services/article.service';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  providers: [
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    HttpClient,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
  ],
})
export class StockModule {}
