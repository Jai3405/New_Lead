"use client";

import { useState, Suspense } from "react";
import { FileText, Download, Check, AlertCircle, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

function ContractGenerator() {
  const searchParams = useSearchParams();
  const initialInfluencer = searchParams.get("influencer") || "";
  const initialBudget = searchParams.get("budget") || "";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    influencerName: initialInfluencer,
    brandName: "Acme Corp (You)",
    deliverables: "1x Instagram Reel, 3x Stories",
    paymentAmount: initialBudget,
    paymentTerms: "Net 30",
    fraudClause: true,
    performanceClause: false,
    minViews: "10,000",
  });

  const handleGenerate = () => {
    setStep(2);
    toast.success("Contract generated with fraud protection clauses.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Side */}
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm h-fit">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 font-semibold border-b border-zinc-100 pb-4">
          <PenTool size={20} className="text-blue-600" />
          <span>Agreement Details</span>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Influencer Legal Name</label>
              <Input 
                value={formData.influencerName} 
                onChange={(e) => setFormData({...formData, influencerName: e.target.value})}
                placeholder="e.g. John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Brand Entity</label>
              <Input 
                value={formData.brandName} 
                onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                placeholder="Your Company LLC" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Deliverables</label>
            <Input 
              value={formData.deliverables} 
              onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
              placeholder="Specific posts, stories, usage rights..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Payment Amount ($)</label>
              <Input 
                type="number"
                value={formData.paymentAmount} 
                onChange={(e) => setFormData({...formData, paymentAmount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Payment Terms</label>
              <select 
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                 value={formData.paymentTerms}
                 onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
              >
                <option value="Upfront">100% Upfront</option>
                <option value="50/50">50% Deposit / 50% Completion</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 60">Net 60 Days</option>
              </select>
            </div>
          </div>

          {/* Smart Clauses Section */}
          <div className="bg-zinc-50 p-4 rounded-xl space-y-4 border border-zinc-200">
             <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
               <AlertCircle size={16} className="text-blue-600" />
               Smart Protection Clauses
             </h3>
             
             <div className="flex items-start gap-3">
               <input 
                 type="checkbox" 
                 id="fraud" 
                 checked={formData.fraudClause}
                 onChange={(e) => setFormData({...formData, fraudClause: e.target.checked})}
                 className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
               />
               <label htmlFor="fraud" className="text-sm text-zinc-600">
                 <span className="font-medium text-zinc-900 block">Anti-Bot Provision</span>
                 Right to withhold payment if invalid traffic (bots/click farms) exceeds 20% of total engagement.
               </label>
             </div>

             <div className="flex items-start gap-3">
               <input 
                 type="checkbox" 
                 id="performance" 
                 checked={formData.performanceClause}
                 onChange={(e) => setFormData({...formData, performanceClause: e.target.checked})}
                 className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
               />
               <label htmlFor="performance" className="text-sm text-zinc-600">
                 <span className="font-medium text-zinc-900 block">Performance Guarantee</span>
                 Pro-rated refund if content receives less than {formData.minViews} organic views within 7 days.
               </label>
             </div>
          </div>

          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 h-12 text-lg" onClick={handleGenerate}>
            Generate Contract
          </Button>
        </div>
      </div>

      {/* Preview Side */}
      <div className={`bg-zinc-50 border border-zinc-200 rounded-2xl p-8 min-h-[600px] shadow-inner font-serif text-zinc-800 leading-relaxed relative ${step === 1 ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
         {step === 1 && (
           <div className="absolute inset-0 flex items-center justify-center z-10">
             <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg text-sm font-medium text-zinc-500">
               Fill details to preview
             </div>
           </div>
         )}

         <div className="max-w-2xl mx-auto bg-white p-12 shadow-sm min-h-full">
           <div className="text-center mb-8 border-b-2 border-zinc-900 pb-4">
             <h2 className="text-2xl font-bold uppercase tracking-widest mb-1">Influencer Agreement</h2>
             <p className="text-xs text-zinc-400">Generated by Prove It Analytics</p>
           </div>

           <div className="space-y-6 text-sm">
             <p>
               This Agreement is entered into on <span className="font-bold">{new Date().toLocaleDateString()}</span> between 
               <span className="font-bold bg-yellow-100 px-1 mx-1">{formData.brandName || "[Brand]"}</span> ("Brand") and 
               <span className="font-bold bg-yellow-100 px-1 mx-1">{formData.influencerName || "[Influencer]"}</span> ("Influencer").
             </p>

             <div>
               <h3 className="font-bold uppercase text-xs text-zinc-500 mb-2">1. Deliverables</h3>
               <p>The Influencer agrees to provide the following content: <span className="italic">{formData.deliverables}</span>.</p>
             </div>

             <div>
               <h3 className="font-bold uppercase text-xs text-zinc-500 mb-2">2. Compensation</h3>
               <p>Brand shall pay Influencer a total of <span className="font-bold">${formData.paymentAmount}</span> via {formData.paymentTerms}.</p>
             </div>

             {formData.fraudClause && (
               <div className="bg-blue-50/50 p-4 border-l-2 border-blue-500 text-blue-900">
                 <h3 className="font-bold uppercase text-xs text-blue-700 mb-2">3. Audience Authenticity (Fraud Clause)</h3>
                 <p>
                   Influencer warrants that their audience is organic. Brand reserves the right to audit engagement using Prove It Analytics. 
                   <span className="font-bold"> If fraudulent activity (bots, engagement pods) exceeds 20%, Brand reserves the right to withhold up to 50% of the Compensation.</span>
                 </p>
               </div>
             )}

             {formData.performanceClause && (
               <div className="bg-green-50/50 p-4 border-l-2 border-green-500 text-green-900">
                 <h3 className="font-bold uppercase text-xs text-green-700 mb-2">4. Performance Guarantee</h3>
                 <p>
                   Influencer guarantees a minimum of {formData.minViews} views. If this threshold is not met within 7 days, Compensation shall be pro-rated accordingly.
                 </p>
               </div>
             )}

             <div className="pt-8 mt-12 border-t border-zinc-200 grid grid-cols-2 gap-12">
               <div>
                 <div className="h-12 border-b border-zinc-300 mb-2"></div>
                 <p className="text-xs uppercase text-zinc-400">Signed by {formData.brandName}</p>
               </div>
               <div>
                 <div className="h-12 border-b border-zinc-300 mb-2"></div>
                 <p className="text-xs uppercase text-zinc-400">Signed by {formData.influencerName}</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function ContractsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Contract Generator</h1>
        <p className="text-zinc-500">Create legally binding agreements with built-in fraud protection.</p>
      </header>
      <Suspense fallback={<div className="text-zinc-500">Loading editor...</div>}>
        <ContractGenerator />
      </Suspense>
    </div>
  );
}