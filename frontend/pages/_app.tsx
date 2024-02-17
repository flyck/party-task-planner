import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AppProps } from 'next/app';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"
import { createAuthLink, AuthOptions } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] })


// Adds messages only in a dev environment
if (process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const url = process.env.NEXT_PUBLIC_API_URL || ""
  const region = "eu-central-1"
  const httpLink = new HttpLink({ uri: url });

  const auth: AuthOptions = {
    type: "API_KEY",
    apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  };

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Party Task Planner</title>
        <meta
          name="description"
          content="Live collaboration for party task planning"
        />
      </Head>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}


export default MyApp
