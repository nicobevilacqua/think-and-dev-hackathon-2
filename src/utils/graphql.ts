import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { setClient } from "svelte-apollo";

let client;
export function init() {
    client = new ApolloClient({
        uri: import.meta.env.VITE_GRAPHQL_GATEWAY_BASE_URL,
        cache: new InMemoryCache(),
    });

    setClient(client);
}

export const queries = {
    FEED: gql`
        query Books($search: String) {
            books(search: $search) {
                id
                slug
                title
                author {
                    name
                }
            }
        }
    `,
};

export const mutations = {
    NEW_TWEET: gql`
        query Feed($search: String) {
            tweets(search: $search) {
                id
                slug
                title
                author {
                    name
                }
            }
        }
    `,
};
