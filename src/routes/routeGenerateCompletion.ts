import { FastifyInstance } from "fastify"
import { prisma } from "../db/prisma"
import {z} from "zod"
import { openai } from "../db/openia"



export async function genereteCompleteRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { videoId, prompt, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where:{
        id: videoId
      }
    })

    if(!video.transcript) {
      return reply.status(400).send({ error: 'No video transcription was not generate yet'})
    }

    const promptMessage = prompt.replace("{transcription}", video.transcript)
    const response = openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [
        {
          role: "user",
          content: promptMessage
        },
      ],
    })
    return response
  })

}