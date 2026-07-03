import axios from 'axios';

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
  vendor_id?: number | string;
  order_id?: string;
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
    const API_KEY = process.env.FAWATERAK_API_KEY;
    const BASE_URL = process.env.FAWATERAK_API_URL || 'https://app.fawaterk.com/api/v2';

    if (!API_KEY) throw new Error("FAWATERAK_API_KEY is missing from environment");

    try {
      console.log('Fawaterak - Initializing Payment with vendor_id:', data.vendor_id);
      
      const response = await axios.post(`${BASE_URL}/invoiceInitPay`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        const detail = typeof response.data.message === 'string' ? response.data.message : JSON.stringify(response.data.message);
        throw new Error(detail || 'Failed to initialize payment');
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
    const API_KEY = process.env.FAWATERAK_API_KEY;
    const BASE_URL = process.env.FAWATERAK_API_URL || 'https://app.fawaterk.com/api/v2';

    if (!API_KEY) throw new Error("FAWATERAK_API_KEY is missing from environment");

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
