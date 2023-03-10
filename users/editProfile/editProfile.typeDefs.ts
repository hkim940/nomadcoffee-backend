export default `#graphql 
    type EditProfileResult {
        ok:     Boolean!
        error:  String
    }

    type Mutation {
        editProfile(
            firstName:      String
            lastName:       String
            username:       String
            email:          String
            password:       String
            location:       String
            avatarURL:      String
            githubUsername: String
        ): EditProfileResult
    }
`