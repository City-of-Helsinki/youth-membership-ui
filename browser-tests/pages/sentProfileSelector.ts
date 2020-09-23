import { Selector } from 'testcafe';

export const sentProfileSelector = {
  mainTitle: Selector('h1').withText(
    'The application has been sent to your guardian for approval!'
  ),
};
