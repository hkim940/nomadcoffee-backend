import client from '../../src/client';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

const saltRounds: number = 10;

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email, 
            password,
            location,
            avatarURL,
            githubUsername
        }) => {
            try {
                // User should never see DB Error
                // We need to check uniquness of email & username before we create an account
                const existingUser: User | null = await client.user.findFirst({
                    where: {
                        OR: [
                            { 
                                username 
                            },
                            { 
                                email 
                            }
                        ]
                    }
                });
                if (existingUser) throw new Error("This username / email is already taken");
                // Hash password before submitting to DB
                const hashedPwd: string = await bcrypt.hash(password, saltRounds);  
                await client.user.create({ data: {
                    firstName, 
                    username, 
                    email, 
                    password: hashedPwd, 
                    ...(lastName && { lastName }),
                    ...(githubUsername && { githubUsername }),
                    ...(location && { location: location }),
                    ...(avatarURL && { avatarURL })
                }})
                return { ok: true }
            } catch(e) {
                return {
                    ok: false,
                    error: "Error: Could not create user"
                }
            }
        }
    }
}