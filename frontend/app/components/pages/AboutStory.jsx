export default function AboutStory() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4">
              Our Story
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 md:text-4xl">
              Born from Personal Experience
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Only Divorce was founded by individuals who experienced the isolation and confusion 
                that often accompanies divorce. We discovered that while there were resources for 
                reconciliation, there was a significant gap in support for those who had made the 
                difficult but necessary decision to move forward separately.
              </p>
              <p>
                Our platform emerged from the understanding that divorce, while challenging, can also 
                be a path to growth, healing, and new beginnings. We've built a community where 
                judgment is left at the door, and support, understanding, and practical guidance 
                take center stage.
              </p>
              <p>
                Today, we serve thousands of individuals across India, providing them with the tools, 
                community, and expert guidance needed to navigate this life transition with confidence 
                and hope.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" data-aos="fade-left">
            <div className="space-y-6">
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="100">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💜</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Compassion First</h4>
                  <p className="text-slate-600 text-sm">
                    Every interaction is guided by empathy and understanding.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="200">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Empowerment</h4>
                  <p className="text-slate-600 text-sm">
                    We provide tools and knowledge to help you make informed decisions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="300">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Growth Mindset</h4>
                  <p className="text-slate-600 text-sm">
                    We believe in transformation and new beginnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

