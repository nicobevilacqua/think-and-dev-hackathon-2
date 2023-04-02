import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { setClient } from "svelte-apollo";
import {PUBLIC_GRAPHQL_GATEWAY_BASE_URL} from '$env/static/public';

let client;
export function init() {
    client = new ApolloClient({
        uri: PUBLIC_GRAPHQL_GATEWAY_BASE_URL,
        cache: new InMemoryCache(),
    });

    setClient(client);
}

export const queries = {
    FEED: gql`
    query tweet{
        allTweets {
            id
            content
            wallet
        }
    }
    `,
};


export const mutations = {
    NEW_TWEET: gql`
        mutation createTweet($content: String!, $wallet: String!) {
            createTweet(tweet:{content: $content, wallet: $wallet}) {
                tweet {
                    id
                }
        } 
    }  
    `,
};
