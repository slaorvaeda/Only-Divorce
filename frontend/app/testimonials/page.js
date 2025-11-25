import TestimonialCard from "../components/pages/TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    initials: "PS",
    location: "Mumbai, Maharashtra",
    topic: "Women Support",
    date: "2 months ago",
    quote: "Only Divorce gave me the courage to move forward when I felt completely alone. The Women Support group became my safe haven where I could share my fears and find strength in others' stories. The moderators are incredibly compassionate and knowledgeable. I'm now rebuilding my life with confidence."
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    location: "Delhi, NCR",
    topic: "Child Custody",
    date: "1 month ago",
    quote: "As a father fighting for custody, I felt lost and overwhelmed. The legal guidance and emotional support I received here was invaluable. The community helped me understand my rights and gave me the strength to fight for my children. Today, I have shared custody and a better relationship with my kids."
  },
  {
    name: "Anjali Reddy",
    initials: "AR",
    location: "Hyderabad, Telangana",
    topic: "Financial Planning",
    date: "3 weeks ago",
    quote: "The financial planning resources and expert advice helped me secure my future after divorce. I learned about alimony, property rights, and how to manage finances independently. The step-by-step guidance made everything less intimidating. I'm now financially stable and independent."
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    location: "Bangalore, Karnataka",
    topic: "Mental Wellness",
    date: "1 week ago",
    quote: "I was struggling with depression and anxiety after my divorce. The Mental Wellness group provided me with coping strategies and professional support. The mindfulness sessions and peer support helped me heal. I'm in a much better place now, both mentally and emotionally."
  },
  {
    name: "Sneha Patel",
    initials: "SP",
    location: "Ahmedabad, Gujarat",
    topic: "Co-Parenting",
    date: "2 weeks ago",
    quote: "Co-parenting seemed impossible at first, but the support group showed me it's achievable. I learned effective communication strategies and how to prioritize my children's well-being. My ex and I now have a functional co-parenting relationship, and our kids are thriving."
  },
  {
    name: "Arjun Nair",
    initials: "AN",
    location: "Chennai, Tamil Nadu",
    topic: "Career Restart",
    date: "1 month ago",
    quote: "After 10 years as a homemaker, re-entering the workforce was daunting. The Career Restart program provided mentorship, resume help, and job opportunities. I found a new career path that I'm passionate about. The support didn't end with divorce - it helped me build a new life."
  },
  {
    name: "Meera Joshi",
    initials: "MJ",
    location: "Pune, Maharashtra",
    topic: "Domestic Violence",
    date: "3 months ago",
    quote: "Leaving an abusive marriage was the hardest decision I ever made. Only Divorce provided immediate support, safety planning resources, and legal guidance. The moderators helped me understand my rights and access protection. I'm now safe, independent, and rebuilding my life with dignity."
  },
  {
    name: "Karan Malhotra",
    initials: "KM",
    location: "Chandigarh, Punjab",
    topic: "NRI Assistance",
    date: "2 months ago",
    quote: "As an NRI, navigating divorce laws across countries was complex. The NRI Assistance group connected me with experts who understood cross-border legal issues. The guidance was precise and helped me resolve my case efficiently. I'm grateful for the specialized support."
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center lg:px-0">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4" data-aos="fade-up">
            Testimonials
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl md:leading-[1.1] mb-6" data-aos="fade-up" data-aos-delay="100">
            Stories of Hope & Healing
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 md:text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Read how our community members have transformed their lives and found strength, 
            support, and new beginnings through Only Divorce.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm" data-aos="fade-up">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of others who have found support, guidance, and hope through 
              our community. Your story of healing starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
                Join Our Community
              </button>
              <button className="border-2 border-slate-300 text-slate-900 px-8 py-3 rounded-full font-semibold hover:border-slate-900 transition-colors">
                Browse Support Topics
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

