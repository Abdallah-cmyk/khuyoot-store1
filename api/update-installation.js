import { Vercel } from "@vercel/sdk";

export default async function handler(req, res) {
  // التأكد من أن الطلب القادم هو PATCH أو POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const vercel = new Vercel({
      // يقرأ المفتاح بأمان من إعدادات Vercel بدون كشفه للمتصفح
      bearerToken: process.env.VERCEL_BEARER_TOKEN, 
    });

    const response = await vercel.marketplace.updateInstallation({
      integrationConfigurationId: req.body.configurationId,
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

