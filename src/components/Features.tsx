import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Settings, BarChart, Globe, Clock, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Multi-Platform Integration',
    description: 'Connect seamlessly with WhatsApp, Facebook Messenger, and more platforms your customers love.',
    icon: Globe,
  },
  {
    name: 'Smart AI Responses',
    description: 'Our AI learns from every interaction, delivering more accurate and personalized responses over time.',
    icon: MessageCircle,
  },
  {
    name: 'Easy Customization',
    description: 'Tailor your chatbot’s personality and responses to match your brand voice perfectly.',
    icon: Settings,
  },
  {
    name: 'Advanced Analytics',
    description: 'Track performance metrics and customer satisfaction in real-time with detailed insights.',
    icon: BarChart,
  },
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate up to 80% of customer inquiries, letting your team focus on high-value tasks.',
    icon: Clock,
  },
  {
    title: 'Boost Engagement',
    description: 'Engage customers 24/7 with instant responses and personalized interactions.',
    icon: Users,
  },
  {
    title: 'Increase Sales',
    description: 'Convert more leads with instant responses and smart product recommendations.',
    icon: TrendingUp,
  },
];

const stats = [
  { value: 95, label: 'Customer Satisfaction', symbol: '%', startFrom: 0 },
  { value: 80, label: 'Time Saved', symbol: '%', startFrom: 0 },
  { value: 5000, label: 'Active Users', symbol: '+', startFrom: 1000 },
  { value: 1000000, label: 'Messages Handled', symbol: '+', startFrom: 100000 },
];

const AnimatedStat = ({ value, label, symbol, startFrom, shouldAnimate }: {
  value: number;
  label: string;
  symbol: string;
  startFrom: number;
  shouldAnimate: boolean;
}) => {
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    if (!shouldAnimate) return;

    let current = startFrom;
    const duration = 2000;
    const steps = 50;
    const increment = (value - startFrom) / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setCount(current);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [shouldAnimate, value, startFrom]);

  return (
    <div className="text-center p-6 bg-sky-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="text-4xl font-bold text-botmatata-blue mb-2">
        {Math.round(count).toLocaleString()}{symbol}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const Features = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateStats(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <>
      <div id="features" className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase text-botmatata-blue">
              Why Choose BotMatata?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Powerful features to help you manage customer interactions efficiently and grow your business.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center h-12 w-12 rounded-md bg-botmatata-green text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Stats Section */}
      <div className="bg-gray-50 py-16" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              BotMatata by the Numbers
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Real results from businesses like yours
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                symbol={stat.symbol}
                startFrom={stat.startFrom}
                shouldAnimate={animateStats}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-botmatata-blue bg-opacity-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold tracking-wide uppercase text-botmatata-coral">
              How BotMatata Helps Your Business
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Transform your customer service
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="relative bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-botmatata-lavender bg-opacity-20 mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-botmatata-coral" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-botmatata-green bg-opacity-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to Automate Your Business?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of businesses already using BotMatata to grow their customer engagement.
          </p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-botmatata-coral hover:bg-opacity-90 transition-colors"
            >
              Start For Free
              <Globe className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
