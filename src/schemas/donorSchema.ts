import { z } from 'zod';

export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const PIN_REGEX = /^\d{6}$/;

export const donorFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'First name should only contain letters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name cannot exceed 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Last name should only contain letters'),
    email: z
      .string()
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(PHONE_REGEX, 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)'),
    panNumber: z.string().optional(),
    address: z
      .string()
      .min(5, 'Please provide a valid street address for donation records'),
    city: z
      .string()
      .min(2, 'Please enter your city'),
    state: z
      .string()
      .min(2, 'Please select your state'),
    pinCode: z
      .string()
      .regex(PIN_REGEX, 'PIN code must be exactly 6 digits'),
    taxReceiptRequired: z.boolean(),
    anonymousDonation: z.boolean(),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, 'You must agree to the donation terms to proceed'),
  })
  .refine(
    (data) => {
      if (data.taxReceiptRequired) {
        if (!data.panNumber || data.panNumber.trim() === '') {
          return false;
        }
        return PAN_REGEX.test(data.panNumber.trim().toUpperCase());
      }
      return true;
    },
    {
      message: 'A valid PAN format (e.g. ABCDE1234F) is required for 80G tax deduction receipts',
      path: ['panNumber'],
    }
  );

export type DonorFormValues = z.infer<typeof donorFormSchema>;
