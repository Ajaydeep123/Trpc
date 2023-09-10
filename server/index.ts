import { publicProcedure, router } from './trpc';
 import {z} from 'zod';

import { createHTTPServer } from '@trpc/server/adapters/standalone';
const todoInputType = z.object({
    title:z.string(),
    description:z.string()
})

const appRouter = router({
  // ...
//              createTodo: publicProcedure
//                 .input(todoInputType)
//                 .mutation(async (opts) =>{
//                     console.log("kya re pagal hi");
                    
//                     const title = opts.input.title;
//                     const description = opts.input.description;
// //do db stuff here
//                     return {
//                         id: "1",
//                     }
//                 }),
            signUp: publicProcedure
                    .input(z.object({
                        email: z.string(),
                        password: z.string()
                    }))
                    .mutation(async (opts)=>{
                        let email = opts.input.email;
                        let password = opts.input.password;

                        let token = "123123";
                        return {
                            token
                        }
                    }),
                    
            createTodo: publicProcedure
                    .input(z.object({
                        title: z.string()
                    }))
                    .mutation(async (opts) => {
                        console.log(opts.ctx.username)
                        return {
                            id: "1"
                        }
                    })            
});
 
// Export type router type signature,
// NOT the router itself.
 
const server = createHTTPServer({
  router: appRouter,
  createContext(opts){
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    //jwt verify
    return {
        username:"123" 
    }
    
  }
});
 
server.listen(3000);
export type AppRouter = typeof appRouter;