export default `#graphql
    type FollowResult {
        ok:     Boolean!
        error:  String
    }

    type Mutation{
        followUser(
            username:   String!
        ): FollowResult
    }

`