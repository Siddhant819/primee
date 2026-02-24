import { Badge } from "@/components/ui/badge";

const doctors = [
  { name: "Dr. Rajesh Sharma", specialty: "Cardiology", qualification: "MD, DM Cardiology", experience: "18 years", availability: "Sun–Fri" },
  { name: "Dr. Sunita Rai", specialty: "Pediatrics", qualification: "MD Pediatrics", experience: "12 years", availability: "Sun–Fri" },
  { name: "Dr. Bikash Chaudhary", specialty: "Orthopedics", qualification: "MS Orthopedics", experience: "15 years", availability: "Sun–Thu" },
  { name: "Dr. Anita Gupta", specialty: "Neurology", qualification: "MD, DM Neurology", experience: "10 years", availability: "Sun–Fri" },
  { name: "Dr. Prakash Jha", specialty: "General Surgery", qualification: "MS Surgery", experience: "20 years", availability: "Sun–Fri" },
  { name: "Dr. Meena Thapa", specialty: "Ophthalmology", qualification: "MS Ophthalmology", experience: "8 years", availability: "Mon–Fri" },
  { name: "Dr. Arjun Pokharel", specialty: "General Medicine", qualification: "MD Internal Medicine", experience: "14 years", availability: "Sun–Fri" },
  { name: "Dr. Sita Devi", specialty: "ENT", qualification: "MS ENT", experience: "11 years", availability: "Sun–Thu" },
];

const Doctors = () => (
  <div>
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">Meet Our Team</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Our Doctors</h1>
        <p className="text-primary-foreground/80 mt-4 max-w-xl mx-auto">
          Experienced, qualified, and compassionate — our medical team is dedicated to your well-being.
        </p>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div key={doc.name} className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-2xl font-display font-bold text-primary">
                  {doc.name.split(" ").slice(1, 2).map(n => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">{doc.name}</h3>
              <Badge className="mt-1 bg-secondary text-secondary-foreground">{doc.specialty}</Badge>
              <p className="text-sm text-muted-foreground mt-3">{doc.qualification}</p>
              <p className="text-sm text-muted-foreground">{doc.experience} experience</p>
              <p className="text-sm text-primary font-medium mt-2">Available: {doc.availability}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Doctors;
