import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import client from '../src/client';

export const getUser = async( authorization : string): Promise<User | null> => {
    try {
        if (!authorization) return null;
        const { id } = await jwt.verify( authorization , process.env.SECRET_KEY );
        const user = await client.user.findUnique({ where: { id }});
        if (user) return user;
        else return null;
    } catch {
        return null;
    }
} 

// function that returns another function -> currying
// Example of currying: x("a")("b");

// PROTECTED RESOLVER IS A FUNCTION THAT RETURNS THE 
// GRAPHQL RESOLVER FUNCTION
export function protectedResolver(ourResolver) {
    // 밑의 함수가 protectedResolver 가 리턴하는 불려지지 않는 함수가 된다
    // protectedResolver 는 graphQL resolver 함수를 감싸고 있기 때문에
    // protectedResolver 는 graphql Resolver  가 받아오는 parameter 를 
    // 가지고 올 수 있다.
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            return {
                ok: false,
                error: "Please login to perform this action"
            }
        }
        return ourResolver(root, args, context, info);
    }
}