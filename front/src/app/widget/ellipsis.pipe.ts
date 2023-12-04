import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      throw new Error('pas bien...')
    }
    if (value.length > 10) {
      return value.substring(0, 10) + '...'
    }
    return value;
  }

}
