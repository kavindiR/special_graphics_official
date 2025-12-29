"use client";
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// --- Global Constants and Styling ---
const BG_COLOR = '#f8f8f8'; // Light background color
const DARK_COLOR = '#131313'; // Dark text and primary button color
const RED_COLOR = '#ef4444'; // Red for validation messages
const GREEN_COLOR = '#10B981'; // Tailwind's emerald/green for met requirements

// --- Custom Colored Social Icons (Matching Brand Logos) ---

// 1. Google Multi-color 'G' Icon for exact brand match
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Blue section */}
    <path fill="#4285F4" d="M44.02 24.23c0-1.62-.14-3.2-.42-4.74H24v9.01h12.43c-.56 2.82-2.22 5.16-4.7 6.74l7.18 5.61C41.44 38.07 44.02 31.7 44.02 24.23z" />
    {/* Red section */}
    <path fill="#EA4335" d="M24 44c6.1 0 11.23-2.02 14.97-5.46L31.8 32.93c-2.31 1.57-5.22 2.51-7.8 2.51-6.49 0-11.95-4.38-13.91-10.24H3.01l-7.18 5.61C6.27 40.89 14.28 44 24 44z" />
    {/* Yellow section */}
    <path fill="#FBBC05" d="M10.09 29.74c-.48-1.45-.73-3-.73-4.74s.25-3.29.73-4.74L3.01 14.65c-1.8 3.56-2.82 7.59-2.82 11.44s1.02 7.88 2.82 11.44l7.08-5.59z" />
    {/* Green section */}
    <path fill="#34A853" d="M24 4c5.29 0 9.87 2.16 13.31 5.46l6.3-6.3C39.46 3.57 33.61 2 24 2 15.17 2 7.54 5.37 2.92 10.92l7.18 5.61C12.59 12.04 17.5 9.5 24 9.5z" />
  </svg>
);

// 2. Facebook Official Blue 'f' Icon for exact brand match
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
      fill="#1877F2" // Official Facebook Blue
    />
  </svg>
);

// 3. Apple Icon (Updated to canonical bitten apple logo)
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M17.8 11.2c.2-1.7 1.6-3 3.5-3-1.1-1.5-2.7-2.1-4.2-2.3-.9-1.2-1.8-2.4-3.1-2.9-1.3-.5-2.9-.3-4.1.7-.8.7-1.3 1.6-1.6 2.5-1.5.3-3.2 1.3-3.8 3.1-.4 1.2-.3 2.5.2 3.6.4.7 1 1.4 1.6 2.1 1.3 1.5 2.5 3.1 4.3 3.1h.1c1.8 0 3.1-1.6 4.3-3.1.6-.7 1.2-1.4 1.6-2.1.5-1.1.6-2.4.2-3.6zM15.4 3.7c.9-1.1 1.5-2.5 1.6-4.1-.9.1-2.1.8-2.9 1.8-.7.8-1.3 1.9-1.5 3.1.9.1 2.2-.5 2.8-1.5z" />
  </svg>
);


// Helper component for social login buttons
const SocialButton = ({ icon: Icon, text }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string }) => (
  <button
    // The hover:border-black ensures the button follows the monochrome style when interacted with
    className="flex items-center justify-center w-full py-3 px-4 mb-4 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white shadow-sm hover:border-black"
    style={{ color: DARK_COLOR }}
  >
    <Icon className="w-5 h-5 mr-3" />
    {text}
  </button>
);

// --- Password Validation Logic ---
const validatePassword = (password: string) => ({
  isMinLength: password.length >= 8,
  isUppercase: /[A-Z]/.test(password),
  isLowercase: /[a-z]/.test(password),
  isNumber: /[0-9]/.test(password),
});

// --- Validation Requirement Display Component (Updated color logic) ---
const ValidationRequirement = ({ isValid, text }: { isValid: boolean; text: string }) => (
  // Use GREEN_COLOR for met, RED_COLOR for missing
  <p className="flex items-center text-xs" style={{ color: isValid ? GREEN_COLOR : RED_COLOR }}>
    {isValid ? (
      // Checkmark icon (Green when valid)
      <svg className="w-3 h-3 mr-2 fill-current" viewBox="0 0 20 20">
        <path d="M7.629 14.571l-3.3-3.3a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0l2.593 2.593 5.973-5.973a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707l-6.68 6.68a.5.5 0 01-.707 0z" />
      </svg>
    ) : (
      // Simple dot visual for 'missing'
      <svg className="w-3 h-3 mr-2 fill-current" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2.5" />
      </svg>
    )}
    {text}
  </p>
);

