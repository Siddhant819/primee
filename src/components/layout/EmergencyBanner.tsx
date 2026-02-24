import { Phone } from "lucide-react";

const EmergencyBanner = () => (
  <div className="bg-emergency text-emergency-foreground py-2 px-4">
    <div className="container mx-auto flex items-center justify-center gap-4 text-sm font-medium">
      <Phone className="h-4 w-4 animate-pulse" />
      <span>24/7 Emergency:</span>
      <a href="tel:021517777" className="underline underline-offset-2 hover:opacity-80">021-517777</a>
      <span>|</span>
      <a href="tel:9705300777" className="underline underline-offset-2 hover:opacity-80">9705300777</a>
    </div>
  </div>
);

export default EmergencyBanner;
