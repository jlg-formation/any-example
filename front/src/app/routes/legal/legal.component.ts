import { Component, OnInit } from '@angular/core';
import { IHaveReadTheLegalPage } from '../../guards/legal.guard';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    IHaveReadTheLegalPage();
  }
}
