import React, { FC } from 'react';
import styled from 'styled-components';

const logoGBL = '/images/greenbluelab-logo.svg';
const logoCitylab = '/images/citylab-logo.svg';
const logoTSB = '/images/tsb-logo-coloured.svg';
const logoBerlin = '/images/berlin.svg';

const CreditsContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;
  position: absolute;
  top: 12px;
  right: 12px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

const Label = styled.span`
  margin-top: 5px;
  margin-bottom: 15px;
  width: fit-content;
  font-size: ${p => p.theme.fontSizeL};
`;

const TSBLink = styled.a`
  width: fit-content;
`;

const GBLlogo = styled.img`
  width: 100px;
  margin: 10px 0 5px 0;
`;

const TSBLogo = styled.img`
  width: 110px;
`;

const CityLABLogo = styled.img`
  width: 150px;
  margin: 10px 0 10px 0;
`;

const FoerderlogoContainer = styled.div`
  margin-top: 10px;
`;

const BerlinLogo = styled.img`
  width: 120px;
  margin: 10px 0 5px 0;
`;

const Credits: FC = () => {
  return (
    <CreditsContainer>
      <a
        href='https://greenbluelab.org/'
        rel='noopener noreferrer'
        target='_blank'
      >
        <GBLlogo src={logoGBL} alt='Logo Green Blue LAB' />
      </a>
      <Label>Initiales Projekt von</Label>
      <TSBLink
        href='https://technologiestiftung-berlin.de'
        target='_blank'
        rel='noopener noreferrer'
      >
        <TSBLogo src={logoTSB} alt='Logo Technologiestiftung Berlin' />
      </TSBLink>
      <FoerderlogoContainer>
        <Label>Unterstützt durch</Label>
        <CityLABLogo src={logoCitylab} alt='Logo CityLAB Berlin' />
      </FoerderlogoContainer>
    </CreditsContainer>
  );
};

export default Credits;
