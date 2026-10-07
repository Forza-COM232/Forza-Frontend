import type { ContractTerm } from "@/types";

/** Display labels for backend enum values */
export const contractTermLabels: Record<ContractTerm, string> = {
  payment: "Payment",
  delivery: "Delivery",
  returns: "Returns",
  pricing: "Pricing",
};
