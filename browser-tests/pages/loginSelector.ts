import { Selector } from 'testcafe';
export const loginSelector = {
  submitButton: Selector('button[type="submit"]'),
  errorText: Selector('span[class="hds-text-input__helper-text"]'),
  day: Selector('input[id="ym-date-input-date-id"]'),
  month: Selector('input[id="ym-date-input-month-id"]'),
  year: Selector('input[id="ym-date-input-year-id"]'),
  paperForm: Selector(
    'a[href="https://palvelukartta.hel.fi/fi/search?q=nuorisotalo"]'
  ),
};
