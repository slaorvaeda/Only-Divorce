"use client";

import { useState } from "react";
import Link from "next/link";

const resourceCategories = [
  {
    title: "Legal Resources",
    icon: "⚖️",
    resources: [
      {
        title: "Divorce Laws in India",
        description: "Comprehensive guide to divorce procedures and legal requirements",
        type: "Guide",
        link: "#",
      },
      {
        title: "Document Checklist",
        description: "Essential documents needed for divorce proceedings",
        type: "Checklist",
        link: "#",
      },
      {
        title: "Alimony Calculator",
        description: "Calculate potential alimony based on your situation",
        type: "Tool",
        link: "#",
      },
    ],
  },
  {
    title: "Emotional Support",
    icon: "💚",
    resources: [
      {
        title: "Coping Strategies",
        description: "Effective ways to manage stress and emotional distress",
        type: "Article",
        link: "#",
      },
      {
        title: "Therapy Resources",
        description: "Find qualified therapists and counselors in your area",
        type: "Directory",
        link: "#",
      },
      {
        title: "Support Group Directory",
        description: "Connect with local and online support groups",
        type: "Directory",
        link: "#",
      },
    ],
  },
  {
    title: "Financial Planning",
    icon: "💰",
    resources: [
      {
        title: "Post-Divorce Budget Planner",
        description: "Create a budget for your new financial situation",
        type: "Tool",
        link: "#",
      },
      {
        title: "Asset Division Guide",
        description: "Understanding property and asset division in divorce",
        type: "Guide",
        link: "#",
      },
      {
        title: "Financial Independence Tips",
        description: "Steps to achieve financial independence after divorce",
        type: "Article",
        link: "#",
      },
    ],
  },
  {
    title: "Parenting Resources",
    icon: "👨‍👩‍👧‍👦",
    resources: [
      {
        title: "Co-Parenting Guide",
        description: "Best practices for successful co-parenting",
        type: "Guide",
        link: "#",
      },
      {
        title: "Talking to Children",
        description: "Age-appropriate ways to discuss divorce with children",
        type: "Article",
        link: "#",
      },
      {
        title: "Custody Rights Information",
        description: "Understanding child custody laws and your rights",
        type: "Guide",
        link: "#",
      },
    ],
  },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getTypeBadge = (type) => {
    const typeStyles = {
      Guide: "bg-blue-100 text-blue-700",
      Tool: "bg-purple-100 text-purple-700",
      Article: "bg-green-100 text-green-700",
      Directory: "bg-orange-100 text-orange-700",
      Checklist: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          typeStyles[type] || "bg-slate-100 text-slate-700"
        }`}
      >
        {type}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
              User Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Resources</h1>
            <p className="text-slate-600">
              Access helpful guides, tools, and information to support you through your journey.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Category Sidebar */}
          <div className="space-y-2">
            {resourceCategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`w-full text-left rounded-xl p-4 transition-all ${
                  activeCategory === idx
                    ? "bg-lime-50 border-2 border-lime-500"
                    : "bg-white border border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span
                    className={`text-sm font-semibold ${
                      activeCategory === idx ? "text-lime-900" : "text-slate-900"
                    }`}
                  >
                    {category.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Resources Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm" data-aos="fade-left">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{resourceCategories[activeCategory].icon}</span>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {resourceCategories[activeCategory].title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {resourceCategories[activeCategory].resources.length} resources available
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {resourceCategories[activeCategory].resources.map((resource, idx) => (
                  <Link
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                    href={resource.link}
                    className="block p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {resource.title}
                          </h3>
                          {getTypeBadge(resource.type)}
                        </div>
                        <p className="text-sm text-slate-600">{resource.description}</p>
                      </div>
                      <div className="ml-4 text-slate-400 group-hover:text-slate-900 transition-colors">
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

