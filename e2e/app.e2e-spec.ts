import { JimidWebPage } from './app.po';

describe('jimid-web App', function() {
  let page: JimidWebPage;

  beforeEach(() => {
    page = new JimidWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
