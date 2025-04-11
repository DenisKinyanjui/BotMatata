import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Freemium',
    price: '0',
    description: 'Perfect for individuals trying out our platform.',
    features: [
      '10 responses/day',
      'Limited Integrations',
      'Basic Support',
      'Standard Features',
    ],
    cta: 'Start Free Trial',
    disabled: true,
  },
  {
    name: 'Pro Monthly',
    price: '1,300',
    description: 'Ideal for professionals needing full platform access on a monthly basis.',
    features: [
      'Unlimited responses',
      'All Platform Integrations',
      'Priority Support',
      'Advanced Analytics',
    ],
    featured: true,
    cta: 'Get Started',
  },
  {
    name: 'Pro Yearly',
    price: '13,200',
    description: 'For those committed to growth with annual savings.',
    features: [
      'All Pro Monthly features',
      'Save KES 2,400 annually',
      'Priority Support',
      'Early Access to Features',
    ],
    priceSubtext: '(KES 1,100/month)',
    cta: 'Upgrade to Pro Yearly',
  },
];




const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Choose the right plan for your business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Start free and scale as you grow. All plans come with a 14-day trial.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                tier.featured ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-indigo-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-8 block w-full py-3 px-6 border rounded-md text-center font-medium ${
                  tier.featured
                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                    : 'bg-white border-gray-300 text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {tier.featured ? 'Start free trial' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;