import mono from '@/services/mono';
import type { NextApiRequest, NextApiResponse } from 'next';
import constants from '@config/constants';
import { AxiosError } from 'axios';

const { MONO_SECRET } = constants;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId, ...payload } = req.body;
  try {
    const { data } = await mono.post('/connect/commit', payload, {
      headers: { 'mono-sec-key': MONO_SECRET, 'x-session-id': sessionId },
    });

    if (data.status !== 200) {
      return res.status(data.status).json({ message: data.message, success: false });
    }

    return res.status(200).json({ data, message: 'Login complete', success: true });
  } catch (error) {
    const x = error as AxiosError<{ message: string }>;
    if (x.response && x.response.status < 500) {
      return res.status(x.response.status).json({ error, message: x.response.data.message, success: false });
    }
    return res.status(500).json({ error, success: false });
  }
}
