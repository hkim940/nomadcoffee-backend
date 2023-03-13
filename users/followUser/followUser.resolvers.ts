import client from '../../src/client';
import { protectedResolver } from '../users.utils';

const resolveFn = async(_, 
    { username }, 
    { loggedInUser }) => {
        const validUser = await client.user.findUnique( { where: { username }});
        if (!validUser) return {
            ok: false,
            error: "User does not exist."
        }
        await client.user.update({
            where: {
                id: loggedInUser.id
            },
            data: {
                following: {
                    connect: {
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
        followUser: protectedResolver(resolveFn)
    }
}