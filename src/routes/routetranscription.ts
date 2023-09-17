import { FastifyInstance } from "fastify"
import {z} from "zod"
import { prisma } from "../db/prisma"
import { createReadStream } from "node:fs"
import { openai } from "../db/openia"


export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (request) => {

    const paramsSchema = z.object({
      videoId: z.string().uuid()
    })

   const {videoId} = paramsSchema.parse(request.params)

   const bodySchema = z.object({
    prompt: z.string(),
   })

   const {prompt} = bodySchema.parse(request.body)

   const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: videoId
    }
   })
   const pathVideo = video.path
   console.log("pathVideo",pathVideo )
   const audioreadStream = createReadStream(pathVideo)

   try {
    const response = await openai.audio.transcriptions.create({
      file: audioreadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
     })

     return {response: response.text}

    } catch (error) {
       console.log(error)
      }

  })

}