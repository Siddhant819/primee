import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarCheck } from "lucide-react";

const departments = [
  "Cardiology", "General Medicine", "Pediatrics", "Neurology", "Orthopedics",
  "Ophthalmology", "General Surgery", "ENT", "Dental", "Emergency Medicine",
];

const Appointments = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Appointment request submitted! We will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">Schedule a Visit</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Book an Appointment</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center gap-3 mb-8">
              <CalendarCheck className="h-8 w-8 text-primary" />
              <div>
                <h2 className="font-display text-2xl font-bold text-card-foreground">Appointment Form</h2>
                <p className="text-sm text-muted-foreground">Fill in your details and we'll get back to you.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="Your full name" className="mt-1" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required type="tel" placeholder="98XXXXXXXX" className="mt-1" maxLength={15} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="mt-1" maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" required type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Department</Label>
                <Select required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message / Symptoms</Label>
                <Textarea id="message" placeholder="Briefly describe your concern..." className="mt-1" rows={4} maxLength={1000} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {loading ? "Submitting..." : "Submit Appointment Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointments;
