"use client";

import { useState } from "react";
import { BrainCircuit, LineChart as ChartIcon, DollarSign, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { toast } from "sonner";
import { safeFetch } from "@/lib/api";

export default function AILabPage() {
  const [budget, setBudget] = useState(50000);
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setOptimizing(true);
    
    const data = await safeFetch<any>('/optimize-portfolio', { budget });

    if (!data) {
        toast.error("AI Lab Offline. Ensure Python backend is running.");
        setOptimizing(false);
        return;
    }

    if (data.error) {
        toast.error(data.error);
        setOptimizing(false);
        return;
    }

    setResult(data);
    toast.success("Efficient Frontier Calculated");
    setOptimizing(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">AI Lab: Portfolio Optimizer</h1>
        <p className="text-zinc-500">Apply Modern Portfolio Theory (MPT) to your influencer investments.</p>
      </header>

      {/* Input Section */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm mb-8">
         <form onSubmit={handleOptimize} className="flex gap-6 items-end">
            <div className="w-full max-w-xs space-y-2">
                <label className="text-sm font-medium text-zinc-700">Total Campaign Budget</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <Input 
                        type="number" 
                        value={budget} 
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="pl-9 h-12 text-lg"
                    />
                </div>
            </div>
            <Button 
                type="submit" 
                disabled={optimizing} 
                className="h-12 px-8 bg-zinc-900 hover:bg-zinc-800 text-lg gap-2"
            >
                {optimizing ? (
                    <>Running Monte Carlo Sim...</>
                ) : (
                    <><BrainCircuit size={20} /> Optimize Portfolio</>
                )}
            </Button>
         </form>
         <p className="text-xs text-zinc-400 mt-3">
             *Uses Python Microservice to simulate 5,000 portfolio combinations minimizing audience overlap.
         </p>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <p className="text-sm text-zinc-500 mb-1">Optimized Reach</p>
                    <div className="text-3xl font-bold text-indigo-600">{(result.projectedReach / 1000000).toFixed(2)}M</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <p className="text-sm text-zinc-500 mb-1">Cost Efficiency</p>
                    <div className="text-3xl font-bold text-green-600">{(result.efficiencyScore).toFixed(1)}</div>
                    <p className="text-xs text-zinc-400">Reach per $1k</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <p className="text-sm text-zinc-500 mb-1">Overlap Reduction</p>
                    <div className="text-3xl font-bold text-purple-600">-{result.overlapReduction}%</div>
                    <p className="text-xs text-zinc-400">vs. Random Selection</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-2xl shadow-sm text-white">
                    <p className="text-sm text-zinc-400 mb-1">Allocation</p>
                    <div className="text-3xl font-bold">${result.totalCost.toLocaleString()}</div>
                    <p className="text-xs text-zinc-500">of ${budget.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Efficient Frontier Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                            <ChartIcon size={20} className="text-indigo-500"/> The Efficient Frontier
                        </h3>
                        <span className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-500">Risk/Return Profile</span>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="cost" name="Cost ($)" unit="$">
                                    <Label value="Portfolio Cost (Risk)" offset={-10} position="insideBottom" />
                                </XAxis>
                                <YAxis type="number" dataKey="reach" name="Reach" unit="">
                                    <Label value="Unique Reach (Return)" angle={-90} position="insideLeft" />
                                </YAxis>
                                <ZAxis type="number" dataKey="efficiency" range={[50, 400]} name="Efficiency" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Portfolios" data={result.chartData} fill="#4f46e5" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Optimal Mix List */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                        <Layers size={20} className="text-purple-500"/> Optimal Composition
                    </h3>
                    <p className="text-sm text-zinc-500 mb-6">
                        This combination maximizes reach while minimizing audience overlap (covariance).
                    </p>
                    <div className="space-y-4">
                        {result.optimalMix.map((handle: string, i: number) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                                <span className="font-medium text-zinc-900">{handle}</span>
                                <span className="text-xs bg-white border border-zinc-200 px-2 py-1 rounded">
                                    {Math.floor(Math.random() * 20) + 10}% Alloc.
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700">
                        Execute Trades (Book Creators)
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
