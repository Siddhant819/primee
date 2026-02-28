import { Shield, Heart, Users, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We place patients at the heart of everything we do, delivering care with empathy, respect, and genuine concern.",
  },
  {
    icon: Shield,
    title: "Quality & Safety",
    desc: "We follow modern medical standards and evidence-based practices to ensure safe, reliable, and effective treatment.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Our doctors, nurses, and specialists work together as one team to provide coordinated and comprehensive care.",
  },
  {
    icon: Award,
    title: "Integrity",
    desc: "We are committed to ethical practice, transparency, and accountability in every patient interaction.",
  },
];

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">
          About Us
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Prime Hospital
        </h1>
        <p className="text-primary-foreground/80 leading-relaxed text-lg">
          A modern healthcare institution in Biratnagar, Nepal, dedicated to delivering safe, compassionate, and advanced medical care.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8">
          Our Beginning
        </h2>
        <div className="space-y-6 text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
          <p>
            Established with a vision to redefine healthcare standards in eastern Nepal, Prime Hospital is a newly founded multi-specialty medical center committed to excellence in patient care.
          </p>
          <p>
            Equipped with modern diagnostic technology, well-designed patient facilities, and a dedicated team of skilled professionals, we aim to provide accessible and reliable healthcare services to individuals and families in Biratnagar and surrounding regions.
          </p>
          <p>
            As a growing institution, we are focused on continuous improvement, innovation, and building lasting trust within our community. Our foundation is built on quality care, ethical medical practice, and patient-centered service.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
            What Drives Us
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-card rounded-lg p-8 text-center border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <v.icon className="h-12 w-12 text-primary mx-auto mb-5" />
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                {v.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;