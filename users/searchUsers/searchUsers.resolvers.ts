import client from "../../src/client"

export default {
    Query: {
        searchUsers: async(_,{ keyword, page }) => {
            return await client.user.findMany({
                take: 2,
                skip: (page - 1) * 2,
                where: {
                    username: {
                        startsWith: keyword.toLowerCase()
                    }
                }
            }
            )
        }
    }
}