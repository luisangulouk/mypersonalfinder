import { MypersonalfinderPage } from './app.po';

describe('mypersonalfinder App', () => {
  let page: MypersonalfinderPage;

  beforeEach(() => {
    page = new MypersonalfinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
