import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import tosConstants from '../../constants/tosConstants';
import PageLayout from '../../../../common/layout/PageLayout';

type Background = {
  user: string;
};

function TermsOfService() {
  const { t, i18n } = useTranslation();
  const userBackground = useParams<Background>();
  console.log(userBackground);
  /*
  const link = Object(tosConstants.REGISTER_DESCRIPTION)[
    i18n.language.toUpperCase()
  ];
  console.log('LINK', link);

   */

  return (
    <PageLayout background={userBackground.user}>
      <h1>{t('tos.title')}</h1>
      <p>
        Mensas sunt compaters de raptus adgium. Ire aegre ducunt ad ferox epos.
        Indexs sunt habitios de mirabilis cedrium. Potus vix ducunt ad festus
        nomen. Sunt pulchritudinees resuscitabo festus, bi-color parmaes.
        Eleatess sunt elogiums de festus olla. Poetas sunt burguss de pius
        palus. Visus de grandis brabeuta, promissio amor! Sunt seculaes dignus
        peritus, pius diatriaes. Mortems sunt devirginatos de neuter epos.
        Mortems sunt lanistas de audax navis. Audax brabeuta aliquando apertos
        guttus est. Accentors sunt itineris tramitems de barbatus nixus. Sunt
        eposes dignus barbatus, dexter demissioes. Extums sunt aonidess de
        dexter barcas. Crescere aliquando ducunt ad varius amicitia.
        Experimentum callide ducunt ad gratis itineris tramitem. Menss sunt
        stellas de clemens xiphias. Mortems sunt repressors de placidus era.
        Apolloniatess sunt resistentias de superbus humani generis.
      </p>
    </PageLayout>
  );
}

export default TermsOfService;
