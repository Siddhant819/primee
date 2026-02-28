import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Eye,
  Clock,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import Slider from "react-slick";

// Hero images
const heroImages = [
  "https://i.imgur.com/XOtGHPL.jpg",
  "https://i.imgur.com/2Ij1JIQ.jpg",
  "https://i.imgur.com/RaWuN9i.jpg",
  "https://i.imgur.com/UAtihd2.jpg",
];

// Departments
const departments = [
  { name: "Cardiology", icon: Heart, desc: "Heart & cardiovascular care" },
  { name: "General Medicine", icon: Stethoscope, desc: "Primary healthcare services" },
  { name: "Pediatrics", icon: Baby, desc: "Children's healthcare" },
  { name: "Neurology", icon: Brain, desc: "Brain & nervous system" },
  { name: "Orthopedics", icon: Bone, desc: "Bone & joint care" },
  { name: "Ophthalmology", icon: Eye, desc: "Eye care & surgery" },
];

// Stats
const stats = [
  { value: "1+", label: "Year of Service", icon: Clock },
  { value: "10+", label: "Expert Doctors", icon: Users },
  { value: "15+", label: "Departments", icon: Award },
  { value: "1000+", label: "Patients Served", icon: Heart },
];

// Custom Arrow Components
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 text-white/90 hover:text-white text-3xl"
    >
      &#10094;
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 text-white/90 hover:text-white text-3xl"
    >
      &#10095;
    </button>
  );
};

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const Index = () => {
  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center overflow-hidden">
        <Slider {...sliderSettings} className="h-full w-full">
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative h-[95vh] min-h-[700px]">
              <img
                src={img}
                alt={`Hero ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 z-10 container mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-center md:text-left w-full">
            <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">
              Biratnagar's Trusted Healthcare
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Your Health, <br />
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Comprehensive, compassionate medical care with state-of-the-art facilities and experienced specialists.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/appointments">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
                >
                  Book Appointment
                </Button>
              </Link>
              <Link to="/departments">
                <Button
                  size="lg"
                  className="bg-white/20 text-white hover:bg-white/30 font-semibold px-8"
                >
                  Our Departments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
              Specialties
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Our Departments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => (
              <div
                key={d.name}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <d.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">
                  {d.name}
                </h3>
                <p className="text-muted-foreground text-sm">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/departments">
              <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8">
                View All Departments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors Banner */}
      <section
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center mb-6"
        style={{ backgroundImage: "url('https://i.imgur.com/Qn0pz2o.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Experienced and compassionate professionals ready to care for you.
          </p>
          <div className="mt-6">
            <Link to="/doctors">
              <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8">
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;