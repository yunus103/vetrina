'use server';

import { contactSchema, ContactFormData } from '@/lib/schemas/contact';

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const validated = contactSchema.parse(formData);
    // In a real app, this would send an email using Resend, Sendgrid, etc.
    console.log("Mock contact email sent:", validated);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Validation failed or server error" };
  }
}
