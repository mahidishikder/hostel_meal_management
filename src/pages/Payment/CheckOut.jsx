import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';

function CheckOut({ pkg }) {
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState(''); // New state
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (pkg?.price) {
      axiosPublic
        .post('/create-payment-intent', { price: pkg.price })
        .then(res => {
          console.log('Received clientSecret:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error('Payment intent error', err);
          setError('Failed to initialize payment. Please try again later.');
        });
    }
  }, [axiosPublic, pkg?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    if (!clientSecret) {
      setError('Client secret not available. Please refresh and try again.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError('');

    // Create payment method
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (createError) {
      console.log('Payment Method Error:', createError);
      setError(createError.message);
      setProcessing(false);
      return;
    }

    console.log('Payment Method:', paymentMethod);

    // Confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log('Confirm Error:', confirmError.message);
      setError(confirmError.message);
    } else {
      console.log('✅ Payment Success:', paymentIntent);
      setError('');
      setTransactionId(paymentIntent.id); // Set Transaction ID
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="w-full max-w-md mx-auto">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full sm:w-auto py-2 px-6 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 disabled:bg-gray-300 transition"
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Success Message */}
      {transactionId && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          ✅ Payment successful! <br />
          Transaction ID: <span className="font-mono">{transactionId}</span>
        </div>
      )}
    </form>
  );
}

export default CheckOut;
