import { Component, OnInit } from '@angular/core';
import { IHaveReadTheLegalPage } from '../../guards/legal.guard';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  counter = 0;
  constructor() {}

  ngOnInit(): void {
    IHaveReadTheLegalPage();

    const str = localStorage.getItem('toto');
    if (str === null) {
      localStorage.setItem('toto', '0');
      return;
    }
    this.counter = Number(str);
    this.counter++;
    localStorage.setItem('toto', this.counter + '');
  }
}
