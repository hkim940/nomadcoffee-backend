import { protectedResolver } from "../users.utils";
import client from "../../src/client";
import { User } from "@prisma/client";

const resolveFn = async(_, 
    { username }, 
    { loggedInUser }) => {
        const validUser: User | null = await client.user.findUnique({ where: { username }});
        if (!validUser) return {
            ok: false,
            error: "User does not exist"
        }
        await client.user.update({
            where: {
                id: loggedInUser.id
            },
            data: {
                following: {
                    disconnect: {
                        username
                    }
                }
            }
        })
        return {
            ok: true
        }
    }

export default {
    Mutation: {
        unfollowUser: protectedResolver(resolveFn)
    }
}