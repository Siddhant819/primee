import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, Baby, Brain, Bone, Eye, Clock, Award, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-hospital.jpg";

const departments = [
  { name: "Cardiology", icon: Heart, desc: "Heart & cardiovascular care" },
  { name: "General Medicine", icon: Stethoscope, desc: "Primary healthcare services" },
  { name: "Pediatrics", icon: Baby, desc: "Children's healthcare" },
  { name: "Neurology", icon: Brain, desc: "Brain & nervous system" },
  { name: "Orthopedics", icon: Bone, desc: "Bone & joint care" },
  { name: "Ophthalmology", icon: Eye, desc: "Eye care & surgery" },
];

const stats = [
  { value: "20+", label: "Years of Service", icon: Clock },
  { value: "50+", label: "Expert Doctors", icon: Users },
  { value: "15+", label: "Departments", icon: Award },
  { value: "1L+", label: "Patients Served", icon: Heart },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <img src={heroImage} alt="Prime Hospital Biratnagar" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-primary-foreground/80 text-sm font-semibold tracking-widest uppercase mb-4">
              Biratnagar's Trusted Healthcare
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Your Health, <br />
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg">
              Comprehensive, compassionate medical care with state-of-the-art facilities and experienced specialists.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/appointments">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/departments">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                  Our Departments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <s.icon className="h-8 w-8 opacity-80" />
              <span className="font-display text-3xl font-bold">{s.value}</span>
              <span className="text-sm opacity-80">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Specialties</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Departments</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => (
              <div
                key={d.name}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <d.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{d.name}</h3>
                <p className="text-muted-foreground text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/departments">
              <Button variant="outline" className="gap-2">View All Departments <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Our team of experienced doctors is here to help you 24/7. Book an appointment or call our emergency line.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointments">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8">
                Book Appointment
              </Button>
            </Link>
            <a href="tel:021517777">
              <Button size="lg" variant="outline" className="gap-2 font-semibold px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Call Emergency
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
