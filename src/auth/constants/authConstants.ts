type RegistrationUrls = {
  [index: string]: string;
  EN: string;
  FI: string;
  SV: string;
};

export default {
  URLS: {
    REGISTRATION_FORM: {
      FI:
        'http://jassari.munstadi.fi/files/2019/06/Jasenkorttikaavake_2019_suomi.pdf',
      EN:
        'http://jassari.munstadi.fi/files/2019/06/Jasenkorttikaavake_2019_englanti.pdf',
      SV:
        'http://jassari.munstadi.fi/files/2019/06/Jasenkorttikaavake_2019_ruotsi.pdf',
    } as RegistrationUrls,
    YOUTH_CENTERS: 'https://palvelukartta.hel.fi/fi/search?q=nuorisotalo',
  },
};
