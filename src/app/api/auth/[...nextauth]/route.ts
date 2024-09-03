import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import https from 'https';

  // Extend the Session interface
  declare module "next-auth" {
    interface Session {
      userId?: string;
      role?: string;
    }
  }

  const getUserList = async () => {
    try {
      const axios = require('axios');
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        passphrase: "YYY"
      })
      const instance = axios.create({
        httpsAgent
      });
      const response = await instance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/listuser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userList = response.data;
      return userList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handler = NextAuth({
    pages: {
      signIn: "http://localhost:3000",
      signOut: "http://localhost:3000/login"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
    ],
    callbacks: {
      async session({session, user}) {
        const userList : any = await getUserList();
        const currentUser = userList.filter(users => users.email == session?.user?.email)
        console.log(currentUser[0].role[0]);
        
        session.userId = currentUser[0].id
        session.role = currentUser[0].role[0]
        // userList.map(users => session.UserId = users.id)
        return session
      },
      async signIn({user}) {
        const axios = require('axios');
        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // (NOTE: this will disable client verification)
          passphrase: "YYY"
        })
        const instance = axios.create({
          httpsAgent
        });
        try {
          const response = await instance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Account/register`,
            {
              name: user.email,
              email: user.email,
              password: "String1!",
              confirmPassword: "String1!",
              roleId: 1,
              emailConfirmed: true
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = response.data;
          return true
        } catch (error) {
          console.error(error);
          return false
        }
      },
    }
  });

export { handler as GET, handler as POST };