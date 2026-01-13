"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type CampaignStatus = 'active' | 'paused' | 'completed' | 'fraud_alert';

export interface Campaign {
  id: string;
  name: string;
  influencerHandle: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  budget: number;
  startDate: string;
  status: CampaignStatus;
  spend: number;
  revenue: number;
  fraudScore: number; // 0-100
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'spend' | 'revenue' | 'fraudScore'>) => void;
  deleteCampaign: (id: string) => void;
  getCampaign: (id: string) => Campaign | undefined;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'demo-fail',
      name: 'Summer Glow Launch (The $15k Mistake)',
      influencerHandle: '@fashion_bella_official',
      platform: 'Instagram',
      budget: 15000,
      startDate: '2025-12-01',
      status: 'fraud_alert',
      spend: 15000,
      revenue: 450, // "Reached almost nobody real"
      fraudScore: 40 // "40% bots"
    },
    {
      id: '1',
      name: 'Summer Launch',
      influencerHandle: '@lifestyle_emma',
      platform: 'Instagram',
      budget: 5000,
      startDate: '2025-06-01',
      status: 'active',
      spend: 2500,
      revenue: 8400,
      fraudScore: 12
    },
    {
      id: '2',
      name: 'Tech Review Series',
      influencerHandle: '@tech_guru_mike',
      platform: 'YouTube',
      budget: 12000,
      startDate: '2025-05-15',
      status: 'active',
      spend: 4000,
      revenue: 200,
      fraudScore: 15
    }
  ]);

  const addCampaign = (newCampaign: Omit<Campaign, 'id' | 'status' | 'spend' | 'revenue' | 'fraudScore'>) => {
    const campaign: Campaign = {
      ...newCampaign,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      spend: 0,
      revenue: 0,
      fraudScore: Math.floor(Math.random() * 30) // Simulate a scan
    };
    setCampaigns((prev) => [campaign, ...prev]);
    toast.success("Campaign created successfully");
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.success("Campaign deleted");
  };

  const getCampaign = (id: string) => campaigns.find((c) => c.id === id);

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, deleteCampaign, getCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}
