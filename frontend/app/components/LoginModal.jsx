"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose, role = 'user' }) {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.sendOTP(phone, role);
      if (result.success) {
        setStep('otp');
        // In development, show OTP in console
        if (result.otp) {
          console.log('OTP:', result.otp);
          alert(`OTP: ${result.otp} (for development)`);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authAPI.verifyOTP(phone, otp, role);
      if (result.success) {
        login(result.token, result.user);
        onClose();
        
        // Redirect based on user's actual role from backend
        if (result.user.role === 'admin') {
          router.push('/admin');
        } else if (result.user.role === 'moderator') {
          router.push('/moderator');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-slate-900">
          {role === 'admin' ? 'Admin Login' : role === 'moderator' ? 'Moderator Login' : 'User Login'}
        </h2>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600/20"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-2xl tracking-widest focus:border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600/20"
                required
              />
              <p className="mt-2 text-xs text-slate-500">
                OTP sent to {phone}
              </p>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

