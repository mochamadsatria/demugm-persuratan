// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import cache from "@/utils/cache"

import requestIp from 'request-ip'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {

  const ip = requestIp.getClientIp(req)

  const ipCheck = cache.get(`${ip}`)

  if (ipCheck) {
    res.status(200).send("Authorized")
  } else res.status(401).send("Unauthorized")
}
