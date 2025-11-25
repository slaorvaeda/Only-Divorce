"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SupportTopicsHero from "../components/pages/SupportTopicsHero";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

const topicCategories = [
  {
    category: "Emotional & Mental Wellness",
    icon: "💚",
    topics: [
      { name: "Coping with Separation Anxiety", description: "Strategies for managing emotional distress during divorce", members: 234 },
      { name: "Rebuilding Self-Esteem", description: "Journey to rediscover your worth and confidence", members: 189 },
      { name: "Managing Depression & Stress", description: "Professional guidance for mental health challenges", members: 312 },
      { name: "Finding Inner Peace", description: "Meditation and mindfulness practices for healing", members: 156 }
    ]
  },
  {
    category: "Legal & Financial Guidance",
    icon: "⚖️",
    topics: [
      { name: "Understanding Divorce Laws in India", description: "Navigate through legal procedures and requirements", members: 445 },
      { name: "Property Division & Alimony", description: "Expert advice on asset distribution and financial support", members: 378 },
      { name: "Child Custody & Visitation Rights", description: "Protecting your children's best interests", members: 523 },
      { name: "Documentation & Paperwork", description: "Step-by-step help with legal documentation", members: 267 }
    ]
  },
  {
    category: "Family & Parenting",
    icon: "👨‍👩‍👧‍👦",
    topics: [
      { name: "Co-Parenting Strategies", description: "Effective ways to parent together after separation", members: 412 },
      { name: "Talking to Children About Divorce", description: "Age-appropriate conversations and support", members: 389 },
      { name: "Maintaining Family Bonds", description: "Keeping relationships healthy during transition", members: 298 },
      { name: "Single Parenting Support", description: "Resources and community for single parents", members: 456 }
    ]
  },
  {
    category: "Practical Life Skills",
    icon: "🛠️",
    topics: [
      { name: "Financial Independence Planning", description: "Building financial security post-divorce", members: 334 },
      { name: "Career Transition & Growth", description: "Professional development and job opportunities", members: 278 },
      { name: "Housing & Relocation", description: "Finding new living arrangements and stability", members: 201 },
      { name: "Daily Life Management", description: "Practical tips for managing household and responsibilities", members: 189 }
    ]
  }
];

export default function SupportTopicsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [loginModal, setLoginModal] = useState({ isOpen: false, role: 'user' });
  const router = useRouter();
  const { user } = useAuth();

  const handleTopicClick = (topic) => {
    if (user) {
      // User is logged in - navigate to dashboard or groups page
      router.push(`/dashboard?topic=${encodeURIComponent(topic.name)}`);
    } else {
      // User not logged in - show login modal
      setLoginModal({ isOpen: true, role: 'user' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SupportTopicsHero />
      
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our support topics are organized into categories to help you find exactly what you need. 
              Click on any category to explore available support groups.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
            {/* Left Side - Sliding Cards */}
            <div className="space-y-4">
              {topicCategories.map((category, idx) => (
                <div
                  key={idx}
                  data-aos="fade-right"
                  data-aos-delay={idx * 100}
                  onClick={() => setActiveCategory(idx)}
                  className={`bg-white rounded-2xl border-2 p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                    activeCategory === idx
                      ? "border-purple-500 bg-purple-50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                      activeCategory === idx ? "bg-purple-100" : "bg-slate-100"
                    }`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        activeCategory === idx ? "text-purple-900" : "text-slate-900"
                      }`}>
                        {category.category}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {category.topics.length} support areas
                      </p>
                    </div>
                    {activeCategory === idx && (
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Content Display */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm" data-aos="fade-left">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center text-3xl">
                    {topicCategories[activeCategory].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {topicCategories[activeCategory].category}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {topicCategories[activeCategory].topics.length} support areas available
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {topicCategories[activeCategory].topics.map((topic, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                    onClick={() => handleTopicClick(topic)}
                    className="flex items-start justify-between p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-lg mb-2">{topic.name}</h4>
                      <p className="text-sm text-slate-600">{topic.description}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-xs bg-white text-slate-700 px-3 py-1.5 rounded-full font-medium border border-slate-200">
                        {topic.members}+ members
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTopicClick(topic);
                        }}
                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors group-hover:scale-110"
                        aria-label={`Explore ${topic.name}`}
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 md:p-12 text-center shadow-sm" data-aos="fade-up">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              Our moderators are here to help. Request a new support topic or get personalized guidance 
              from our expert team.
            </p>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors">
              Request New Topic
            </button>
          </div>
        </div>
      </section>
      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={() => setLoginModal({ isOpen: false, role: 'user' })}
        role={loginModal.role}
      />
    </div>
  );
}

