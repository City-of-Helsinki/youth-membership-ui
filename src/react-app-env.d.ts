/// <reference types="react-scripts" />

import * as H from 'history';

import { Language } from './i18n/I18nService';

type LangueParameter = false | Language;

declare module 'history' {
  export interface History<HistoryLocationState = H.LocationState>
    extends H.History {
    push(
      path: H.Path,
      state?: HistoryLocationState,
      language?: false | Language
    ): void;
    push(
      location: H.LocationDescriptorObject<H.HistoryLocationState>,
      language?: false | Language
    ): void;
    replace(
      path: H.Path,
      state?: HistoryLocationState,
      language?: false | Language
    ): void;
    replace(
      location: H.LocationDescriptorObject<H.HistoryLocationState>,
      language?: false | Language
    ): void;
  }
}
