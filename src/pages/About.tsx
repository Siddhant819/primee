import { Shield, Heart, Users, Award } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "We treat every patient with empathy and dignity, understanding that healing goes beyond medicine." },
  { icon: Shield, title: "Excellence", desc: "We maintain the highest standards in medical practice, technology, and patient care." },
  { icon: Users, title: "Teamwork", desc: "Our multidisciplinary team collaborates to deliver the best possible outcomes." },
  { icon: Award, title: "Integrity", desc: "We uphold transparency and ethical practices in every aspect of our service." },
];

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/70 text-sm tracking-widest uppercase mb-2">About Us</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Prime Hospital</h1>
        <p className="text-primary-foreground/80 mt-4 max-w-xl mx-auto">
          A leading healthcare institution in Biratnagar, Nepal, committed to delivering world-class medical services.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Founded in 2005, Prime Hospital has grown from a small clinic to one of the most trusted multi-specialty hospitals in eastern Nepal. Located in the heart of Biratnagar, Morang, we serve patients from across Province No. 1 and beyond.
          </p>
          <p>
            With over 50 experienced doctors across 15+ departments, state-of-the-art diagnostic facilities, and a 200-bed capacity, we are dedicated to making quality healthcare accessible to our community.
          </p>
          <p>
            Our mission is to provide comprehensive, affordable, and compassionate healthcare while continuously advancing our medical capabilities through research and education.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">What Drives Us</p>
          <h2 className="font-display text-3xl font-bold text-foreground">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-lg p-6 text-center border border-border">
              <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
