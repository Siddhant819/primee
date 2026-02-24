import { Heart, Stethoscope, Baby, Brain, Bone, Eye, Pill, Scissors, Activity, Microscope, Ear, Smile } from "lucide-react";

const departments = [
  { name: "Cardiology", icon: Heart, desc: "Comprehensive heart and cardiovascular care including diagnostics, interventions, and cardiac rehabilitation." },
  { name: "General Medicine", icon: Stethoscope, desc: "Primary healthcare services, health check-ups, and management of chronic conditions." },
  { name: "Pediatrics", icon: Baby, desc: "Specialized care for infants, children, and adolescents including vaccinations and growth monitoring." },
  { name: "Neurology", icon: Brain, desc: "Diagnosis and treatment of brain, spinal cord, and nervous system disorders." },
  { name: "Orthopedics", icon: Bone, desc: "Treatment of musculoskeletal conditions, joint replacements, and sports injuries." },
  { name: "Ophthalmology", icon: Eye, desc: "Complete eye care including cataract surgery, LASIK, and retinal treatments." },
  { name: "General Surgery", icon: Scissors, desc: "Minimally invasive and open surgeries for a wide range of conditions." },
  { name: "Pharmacy", icon: Pill, desc: "24/7 pharmacy with a comprehensive range of medications and health products." },
  { name: "Emergency Medicine", icon: Activity, desc: "Round-the-clock emergency care with trauma and critical care facilities." },
  { name: "Pathology", icon: Microscope, desc: "Advanced diagnostic laboratory services for accurate and timely test results." },
  { name: "ENT", icon: Ear, desc: "Treatment of ear, nose, and throat conditions including hearing assessments." },
  { name: "Dental", icon: Smile, desc: "Complete dental care from routine cleanings to cosmetic and restorative procedures." },
];

const Departments = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">Our Specialties</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Departments</h1>
        <p className="text-primary-foreground/80 mt-4 max-w-xl mx-auto">
          World-class medical care across a wide range of specialties, equipped with modern technology and expert professionals.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d) => (
            <div key={d.name} className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all">
              <d.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{d.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Departments;
