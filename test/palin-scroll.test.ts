import PlainScroll from '../src/plain-scroll'

describe('Testing the PlainScroll', () => {
  test('Create instance', () => {
    const plainScroll = new PlainScroll();
    expect(plainScroll).toBeInstanceOf(PlainScroll);
  })
  
  test('Call animate method', () => {
    document.body.innerHTML = `
      <a href="#target1" class="plain-scroll">スクロール1</a>
      <a href="#target2" class="plain-scroll">スクロール2</a>
      <div id="target1"></div>
      <div id="target2"></div>
    `;

    window.scrollTo = jest.fn();
    (window.scrollTo as jest.Mock).mockClear();

    const onScrollEnd = () => console.log(1);
    const plainScroll = new PlainScroll({ onScrollEnd });
    plainScroll.animate = jest.fn(onScrollEnd);

    const psElements = document.getElementsByClassName('plain-scroll');
    (psElements[0] as HTMLElement).click();
    expect(plainScroll.animate).toBeCalled();
  })
})