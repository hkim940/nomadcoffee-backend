import client from '../../src/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            const user: User | null = await client.user.findFirst( { where: { username }});
            if (!user) {
                return { 
                    ok: false, 
                    error: 'Invalid username'
                }
            }
            const validPassword: boolean = await bcrypt.compare( password, user.password );
            if (!validPassword) {
                return {
                    ok: false,
                    error: 'Invalid password'
                }
            }
            // the point of token is to NOT to ensure secrecy, but to notify who the user is 
            // token can be opened by everyone, so we use SECRET KEY to ensure that you are the one
            // who has created the token 
            
            // PRIVATE KEY: what is used to create the token, this needs to be PRIVATE
            const token = await jwt.sign( { id: user.id }, process.env.SECRET_KEY, { expiresIn: '2d'} )
            return {
                ok: true,
                token
            }
        }
    }
}