import axios from 'axios';

const API_KEY = process.env.FAWATERAK_API_KEY;
const BASE_URL = process.env.FAWATERAK_API_URL || 'https://staging.fawaterk.com/api/v2';

export interface FawaterakInvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

export interface FawaterakInitPayRequest {
  payment_method_id: number;
  cartTotal: number;
  currency: 'EGP' | 'USD';
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  cartItems: FawaterakInvoiceItem[];
  redirectionUrls: {
    successUrl: string;
    failUrl: string;
    pendingUrl: string;
  };
}

export interface FawaterakInitPayResponse {
  status: string;
  data: {
    invoice_id: number;
    invoice_key: string;
    url?: string;
    payment_data?: {
      redirectTo?: string;
      fawryCode?: string;
      [key: string]: any;
    };
  };
}

export interface FawaterakInvoiceDataResponse {
  status: string;
  data: {
    invoice_id: number;
    invoice_id_fawaterk: number;
    invoice_key: string;
    payment_status: string; // "paid", "unpaid", "expired", "error"
    payment_method: string;
    region: string;
    amount: number;
    currency: string;
    customer: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
  };
}

export const fawaterakClient = {
  /**
   * Initialize a payment with Fawaterak.
   */
  async initPayment(data: FawaterakInitPayRequest): Promise<FawaterakInitPayResponse['data']> {
    try {
      console.log('Fawaterak Payload:', JSON.stringify(data, null, 2));
      const response = await axios.post(`${BASE_URL}/invoiceInitPay`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      console.log('Fawaterak Response:', JSON.stringify(response.data, null, 2));

      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to initialize payment');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Fawaterak API Error Response:', error.response.data);
        const detail = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
        throw new Error(`FAWATERAK_API_ERROR: ${detail}`);
      }
      console.error('Fawaterak Init Payment Error:', error.message);
      throw new Error(`INIT_ERROR: ${error.message}`);
    }
  },

  /**
   * Securely fetch invoice data from Fawaterak server for verification.
   */
  async getInvoiceData(invoiceId: string | number): Promise<FawaterakInvoiceDataResponse['data']> {
    try {
      const response = await axios.get(`${BASE_URL}/getInvoiceData/${invoiceId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch invoice data');
      }
    } catch (error: any) {
      console.error('Fawaterak Get Invoice Error:', error.response?.data || error.message);
      throw error;
    }
  }
};
