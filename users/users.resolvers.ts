import client from "../src/client";

export default {
    // Root -> parent 의 args 를 가지고 온다
    // totalFollowing 과 totalFollowers 같은 경우에는 
    // User model 이 args 안에 있을것 -> 그 이유는 
    // 우리가 user 를 return 하는 함수에서 totalFollowing 과 totalFollowers
    // 가 없다는걸 알고 totalFollowing, totalFollowers 을 가지고 있는 
    // 밑의 함수를 호출할것이기 때문.
    User: {
        totalFollowing: ({id}) => {
            return client.user.count(
                { where: {
                    followers: {
                        some: {
                            id
                        }
                    }
                }}
            )
        },
        totalFollowers: ({id}) => {
            return client.user.count(
                { where: {
                    following: {
                        some: {
                            id
                        }
                    }
                }}
            )
        },
        isMe: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            // const exists = await client.user.findUnique( {
            //     where: {
            //         id: loggedInUser.id
            //     }
            // }).following(
            //     { where: {
            //         id
            //     }}
            // );
            // return exists?.length !== 0;
            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id
                        }
                    }
                }
            })
            return Boolean(exists);
        },
        coffeeShops: ({id}) => client.user.findUnique({
            where: {
                id
            }
        }).coffeeShops()
    }
}