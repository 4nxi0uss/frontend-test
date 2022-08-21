import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    uri: 'http://localhost:4000/',

    // Provide some optional constructor fields
    name: 'react-web-client',
    version: '1.3',
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});