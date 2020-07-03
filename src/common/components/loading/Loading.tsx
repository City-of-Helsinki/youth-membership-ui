import React from 'react';
import classNames from 'classnames';

import styles from './Loading.module.css';

type Props = React.PropsWithChildren<{
  isLoading: boolean;
  loadingText: string;
  loadingClassName: string;
  defer?: number; // ms to wait until rendering loading indicator
}>;
function Loading({
  isLoading,
  loadingText,
  loadingClassName,
  children,
  defer,
}: Props) {
  const shouldDefer = Boolean(defer);
  const [deferDone, setDeferDone] = React.useState(!shouldDefer);

  React.useEffect(() => {
    let ignore = false;

    function doDefer() {
      setTimeout(() => {
        if (!ignore) {
          setDeferDone(true);
        }
      }, defer);
    }

    if (defer) {
      doDefer();
    }

    return () => {
      ignore = true;
    };
  }, [defer]);

  return (
    <>
      {isLoading && deferDone && (
        <span className={classNames(styles.loading, loadingClassName)}>
          {loadingText}
        </span>
      )}
      {!isLoading && children}
    </>
  );
}

export default Loading;
