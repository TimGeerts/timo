import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wowCurrency'
})

export class WowCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return this.styleCurrency(value);
  }

  private styleCurrency(value : number) : string{
    let m = 0;
    let copper = value % 100;
    m = (value - copper) / 100;
    let silver = m % 100;
    let gold = (m - silver) / 100;
    return `<span class='wowcurrency'>${gold}<strong class='g'>g</strong> ${silver}<strong class='s'>s</strong> ${copper}<strong class='c'>c</strong></span>`;
  }
}