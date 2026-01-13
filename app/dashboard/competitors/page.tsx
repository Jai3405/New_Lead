"use client";

import { useState } from "react";
import { Search, Swords, TrendingUp, Users, Target, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

export default function CompetitorAnalysisPage() {
  const [competitor, setCompetitor] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitor) return;
    
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        myBrand: "Your Brand",
        competitorName: competitor,
        metrics: [
          { subject: 'Engagement', A: 120, B: 110, fullMark: 150 },
          { subject: 'Authenticity', A: 98, B: 65, fullMark: 150 },
          { subject: 'Reach Efficiency', A: 86, B: 130, fullMark: 150 },
          { subject: 'Creative Quality', A: 99, B: 100, fullMark: 150 },
          { subject: 'Conversion Rate', A: 85, B: 90, fullMark: 150 },
          { subject: 'Sentiment', A: 65, B: 85, fullMark: 150 },
        ],
        insights: [
          "Competitor relies heavily on micro-influencers with lower authenticity scores.",
          "Your 'Authenticity' is 33% higher, leading to better long-term trust.",
          "Competitor is winning on 'Reach Efficiency' - likely using broader, cheaper inventory."
        ],
        topInfluencers: [
            { handle: "@fitness_june", reach: "450K", engagement: "2.1%", overlap: "High" },
            { handle: "@tech_trent", reach: "120K", engagement: "4.5%", overlap: "Medium" },
            { handle: "@sarah_hikes", reach: "85K", engagement: "8.2%", overlap: "Low" },
        ]
      });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Competitor Intelligence</h1>
        <p className="text-zinc-500">Benchmark your influencer program against industry rivals.</p>
      </header>

      {/* Search Section */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm mb-8">
         <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-2">Your Brand</label>
                <div className="bg-zinc-100 p-3 rounded-xl border border-zinc-200 text-zinc-500 font-medium select-none">
                    Acme Corp (You)
                </div>
            </div>
            <div className="hidden md:flex pb-4 text-zinc-300">
                <Swords size={32} />
            </div>
            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-zinc-700 mb-2">Competitor to Analyze</label>
                <form onSubmit={handleAnalyze} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input 
                            value={competitor}
                            onChange={(e) => setCompetitor(e.target.value)}
                            placeholder="e.g. CompetitorBrand" 
                            className="pl-10 h-12"
                        />
                    </div>
                    <Button type="submit" disabled={analyzing} className="h-12 bg-zinc-900 hover:bg-zinc-800">
                        {analyzing ? "Analyzing..." : "Compare"}
                    </Button>
                </form>
            </div>
         </div>
      </div>

      {result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Radar Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                  <h3 className="font-semibold text-zinc-900 mb-6">Performance Gap Analysis</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.metrics}>
                        <PolarGrid stroke="#e4e4e7" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#52525b', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="You"
                            dataKey="A"
                            stroke="#2563eb"
                            strokeWidth={3}
                            fill="#2563eb"
                            fillOpacity={0.3}
                        />
                        <Radar
                            name={result.competitorName}
                            dataKey="B"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fill="#ef4444"
                            fillOpacity={0.3}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              {/* Insights & Actions */}
              <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                          <Target size={18} /> Strategic Insights
                      </h3>
                      <ul className="space-y-3">
                          {result.insights.map((insight: string, i: number) => (
                              <li key={i} className="text-sm text-blue-800 leading-relaxed flex gap-2">
                                  <span className="text-blue-500">•</span> {insight}
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                      <h3 className="font-semibold text-zinc-900 mb-4">Their Top Creators</h3>
                      <div className="space-y-4">
                          {result.topInfluencers.map((inf: any, i: number) => (
                              <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-50 last:border-0 last:pb-0">
                                  <div>
                                      <p className="font-medium text-zinc-900">{inf.handle}</p>
                                      <p className="text-xs text-zinc-500">{inf.reach} Reach</p>
                                  </div>
                                  <div className="text-right">
                                      <span className={`text-xs px-2 py-1 rounded-full ${
                                          inf.overlap === 'High' ? 'bg-red-100 text-red-700' :
                                          inf.overlap === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-green-100 text-green-700'
                                      }`}>
                                          {inf.overlap} Overlap
                                      </span>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <Button variant="outline" className="w-full mt-6 text-xs">
                          Unlock Full Creator List (Pro)
                      </Button>
                  </div>
              </div>
          </div>
      ) : (
        /* Empty State / Placeholder */
        <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-zinc-400">
                <Swords size={32} />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">No comparison started</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mb-8">
                Enter a competitor's brand name above to see how their influencer strategy stacks up against yours.
            </p>
            <div className="flex justify-center gap-4 opacity-50 pointer-events-none blur-[1px]">
                 {/* Fake blurred content to tease value */}
                 <div className="w-32 h-32 bg-zinc-200 rounded-full"></div>
                 <div className="w-32 h-32 bg-zinc-200 rounded-full"></div>
            </div>
        </div>
      )}
    </div>
  );
}
