import React from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Silver',
    price: 299,
    features: [
      '5 meals/week from hotel kitchen',
      'Basic room services',
      'Email support',
      'Free WiFi access',
      'Weekly room cleaning'
    ],
    bg: 'bg-gradient-to-b from-gray-50 to-gray-100',
    border: 'border-gray-200',
    text: 'text-gray-800',
    buttonStyle: 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50'
  },
  {
    name: 'Gold',
    price: 499,
    features: [
      '10 meals/week with priority delivery',
      'AC Room Access (8 hrs/day)',
      '24/7 Chat Support',
      'Premium WiFi speed',
      'Daily room cleaning',
      'Welcome drink on arrival'
    ],
    bg: 'bg-gradient-to-b from-orange-50 to-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-900',
    buttonStyle: 'bg-orange-500 border border-orange-500 text-white hover:bg-orange-600',
    highlight: true,
  },
  {
    name: 'Platinum',
    price: 799,
    features: [
      'Unlimited meals and chef specials',
      'AC Room Access (Full day)',
      'Dedicated Support & Laundry',
      'Ultra-fast WiFi',
      'Twice daily room cleaning',
      'Complimentary mini-bar',
      'Priority booking for facilities'
    ],
    bg: 'bg-gradient-to-b from-gray-50 to-gray-100',
    border: 'border-gray-200',
    text: 'text-gray-800',
    buttonStyle: 'bg-white border border-orange-500 text-orange-500 hover:bg-orange-50'
  },
];

function Membership() {
  const navigate = useNavigate();

  const handleRedirect = (pkg) => {
    navigate(`/checkout/${pkg}`);
  };

  return (
   <div className='bg-orange-50'>
     <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-orange-600 mb-4">
          <span className='text-black'>Premium </span>Memberships
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Experience luxury dining and accommodation with our exclusive packages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-xl border-2 ${pkg.bg} ${pkg.border} ${pkg.text} flex flex-col transition-all duration-300 hover:shadow-xl
              ${pkg.highlight ? 'transform md:scale-[1.05] shadow-lg' : ''}
              overflow-hidden h-full`}
          >
            <div className="p-8 pb-6">
              <h3 className="text-3xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-4xl font-extrabold mb-6">
                ৳{pkg.price}
                <span className="text-lg font-normal ml-1">/month</span>
              </p>
              
              <ul className="space-y-3 text-base">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto p-8 pt-0">
              <button
                onClick={() => handleRedirect(pkg.name.toLowerCase())}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition ${pkg.buttonStyle}`}
              >
                Select {pkg.name} Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}

export default Membership;