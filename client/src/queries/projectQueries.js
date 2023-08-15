import { gql } from "@apollo/client"

const GET_PROJECTS = gql `
    query getProjects {
        projects {
            id
            name
            status
        }
    }
`;

//Below is not working correctly - simply returns the query above
const GET_PROJECT = gql `
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            status
            description
            client {
                id
                name
                email
                phone   
            }
        }
    }
`;

export { GET_PROJECTS, GET_PROJECT }