import { JS09Page } from './app.po';

describe('js09 App', () => {
  let page: JS09Page;

  beforeEach(() => {
    page = new JS09Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
