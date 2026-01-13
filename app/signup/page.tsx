"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Testimonials & Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-12">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BarChart3 size={18} strokeWidth={3} />
            </div>
            Prove It.
          </Link>
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold leading-tight">
              "We stopped wasting $15k/mo on fake influencers within the first week."
            </h1>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-lg">JS</div>
               <div>
                 <p className="font-medium">Jason Smith</p>
                 <p className="text-zinc-400 text-sm">CMO, VibeCheck Apparel</p>
               </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 text-sm text-zinc-400">
           <div>
             <p className="font-bold text-white text-lg mb-1">$30B+</p>
             <p>Wasted on fraud annually</p>
           </div>
           <div>
             <p className="font-bold text-white text-lg mb-1">100%</p>
             <p>Transparency guarantee</p>
           </div>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
           <div className="text-center lg:text-left">
             <h2 className="text-2xl font-bold text-zinc-900">Get started with Prove It</h2>
             <p className="text-zinc-500 mt-2">Start vetting creators and tracking ROI in minutes.</p>
           </div>

           <form onSubmit={handleSignup} className="space-y-6">
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">First name</label>
                   <Input placeholder="Jane" required />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Last name</label>
                   <Input placeholder="Doe" required />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-sm font-medium">Work Email</label>
                 <Input type="email" placeholder="jane@company.com" required />
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium">Password</label>
                 <Input type="password" placeholder="••••••••" required />
               </div>
             </div>

             <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-lg">
               {isLoading ? (
                 <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
               ) : (
                 <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
               )}
             </Button>
           </form>

           <div className="space-y-4 pt-4">
             <div className="flex items-center gap-3 text-sm text-zinc-500">
               <CheckCircle className="text-green-500 h-4 w-4" />
               <span>14-day free trial (Pro features included)</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-zinc-500">
               <CheckCircle className="text-green-500 h-4 w-4" />
               <span>No credit card required for "Lite" plan</span>
             </div>
           </div>

           <p className="text-center text-sm text-zinc-500">
             Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Log in</Link>
           </p>
        </div>
      </div>
    </div>
  );
}
