import React from 'react';
import { Switch as RRSwitch, SwitchProps } from 'react-router-dom';

import * as PathUtils from '../../helpers/pathUtils';

function Switch({ children, ...rest }: SwitchProps) {
  return (
    <RRSwitch {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const { path, isLanguageAgnostic, ...restOfChildProps } = child.props;

          if (!isLanguageAgnostic) {
            const pathWithLanguage = PathUtils.getPathWithLanguage(path);

            return React.cloneElement(child, {
              ...restOfChildProps,
              path: pathWithLanguage,
            });
          } else {
            return child;
          }
        } else {
          return child;
        }
      })}
    </RRSwitch>
  );
}

export default Switch;
