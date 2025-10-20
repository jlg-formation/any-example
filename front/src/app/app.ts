import { Component, signal } from '@angular/core';
import { LayoutModule } from './layout/layout.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [LayoutModule],
  standalone: true
})
export class App {
  protected readonly title = signal('front');
}
