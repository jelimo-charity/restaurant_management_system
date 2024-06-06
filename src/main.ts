import { Hono } from "hono"; 
import "dotenv/config"
import {serve} from '@hono/node-server'
import { HTTPException } from "hono/http-exception";
import { userRouter } from "./users/user.router.js";
import { stateRouter } from "./state/state.router.js";

const app = new Hono().basePath('/api');

// default route 

app.get("ok", (c) =>{
    return c.text("the server is running")
})

app.route("/", userRouter),
app.route("/", stateRouter)

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)

})

console.log(`server running at ${process.env.PORT}`)