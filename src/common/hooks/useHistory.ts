import { useCallback } from 'react';
import { useHistory as useHistoryRR } from 'react-router-dom';
import * as H from 'history';

import I18nService from '../../i18n/I18nService';
import * as PathUtils from '../helpers/pathUtils';

function useHistory<S>() {
  const { push: pushRR, replace: replaceRR, ...rest } = useHistoryRR();

  const push = useCallback(
    (pathOrLocation: H.Path | H.LocationDescriptorObject<S>, state?: S) => {
      if (typeof pathOrLocation === 'string') {
        return pushRR(
          PathUtils.getPathnameWithLanguage(
            pathOrLocation,
            I18nService.language
          ),
          state
        );
      }

      pushRR(
        PathUtils.getLocationWithLanguage(pathOrLocation, I18nService.language)
      );
    },
    [pushRR]
  );

  const replace = useCallback(
    (pathOrLocation: H.Path | H.LocationDescriptorObject<S>, state?: S) => {
      if (typeof pathOrLocation === 'string') {
        return replaceRR(
          PathUtils.getPathnameWithLanguage(
            pathOrLocation,
            I18nService.language
          ),
          state
        );
      }

      replaceRR(
        PathUtils.getLocationWithLanguage(pathOrLocation, I18nService.language)
      );
    },
    [replaceRR]
  );

  return { ...rest, push, replace };
}

export default useHistory;
