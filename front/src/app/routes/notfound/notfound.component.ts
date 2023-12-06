import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  faHouse = faHouse;
}
