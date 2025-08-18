import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Star, Users, TrendingUp, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const PackageCard = ({ 
  title, 
  price, 
  description, 
  features, 
  cta, 
  ctaText, 
  highlight = false, 
  icon: Icon 
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  ctaText: string;
  highlight?: boolean;
  icon: any;
}) => (
  <article className={`relative rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${
    highlight ? 'border-primary bg-primary/5 scale-105' : 'bg-card'
  }`}>
    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
        Most Popular
      </div>
    )}
    
    <div className="mb-4 flex items-center gap-3">
      <Icon className={`h-6 w-6 ${highlight ? 'text-primary' : 'text-foreground'}`} />
      <h3 className="text-xl font-extrabold">{title}</h3>
    </div>
    
    <div className="mb-4">
      <div className="text-3xl font-extrabold text-primary">{price}</div>
      <div className="text-sm text-muted-foreground">per month</div>
    </div>
    
    <p className="mb-6 text-muted-foreground">{description}</p>
    
    <ul className="mb-8 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="space-y-3">
      <p className="text-sm font-semibold text-center italic">{cta}</p>
      <Button 
        variant={highlight ? "default" : "outline"} 
        className="w-full"
        size="lg"
      >
        {ctaText}
      </Button>
    </div>
  </article>
);

const SocialMediaPackages = () => {
  const packages = [
    {
      title: "Mkulima-Mdogo Plan",
      price: "KSh 7,500",
      description: "Your hustle deserves a voice. Whether you're running a salon, tailoring business, or mama mboga stand, your customers need to find you online.",
      features: [
        "12 high-quality posts/month (6 engaging Reels + 6 eye-catching static posts)",
        "Basic rebrand package (fresh cover photo, optimized bio, profile makeover tips)",
        "Monthly content calendar with relevant themes for your business",
        "Bilingual captions (Swahili/English) that speak to your community",
        "2 targeted engagement campaigns to boost visibility",
        "Monthly growth snapshot showing your progress",
        "BONUS: 1 free Reel remix per quarter to keep content fresh"
      ],
      cta: "Perfect for small business owners ready to turn social media into a customer magnet.",
      ctaText: "Kuanzia kwa shillingi. Kuwa na brand. Sign up today.",
      icon: Users,
      highlight: false
    },
    {
      title: "Starter Brand Boost",
      price: "KSh 15,000",
      description: "Ready to go from invisible to noticeable? This package transforms new bloggers and micro-influencers into recognizable voices in the digital soko.",
      features: [
        "15 strategic posts/month (mix of Reels, carousels, and graphics)",
        "Complete profile rebrand (cover, bio, professional profile pic)",
        "Custom content calendar & compelling captions that convert",
        "3 engagement campaigns monthly (polls, Q&A sessions, viral challenges)",
        "Weekly performance insights to track your growth journey"
      ],
      cta: "Stop blending into the background. Build a brand that stands out from day one.",
      ctaText: "Ready to start strong? Let's build your brand.",
      icon: Star,
      highlight: true
    },
    {
      title: "Growth Engine",
      price: "KSh 30,000",
      description: "Engineered for reach and results. For creators who've found their voice and are ready to amplify it across the entire digital landscape.",
      features: [
        "30 premium posts/month (15 trend-focused Reels + 15 strategic static posts)",
        "Viral content strategy (1 guaranteed viral-potential post monthly)",
        "Active audience engagement management (we handle the conversations)",
        "Cross-platform scheduling (Facebook, Instagram, WhatsApp Business)",
        "Monetization guidance & affiliate marketing setup",
        "Advanced analytics and growth optimization"
      ],
      cta: "This isn't just social media management – it's your growth acceleration system.",
      ctaText: "Grow faster. Work smarter. Let's scale.",
      icon: TrendingUp,
      highlight: false
    },
    {
      title: "Elite Creator Program",
      price: "KSh 50,000+",
      description: "Full-service personal brand management. For established influencers and public figures ready to build their digital empire while focusing on their craft.",
      features: [
        "Daily premium content (Reels, Stories, posts) across all platforms",
        "Professional video scripting & editing services",
        "Personal brand strategy & authentic voice development",
        "Custom sponsorship pitch decks for premium partnerships",
        "Digital product funnel setup (e-books, online courses, masterclasses)",
        "Weekly 1-on-1 strategy calls with our senior team",
        "Priority support and rapid content turnaround"
      ],
      cta: "You've built your influence – now let us build your digital empire.",
      ctaText: "You focus on your craft. We handle your digital empire.",
      icon: Crown,
      highlight: false
    }
  ];

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-secondary/20 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Social Media Management
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Transform your online presence with packages designed for every stage of your digital journey. 
            From small hustles to major brands, we've got the perfect soko strategy for you.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
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
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPackages;