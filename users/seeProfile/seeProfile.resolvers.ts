import client from "../../src/client";

export default {
    Query: {
        seeProfile: (_, { username }) => {
            return client.user.findUnique( { where: { username }})
        }
    }
}