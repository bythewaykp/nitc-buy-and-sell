import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     // params: {
            //     //     prompt: "consent",
            //     //     access_type: "offline",
            //     //     // response_type: "code",
            //     //     scope: "openi",
            //     // },
            // },
        }),
    ],
    callbacks: {
        jwt({ token, user, account }) {

            if (user) {
                token.user = user;
                console.log(token);
            }

            return token;

            // Initial sign in
            // if (account && user) {
            //     // console.log({ token, user, account }, 1);
            //     return {
            //         accessToken: account.access_token,
            //         accessTokenExpires: Date.now() + account.expires_at,
            //         refreshToken: account.refresh_token,
            //         user,
            //     };
            // }

            // Return previous token if the access token has not expired yet
            // if (Date.now() < token.accessTokenExpires) {
            //     return token;
            // }

            // Access token has expired, try to update it
            // return refreshAccessToken(token);
        },
        session({ session, token }) {

            if (session) {
                session.user.name = token.user.name;
                session.user.email = token.user.email;
                session.user.image = token.user.image;
            }
            // console.log(session);

            return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 30 * 24 * 60 * 60,
    },
    session: {
        maxAge: 2 * 24 * 60 * 60,
        strategy: "jwt",
    },
};

export default NextAuth(options);

// declare module "next-auth" {
//     interface Session {
//         user?: { name: string; email: string; image: string };
//     }

//     // interface User {
//     //     id: string;
//     //     createdAt: number;
//     //     email: string;
//     //     hash: string;
//     //     role: "user" | "mod";
//     //     salt: string;
//     //     username: string;
//     //     imageURL?: string;
//     // }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         user?: {
//             id: string;
//             createdAt: number;
//             email: string;
//             hash: string;
//             role: "user" | "mod";
//             salt: string;
//             username: string;
//         };
//     }
// }
