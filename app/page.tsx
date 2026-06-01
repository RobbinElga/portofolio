"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  // Canvas Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 50;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(5, 6, 15, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.fillStyle = `rgba(182, 217, 252, ${0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(182, 217, 252, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll animations with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stagger animation for items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".stagger-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-stagger]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Count-up animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach((counter) => {
              const target = parseInt(
                counter.getAttribute("data-target") || "0"
              );
              let current = 0;
              const increment = target / 30;

              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.textContent = Math.ceil(current) + "";
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target + "+";
                }
              };

              updateCounter();
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-count-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "SORA — CMS Landing Page",
      description:
        "CMS full stack untuk mengelola dan menampilkan landing page secara dinamis. Dikembangkan bersama tim lintas divisi selama 6 bulan.",
      tech: ["Laravel", "Docker", "MySQL"],
      type: "Full Stack · Tim Proyek",
      image: "right",
      imagePath: "/sora.png",
      links: { live: "#", github: "#" },
    },
    {
      title: "Learning Management System",
      description:
        "Platform LMS berbasis web untuk manajemen kelas, materi, tugas, dan penilaian secara terintegrasi.",
      tech: ["Next.js", "Prisma ORM", "PostgreSQL", "Docker"],
      type: "Full Stack · Website",
      image: "left",
      imagePath: "/lms.png",
      links: { live: "#", github: "#" },
    },
    {
      title: "Sistem Mutasi Siswa Landak",
      description:
        "Back-end sistem informasi mutasi siswa berbasis web di Kabupaten Landak, mencakup pengelolaan data dan alur persetujuan.",
      tech: ["Express.js", "JavaScript", "MySQL", "Prisma ORM"],
      type: "Back-end · Website",
      image: "right",
      imagePath: "/mutasi.jpeg",
      links: { live: "#", github: "#" },
    },
  ];

  const socialLinks = [
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/ElgaFirmantara",
      link: "https://github.com/ElgaFirmantara",
      iconPath: "/github.png",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/elgafirmantara",
      link: "https://www.linkedin.com/in/elga-firmantara-703345384/",
      iconPath: "/linkedin.png",
    },
    {
      icon: "📧",
      label: "Email",
      value: "elgafirmantara27@gmail.com",
      link: "mailto:elga@firmantara27@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-midnight-abyss text-comet overflow-x-hidden">
      {/* Canvas Background - Particle System */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Animated Top Gradient Line */}
      <div className="gradient-line-top"></div>

      {/* Content Wrapper (z-index: 1+) */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav
          className={`navbar flex items-center justify-between px-8 py-4 mt-2 ${scrolled ? "scrolled" : ""
            }`}
        >
          <div
            className="text-lg font-medium text-ghost-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Elga Firmantara
          </div>

          <div className="hidden md:flex items-center gap-12">
            <a
              href="#tentang"
              className="text-sm text-arctic-mist hover:text-comet transition-colors"
            >
              Tentang
            </a>
            <a
              href="#proyek"
              className="text-sm text-arctic-mist hover:text-comet transition-colors"
            >
              Proyek
            </a>
            <a
              href="#kontak"
              className="text-sm text-arctic-mist hover:text-comet transition-colors"
            >
              Kontak
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section px-6 overflow-hidden relative">
          <div className="hero-glow"></div>

          <div className="relative z-10 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left">
                {/* Headline with Typing Effect */}
                <h1
                  className="text-5xl sm:text-6xl font-medium text-ghost-white mb-6 leading-tight fade-in-up"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  ELGA FIRMANTARA
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-comet mb-12 leading-relaxed fade-in-up">
                  Mahasiswa Sistem Informasi FMIPA Universitas Tanjungpura yang
                  berfokus pada pengembangan web full stack dari antarmuka hingga sistem backend.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up justify-center lg:justify-start">
                  <button className="btn-pill btn-primary text-sm sm:text-base" onClick={() => document.getElementById("proyek")?.scrollIntoView({ behavior: "smooth" })}>
                    Lihat Proyek Saya
                  </button>
                  <button className="btn-pill btn-secondary text-sm sm:text-base">
                    Unduh CV
                  </button>
                </div>

                {/* Tech Stack Badges */}
                <div
                  className="flex flex-wrap gap-3 stagger-container justify-center lg:justify-start"
                  data-stagger
                >
                  {[
                    "Laravel",
                    "Next.js",
                    "PHP",
                    "Express.js",
                    "JavaScript",
                    "MySQL",
                    "PostgreSQL",
                    "Docker",
                    "Prisma ORM",
                  ].map((tech) => (
                    <span key={tech} className="badge-tech stagger-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Photo */}
              <div
                className="w-full max-w-sm h-96 rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 58, 243, 0.15) 0%, rgba(182, 217, 252, 0.1) 100%)",
                  border: "1px solid rgba(186, 215, 247, 0.12)",
                  boxShadow:
                    "inset 0px 1px 1px 0px rgba(199, 211, 234, 0.12), inset 0px 24px 48px 0px rgba(199, 211, 234, 0.05), 0px 24px 32px 0px rgba(6, 6, 14, 0.7)",
                }}
              >
                <img
                  src="/saya.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="section-container fade-in-up">
          <div className="mb-8 text-center">
            <p className="section-label justify-center block">TENTANG</p>
            <h2
              className="text-3xl sm:text-4xl font-medium text-ghost-white mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Seorang developer yang peduli pada kode sekaligus kualitas.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Text Content */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-base text-comet leading-relaxed">
                Saya adalah mahasiswa Sistem Informasi FMIPA Universitas
                Tanjungpura dengan pengalaman nyata di dunia industri dan tim
                proyek. Fokus pada pengembangan web full stack menggunakan
                teknologi modern, terbiasa bekerja dalam tim dan memberikan
                solusi berbasis web yang fungsional.
              </p>
              <p className="text-base text-comet leading-relaxed">
                Keahlian saya mencakup seluruh stack pengembangan mulai dari
                membangun antarmuka responsif dengan Next.js hingga merancang
                sistem backend yang tangguh menggunakan Laravel, PHP, dan
                berbagai database seperti MySQL dan PostgreSQL.
              </p>
              <p className="text-base text-comet leading-relaxed">
                Saat tidak sedang ngoding, saya aktif berkontribusi di organisasi
                mahasiswa (HMSI) dan terus mengeksplorasi teknologi-teknologi
                baru yang mendorong batas kemampuan web.
              </p>
            </div>

            {/* Right: Stats Card */}
            <div className="card-glassy p-8 flex flex-col justify-center" data-count-section>
              <div className="space-y-8">
                <div>
                  <div
                    className="text-5xl font-medium text-ghost-white counter"
                    data-target="3"
                  >
                    0
                  </div>
                  <p className="text-sm text-arctic-mist mt-2">
                    Pengalaman Akademik (Tahun)
                  </p>
                </div>
                <div>
                  <div
                    className="text-5xl font-medium text-ghost-white counter"
                    data-target="10"
                  >
                    10+
                  </div>
                  <p className="text-sm text-arctic-mist mt-2">Proyek Selesai</p>
                </div>
                <div>
                  <div
                    className="text-5xl font-medium text-ghost-white counter"
                    data-target="2"
                  >
                    0
                  </div>
                  <p className="text-sm text-arctic-mist mt-2">
                    Pengalaman Industri & Organisasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyek" className="section-container fade-in-up">
          <div className="mb-12 text-center">
            <p className="section-label justify-center block">PROYEK</p>
            <h2
              className="text-3xl sm:text-4xl font-medium text-ghost-white"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Proyek Pilihan.
            </h2>
          </div>

          <div
            className="space-y-12"
            data-stagger
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`card-glassy p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center stagger-item ${project.image === "left" ? "lg:grid-flow-col-dense" : ""
                  }`}
              >
                {/* Project Info */}
                <div className={project.image === "left" ? "lg:col-start-2" : ""}>
                  <h3 className="text-lg sm:text-xl font-semibold text-arctic-mist mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-whisper-blue mb-4">
                    {project.type}
                  </p>
                  <p className="text-sm sm:text-base text-whisper-blue mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="badge-tech text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                </div>

                {/* Project Image Placeholder */}
                <div
                  className={`flex relative w-full h-64 rounded-xl items-center justify-center overflow-hidden ${project.image === "left" ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  style={{
                    background: "rgba(199, 211, 234, 0.04)",
                    border: "1px solid rgba(186, 215, 247, 0.08)",
                  }}
                >
                  {project.imagePath ? (
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-5xl text-slate-700">📦</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="section-container fade-in-up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="section-label justify-center block">KONTAK</p>
            <h2
              className="text-4xl sm:text-5xl font-medium text-ghost-white mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Mari bangun sesuatu bersama.
            </h2>
            <p className="text-base sm:text-lg text-azure-glow">
              Punya proyek yang ingin dikerjakan atau sekadar ingin ngobrol?
              Jangan ragu untuk menghubungi saya.
            </p>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" data-stagger>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="card-glassy p-8 text-center stagger-item hover:scale-105 transition-transform"
              >
                <div className="mb-4">
                  {social.iconPath ? (
                    <img
                      src={social.iconPath}
                      alt={social.label}
                      className="w-16 h-16 mx-auto"
                    />
                  ) : (
                    <div className="text-6xl">{social.icon}</div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-arctic-mist mb-2">
                  {social.label}
                </h3>
                <p className="text-sm text-whisper-blue mb-6">{social.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="border-t mt-24"
          style={{
            borderImage:
              "linear-gradient(90deg, rgba(0,0,0,0), rgba(186,215,247,0.12), rgba(0,0,0,0)) 1",
          }}
        >
          <div className="section-container text-center">
            <p className="text-xs text-interstellar-gray">
              Dirancang & dibangun oleh Elga Firmantara · 2025
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
