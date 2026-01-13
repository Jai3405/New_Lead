import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldAlert, TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BarChart3 size={18} strokeWidth={3} />
            </div>
            Prove It.
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#calculator" className="hover:text-blue-600 transition-colors">ROI Calculator</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-blue-600 hidden sm:block">Log in</Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Accepting Early Access
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Are they fake? <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Did they convert?</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop paying for bots. Start tracking revenue. The first platform that combines fraud detection with Shopify conversion tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-zinc-900 hover:bg-zinc-800 text-white w-full sm:w-auto">
                Start Vetting Creators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-zinc-200 text-zinc-600 hover:bg-zinc-50 w-full sm:w-auto">
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Problem/Solution Statistics */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-zinc-900 mb-2">$30B</div>
              <p className="text-zinc-500 font-medium">Wasted on influencer marketing last year</p>
            </div>
            <div className="p-6 relative">
               <div className="absolute inset-y-4 -left-px w-px bg-zinc-200 hidden md:block"></div>
               <div className="absolute inset-y-4 -right-px w-px bg-zinc-200 hidden md:block"></div>
              <div className="text-5xl font-bold text-red-500 mb-2">36%</div>
              <p className="text-zinc-500 font-medium">Of all influencer accounts are flagged for fraud</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-zinc-500 font-medium">Transparency with Prove It</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-32 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">How much are you losing to bots?</h2>
                <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
                  Most brands assume their "Engagement Rate" equals interest. 
                  But if 40% of those likes are from click farms, your CPA is actually double what you think.
                </p>
                <ul className="space-y-4">
                  {[
                    "Estimate your true ROI after removing fraud",
                    "Compare 'Vanity Metrics' vs. 'Real Conversions'",
                    "See how much budget you can save instantly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-zinc-700">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="md:w-1/2 w-full">
               <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-2xl ring-1 ring-zinc-900/5">
                 <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <DollarSign className="text-green-400" />
                   ROI Loss Calculator
                 </h3>
                 <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-medium text-zinc-400 mb-2">Monthly Influencer Budget</label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                        <input type="number" defaultValue="15000" className="w-full bg-zinc-800 border-zinc-700 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-zinc-600 focus:ring-blue-500 focus:border-blue-500" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-zinc-400 mb-2">Estimated Fraud Rate (Avg. 36%)</label>
                     <input type="range" min="0" max="100" defaultValue="36" className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                     <div className="flex justify-between text-xs text-zinc-500 mt-1">
                       <span>0%</span>
                       <span className="text-blue-400 font-bold">36% (Industry Avg)</span>
                       <span>100%</span>
                     </div>
                   </div>
                   <div className="pt-6 border-t border-zinc-800">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-zinc-400">Estimated Wasted Spend</span>
                       <span className="text-2xl font-bold text-red-400">$5,400</span>
                     </div>
                     <p className="text-xs text-zinc-500 text-right">Per month thrown away on fake engagement.</p>
                   </div>
                   <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-semibold">
                     Stop The Bleeding
                   </Button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Value Proposition / Features */}
      <section id="features" className="py-24 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-4">One Dashboard. Full Truth.</h2>
            <p className="text-zinc-500">Stop stitching together screenshots and spreadsheets. Get the full picture from vetted discovery to money in the bank.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldAlert className="h-8 w-8 text-blue-600" />}
              title="Fraud Detection"
              description="Instantly flag creators with fake followers, pod engagement, and manufactured likes before you sign the contract."
            />
            <FeatureCard 
              icon={<TrendingUp className="h-8 w-8 text-indigo-600" />}
              title="Conversion Tracking"
              description="Direct integration with Shopify and Google Analytics to track who actually bought your product, not just who liked the post."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-purple-600" />}
              title="Audience Authenticity"
              description="Deep dive into audience demographics. Ensure you're paying to reach your actual customers, not bots in a server farm."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
             <p className="text-zinc-500">Start vetting for less than the cost of one bad collaboration.</p>
           </div>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Lite Plan */}
             <div className="border border-zinc-200 rounded-3xl p-8 hover:border-blue-200 transition-all hover:shadow-xl">
               <h3 className="text-xl font-semibold mb-2">Campaign Lite</h3>
               <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-4xl font-bold">$99</span>
                 <span className="text-zinc-500">/month</span>
               </div>
               <p className="text-zinc-500 mb-8 h-12">Perfect for brands just starting to scale their creator program.</p>
               <Button variant="outline" className="w-full rounded-xl py-6 mb-8 border-zinc-200">Start Free Trial</Button>
               <ul className="space-y-4">
                 <li className="flex gap-3 text-sm text-zinc-600"><CheckCircle className="h-5 w-5 text-blue-600" /> Basic Fraud Detection</li>
                 <li className="flex gap-3 text-sm text-zinc-600"><CheckCircle className="h-5 w-5 text-blue-600" /> 5 Active Campaigns</li>
                 <li className="flex gap-3 text-sm text-zinc-600"><CheckCircle className="h-5 w-5 text-blue-600" /> ROI Estimation</li>
               </ul>
             </div>

             {/* Pro Plan */}
             <div className="border border-blue-600 bg-zinc-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
               <h3 className="text-xl font-semibold mb-2">Campaign Pro</h3>
               <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-4xl font-bold">$299</span>
                 <span className="text-zinc-500">/month</span>
               </div>
               <p className="text-zinc-400 mb-8 h-12">Deep vetting and full-funnel tracking for serious DTC brands.</p>
               <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6 mb-8">Get Started</Button>
               <ul className="space-y-4">
                 <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle className="h-5 w-5 text-blue-400" /> Deep Audit & Fraud Scoring</li>
                 <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle className="h-5 w-5 text-blue-400" /> Unlimited Campaigns</li>
                 <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle className="h-5 w-5 text-blue-400" /> Shopify & GA Integration</li>
                 <li className="flex gap-3 text-sm text-zinc-300"><CheckCircle className="h-5 w-5 text-blue-400" /> Competitor Analysis</li>
               </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
             <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
               <BarChart3 size={14} strokeWidth={3} />
             </div>
             Prove It.
          </div>
          <div className="text-sm text-zinc-500">
            © 2026 Prove It Analytics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6 bg-zinc-50 w-16 h-16 rounded-xl flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-500 leading-relaxed">{description}</p>
    </div>
  )
}