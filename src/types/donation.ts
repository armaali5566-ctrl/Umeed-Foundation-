export type CampaignId = 'heartbeats' | 'shikshalaya' | 'chuppi-todo';

export type Frequency = 'one-time' | 'monthly' | 'quarterly' | 'half-yearly' | 'annually';

export interface CampaignPreset {
  amount: number;
  label: string;
  impactNote: string;
  isPopular?: boolean;
}

export interface SponsorshipTier {
  frequency: Frequency;
  label: string;
  amountPerChild: number;
  periodText: string;
  badge?: string;
}

export interface KitOption {
  units: number;
  amount: number;
  label: string;
  impactDescription: string;
}

export interface Campaign {
  id: CampaignId;
  title: string;
  hindiTitle?: string;
  tagline: string;
  description: string;
  fullStory: string;
  image: string;
  category: 'Healthcare' | 'Education' | 'Women Dignity';
  accentColor: string;
  stats: {
    label: string;
    value: string;
  }[];
  suggestedPresets?: CampaignPreset[];
  sponsorshipTiers?: SponsorshipTier[];
  kitOptions?: KitOption[];
}

export interface DonationSelection {
  campaignId: CampaignId;
  campaignTitle: string;
  frequency: Frequency;
  amount: number;
  isCustomAmount: boolean;
  quantity?: number;
  notes?: string;
}

export interface DonorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  panNumber?: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  taxReceiptRequired: boolean;
  anonymousDonation: boolean;
  agreeTerms: boolean;
}

export interface DonationReceipt {
  receiptNumber: string;
  date: string;
  transactionId: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber?: string;
  campaignTitle: string;
  frequency: Frequency;
  amount: number;
  quantity?: number;
  paymentMethod: string;
  status: 'SUCCESS';
  taxExemptionNote: string;
}
