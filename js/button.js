// eslint-disable-next-line import/no-cycle
import create from './indexs.js';

export default class MakeButton {
  constructor(
    {
      small, big, code, key,
    },
  ) {
    this.key = key;
    this.code = code;
    this.small = small;
    this.big = big;
    this.isKey = Boolean(
      small.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps|RU|EN/),
    );
    // if (big && big.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
    //   this.symbol = create('div', 'symbol', this.big);
    // } else {
    //   this.symbol = create('div', 'symbol', '');
    // }

    this.letter = create('div', 'letter', small);
    this.div = create(
      'div',
      'board-button',
      [this.symbol, this.letter],
      null,
      ['code', this.code],
      ['key', this.key],
      this.isKey ? ['fn', 'true'] : ['fn', 'false'],
    );
  }
}
