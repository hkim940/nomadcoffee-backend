import client from "../../src/client"

export default {
    Query: {
        seeFollowing: async (_, { username, lastId }) => {
            const validUsername = await client.user.findUnique({
                where: {
                    username
                }, 
                select: {
                    id: true
                }
            });
            if (!validUsername) return {
                ok: false,
                error: "User not found"
            };

            const following = await client.user
                .findUnique( { where: { username }})
                .following({
                    take: 5,
                    skip: lastId ? 1 : 0, // Skip the Cursor to remove repetition if lastId exists
                    // 첫번째 페이지라면 cursor 가 없을수도 있으니 cursor 의 유/무 확인해야한다
                    ...(lastId && { cursor: { id: lastId }} )
                })
            return {
                ok: true,
                following
            }
        }
    }
}