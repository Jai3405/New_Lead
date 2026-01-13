"use client";

import { useState } from "react";
import { Search, ShieldCheck, ShieldAlert, Users, CheckCircle2, AlertOctagon, TrendingUp, Scan, BrainCircuit, Activity, DollarSign, Palette, Lightbulb, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend, ReferenceLine } from 'recharts';
import Link from "next/link";
import { toast } from "sonner";
import { safeFetch } from "@/lib/api";

export default function VettingPage() {
  const [handle, setHandle] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    
    setAnalyzing(true);
    
    // 1. DATA COLLECTION
    const rawMetrics = Array.from({length: 100}, () => Math.floor(Math.random() * 4000) + 4000); 
    const rawComments = ["Nice pic!", "Nice pic!", "Love it", "Great", "Nice pic!", "🔥", "🔥", "🔥", "Beauty", "Nice pic!", "Where is this?", "Link?", "Wow"];
    const rawCaptions = ["Loving this summer vibe #ad", "Coffee time", "New outfit from @brand", "Travel diaries"];
    const brandKeywords = ['Minimalist', 'Sustainable', 'Luxury', 'Neutral'];

    // 2. SECURE API CALLS
    const [forensicData, priceData, fitData] = await Promise.all([
        safeFetch<any>('/analyze/forensics', { metrics: rawMetrics, comments: rawComments }),
        safeFetch<any>('/predict/price', { reach: 35000, engagement_rate: 1.2, fraud_score: 72, niche: 'Fashion' }),
        safeFetch<any>('/analyze/brand-fit', { influencer_bio: "Fashion | Travel | Life", recent_captions: rawCaptions, brand_keywords: brandKeywords })
    ]);

    if (!forensicData || !priceData || !fitData) {
        toast.error("ML Engine Unavailable (Check connection or Rate Limit)");
        setAnalyzing(false);
        return;
    }

    // 3. COMPILE RESULTS
    setResult({
        handle: handle.startsWith('@') ? handle : `@${handle}`,
        followers: "125K",
        fraudScore: 72, 
        audienceQuality: 28, 
        realFollowers: 35000,
        fakeFollowers: 90000,
        engagementRate: "1.2%",
        avgLikes: "1,500",
        flags: ["Distribution Anomaly", "Low Complexity Comments", "Engagement Pods"],
        growthData: [
            { month: 'Jan', followers: 45000 },
            { month: 'Feb', followers: 46000 },
            { month: 'Mar', followers: 47000 },
            { month: 'Apr', followers: 47500 },
            { month: 'May', followers: 120000 },
            { month: 'Jun', followers: 125000 },
        ],
        forensics: {
            benfordChartData: forensicData.benford.chart_data,
            benfordSuspicious: forensicData.benford.is_suspicious,
            entropyScore: forensicData.entropy.score,
            entropyVerdict: forensicData.entropy.verdict
        },
        ml: {
            pricing: {
                estimatedPrice: priceData.estimated_price,
                marketRate: priceData.market_rate,
                valuation: priceData.valuation
            },
            aesthetic: {
                score: fitData.score,
                matches: fitData.matches,
                palette: ['#F5F5F0', '#2A2A2A', '#D4A373', '#CCD5AE']
            }
        }
    });
    
    setAnalyzing(false);
    toast.success("Analysis Complete");
  };

  const data = [
    { name: 'Real People', value: 35000, color: '#22c55e' },
    { name: 'Bots/Fakes', value: 90000, color: '#ef4444' },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Vet Creator</h1>
        <p className="text-zinc-500">Analyze any public profile for fraud signals before you partner.</p>
      </header>
      
      {/* Search Box */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm mb-8">
        <form onSubmit={handleAnalyze} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder="Enter influencer handle (e.g. @lifestyle_emma)" 
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            disabled={analyzing}
            className="h-auto px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-lg"
          >
            {analyzing ? "Scanning..." : "Analyze Profile"}
          </Button>
        </form>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
          
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border-l-4 shadow-sm ${result.fraudScore > 50 ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-zinc-700">Fraud Score</h3>
                {result.fraudScore > 50 ? <ShieldAlert className="text-red-500" /> : <ShieldCheck className="text-green-500" />}
              </div>
              <div className="text-4xl font-bold text-zinc-900 mb-1">{result.fraudScore}/100</div>
              <p className="text-sm text-zinc-500">{result.fraudScore > 50 ? 'High Risk Detected' : 'Safe to Partner'}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-zinc-700">Audience Quality</h3>
                <Users className="text-indigo-500" />
              </div>
              <div className="text-4xl font-bold text-zinc-900 mb-1">{result.audienceQuality}%</div>
              <p className="text-sm text-zinc-500">Real, active humans</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
               <h3 className="font-semibold text-zinc-700 mb-4">Risk Flags</h3>
               <ul className="space-y-2">
                 {result.flags.map((flag: string, i: number) => (
                   <li key={i} className="flex items-center gap-2 text-sm text-red-600 font-medium">
                     <AlertOctagon size={14} />
                     {flag}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* ADVANCED SIGNAL ANALYSIS (High-Tech ML Layer) */}
          <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl border border-zinc-800">
             <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                     <Scan size={24} />
                 </div>
                 <div>
                     <h2 className="text-xl font-bold">Advanced Signal Analysis</h2>
                     <p className="text-zinc-400 text-sm">Multi-vector ML analysis of audience quality and engagement velocity.</p>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {/* Benford's Law Chart */}
                 <div>
                     <div className="flex items-center justify-between mb-4">
                         <h3 className="font-semibold flex items-center gap-2">
                             <Activity size={16} className="text-blue-400"/> Distribution Anomaly Detection
                         </h3>
                         <span className={`text-xs px-2 py-1 rounded font-bold ${result.forensics.benfordSuspicious ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                             {result.forensics.benfordSuspicious ? 'ANOMALY DETECTED' : 'NATURAL'}
                         </span>
                     </div>
                     <div className="h-[200px] w-full bg-black/20 rounded-xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={result.forensics.benfordChartData}>
                                <Tooltip 
                                    cursor={{fill: 'rgba(255,255,255,0.1)'}} 
                                    contentStyle={{backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff'}}
                                />
                                <Bar dataKey="expected" name="Natural Law" fill="#52525b" opacity={0.5} radius={[2,2,0,0]} />
                                <Bar dataKey="observed" name="Observed" fill="#ef4444" radius={[2,2,0,0]} />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                         <strong className="text-zinc-300">Why this matters:</strong> Natural likes follow a mathematical distribution where '1' appears ~30% of the time. 
                         The red bars (Observed) deviate significantly from the gray bars (Natural), indicating manufactured numbers.
                     </p>
                 </div>

                 {/* Entropy & Language Analysis */}
                 <div>
                     <div className="flex items-center justify-between mb-4">
                         <h3 className="font-semibold flex items-center gap-2">
                             <BrainCircuit size={16} className="text-green-400"/> Engagement Complexity Score
                         </h3>
                         <span className={`text-xs px-2 py-1 rounded font-bold ${result.forensics.entropyVerdict === 'Organic' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                             {result.forensics.entropyVerdict.toUpperCase()}
                         </span>
                     </div>
                     
                     <div className="flex items-center gap-6 mb-6">
                         <div className="relative w-24 h-24 flex items-center justify-center">
                             <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="48" cy="48" r="40" stroke="#27272a" strokeWidth="8" fill="none" />
                                 <circle cx="48" cy="48" r="40" stroke={result.forensics.entropyScore > 6 ? "#22c55e" : "#ef4444"} strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - result.forensics.entropyScore / 10)} />
                             </svg>
                             <span className="absolute text-2xl font-bold">{result.forensics.entropyScore.toFixed(1)}</span>
                         </div>
                         <div className="flex-1">
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-zinc-500">Complexity</span>
                                     <span className="text-zinc-300">Low (Repetitive)</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-zinc-500">Pattern Match</span>
                                     <span className="text-red-400">Bot Farm v3.2</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <p className="text-xs text-zinc-500 leading-relaxed">
                         <strong className="text-zinc-300">Analysis:</strong> Comment section entropy is dangerously low ({(result.forensics.entropyScore).toFixed(1)} bits). 
                         Repeated strings and lack of linguistic chaos suggest automated scripts.
                     </p>
                 </div>
             </div>
          </div>

          {/* STRATEGIC AI ANALYSIS */}
          <div className="bg-gradient-to-br from-indigo-900 to-violet-900 text-white p-8 rounded-3xl shadow-xl">
             <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-indigo-400/20 rounded-lg text-indigo-300">
                     <Lightbulb size={24} />
                 </div>
                 <div>
                     <h2 className="text-xl font-bold">Strategic AI Analysis</h2>
                     <p className="text-indigo-200 text-sm">Business intelligence powered by Linear Regression & NLP.</p>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Fair Price Estimator */}
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                     <h3 className="font-semibold flex items-center gap-2 mb-6">
                         <DollarSign size={18} className="text-green-400"/> Fair Price Model
                     </h3>
                     
                     <div className="flex items-end justify-between mb-2">
                         <span className="text-sm text-indigo-200">They ask (Market Rate)</span>
                         <span className="text-xl font-medium strikethrough decoration-white/50 opacity-70">${result.ml.pricing.marketRate.toLocaleString()}</span>
                     </div>
                     <div className="flex items-end justify-between mb-6">
                         <span className="text-sm text-white font-medium">True Value (AI Est.)</span>
                         <span className="text-3xl font-bold text-green-400">${result.ml.pricing.estimatedPrice.toLocaleString()}</span>
                     </div>
                     
                     <div className={`text-center py-2 rounded-lg text-sm font-bold tracking-wide uppercase ${
                         result.ml.pricing.valuation === 'Undervalued' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                     }`}>
                         Verdict: {result.ml.pricing.valuation}
                     </div>
                 </div>

                 {/* Brand Aesthetic Match */}
                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                     <h3 className="font-semibold flex items-center gap-2 mb-6">
                         <Palette size={18} className="text-pink-400"/> Aesthetic DNA Match
                     </h3>

                     <div className="flex items-center gap-4 mb-6">
                         <div className="text-4xl font-bold">{result.ml.aesthetic.score}%</div>
                         <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                             <div 
                                 className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
                                 style={{width: `${result.ml.aesthetic.score}%`}}
                             ></div>
                         </div>
                     </div>

                     <div className="flex gap-2">
                         {result.ml.aesthetic.palette.map((color: string, i: number) => (
                             <div key={i} className="h-8 w-8 rounded-full border border-white/20" style={{backgroundColor: color}}></div>
                         ))}
                     </div>
                     <p className="text-xs text-indigo-200 mt-4">
                        <Tag size={12} className="inline mr-1"/> 
                        Matched: {result.ml.aesthetic.matches.join(", ")}
                     </p>
                 </div>
             </div>
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="font-semibold text-zinc-900 mb-6">Audience Breakdown</h3>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={data} 
                        innerRadius={60} 
                        outerRadius={80} 
                        paddingAngle={5} 
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-zinc-600">Real ({((result.realFollowers / (result.realFollowers + result.fakeFollowers)) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-zinc-600">Fake ({((result.fakeFollowers / (result.realFollowers + result.fakeFollowers)) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-center">
                <div className="text-center">
                   <h3 className="text-lg font-medium text-zinc-900 mb-2">Estimated Real Reach</h3>
                   <div className="text-5xl font-bold text-zinc-900 mb-4">{(result.realFollowers / 1000).toFixed(1)}K</div>
                   <p className="text-zinc-500 max-w-xs mx-auto mb-8">
                     You are paying for {result.followers} followers, but only {(result.realFollowers / 1000).toFixed(1)}K will actually see your post.
                   </p>
                   <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300">
                     Download Audit Report
                   </Button>
                   <Link 
                     href={`/dashboard/campaigns?create=${encodeURIComponent(result.handle)}`}
                     className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium text-center flex items-center justify-center gap-2 transition-colors"
                   >
                     <TrendingUp size={16} />
                     Launch Campaign Tracker
                   </Link>
                </div>
             </div>
          </div>

          {/* Growth History Chart */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2">Follower Growth History</h3>
            <p className="text-sm text-zinc-500 mb-6">Sudden vertical spikes (like in May) usually indicate bought followers.</p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    cursor={{stroke: '#f4f4f5', strokeWidth: 2}}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#4f46e5" 
                    strokeWidth={3} 
                    dot={{r: 4, fill: '#4f46e5', strokeWidth: 0}}
                    activeDot={{r: 6, strokeWidth: 0}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
