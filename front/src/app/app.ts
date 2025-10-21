import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('front');
}
