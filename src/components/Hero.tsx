import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Simple chat sequence with 3 messages as requested
  const chatSequence = [
    { type: 'bot', text: 'Hi! How can I assist you today?' },
    { type: 'user', text: 'I need help with my order' },
    { type: 'bot', text: 'What kind of help do you need with your order?' }
  ];

  // States for animation control
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typingIndex, setTypingIndex] = useState(null);
  const [typingMessageType, setTypingMessageType] = useState(null);
  
  // Use useRef for tracking animation state to avoid re-renders
  const animationState = useRef({
    currentIndex: 0,
    isResetting: false,
    timers: []
  });

  // Clear all timers to prevent memory leaks
  const clearAllTimers = () => {
    animationState.current.timers.forEach(timer => clearTimeout(timer));
    animationState.current.timers = [];
  };

  // Add a timer to our tracking array
  const addTimer = (callback, delay) => {
    const timerId = setTimeout(() => {
      // Remove this timer from our tracking array once it executes
      animationState.current.timers = animationState.current.timers.filter(id => id !== timerId);
      callback();
    }, delay);
    
    animationState.current.timers.push(timerId);
    return timerId;
  };

  // More realistic typing duration based on message length
  const getTypingDuration = (text) => {
    const baseDelay = 700;
    const charDelay = 25; // ms per character
    return Math.min(baseDelay + text.length * charDelay, 2000); // Cap at 2 seconds
  };

  // Restart the animation sequence
  const restartSequence = () => {
    // Clear visible messages
    setVisibleMessages([]);
    setTypingIndex(null);
    setTypingMessageType(null);
    
    // Reset animation state
    animationState.current.currentIndex = 0;
    animationState.current.isResetting = false;
    
    // Start the animation sequence after a short delay
    addTimer(() => {
      startChatSequence();
    }, 500);
  };

  // Handle transitioning to the next message
  const showNextMessage = () => {
    if (animationState.current.isResetting) return;
    
    const { currentIndex } = animationState.current;
    
    // Check if we've reached the end of the sequence
    if (currentIndex >= chatSequence.length) {
      // Start the reset process
      animationState.current.isResetting = true;
      
      // Fade out all messages
      setVisibleMessages(prev => prev.map(msg => ({ ...msg, fading: true })));
      
      // Wait for fade animation to complete, then restart
      addTimer(() => {
        restartSequence();
      }, 800);
      return;
    }
    
    const currentMessage = chatSequence[currentIndex];
    
    // Show typing indicator
    setTypingMessageType(currentMessage.type);
    setTypingIndex(currentIndex);
    
    // Calculate typing duration
    const typingDuration = getTypingDuration(currentMessage.text);
    
    // After typing duration, show the message
    addTimer(() => {
      // Remove typing indicator
      setTypingIndex(null);
      
      // Add the new message with animation flag
      setVisibleMessages(prev => [...prev, { ...currentMessage, new: true }]);
      
      // After animation completes, remove the animation flag
      addTimer(() => {
        setVisibleMessages(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, new: false } : msg
          )
        );
        
        // Increment the index for next message
        animationState.current.currentIndex++;
        
        // Determine delay before showing next message
        const nextMessageIndex = animationState.current.currentIndex;
        const nextMessage = chatSequence[nextMessageIndex];
        const isResponsePair = nextMessage && nextMessage.type !== currentMessage.type;
        const delayBeforeNext = isResponsePair ? 1200 : 800;
        
        // Schedule the next message
        addTimer(() => {
          showNextMessage();
        }, delayBeforeNext);
      }, 500);
    }, typingDuration);
  };

  // Start the chat sequence animation
  const startChatSequence = () => {
    // Initial delay before starting the sequence
    addTimer(() => {
      showNextMessage();
    }, 1000);
  };

  // Initialize and clean up the animation
  useEffect(() => {
    startChatSequence();
    
    // Clean up all timers when component unmounts
    return () => {
      clearAllTimers();
    };
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between py-16 px-4 sm:px-6 lg:px-8">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 text-left mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-indigo-950 leading-tight">
              Smart AI Assistant,
              <br />
              Powered by
              <span className="block mt-2" style={{ color: '#00C774' }}>
                BotMatata
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-800 max-w-lg">
              Automate chats, engage customers, and grow your business effortlessly. Let BotMatata handle the conversations while you focus on success
            </p>
            <div className="mt-8">
              <Link 
                to="/signup"
                className="px-8 py-4 bg-indigo-950 text-white rounded-md font-medium hover:bg-opacity-90 transition-colors inline-flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right side illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* ChatbotHero image and chat interface side by side */}
            <div className="relative w-full flex items-center justify-center">
              {/* ChatbotHero robot image */}
              <div className="relative z-10 absolute right-40">
                <img 
                  src="/src/public/ChatbotHero.png" 
                  alt="BotMatata Assistant" 
                  className="h-80 object-contain"
                />
              </div>

              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
              
              {/* Optimized smaller chat interface mockup */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 md:w-72 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 z-20">
                {/* Chat header */}
                <div className="flex items-center pb-2 border-b border-gray-100 mb-2">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-medium text-xs">Customer</p>
                    <p className="text-xs text-green-500">Online</p>
                  </div>
                </div>
                
                {/* Smaller chat messages container with fixed height */}
                <div className="h-48 flex flex-col">
                  <div className="flex-grow overflow-y-auto pr-1 space-y-2" style={{ scrollBehavior: 'smooth' }}>
                    {/* Display messages with animations */}
                    {visibleMessages.map((message, index) => (
                      message.type === 'bot' ? (
                        <div 
                          key={`bot-${index}`} 
                          className={`flex items-start mb-1 transition-all duration-500`}
                          style={{
                            opacity: message.fading ? 0 : 1,
                            transform: message.fading ? 'translateY(-10px)' : 'translateY(0)',
                            animation: message.new ? 'fadeSlideIn 0.5s ease-out forwards' : 'none',
                            animationFillMode: 'forwards'
                          }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">B</span>
                          </div>
                          <div className="ml-2 bg-gray-100 rounded-lg p-2 max-w-xs shadow-sm">
                            <p className="text-xs text-gray-800">{message.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div 
                          key={`user-${index}`} 
                          className={`flex items-start justify-end mb-1 transition-all duration-500`}
                          style={{
                            opacity: message.fading ? 0 : 1,
                            transform: message.fading ? 'translateY(-10px)' : 'translateY(0)',
                            animation: message.new ? 'fadeSlideIn 0.5s ease-out forwards' : 'none',
                            animationFillMode: 'forwards'
                          }}
                        >
                          <div className="mr-2 bg-green-100 rounded-lg p-2 max-w-xs shadow-sm">
                            <p className="text-xs text-gray-800">{message.text}</p>
                          </div>
                          <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xs">C</span>
                          </div>
                        </div>
                      )
                    ))}

                    {/* Typing indicator with correct sender avatar */}
                    {typingIndex !== null && (
                      typingMessageType === 'bot' ? (
                        <div className="flex items-start mb-1" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
                          <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">B</span>
                          </div>
                          <div className="ml-2 bg-gray-100 rounded-lg py-2 px-3 shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite' }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite 0.15s' }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite 0.3s' }}></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-end mb-1" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
                          <div className="mr-2 bg-green-100 rounded-lg py-2 px-3 shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite' }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite 0.15s' }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animation: 'typingBounce 0.6s infinite 0.3s' }}></div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xs">C</span>
                          </div>
                        </div>
                      )  
                    )}
                  </div>
                  
                  {/* Smaller chat input field */}
                  <div className="mt-2 flex items-center pt-2 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-grow text-xs p-1.5 rounded-md border border-gray-200 focus:outline-none focus:border-emerald-500"
                      disabled
                    />
                    <button className="ml-1 p-1.5 bg-emerald-500 text-white rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Include the CSS styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
      `}} />
    </div>
  );
};

export default Hero;