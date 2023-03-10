import client from '../../src/client';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { protectedResolver } from '../users.utils';

const saltRounds: number = 10;

const resolverFn = async (_, {
    firstName,
    lastName,
    username,
    email, 
    password: newPassword,
    location,
    githubUsername,
}, 
{ loggedInUser, protectResolver } // Object that is going to be available to EVERY resolvers
) => {
    // If user is not logged in we do not want them to go beyond this point
    protectResolver(loggedInUser)
    let hashedpwd: string | null = null;
    if (newPassword) {
    hashedpwd = await bcrypt.hash( newPassword, saltRounds )
    }
    const updatedUser: User | null = await client.user.update({
        where: { 
            id: loggedInUser.id
        },
        data: {
            firstName, 
            username,
            email, 
            ...(lastName  && { lastName }),
            ...(githubUsername && { githubUsername }),
            ...(location && { location: location }),
            ...(hashedpwd && { password: hashedpwd })
        }
    })
    if (updatedUser.id) {
        return {
            ok: true
        }
    } else {
        return {
            ok: false,
            error: "ERROR: Could not updated profile"
        }
    }
}
export default {
    Mutation:  {
        editProfile: protectedResolver(resolverFn)
    }
}

/** 
 * Prisma: if you send undefined or null value to prisma, it will not update the value on the database
 */