import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            phone
            email
        }
    }
`;

export { GET_CLIENTS }