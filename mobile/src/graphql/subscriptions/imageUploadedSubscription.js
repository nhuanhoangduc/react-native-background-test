import gql from 'graphql-tag';


export default gql`
    subscription imageUploaded {
        imageUploaded {
            _id
            imageUrl
            hash
        }
    }
`;
