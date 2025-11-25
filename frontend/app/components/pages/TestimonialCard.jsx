"use client";

import { useState } from "react";

export default function TestimonialCard({ testimonial, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-700 flex-shrink-0">
          {testimonial.initials}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-900">{testimonial.name}</h4>
          <p className="text-sm text-slate-500">{testimonial.location}</p>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className={`text-slate-700 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
          {testimonial.quote}
        </p>
        {testimonial.quote.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-lime-600 font-semibold text-sm mt-2 hover:text-lime-700"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
            {testimonial.topic}
          </span>
        </div>
        <span className="text-xs text-slate-400">{testimonial.date}</span>
      </div>
    </div>
  );
}

