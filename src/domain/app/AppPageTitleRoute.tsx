import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Route, {
  Props as RouteProps,
} from '../../common/components/route/Route';

type Props = RouteProps & {
  pageTitle: string;
};

const AppPageTitleRoute = ({ pageTitle, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(pageTitle)}</title>
        <meta property="og:title" content={t(pageTitle)} />
      </Helmet>
      <Route {...rest} />
    </>
  );
};

export default AppPageTitleRoute;
