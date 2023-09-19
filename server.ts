import { fastify } from 'fastify';
import { getAllPromptsRoute } from './src/routes/routePrompts';
import { uploadVideoRoute } from './src/routes/routeUploadVideo';
import { createTranscriptionRoute } from './src/routes/routetranscription';
import "dotenv/config"
import { getAllVideosRoute } from './src/routes/routevideos';
import { genereteCompleteRoute } from './src/routes/routeGenerateCompletion';

const port = process.env.PORT || 3333

const app = fastify()

app.register(getAllPromptsRoute)
app.register(getAllVideosRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(genereteCompleteRoute)

app.listen(
  {
    port: Number(port)
  }
).then(()=> console.log("Rodando in port", port))