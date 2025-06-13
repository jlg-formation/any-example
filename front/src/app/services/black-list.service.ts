import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlackListService {
  blackList = ['zut', 'mince', 'crotte'];

  constructor() {}
}