// =========================================================================
// --- SIGN UP FORM COMPONENT ---
// =========================================================================
const SignUpForm = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validation, setValidation] = useState(validatePassword(''));
  const [submitted, setSubmitted] = useState(false);

  // Update validation status whenever password changes
  useEffect(() => {
    setValidation(validatePassword(password));
  }, [password]);

  // Check if all necessary fields are filled (not including password validation)
  const isBasicFormFilled = firstName && lastName && email && password;
  const isPasswordValid = Object.values(validation).every(v => v);
  const isFormValid = isBasicFormFilled && isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (isFormValid) {
      console.log('Sign Up Successful:', { firstName, lastName, email, password });
      // In a real app, you would call your API here
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: DARK_COLOR }}>Sign Up</h2>

      {/* Social Login Buttons (Using corrected colored icons) */}
      <SocialButton icon={GoogleIcon} text="Continue with Google" />
      <SocialButton icon={FacebookIcon} text="Continue with Facebook" />
      <SocialButton icon={AppleIcon} text="Continue with Apple" />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or, create an account with email.</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !firstName ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !lastName ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !email ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Validation Requirements (Visible if typing) */}
        {password.length > 0 && (
          <div className="grid grid-cols-2 gap-y-2 text-xs mb-6">
            <ValidationRequirement isValid={validation.isMinLength} text="8 characters minimum" />
            <ValidationRequirement isValid={validation.isUppercase} text="1 uppercase letter" />
            <ValidationRequirement isValid={validation.isLowercase} text="1 lowercase letter" />
            <ValidationRequirement isValid={validation.isNumber} text="1 number" />
          </div>
        )}
        {password.length === 0 && <div className="h-10 mb-6"></div>}


        {/* Terms and Conditions */}
        <p className="text-xs text-gray-600 mb-6">
          By clicking below, you agree to our Special Graphics <span className="underline cursor-pointer">Terms and Conditions</span> and acknowledge our <span className="underline cursor-pointer">Privacy and Cookie Policy</span>.
        </p>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-opacity duration-200 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ backgroundColor: DARK_COLOR, color: 'white' }}
        >
          Create an account
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm mt-6 text-gray-700"> {/* <--- Added text-gray-700 here */}
        Already have an account?{' '}
        <button className="text-sm font-medium underline" onClick={() => onNavigate('signin')} style={{ color: DARK_COLOR }}>
          Sign In
        </button>
      </p>
    </div>
  );
};

// =========================================================================
// --- SIGN IN FORM COMPONENT ---
// =========================================================================
const SignInForm = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validation, setValidation] = useState(validatePassword(''));
  const [submitted, setSubmitted] = useState(false);

  // Live password requirement check (matching Sign Up page rules)
  useEffect(() => {
    setValidation(validatePassword(password));
  }, [password]);

  const isPasswordValid = Object.values(validation).every(v => v);
  const isFormValid = email && password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (isFormValid) {
      console.log('Sign In Successful:', { email, password });
      // In a real app, you would call your API here
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: DARK_COLOR }}>Welcome Back</h2>

      {/* Social Login Buttons (Using corrected colored icons) */}
      <SocialButton icon={GoogleIcon} text="Login with Google" />
      <SocialButton icon={FacebookIcon} text="Login with Facebook" />
      <SocialButton icon={AppleIcon} text="Login with Apple" />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or, sign in with email.</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email Address */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !email ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Validation Requirements (Added to Sign In for consistency/help) */}
        {password.length > 0 && (
          <div className="grid grid-cols-2 gap-y-2 text-xs mb-6">
            <ValidationRequirement isValid={validation.isMinLength} text="8 characters minimum" />
            <ValidationRequirement isValid={validation.isUppercase} text="1 uppercase letter" />
            <ValidationRequirement isValid={validation.isLowercase} text="1 lowercase letter" />
            <ValidationRequirement isValid={validation.isNumber} text="1 number" />
          </div>
        )}
        {password.length === 0 ? (
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center text-xs text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button type="button" className="text-xs underline text-gray-600 hover:text-black transition-colors">
              Forgot password?
            </button>
          </div>
        ) : (
          <div className="h-10 mb-6"></div>
        )}


        {/* Terms and Conditions */}
        <p className="text-xs text-gray-600 mb-6">
          By signing in, you agree to our Special Graphics <span className="underline cursor-pointer">Terms and Conditions</span> and acknowledge our <span className="underline cursor-pointer">Privacy and Cookie Policy</span>.
        </p>

        {/* Sign In Button (Outlined/Lightly Styled) */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ borderColor: DARK_COLOR, color: DARK_COLOR, backgroundColor: 'white' }}
        >
          Sign In
        </button>
      </form>

      <div className="text-center text-sm my-4 text-gray-500">Or</div>

      {/* Create an account Button (Solid Black) */}
      <button
        type="button"
        className="w-full py-3 rounded-lg text-sm font-medium transition-opacity duration-200"
        onClick={() => onNavigate('signup')}
        style={{ backgroundColor: DARK_COLOR, color: 'white' }}
      >
        Create an account
      </button>
    </div>
  );
};

// =========================================================================
// --- MAIN APPLICATION ENTRY POINT (ROUTING LOGIC) ---
// =========================================================================
const App = () => {
  const [page, setPage] = useState('signin'); // 'signin' or 'signup'

  // Load the custom font using a standard link element - still needed for text elements
  const fontLink = (
    <link
      key="dancing-script-font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
    />
  );

  return (
    <>
      {fontLink}
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: BG_COLOR, fontFamily: 'Inter, sans-serif' }}
      >
        <div
          className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg"
        >
          {/* Update: The image source has been changed to a Next.js-friendly 
            relative root path (/logo.png), assuming the file is in the /public directory.
          */}
          <img
            src="/special-graphics-logo.svg" // <--- UPDATED PATH FOR NEXT.JS PUBLIC FOLDER
            alt="Company Logo"
            className="mx-auto mb-8" // Centering and margin-bottom for spacing
            style={{ height: '50px', width: '150px' }} // Explicit dimensions
          />
          {page === 'signin' ? (
            <SignInForm onNavigate={setPage} />
          ) : (
            <SignUpForm onNavigate={setPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
