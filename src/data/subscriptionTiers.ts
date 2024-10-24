export type TierNames = keyof typeof subscriptionTiers;
export type PaidTierNames = Exclude<TierNames, "Free">;

export const subscriptionTiers = {
  Basic: {
    name: "Basic",
    priceInCents: 1900,
    maxBookingsPerMonth: 40,
    maxNumberOfCustomers: 1000,
    canAccessAnalytics: false,
    canCustomizeSite: false,
    canRemoveBranding: false,
  },
  Standard: {
    name: "Standard",
    priceInCents: 2900,
    maxBookingsPerMonth: 60,
    maxNumberOfCustomers: 5000,
    canAccessAnalytics: false,
    canCustomizeSite: true,
    canRemoveBranding: true,
  },
  Premium: {
    name: "Premium",
    priceInCents: 4900,
    maxBookingsPerMonth: 200,
    maxNumberOfCustomers: 10000,
    canAccessAnalytics: true,
    canCustomizeSite: true,
    canRemoveBranding: true,
  },
} as const;

export const subscriptionTiersInOrder = [
  subscriptionTiers.Basic,
  subscriptionTiers.Standard,
  subscriptionTiers.Premium,
] as const;
