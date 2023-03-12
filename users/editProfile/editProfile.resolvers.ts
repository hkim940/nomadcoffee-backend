import client from '../../src/client';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { protectedResolver } from '../users.utils';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { createWriteStream, ReadStream } from 'fs';


const saltRounds: number = 10;

const resolverFn = async (_, {
    firstName,
    lastName,
    username,
    email, 
    password: newPassword,
    location,
    githubUsername,
    avatarURL,
}, 
{ loggedInUser } // Object that is going to be available to EVERY resolvers
) => {
    let updatedAvatarURL: string | null = null;
    if (avatarURL) {
        const { filename, createReadStream } = await avatarURL;
        const newFileName : string = `${loggedInUser.id}-${Date.now()}-${filename}`
        const readStream  : ReadStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFileName);
        // Read File and pipe it to another stream which will write the file to designated folder
        readStream.pipe(writeStream);
        updatedAvatarURL = `http://localhost:4000/static/${newFileName}`
    }

    // If user is not logged in we do not want them to go beyond this point
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
            ...(lastName && { lastName }),
            ...(githubUsername && { githubUsername }),
            ...(location && { location: location }),
            ...(hashedpwd && { password: hashedpwd }),
            ...(updatedAvatarURL && { avatarURL: updatedAvatarURL })
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
    Upload: GraphQLUpload,
    Mutation:  {
        editProfile: protectedResolver(resolverFn)
    }
}

/** 
 * Prisma: if you send undefined or null value to prisma, it will not update the value on the database
 */