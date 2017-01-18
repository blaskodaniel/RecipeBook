import { SzakacskonyvPage } from './app.po';

describe('szakacskonyv App', function() {
  let page: SzakacskonyvPage;

  beforeEach(() => {
    page = new SzakacskonyvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
