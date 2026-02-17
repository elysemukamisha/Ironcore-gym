import { Feature, PricingPlan, Service, Testimonial } from './types';

export const BUSINESS_INFO = {
  name: "IronCore Gym",
  phone: "(555) 123-4567",
  address: "123 Fitness Blvd, Downtown District, City 90210",
  tagline: "Serious Training for Real Results",
  founded: 2015,
  hours: {
    weekday: "Monday-Friday: 5:00 AM - 11:00 PM",
    weekend: "Saturday-Sunday: 7:00 AM - 9:00 PM"
  }
};

export const SERVICES: Service[] = [
  {
    title: "Personal Training",
    description: "One-on-one coaching with certified trainers. Customized workout plans designed for your specific goals and fitness level."
  },
  {
    title: "Group Fitness",
    description: "High-energy group classes that combine motivation with effective workouts. Build strength while connecting with others."
  },
  {
    title: "Strength & Conditioning",
    description: "Serious strength training with professional equipment. Build muscle, increase power, and improve athletic performance."
  },
  {
    title: "Fat Loss Programs",
    description: "Proven fat loss strategies combining cardio and strength training. Get lean and stay lean with our structured approach."
  },
  {
    title: "Beginner Foundations",
    description: "Perfect for newcomers to fitness. Learn proper form, build confidence, and establish healthy exercise habits."
  }
];

export const FEATURES: Feature[] = [
  {
    icon: "Dumbbell",
    title: "Professional Equipment",
    description: "High-quality, commercial-grade equipment maintained to the highest standards."
  },
  {
    icon: "Target",
    title: "Results-Focused",
    description: "We measure success by your progress, not by flashy marketing promises."
  },
  {
    icon: "Users",
    title: "Expert Trainers",
    description: "Certified professionals with years of experience helping people reach their goals."
  },
  {
    icon: "Clock",
    title: "Convenient Hours",
    description: "Open early mornings and late evenings to fit your busy schedule."
  }
];

export const PRICING: PricingPlan[] = [
  {
    name: "Day Pass",
    price: "$15",
    description: "Perfect for trying out our facility. Full gym access for one day."
  },
  {
    name: "Monthly Membership",
    price: "$49",
    description: "Unlimited gym access, group fitness classes, and member benefits."
  },
  {
    name: "Personal Training",
    price: "$240",
    description: "Package includes multiple one-on-one sessions with certified trainers."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "IronCore changed my life. The trainers really care about your progress and the equipment is top-notch. Best investment I've made in myself.",
    author: "Sarah M.",
    memberSince: "2022"
  },
  {
    text: "No-nonsense gym with serious results. I've tried other gyms but IronCore is where I finally reached my fitness goals.",
    author: "Mike R.",
    memberSince: "2021"
  },
  {
    text: "The beginner program was perfect for me. I went from never working out to being confident in the gym. Highly recommend.",
    author: "Jessica T.",
    memberSince: "2023"
  }
];

export const SYSTEM_INSTRUCTION = `You are the AI Voice Assistant for IronCore Gym. 
Your goal is to be helpful, motivating, and concise.

BUSINESS DATA:
Name: ${BUSINESS_INFO.name}
Phone: ${BUSINESS_INFO.phone}
Address: ${BUSINESS_INFO.address}
Hours: ${BUSINESS_INFO.hours.weekday}, ${BUSINESS_INFO.hours.weekend}

PRICING:
${PRICING.map(p => `- ${p.name}: ${p.price} (${p.description})`).join('\n')}

SERVICES:
${SERVICES.map(s => `- ${s.title}`).join('\n')}

CORE INSTRUCTIONS:
1. Answer general questions about pricing, hours, location, and services concisely (under 2 sentences).
2. Be encouraging and energetic (Gym persona).
3. Identify when a user wants to JOIN, BOOK A SESSION, or VISIT. When this happens, enter the "Booking Flow".

BOOKING FLOW:
You must collect the following information one by one. Do not ask multiple questions at once. Wait for the user to answer before asking the next one.

Step 1: Ask for their First Name.
Step 2: Ask for their Main Fitness Goal (e.g., weight loss, strength, general health).
Step 3: Ask if they are a Beginner or Experienced with gyms.
Step 4: Ask for their Preferred Visit Day (e.g., Monday, Tomorrow).
Step 5: Ask if they prefer Morning or Evening.

COMPLETION:
After receiving the answer to Step 5 (Morning/Evening):
1. Summarize all the details they provided clearly.
2. Tell them: "Please submit your booking or call us at ${BUSINESS_INFO.phone} to finalize your appointment."

GUIDELINES:
- If asked about location, provide the address.
- Never make up amenities we don't have.
`;
