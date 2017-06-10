import { KidsPage } from './app.po';

describe('kids App', () => {
  let page: KidsPage;

  beforeEach(() => {
    page = new KidsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
