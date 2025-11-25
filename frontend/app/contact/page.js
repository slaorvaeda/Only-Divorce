import ContactForm from "../components/pages/ContactForm";

const contactMethods = [
  {
    icon: "📧",
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "support@onlydivorce.in",
    action: "mailto:support@onlydivorce.in"
  },
  {
    icon: "📱",
    title: "Call Us",
    description: "Speak directly with our support team",
    contact: "+91 1800-XXX-XXXX",
    action: "tel:+911800XXXXXX"
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Chat with us in real-time for instant support",
    contact: "Available 9 AM - 9 PM IST",
    action: "#"
  },
  {
    icon: "📍",
    title: "Office Address",
    description: "Visit our office during business hours",
    contact: "Mumbai, Maharashtra, India",
    action: "#"
  }
];

const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer: "We aim to respond to all inquiries within 24 hours. For urgent matters, please call our helpline."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. We take privacy seriously and all your information is encrypted and kept strictly confidential."
  },
  {
    question: "Can I schedule a one-on-one consultation?",
    answer: "Yes! You can request a personalized consultation through our dashboard or by contacting us directly."
  },
  {
    question: "Do you offer support in regional languages?",
    answer: "Yes, we have moderators who can communicate in Hindi, English, and several regional languages."
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center lg:px-0">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4" data-aos="fade-up">
            Contact Us
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl md:leading-[1.1] mb-6" data-aos="fade-up" data-aos-delay="100">
            Get in Touch
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 md:text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            We're here to help. Reach out to us through any of the channels below, and our 
            team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.action}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200 text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{method.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{method.description}</p>
                <p className="text-lime-600 font-semibold group-hover:text-lime-700">
                  {method.contact}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div data-aos="fade-right">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4">
                Send us a Message
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">
                We'd Love to Hear from You
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Whether you have a question, need support, or want to share feedback, 
                we're here to listen. Fill out the form and we'll get back to you promptly.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Quick Response</h4>
                    <p className="text-sm text-slate-600">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Confidential</h4>
                    <p className="text-sm text-slate-600">Your information is secure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Expert Support</h4>
                    <p className="text-sm text-slate-600">Trained professionals ready to help</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" data-aos="fade-left">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">
              Quick answers to common questions about contacting us
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

