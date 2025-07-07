// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from '@/utils/database/service'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: boolean,
    statusCode: number,
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.query.product[1]) {
        const data = await retrieveDataById("product", req.query.product[1])
        res.status(200).json({ status: true, statusCode: 200, data })
    }
    const data = await retrieveData()
    res.status(200).json({ status: true, statusCode: 200, data })
}
