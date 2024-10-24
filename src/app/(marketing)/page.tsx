import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { formatCompactNumber, formatNumberWithCommas } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode } from "react";
import { RedirectButton } from "./_components/RedirectButton";

export default async function MarketingHomePage() {
  return (
    <>
      <section className="min-h-screen mt-10 bg-[radial-gradient(hsla(276,85%,52%,30%),hsl(146,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Streamline Your Studio, Elevate Your Art
        </h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Get back to what you love — let us handle the rest. Sign up today and
          experience stress-free booking.
        </p>
        <SignedOut>
          <SignUpButton>
            <Button className="text-lg p-6 rounded-xl flex gap-2">
              Start your free trial now{" "}
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          {" "}
          <RedirectButton />
        </SignedIn>
      </section>
      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Booking software guaranteed to make your life easier
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto self-center text-center">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
    </>
  );
}

function PricingCard({
  name,
  priceInCents,
  maxBookingsPerMonth,
  maxNumberOfCustomers,
  canRemoveBranding,
  canAccessAnalytics,
  canCustomizeSite,
}: (typeof subscriptionTiersInOrder)[number]) {
  const isMostPopular = name === "Standard";

  return (
    <Card
      className={cn(
        "relative shadow-none rounded-3xl overflow-hidden",
        isMostPopular ? "border-accent border-2" : "border-none"
      )}
    >
      {isMostPopular && (
        <div className="bg-accent text-accent-foreground absolute py-1 px-10 -right-8 top-24 rotate-45 origin-top-right">
          Most popular
        </div>
      )}
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxBookingsPerMonth)} bookings/mo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpButton>
          <Button
            className="text-lg w-full rounded-lg"
            variant={isMostPopular ? "accent" : "default"}
          >
            Get Started
          </Button>
        </SignUpButton>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {formatNumberWithCommas(maxNumberOfCustomers)}
          {" Customers"}
        </Feature>
        <Feature>Booking Site</Feature>
        <Feature>Client Reminders</Feature>
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
        {canRemoveBranding && <Feature>Whitelabel the app</Feature>}
        {canCustomizeSite && <Feature>Customize Booking Site</Feature>}
      </CardFooter>
    </Card>
  );
}

function Feature({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <FontAwesomeIcon
        icon={faCheck}
        className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5"
      />
      <span>{children}</span>
    </div>
  );
}
