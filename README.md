# Umeed Foundation — Premium NGO Donation Platform

A production-quality non-profit donation platform built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Hook Form + Zod**. Designed with an editorial art direction, ivory/forest-green/warm-coral aesthetics, and full interactive donation workflows.

---

## 🌟 Executive Summary & Art Direction

Built with the design language of high-impact humanitarian organizations (e.g. UNICEF, Charity: Water, GiveIndia):
- **Color Palette**: Ivory / warm off-white surface (`#FBF9F4`, `#F4EFE4`), Deep forest green primary (`#14382B`, `#1B4332`), Warm coral accents (`#E2583E`, `#C8442C`), and charcoal typography (`#141B1A`, `#4E605C`).
- **Typography**: Editorial serif headings paired with clean modern sans-serif typography (`Playfair Display` + `Plus Jakarta Sans`).
- **Authentic Storytelling**: Real-world impact indicators, transparent use-of-funds breakdown (86% Direct Programs, 9% Field Operations, 5% Governance), and dignified beneficiary narratives.

---

## 🚀 Key Features

### 1. Navigation & Verified Announcement Strip
- Sticky blurred header with smooth elevation transition on scroll.
- Top announcement bar highlighting verified NGO status, 80G tax deductibility, and quick support links.
- Animated mobile drawer with complete touch navigation.

### 2. Editorial Hero Section
- Eyebrow: *"TOGETHER, WE CAN CHANGE LIVES"*
- Headline: *"A Little Kindness Can Change a Lifetime."*
- Asymmetrical photo composition with floating trust badges and verified impact counters.
- Quick cause selectors that jump directly to interactive donation presets.

### 3. Three Dedicated Humanitarian Campaigns
- **A. Little Heartbeats (Pediatric Healthcare)**:
  - Preset options: ₹3,000 (Diagnostics), ₹5,000 (Echo Screening), ₹10,000 (ICU Recovery), ₹20,000 (Surgery Fund).
  - Custom amount input with instant minimum-threshold validation.
  - One-time vs Monthly recurring support.
- **B. Shikshalaya (Education & Child Sponsorship)**:
  - Sponsorship frequencies: Monthly (₹1,200), Quarterly (₹3,600), Half-Yearly (₹7,200), Annually (₹14,400).
  - Interactive child count stepper (1, 2, 3, 5, or custom number of kids).
  - Dynamic real-time calculation: `Rate per child × Quantity = Total`.
- **C. Chuppi Todo (Menstrual Dignity & Sanitation)**:
  - Unit tiers: 1 Kit (₹500), 3 Kits (₹1,500), 5 Kits (₹2,500), 10 Kits + School Unit (₹5,000).
  - Custom amount input with estimated kit impact calculations.

### 4. Interactive 3-Step Donation Modal & Checkout
- **Step 1: Selection & Customization**: Dynamic frequency, preset amounts, child counters, and custom inputs with instant total calculations.
- **Step 2: Donor Details & Tax Exemption**:
  - Validated with **React Hook Form** and **Zod**.
  - Fields: First Name, Last Name, Email, 10-digit Indian Mobile (`+91`), Street Address, City, State dropdown, 6-digit PIN Code.
  - **Section 80G Tax Exemption**: When checked, strictly validates 10-character Indian PAN format (`ABCDE1234F`).
  - Legal declaration & Terms agreement checkboxes.
- **Step 3: Demo Payment Simulation & Instant Receipt**:
  - Simulated gateway authorization state (SSL encrypted test handshake).
  - Success state triggers confetti animation.
  - Generates official, print-ready donation receipt with receipt number, transaction ID, 80G registration, and donor PAN.
  - Includes a test failure simulation button to test error-handling and data preservation without losing filled forms.

### 5. Offline Bank Transfer & UPI Wire Section
- Configured with official NGO bank details clearly marked **DEMO**.
- One-click copy to clipboard buttons for Account Number, IFSC Code, and UPI ID with animated feedback and toast notifications.
- Demonstration QR code mock with scanning instructions.

### 6. Impact Transparency & Governance
- Visual progress allocation: **86% Direct Programs**, **9% Field Operations**, **5% Administration**.
- Audited statistics (18,500+ children educated, 4,200+ surgeries, 65,000+ dignity kits).
- Statutory trust compliance markers (Indian Trusts Act 1882, 12A, 80G).

### 7. Stories of Hope & Accordion FAQs
- Documented beneficiary profiles with locations and tangible educational/health outcomes.
- Animated Framer Motion accordion answering donor tax questions, visit policies, and security.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod, @hookform/resolvers
- **Celebration Effect**: Canvas Confetti

---

## 💻 Local Setup & Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
http://localhost:3000

# 4. Production build test
npm run build
```

---

## 🔐 Production Payment Gateway Integration Guide

This application is delivered in **safe demonstration mode** without processing real financial charges. To connect a live payment gateway like **Razorpay**, follow this production architecture:

### Step 1: Server-Side Order Creation Route (`/api/donate/create-order`)
```typescript
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { amount, currency = 'INR', receipt, notes } = await req.json();

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency,
    receipt,
    notes,
  });

  return NextResponse.json({ orderId: order.id, amount: order.amount });
}
```

### Step 2: Server-Side Signature Verification (`/api/donate/verify-payment`)
```typescript
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // 1. Save payment record to database
    // 2. Queue Section 80G Form 10BD generation
    // 3. Dispatch automated receipt email
    return NextResponse.json({ status: 'verified', transactionId: razorpay_payment_id });
  }

  return NextResponse.json({ status: 'invalid_signature' }, { status: 400 });
}
```

### Step 3: Webhook Endpoint (`/api/donate/webhook`)
Configure `payment.captured` webhooks with HMAC signature verification against `process.env.RAZORPAY_WEBHOOK_SECRET` for guaranteed reconciliation even if donor closes browser window before return callback.

---

## 📄 License & Attribution
Designed for **Umeed Foundation** demonstration purposes. Original NGO brand identity, typography, and styling.
