import { Badge } from "@/components/ui/badge";

const doctors = [
  {
    name: "Dr. Ramesh Chaurasia",
    specialty: "Nephrology",
    qualification: "MD, DM (Nephrology)",
    image: "https://i.imgur.com/oOneoU6.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Sangeeta Mishra",
    specialty: "Obstetrics & Gynecology",
    qualification: "MBBS, MS (OB-GYN)",
    image: "https://i.imgur.com/Vu3ObhC.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Ajay Mahato",
    specialty: "Orthopedic Surgery",
    qualification: "MBBS, MS (Ortho) - AIIMS",
    image: "https://i.imgur.com/0PmSuNt.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Manish Agrawal",
    specialty: "General Surgery",
    qualification: "MBBS, MS (Surgery)",
    image: "https://i.imgur.com/ASdmiN1.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Ranjeev Yadav",
    specialty: "Radiology",
    qualification: "MBBS, MD (Radiology)",
    image: "https://i.imgur.com/b9KM8o5.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Shrijana Yadav",
    specialty: "Pathology",
    qualification: "MBBS, MD (Pathology)",
    image: "https://i.imgur.com/sAWlGhC.jpg",
    available: true,
    experience: "10 years",
  },
  {
    name: "Dr. Tek Narayan Yadav",
    specialty: "Senior Laparoscopic and GI Surgeon",
    qualification:
      "MBBS (BPKIHS), MS (General Surgery) PGIMER, MCh (Surgical Gastroenterology) BPKIHS",
    image: "https://i.imgur.com/QaeLFUy.jpg",
    available: true,
    experience: "10 years",
  },
];

const Doctors = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">
            Meet Our Team
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Our Doctors
          </h1>
          <p className="text-primary-foreground/80 mt-4 max-w-xl mx-auto">
            Experienced, qualified, and compassionate — our medical team is
            dedicated to your well-being.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Doctor Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-primary shadow-md"
                  />
                </div>

                {/* Name */}
                <h3 className="font-display text-lg font-semibold text-card-foreground">
                  {doc.name}
                </h3>

                {/* Specialty */}
                <Badge className="mt-2 bg-secondary text-secondary-foreground">
                  {doc.specialty}
                </Badge>

                {/* Qualification */}
                <p className="text-sm text-muted-foreground mt-3">
                  {doc.qualification}
                </p>

                {/* Experience */}
                <p className="text-sm text-muted-foreground">
                  {doc.experience} experience
                </p>

                {/* Availability */}
                <p
                  className={`text-sm font-medium mt-3 ${
                    doc.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doc.available ? "Available Today" : "Not Available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;