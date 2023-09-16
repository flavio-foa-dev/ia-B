import { fastify } from 'fastify';

const port = process.env.PORT || 3333

const app = fastify()



app.get("/", ()=> "hello word")

app.listen(
  {
    port: Number(port)
  }
).then(()=> console.log("Rodando in port", port))