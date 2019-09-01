import { LiteScroll } from '../src/script';

describe('Testing the LiteScroll', () => {
  window.scrollTo = jest.fn();
  (window.scrollTo as jest.Mock).mockClear();

  document.body.innerHTML = `
    <a href="#target1" class="litescroll">スクロール1</a>
    <a href="#target2" class="litescroll">スクロール2</a>
    <div id="target1" class="box"></div>
    <div id="target2" class="box"></div>
  `;

  const liteScroll = new LiteScroll();

  test('Create instance', () => {
    expect(liteScroll).toBeInstanceOf(LiteScroll);
  });

  test('Call animate method', () => {
    liteScroll.animate = jest.fn();
    const lsEls = document.getElementsByClassName('litescroll');
    (lsEls[0] as HTMLElement).click();
    expect(liteScroll.animate).toBeCalled();
  });
})