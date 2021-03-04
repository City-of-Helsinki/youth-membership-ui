import * as H from 'history';

import { Language } from '../../i18n/I18nService';

export const LANGUAGE_ID = 'language';

function shouldAddSlash(pathname?: string): boolean {
  if (!pathname) {
    return false;
  }

  return pathname.slice(0, 1) !== '/';
}

function buildPathname(...parts: string[]) {
  return parts.reduce((acc, part) => {
    const addSlash = shouldAddSlash(part);

    return `${acc}${addSlash ? '/' : ''}${part}`;
  }, '');
}

export function getPathnameWithLanguage(path: H.Path, lang: Language): H.Path {
  return buildPathname(lang, path);
}

export function getLocationWithLanguage<S>(
  location: H.LocationDescriptorObject<S>,
  lang: Language
): H.LocationDescriptorObject<S> {
  const pathname = location.pathname;

  return {
    ...location,
    pathname: pathname ? buildPathname(lang, pathname) : pathname,
  };
}

export function getLocationFactoryWithLanguage<S>(
  locationFactory: (location: H.Location<S>) => H.LocationDescriptor<S>,
  lang: Language
) {
  return ({ pathname, ...rest }: H.Location<S>): H.LocationDescriptor<S> =>
    locationFactory({
      ...rest,
      pathname: buildPathname(lang, pathname),
    });
}

export function getPathWithLanguage(path?: string | string[]) {
  if (!path) {
    return path;
  }

  if (Array.isArray(path)) {
    const pathsWithLanguage = path
      .map(path => {
        const pathAlreadyContainsLanguage = path.includes(`:${LANGUAGE_ID}`);

        // Do not add language to a path that already has it
        if (pathAlreadyContainsLanguage) {
          return null;
        }

        return buildPathname(`/:${LANGUAGE_ID}`, path);
      })
      .filter((item): item is string => Boolean(item))
      // Do not add paths that are already declared
      .filter(item => !path.includes(item));

    return [...path, ...pathsWithLanguage];
  }

  const pathWithLanguage = buildPathname(`/:${LANGUAGE_ID}`, path);

  return [path, pathWithLanguage];
}
