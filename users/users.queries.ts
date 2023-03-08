import client from "../src/client"
export default {
    Query: {
        seeProfile: (_, { username }) => client.user.findUnique( { where: { username }})
    }
}