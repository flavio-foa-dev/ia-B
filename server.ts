import { fastify } from 'fastify';
import { getAllPromptsRoute } from './src/routes/routePrompts';
import { uploadVideoRoute } from './src/routes/routeUploadVideo';

const port = process.env.PORT || 3333

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)



app.listen(
  {
    port: Number(port)
  }
).then(()=> console.log("Rodando in port", port))