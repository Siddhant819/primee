import { Heart, Stethoscope, Baby, Brain, Bone, Eye, Pill, Scissors, Activity, Microscope, Ear, Smile } from "lucide-react";

const departments = [
  {
    name: "Cardiology",
    icon: Heart,
    desc: "Advanced heart and vascular care featuring modern diagnostics, interventions, and personalized rehabilitation programs.",
  },
  {
    name: "General Medicine",
    icon: Stethoscope,
    desc: "Comprehensive primary healthcare services focused on prevention, early detection, and management of chronic illnesses.",
  },
  {
    name: "Pediatrics",
    icon: Baby,
    desc: "Dedicated pediatric care ensuring healthy growth and development from infancy through adolescence with compassionate attention.",
  },
  {
    name: "Neurology",
    icon: Brain,
    desc: "Expert evaluation and treatment of neurological disorders utilizing cutting-edge technology and multidisciplinary support.",
  },
  {
    name: "Orthopedics",
    icon: Bone,
    desc: "Comprehensive care for musculoskeletal health including joint preservation, minimally invasive surgeries, and rehabilitation.",
  },
  {
    name: "Ophthalmology",
    icon: Eye,
    desc: "State-of-the-art eye care services offering everything from routine exams to advanced surgical procedures.",
  },
  {
    name: "General Surgery",
    icon: Scissors,
    desc: "Skilled surgical team providing minimally invasive and traditional surgeries with patient safety and comfort as priority.",
  },
  {
    name: "Pharmacy",
    icon: Pill,
    desc: "24/7 fully stocked pharmacy delivering trusted medications and wellness products with expert guidance.",
  },
  {
    name: "Emergency Medicine",
    icon: Activity,
    desc: "Rapid-response emergency care equipped with trauma and critical care units to manage urgent medical needs anytime.",
  },
  {
    name: "Pathology",
    icon: Microscope,
    desc: "Accurate and timely diagnostic laboratory services supporting effective treatment plans with advanced equipment.",
  },
  {
    name: "ENT",
    icon: Ear,
    desc: "Comprehensive diagnosis and treatment of ear, nose, and throat disorders with focus on patient comfort and outcomes.",
  },
  {
    name: "Dental",
    icon: Smile,
    desc: "Full-spectrum dental care promoting oral health through preventive, restorative, and cosmetic treatments.",
  },
];

const Departments = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">
          Our Specialties
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Departments
        </h1>
        <p className="text-primary-foreground/80 leading-relaxed text-lg">
          Delivering modern, patient-centered medical care across multiple specialties, supported by expert teams and advanced technology.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((d) => (
            <div
              key={d.name}
              className="group p-8 rounded-lg border border-border bg-card hover:border-primary/60 hover:shadow-lg transition-all duration-300"
            >
              <d.icon className="h-12 w-12 text-primary mb-5 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-2xl font-semibold text-card-foreground mb-4 text-center">
                {d.name}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed text-center">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Departments;