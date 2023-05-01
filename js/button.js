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
    this.div = create(
      'div',
      'board-button',
      [this.small],
      null,
      ['code', this.code],
      ['key', this.key],
    );
  }
}
