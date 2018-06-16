import { AngularMaterialExtensionsGoogleMapsAutocompleteDemoPage } from './app.po';

describe('@angular-material-extensions/google-maps-autocomplete-demo App', () => {
  let page: AngularMaterialExtensionsGoogleMapsAutocompleteDemoPage;

  beforeEach(() => {
    page = new AngularMaterialExtensionsGoogleMapsAutocompleteDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
