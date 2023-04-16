// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import cache from "@/utils/cache"

import requestIp from 'request-ip'
import dayjs from 'dayjs'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {

    if (req.method !== "POST") res.status(400).send("Bad Request")
    else {
        const body = req.body

        const ip = requestIp.getClientIp(req)

        if (body.username == "Admin") {
            if (body.password == "DEMUGM2023") {

                cache.set(`${ip}`, dayjs().toISOString(), 86400)

                res.status(200).send("Authorized")
            } else res.status(401).send("Unauthorized")
        } else res.status(401).send("Unauthorized")
    }
}
