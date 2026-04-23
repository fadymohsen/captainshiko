import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function debugInvoice() {
  const invoiceId = "7533295";
  const API_KEY = process.env.FAWATERAK_API_KEY;
  const BASE_URL = process.env.FAWATERAK_API_URL || "https://app.fawaterk.com/api/v2";

  console.log(`Checking status for Invoice: ${invoiceId}...`);
  console.log(`Using API URL: ${BASE_URL}`);

  if (!API_KEY) {
    console.error("ERROR: FAWATERAK_API_KEY is missing in your local .env!");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/getInvoiceData/${invoiceId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    console.log("--- SUCCESS! RAW RESPONSE ---");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err: any) {
    if (err.response) {
      console.error("API ERROR RESPONSE:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("CONNECTION ERROR:", err.message);
    }
  }
}

debugInvoice();
