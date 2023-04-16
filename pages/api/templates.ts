// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import cache from "@/utils/cache"

import requestIp from 'request-ip'

import SibApiV3Sdk from "sib-api-v3-sdk"

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_V3_KEY


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {

    const ip = requestIp.getClientIp(req)

    const authorized = cache.get(`${ip}`)

    if (!authorized) {
        res.status(401).send("Unauthorized")
    } else {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

        let opts = {
            'templateStatus': true,
            'offset': 0
        };

        apiInstance.getSmtpTemplates(opts).then(function (data: any) {

            data.templates = data.templates.map((template: any) => ({
                id: template.id,
                name: template.name,
                tag: template.tag,
            }))

            res.status(200).json(data)
        }, function (error: any) {
            res.status(500).send("Error")
            console.error(error)
        })
    }

}