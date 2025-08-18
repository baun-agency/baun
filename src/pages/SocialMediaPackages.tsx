import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, TrendingUp, Crown, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PricingCard = ({ 
  title, 
  monthlyPrice, 
  features, 
  icon: Icon,
  highlight = false,
  months
}: {
  title: string;
  monthlyPrice: number;
  features: string[];
  icon: any;
  highlight?: boolean;
  months: number;
}) => {
  const totalPrice = monthlyPrice * months;
  
  return (
    <Card className={`relative transition-all hover:shadow-lg hover:scale-105 ${
      highlight ? 'border-primary bg-primary/5 shadow-md' : ''
    }`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}
      
      <CardHeader className="text-center">
        <div className="mb-3 flex justify-center">
          <Icon className={`h-8 w-8 ${highlight ? 'text-primary' : 'text-foreground'}`} />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-primary">
            KSh {monthlyPrice.toLocaleString()}/month
          </div>
          <div className="text-lg font-semibold text-muted-foreground">
            Total: KSh {totalPrice.toLocaleString()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={highlight ? "default" : "outline"} 
          className="w-full"
          size="lg"
        >
          Book Free Audit
        </Button>
      </CardContent>
    </Card>
  );
};

const SocialMediaPackages = () => {
  const [months, setMonths] = useState([1]);
  
  const packages = [
    {
      title: "Mkulima-Mdogo",
      monthlyPrice: 7500,
      features: [
        "12 posts/month (6 Reels)",
        "Basic rebranding",
        "Bilingual captions",
        "1 Free Reel remix (quarterly)"
      ],
      icon: Users,
      highlight: false
    },
    {
      title: "Starter Brand Boost",
      monthlyPrice: 15000,
      features: [
        "15 posts/month",
        "Full profile rebrand",
        "Content calendar",
        "Weekly insights"
      ],
      icon: Star,
      highlight: false
    },
    {
      title: "Growth Engine",
      monthlyPrice: 30000,
      features: [
        "30 posts/month",
        "Viral content strategy",
        "Engagement management",
        "Monetization tips"
      ],
      icon: TrendingUp,
      highlight: true
    },
    {
      title: "Elite Creator",
      monthlyPrice: 50000,
      features: [
        "Daily content",
        "Video scripting & editing",
        "Sponsorship pitch deck",
        "1-on-1 weekly calls"
      ],
      icon: Crown,
      highlight: false
    }
  ];

  const totalCost = packages.reduce((sum, pkg) => sum + (pkg.monthlyPrice * months[0]), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Back to Baun home">
            <img
              src="/lovable-uploads/d8e4b495-ac53-45e0-8906-0fcf2ea8225a.png"
              alt="Baun logo"
              className="h-10 w-10 select-none"
              draggable={false}
            />
            <span className="font-bold text-lg">Baun</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Choose Your Growth Plan
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Slide to see your total for 1 to 12 months. No hidden fees. Cancel anytime.
            </p>
            
            {/* Month Slider */}
            <div className="mx-auto max-w-md space-y-4">
              <label className="block text-sm font-medium">
                Number of Months: {months[0]}
              </label>
              <Slider
                value={months}
                onValueChange={setMonths}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-2xl font-bold text-primary">
                Total ({months[0]} month{months[0] > 1 ? 's' : ''}): KSh {totalCost.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Package Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, index) => (
              <PricingCard key={index} {...pkg} months={months[0]} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-extrabold">
            Ready to Grow Your Digital Presence?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Every package comes with our signature Nairobi flair and global standards. 
            Let's make your brand impossible to ignore.
          </p>
          <Button variant="secondary" size="lg">
            Book Free Audit
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPackages;