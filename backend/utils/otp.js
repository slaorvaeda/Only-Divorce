// Generate 6-digit OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Set OTP expiration (10 minutes)
exports.getOTPExpiration = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

// In production, you would integrate with Twilio or similar service
exports.sendOTP = async (phone, otp) => {
  // TODO: Integrate with Twilio or SMS service
  console.log(`📱 OTP for ${phone}: ${otp}`);
  // For development, just log it
  return { success: true, message: 'OTP sent successfully' };
};

