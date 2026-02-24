import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Contact Us</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info + Map */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Reach Prime Hospital</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">Prime Hospital, Biratnagar-4, Morang, Nepal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">021-517777 / 9705300777</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@primehospital.com.np</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Hours</p>
                    <p className="text-sm text-muted-foreground">OPD: Sun–Fri, 8AM–5PM | Emergency: 24/7</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Prime Hospital Biratnagar"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.904!2d87.2833!3d26.4525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBiratnagar%2C+Nepal!5e0!3m2!1sen!2snp!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-lg border border-border p-8">
              <h2 className="font-display text-2xl font-bold text-card-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required placeholder="Your name" className="mt-1" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" required type="email" placeholder="you@example.com" className="mt-1" maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required placeholder="Subject" className="mt-1" maxLength={200} />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required placeholder="Your message..." className="mt-1" rows={5} maxLength={1000} />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
