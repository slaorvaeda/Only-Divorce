"use client";

import { useState } from "react";

export default function TopicCategoryCard({ category, topics, icon }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{category}</h3>
            <p className="text-sm text-slate-500 mt-1">{topics.length} support areas</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <span className={`transform transition-transform text-slate-600 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100"
            >
              <div>
                <h4 className="font-semibold text-slate-900">{topic.name}</h4>
                <p className="text-sm text-slate-600 mt-1">{topic.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium">
                  {topic.members}+ members
                </span>
                <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

