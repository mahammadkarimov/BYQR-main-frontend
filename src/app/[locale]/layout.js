import '../../styles/reset.css'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { NextIntlClientProvider } from 'next-intl'
import Layout from '@/components/common/Layout/Layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import './[restaurant]/style.css'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'az' }, { locale: 'ru' }, { locale: 'ko' }, { locale: 'ar' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}></Script>
        <Script>
          {` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS}');`}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Layout>
            {children}
          </Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
