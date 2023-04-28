import { loadStripe } from "@stripe/stripe-js";

export const stripePrpmise = loadStripe(process.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY);