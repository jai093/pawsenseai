import Razorpay from 'razorpay';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    [key: string]: string;
  };
  handler: (response: any) => void;
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    persistent?: boolean;
    animation?: string;
    class?: {
      modal?: string;
      backdrop?: string;
    };
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export class RazorpayService {
  private static instance: RazorpayService;
  private razorpayKey: string;

  private constructor() {
    // Using a valid Razorpay test key format - you'll need to get your actual test key from Razorpay dashboard
    this.razorpayKey = 'rzp_test_0000000000000000'; // Replace with your actual Razorpay test key
  }

  public static getInstance(): RazorpayService {
    if (!RazorpayService.instance) {
      RazorpayService.instance = new RazorpayService();
    }
    return RazorpayService.instance;
  }

  public async createOrder(amount: number, currency: string = 'INR'): Promise<any> {
    try {
      // For testing, return a mock order
      console.log('Creating mock Razorpay order for amount:', amount);
      return {
        id: `order_mock_${Date.now()}`,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        status: 'created'
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  }

  public openPaymentModal(options: RazorpayOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      // For testing, simulate a successful payment without opening Razorpay modal
      console.log('Simulating payment for amount:', options.amount);
      
      // Simulate payment processing delay
      setTimeout(() => {
        const mockPaymentResponse = {
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_order_id: options.order_id || `order_mock_${Date.now()}`,
          razorpay_signature: `sig_mock_${Date.now()}`
        };
        
        console.log('Mock payment successful:', mockPaymentResponse);
        resolve(mockPaymentResponse);
      }, 2000); // 2 second delay to simulate payment processing
    });
  }

  private initiatePayment(
    options: RazorpayOptions,
    resolve: (value: any) => void,
    reject: (reason: any) => void
  ): void {
    const razorpayOptions = {
      key: this.razorpayKey,
      amount: options.amount,
      currency: options.currency,
      name: options.name,
      description: options.description,
      order_id: options.order_id,
      prefill: options.prefill,
      notes: options.notes,
      handler: (response: any) => {
        resolve(response);
        if (options.handler) {
          options.handler(response);
        }
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'));
          if (options.modal?.ondismiss) {
            options.modal.ondismiss();
          }
        },
        escape: true,
        backdropclose: true,
        handleback: true,
        confirm_close: true,
        persistent: true,
        animation: 'slideIn',
        ...options.modal
      }
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  }

  public verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    // In a real application, this would call your backend to verify the payment
    return new Promise((resolve) => {
      // Simulate verification
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}

export const razorpayService = RazorpayService.getInstance();
