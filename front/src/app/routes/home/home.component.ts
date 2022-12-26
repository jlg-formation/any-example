import { ApplicationRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(app: ApplicationRef) {
    requestAnimationFrame(() => app.tick());
  }

  ngOnInit(): void {
    console.log('ngOnInit home');
  }
}
