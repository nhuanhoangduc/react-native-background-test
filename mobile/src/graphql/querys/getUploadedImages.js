import gql from 'graphql-tag';


export default gql`
    query uploadedImages {
        uploadedImages {
            _id
            imageUrl
            hash
        }
    }
`;
