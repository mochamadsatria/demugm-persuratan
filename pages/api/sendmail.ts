// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cache from "@/utils/cache"
import type { NextApiRequest, NextApiResponse } from "next"

import requestIp from "request-ip"

import SibApiV3Sdk from "sib-api-v3-sdk"

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SENDINBLUE_API_V3_KEY

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {

  if (req.method !== "POST") res.status(400).send("Bad Request")
  else {
    const ip = requestIp.getClientIp(req)

    const authorized = cache.get(`${ip}`)

    if (!authorized) {
      res.status(401).send("Unauthorized")
    } else {

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

      const body = req.body

      sendSmtpEmail.sender = {
        name: process.env.SENDINBLUE_SENDER_NAME,
        email: process.env.SENDINBLUE_SENDER_EMAIL,
      }

      sendSmtpEmail.to = [{
        email: body.mailto,
      }]

      sendSmtpEmail.templateId = 1

      sendSmtpEmail.params = body

      sendSmtpEmail.headers = {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
      }

      return apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
        res.status(200).send("Success")
      }, function (error: any) {
        res.status(500).send("Error")
        console.error(error)
      })
    }
  }


}
