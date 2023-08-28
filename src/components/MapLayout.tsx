import React, { FC } from 'react';
import Head from 'next/head';
import App from './App';
import SidebarWrapper from './Sidebar/SidbarWrapper';
import { useRouter } from 'next/router';

export const MapLayout: FC<{ treeId?: string | null }> = ({
  treeId,
  children,
}) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Musterstadt gießt | Green Blue LAB</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
        <link rel='icon' type='image/x-icon' href='/images/favicon.ico' />
        <meta name='title' content='Musterstadt gießt | Green Blue LAB' />
        <meta
          name='description'
          content='Die Dresdner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta property='og:url' content='<%= domain %>/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Musterstadt gießt | Green Blue LAB' />
        <meta
          property='og:description'
          content='Die Dresdner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta
          property='og:image'
          content='<%= domain %>/images/social_media.jpg'
        />
        <meta
          property='og:site_name'
          content='Musterstadt gießt | Green Blue LABv'
        />
        <meta name='twitter:card' content='' />
        <meta name='twitter:site' content='' />
        <meta name='twitter:creator' content='' />
        <meta name='twitter:url' content='<%= domain %>/' />
        <meta name='twitter:title' content='Musterstadt gießt | Green Blue LAB' />
        <meta
          name='twitter:description'
          content='Die Dresdner Stadtbäume leiden unter Trockenheit und Du kannst ihnen helfen!'
        />
        <meta
          name='twitter:image'
          content='<%= domain %>/images/social_media.jpg'
        />
      </Head>
      <App treeId={treeId}>
        <SidebarWrapper isVisible={pathname !== '/'}>{children}</SidebarWrapper>
      </App>
    </>
  );
};
