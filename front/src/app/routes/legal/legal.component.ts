import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  imports: [DatePipe],
})
export class LegalComponent implements OnInit {
  now = new Date();
  constructor() {}

  ngOnInit(): void {}
}
