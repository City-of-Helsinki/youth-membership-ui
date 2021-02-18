import React, { Fragment } from 'react';

import Text from '../../common/components/text/Text';

function AccessibilityStatementFi() {
  return (
    <Fragment>
      <Text variant="h1">Saavutettavuusseloste</Text>
      <p>
        Tämä saavutettavuusseloste koskee Helsingin kaupungin Nuorisopalveluisen
        jäsenhakemus-verkkosivustoa. Sivuston osoite on https://jassari.hel.fi.
      </p>

      <Text variant="h2">Sivustoa koskevat lain säädökset</Text>
      <p>
        Tämä sivusto on julkaistu 23.9.2018 jälkeen. Sivuston tulee täyttää lain
        edellyttämät saavutettavuuden vaatimukset.
      </p>

      <Text variant="h2">Kaupungin tavoite</Text>
      <p>
        Digitaalisten palveluiden saavutettavuudessa Helsingin tavoitteena on
        pyrkiä vähintään WCAG ohjeiston mukaiseen AA- tai sitä parempaan tasoon,
        mikäli se on kohtuudella mahdollista.
      </p>

      <Text variant="h2">Vaatimustenmukaisuustilanne</Text>
      <p>
        Tämän verkkosivuston saavutettavuuden vaatimustenmukaisuutta ei ole
        vielä arvioitu.
      </p>

      <Text variant="h2">Saavutettavuusselosteen laatiminen</Text>
      <p>Tämä seloste on laadittu 6.4.2020</p>

      <Text variant="h2">Saavutettavuusselosteen päivittäminen </Text>
      <p>
        Saavutettavuusseloste päivitetään vastaamaan saavutettavuuden
        vaatimustenmukaisuudesta tehtyjä havaintoja suoritetun tarkastuksen
        jälkeen.
      </p>

      <Text variant="h2">Tietojen pyytäminen saavutettavassa muodossa </Text>
      <p>
        Mikäli käyttäjä ei koe saavansa sivuston sisältöä saavutettavassa
        muodossa, voi käyttäjä pyytää näitä tietoja sähköpostilla{' '}
        <a href="mailto:helsinki.palaute@hel.fi">helsinki.palaute@hel.fi</a> tai
        palautelomakkeella{' '}
        <a href="https://www.hel.fi/palaute">www.hel.fi/palaute</a>.
        Tiedusteluun pyritään vastaamaan kohtuullisessa ajassa.
      </p>

      <Text variant="h2">Palaute ja yhteystiedot</Text>
      <p>
        Helsingin kaupunki, Kulttuuri ja vapaa-aika
        <br />
        Nuorisopalvelut
        <br />
        <a href="mailto:nuorisopalvelut@hel.fi">nuorisopalvelut@hel.fi</a>
      </p>

      <Text variant="h2">Helsingin kaupunki ja saavutettavuus</Text>
      <p>
        Helsingin kaupungin tavoitteena on olla kaikille esteetön ja
        saavutettava kaupunki. Kaupungin tavoitteena on, että Helsingissä on
        kaikkien kaupunkilaisten mahdollisimman helppo liikkua ja toimia ja että
        kaikki sisältö ja palvelut olisivat kaikkien saavutettavissa.
      </p>
      <p>
        Kaupunki edistää digitaalisten palveluiden saavutettavuutta
        yhdenmukaistamalla julkaisutyötä ja järjestämällä saavutettavuuteen
        keskittyvää koulutusta henkilökunnalleen.
      </p>
      <p>
        Sivustojen saavutettavuuden tasoa seurataan jatkuvasti sivustoja
        ylläpidettäessä. Havaittuihin puutteisiin reagoidaan välittömästi.
        Tarvittavat muutokset pyritään suorittamaan mahdollisimman nopeasti.
      </p>
      <p>
        Vammaiset ja avustavien teknologioiden käyttäjät Kaupunki tarjoaa
        neuvontaa ja tukea vammaisille ja avustavien teknologioiden käyttäjille.
        Tukea on saatavilla kaupungin sivuilla ilmoitetuilta neuvontasivuilta
        sekä puhelinneuvonnasta.
      </p>

      <Text variant="h2">Saavutettavuusselosteen hyväksyntä</Text>
      <p>Tämän selosteen on hyväksynyt 6.4.2020</p>
      <p>
        Kulttuurin ja vapaa-ajan toimiala
        <br />
        Helsingin kaupunki
      </p>
    </Fragment>
  );
}

export default AccessibilityStatementFi;
