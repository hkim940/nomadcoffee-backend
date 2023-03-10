import client from '../../src/client';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

const saltRounds: number = 10;

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            username,
            email, 
            password,
            location,
            avatarURL,
            githubUsername
        }): Promise<User> => {
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
                return client.user.create({ data: {
                    firstName, 
                    username, 
                    email, 
                    password: 
                    hashedPwd, 
                    location, 
                    avatarURL, 
                    githubUsername
                }
            })
            } catch(e) {
                return e;
            }
        }
    }
}