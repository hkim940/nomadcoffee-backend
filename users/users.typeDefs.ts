export default `#graphql
    type User {
        id:                 String!
        firstName:          String!
        lastName:           String
        username:           String!
        email:              String!
        location:           String
        avatarURL:          String
        coffeeShops:        [CoffeeShop]
        githubUsername:     String
        createdAt:          String!
        updatedAt:          String!
        following:          [User]
        followers:          [User]
        totalFollowing:     Int!
        totalFollowers:     Int!
        isMe:               Boolean!
        isFollowing:        Boolean!
    }
`
