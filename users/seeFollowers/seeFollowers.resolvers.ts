import client from "../../src/client";

export default {
    Query: {
        seeFollowers: async(_, { username, page}) => {
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

            // OFFSET PAGINATION 
            const aFollowers = await client.user
            .findUnique({
                where: { 
                    username
                }
            }).followers({
                take: 5,
                skip: (page - 1) * 5
            });
            const totalFollowers: number = await client.user.count({
                where: {
                    following: {
                        some: {
                            username
                        }
                    }
                }
            })
            return {
                ok: true,
                followers: aFollowers,
                totalPages: Math.ceil(totalFollowers / 5)
            }
        }
    }
}
/**
 * TWO WAY TO APPROACH:
 * 1. FIND ALL FOLLOWERS OF THIS PARTICULAR ACCOUNT (aFollowers)
 *      const aFollowers = await client.user.findUnique({
            where: { 
                username
            }
        }).followers();

 * 2. FIND USERS WHO HAS THIS PARTICULAR USER IN THEIR FOLLOWING LIST (bFollowers)
        const bFollowers = await client.user.findMany({
            where: {
                following: {
                    some: { 
                        username
                    }
                }
            }
        })
 */