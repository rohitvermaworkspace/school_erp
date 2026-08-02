// import { useState, useEffect, useRef } from "react";

// const NAV_LINKS = ["Features", "Modules", "Testimonials", "Pricing"];

// const STATS = [
//   { value: "12K+", label: "Schools Enrolled" },
//   { value: "2.4M", label: "Students Managed" },
//   { value: "98%", label: "Satisfaction Rate" },
//   { value: "40hrs", label: "Saved Per Week" },
// ];

// const FEATURES = [
//   {
//     icon: "🎓",
//     title: "Academic Management",
//     desc: "Timetables, syllabi, assignments, and grade books — all in one place.",
//     color: "#1a3c5e",
//     bg: "#e8f0f8",
//   },
//   {
//     icon: "👨‍👩‍👧",
//     title: "Parent Portal",
//     desc: "Real-time updates on attendance, grades, and school announcements.",
//     color: "#2d5a27",
//     bg: "#e8f4e8",
//   },
//   {
//     icon: "💳",
//     title: "Fee Management",
//     desc: "Automated invoices, online payments, and financial reporting.",
//     color: "#5a2d0c",
//     bg: "#f4ece8",
//   },
//   {
//     icon: "📊",
//     title: "Analytics & Reports",
//     desc: "Deep insights into performance trends, attendance patterns, and outcomes.",
//     color: "#3d1a5e",
//     bg: "#f0e8f8",
//   },
//   {
//     icon: "📅",
//     title: "Attendance Tracking",
//     desc: "Biometric or manual entry with instant alerts to parents.",
//     color: "#1a4a4a",
//     bg: "#e8f4f4",
//   },
//   {
//     icon: "🏫",
//     title: "Campus Management",
//     desc: "Facilities, transport routes, hostel records, and asset tracking.",
//     color: "#4a3a00",
//     bg: "#f8f4e0",
//   },
// ];

// const MODULES = [
//   { name: "Admissions", icon: "📋", users: "Administrators" },
//   { name: "Examinations", icon: "📝", users: "Teachers" },
//   { name: "Library", icon: "📚", users: "Librarians" },
//   { name: "Transport", icon: "🚌", users: "Operations" },
//   { name: "Payroll", icon: "💼", users: "HR & Finance" },
//   { name: "Communication", icon: "💬", users: "Everyone" },
//   { name: "Health Records", icon: "🏥", users: "Medical Staff" },
//   { name: "Events & Calendar", icon: "🗓️", users: "All Stakeholders" },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "EduCore transformed how we manage 3,000 students. Attendance reports that took hours now take seconds.",
//     name: "Dr. Priya Sharma",
//     role: "Principal, Delhi Public School",
//     initials: "PS",
//     color: "#1a3c5e",
//     bg: "#dce8f4",
//   },
//   {
//     quote:
//       "Parent communication improved dramatically. Fees are collected on time, and parents love the transparency.",
//     name: "Rajesh Menon",
//     role: "Director, Greenfield Academy",
//     initials: "RM",
//     color: "#2d5a27",
//     bg: "#dceedd",
//   },
//   {
//     quote:
//       "The analytics module helped us identify at-risk students early. Our pass rate went up by 18%.",
//     name: "Anjali Krishnan",
//     role: "Head of Academics, Sunrise School",
//     initials: "AK",
//     color: "#5a2d0c",
//     bg: "#f4e0d4",
//   },
// ];

// const PLANS = [
//   {
//     name: "Starter",
//     price: "₹4,999",
//     period: "/month",
//     desc: "For small schools up to 500 students",
//     features: ["Core academic modules", "Parent portal", "Basic reporting", "Email support"],
//     highlight: false,
//   },
//   {
//     name: "Growth",
//     price: "₹12,999",
//     period: "/month",
//     desc: "For mid-size schools up to 2,000 students",
//     features: [
//       "All Starter features",
//       "Fee management",
//       "Advanced analytics",
//       "Transport module",
//       "Priority support",
//     ],
//     highlight: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "",
//     desc: "For large institutions & chains",
//     features: [
//       "All Growth features",
//       "Unlimited students",
//       "White-labeling",
//       "API access",
//       "Dedicated CSM",
//     ],
//     highlight: false,
//   },
// ];

// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     if (!ref.current) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setInView(true); },
//       { threshold }
//     );
//     obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// }

// function AnimatedSection({ children, className = "" }) {
//   const [ref, inView] = useInView();
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? "translateY(0)" : "translateY(32px)",
//         transition: "opacity 0.7s ease, transform 0.7s ease",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// export default function SchoolManagementLanding() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
//     }, 4500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       style={{
//         fontFamily: "'Playfair Display', 'Georgia', serif",
//         background: "#fafaf7",
//         color: "#1a1a18",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Google Fonts */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
//         rel="stylesheet"
//       />

//       {/* NAV */}
//       <nav
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           background: scrolled ? "rgba(250,250,247,0.96)" : "transparent",
//           backdropFilter: scrolled ? "blur(12px)" : "none",
//           borderBottom: scrolled ? "1px solid #e8e8e0" : "none",
//           transition: "all 0.3s ease",
//           padding: "0 5vw",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: 1200,
//             margin: "0 auto",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             height: 68,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div
//               style={{
//                 width: 36,
//                 height: 36,
//                 background: "#1a3c5e",
//                 borderRadius: 8,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 18,
//               }}
//             >
//               🎓
//             </div>
//             <span
//               style={{
//                 fontSize: 22,
//                 fontWeight: 700,
//                 color: "#1a3c5e",
//                 letterSpacing: "-0.5px",
//               }}
//             >
//               EduCore
//             </span>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: 36,
//               fontFamily: "'DM Sans', sans-serif",
//               fontWeight: 400,
//               fontSize: 15,
//             }}
//             className="hidden-mobile"
//           >
//             {NAV_LINKS.map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase()}`}
//                 style={{
//                   color: "#444",
//                   textDecoration: "none",
//                   transition: "color 0.2s",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.color = "#1a3c5e")}
//                 onMouseLeave={(e) => (e.target.style.color = "#444")}
//               >
//                 {l}
//               </a>
//             ))}
//           </div>

//           <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//             <button
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 14,
//                 fontWeight: 500,
//                 color: "#1a3c5e",
//                 background: "transparent",
//                 border: "none",
//                 cursor: "pointer",
//                 padding: "8px 16px",
//               }}
//             >
//               Log in
//             </button>
//             <button
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 14,
//                 fontWeight: 500,
//                 background: "#1a3c5e",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 padding: "10px 22px",
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) => (e.target.style.background = "#0e2640")}
//               onMouseLeave={(e) => (e.target.style.background = "#1a3c5e")}
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           padding: "120px 5vw 80px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Background geometric shapes */}
//         <div
//           style={{
//             position: "absolute",
//             top: -120,
//             right: -80,
//             width: 600,
//             height: 600,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, #dce8f4 0%, transparent 70%)",
//             opacity: 0.6,
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             left: -100,
//             width: 400,
//             height: 400,
//             borderRadius: "50%",
//             background: "radial-gradient(circle, #e8f4e8 0%, transparent 70%)",
//             opacity: 0.5,
//           }}
//         />

//         <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
//           <div style={{ maxWidth: 720 }}>
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "#e8f0f8",
//                 border: "1px solid #c0d4e8",
//                 borderRadius: 100,
//                 padding: "6px 16px",
//                 marginBottom: 28,
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 13,
//                 fontWeight: 500,
//                 color: "#1a3c5e",
//               }}
//             >
//               <span
//                 style={{
//                   width: 6,
//                   height: 6,
//                   borderRadius: "50%",
//                   background: "#2d8a4e",
//                   display: "inline-block",
//                 }}
//               />
//               Trusted by 12,000+ schools across India
//             </div>

//             <h1
//               style={{
//                 fontSize: "clamp(40px, 6vw, 72px)",
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 letterSpacing: "-1.5px",
//                 color: "#0d1f30",
//                 margin: "0 0 24px",
//               }}
//             >
//               The Complete School
//               <br />
//               <span style={{ color: "#1a3c5e" }}>Management Platform</span>
//             </h1>

//             <p
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 18,
//                 fontWeight: 300,
//                 lineHeight: 1.7,
//                 color: "#555",
//                 marginBottom: 40,
//                 maxWidth: 560,
//               }}
//             >
//               From admissions to alumni — EduCore gives administrators, teachers, and parents one powerful system to run the modern school.
//             </p>

//             <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//               <button
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 16,
//                   fontWeight: 500,
//                   background: "#1a3c5e",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 10,
//                   padding: "16px 32px",
//                   cursor: "pointer",
//                   letterSpacing: "0.2px",
//                   transition: "all 0.2s",
//                   boxShadow: "0 4px 20px rgba(26,60,94,0.3)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.background = "#0e2640";
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 8px 28px rgba(26,60,94,0.35)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = "#1a3c5e";
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 20px rgba(26,60,94,0.3)";
//                 }}
//               >
//                 Start Free Trial →
//               </button>
//               <button
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 16,
//                   fontWeight: 400,
//                   background: "transparent",
//                   color: "#1a3c5e",
//                   border: "1.5px solid #1a3c5e",
//                   borderRadius: 10,
//                   padding: "16px 32px",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.background = "#1a3c5e";
//                   e.target.style.color = "#fff";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = "transparent";
//                   e.target.style.color = "#1a3c5e";
//                 }}
//               >
//                 Watch Demo
//               </button>
//             </div>

//             {/* Social proof logos */}
//             <div style={{ marginTop: 56 }}>
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 12,
//                   fontWeight: 500,
//                   color: "#999",
//                   letterSpacing: "1.5px",
//                   textTransform: "uppercase",
//                   marginBottom: 16,
//                 }}
//               >
//                 Trusted by leading institutions
//               </p>
//               <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
//                 {["DPS Group", "Kendriya Vidyalaya", "Ryan International", "Amity Schools"].map(
//                   (name) => (
//                     <span
//                       key={name}
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 14,
//                         fontWeight: 500,
//                         color: "#aaa",
//                         letterSpacing: "0.3px",
//                       }}
//                     >
//                       {name}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Hero visual card */}
//           <div
//             style={{
//               position: "absolute",
//               right: 0,
//               top: "50%",
//               transform: "translateY(-50%)",
//               width: 360,
//               display: "none", // hidden on small, shown via class
//             }}
//           />
//         </div>
//       </section>

//       {/* STATS */}
//       <AnimatedSection>
//         <section
//           style={{
//             background: "#1a3c5e",
//             padding: "60px 5vw",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: 1200,
//               margin: "0 auto",
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//               gap: 40,
//               textAlign: "center",
//             }}
//           >
//             {STATS.map((s) => (
//               <div key={s.label}>
//                 <div
//                   style={{
//                     fontSize: 48,
//                     fontWeight: 700,
//                     color: "#fff",
//                     letterSpacing: "-1px",
//                     lineHeight: 1,
//                     marginBottom: 8,
//                   }}
//                 >
//                   {s.value}
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: 14,
//                     color: "rgba(255,255,255,0.65)",
//                     fontWeight: 400,
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </AnimatedSection>

//       {/* FEATURES */}
//       <section id="features" style={{ padding: "100px 5vw" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <AnimatedSection>
//             <div style={{ textAlign: "center", marginBottom: 64 }}>
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 13,
//                   fontWeight: 500,
//                   color: "#1a3c5e",
//                   letterSpacing: "2px",
//                   textTransform: "uppercase",
//                   marginBottom: 12,
//                 }}
//               >
//                 Features
//               </p>
//               <h2
//                 style={{
//                   fontSize: "clamp(28px, 4vw, 44px)",
//                   fontWeight: 700,
//                   color: "#0d1f30",
//                   letterSpacing: "-0.8px",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 Everything a school needs,
//                 <br />
//                 nothing it doesn't.
//               </h2>
//             </div>
//           </AnimatedSection>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: 24,
//             }}
//           >
//             {FEATURES.map((f, i) => (
//               <AnimatedSection key={f.title}>
//                 <div
//                   style={{
//                     background: "#fff",
//                     border: "1px solid #e8e8e0",
//                     borderRadius: 16,
//                     padding: "32px 28px",
//                     transition: "all 0.3s ease",
//                     cursor: "default",
//                     transitionDelay: `${i * 0.05}s`,
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#c0d0e0";
//                     e.currentTarget.style.transform = "translateY(-4px)";
//                     e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#e8e8e0";
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 12,
//                       background: f.bg,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 22,
//                       marginBottom: 20,
//                     }}
//                   >
//                     {f.icon}
//                   </div>
//                   <h3
//                     style={{
//                       fontFamily: "'Playfair Display', serif",
//                       fontSize: 20,
//                       fontWeight: 600,
//                       color: "#0d1f30",
//                       marginBottom: 10,
//                       letterSpacing: "-0.3px",
//                     }}
//                   >
//                     {f.title}
//                   </h3>
//                   <p
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 15,
//                       color: "#666",
//                       lineHeight: 1.6,
//                       fontWeight: 300,
//                       margin: 0,
//                     }}
//                   >
//                     {f.desc}
//                   </p>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* MODULES */}
//       <section
//         id="modules"
//         style={{ padding: "80px 5vw", background: "#f2f4f0" }}
//       >
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <AnimatedSection>
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 13,
//                   fontWeight: 500,
//                   color: "#1a3c5e",
//                   letterSpacing: "2px",
//                   textTransform: "uppercase",
//                   marginBottom: 12,
//                 }}
//               >
//                 Modules
//               </p>
//               <h2
//                 style={{
//                   fontSize: "clamp(26px, 3.5vw, 40px)",
//                   fontWeight: 700,
//                   color: "#0d1f30",
//                   letterSpacing: "-0.6px",
//                 }}
//               >
//                 Modular by design.
//                 <br />
//                 Unified in practice.
//               </h2>
//             </div>
//           </AnimatedSection>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: 16,
//             }}
//           >
//             {MODULES.map((m, i) => (
//               <AnimatedSection key={m.name}>
//                 <div
//                   style={{
//                     background: "#fff",
//                     border: "1px solid #e0e4dc",
//                     borderRadius: 12,
//                     padding: "24px 20px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 16,
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#1a3c5e";
//                     e.currentTarget.style.background = "#f0f5fa";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#e0e4dc";
//                     e.currentTarget.style.background = "#fff";
//                   }}
//                 >
//                   <span style={{ fontSize: 24 }}>{m.icon}</span>
//                   <div>
//                     <div
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 15,
//                         fontWeight: 500,
//                         color: "#0d1f30",
//                         marginBottom: 2,
//                       }}
//                     >
//                       {m.name}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 12,
//                         color: "#999",
//                         fontWeight: 400,
//                       }}
//                     >
//                       {m.users}
//                     </div>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section id="testimonials" style={{ padding: "100px 5vw" }}>
//         <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
//           <AnimatedSection>
//             <p
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 13,
//                 fontWeight: 500,
//                 color: "#1a3c5e",
//                 letterSpacing: "2px",
//                 textTransform: "uppercase",
//                 marginBottom: 12,
//               }}
//             >
//               Testimonials
//             </p>
//             <h2
//               style={{
//                 fontSize: "clamp(26px, 3.5vw, 40px)",
//                 fontWeight: 700,
//                 color: "#0d1f30",
//                 letterSpacing: "-0.6px",
//                 marginBottom: 56,
//               }}
//             >
//               Loved by educators everywhere.
//             </h2>
//           </AnimatedSection>

//           <div
//             style={{
//               minHeight: 220,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               transition: "all 0.5s ease",
//             }}
//           >
//             {TESTIMONIALS.map((t, i) => (
//               <div
//                 key={t.name}
//                 style={{
//                   display: i === activeTestimonial ? "block" : "none",
//                   animation: "fadeIn 0.5s ease",
//                 }}
//               >
//                 <blockquote
//                   style={{
//                     fontFamily: "'Playfair Display', serif",
//                     fontSize: "clamp(20px, 2.5vw, 26px)",
//                     fontWeight: 400,
//                     fontStyle: "italic",
//                     color: "#1a1a18",
//                     lineHeight: 1.5,
//                     marginBottom: 36,
//                     maxWidth: 720,
//                     margin: "0 auto 36px",
//                   }}
//                 >
//                   "{t.quote}"
//                 </blockquote>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 14,
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: "50%",
//                       background: t.bg,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 14,
//                       fontWeight: 600,
//                       color: t.color,
//                     }}
//                   >
//                     {t.initials}
//                   </div>
//                   <div style={{ textAlign: "left" }}>
//                     <div
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 15,
//                         fontWeight: 500,
//                         color: "#0d1f30",
//                       }}
//                     >
//                       {t.name}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 13,
//                         color: "#888",
//                         fontWeight: 400,
//                       }}
//                     >
//                       {t.role}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
//             {TESTIMONIALS.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveTestimonial(i)}
//                 style={{
//                   width: i === activeTestimonial ? 24 : 8,
//                   height: 8,
//                   borderRadius: 4,
//                   background: i === activeTestimonial ? "#1a3c5e" : "#d0d8e4",
//                   border: "none",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   padding: 0,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PRICING */}
//       <section id="pricing" style={{ padding: "80px 5vw", background: "#f7f5f0" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <AnimatedSection>
//             <div style={{ textAlign: "center", marginBottom: 60 }}>
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 13,
//                   fontWeight: 500,
//                   color: "#1a3c5e",
//                   letterSpacing: "2px",
//                   textTransform: "uppercase",
//                   marginBottom: 12,
//                 }}
//               >
//                 Pricing
//               </p>
//               <h2
//                 style={{
//                   fontSize: "clamp(26px, 3.5vw, 40px)",
//                   fontWeight: 700,
//                   color: "#0d1f30",
//                   letterSpacing: "-0.6px",
//                 }}
//               >
//                 Transparent, predictable pricing.
//               </h2>
//             </div>
//           </AnimatedSection>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//               gap: 24,
//               alignItems: "start",
//             }}
//           >
//             {PLANS.map((plan) => (
//               <AnimatedSection key={plan.name}>
//                 <div
//                   style={{
//                     background: plan.highlight ? "#1a3c5e" : "#fff",
//                     border: plan.highlight ? "none" : "1px solid #e0e0d8",
//                     borderRadius: 20,
//                     padding: plan.highlight ? "40px 32px" : "32px",
//                     position: "relative",
//                     transition: "transform 0.2s",
//                     transform: plan.highlight ? "scale(1.03)" : "scale(1)",
//                   }}
//                 >
//                   {plan.highlight && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: -12,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         background: "#e8b840",
//                         color: "#5a3800",
//                         fontSize: 11,
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 600,
//                         padding: "4px 14px",
//                         borderRadius: 100,
//                         letterSpacing: "1px",
//                         textTransform: "uppercase",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       Most Popular
//                     </div>
//                   )}

//                   <div
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 14,
//                       fontWeight: 500,
//                       color: plan.highlight ? "rgba(255,255,255,0.65)" : "#888",
//                       marginBottom: 8,
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                     }}
//                   >
//                     {plan.name}
//                   </div>

//                   <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
//                     <span
//                       style={{
//                         fontSize: 40,
//                         fontWeight: 700,
//                         color: plan.highlight ? "#fff" : "#0d1f30",
//                         letterSpacing: "-1px",
//                       }}
//                     >
//                       {plan.price}
//                     </span>
//                     <span
//                       style={{
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontSize: 14,
//                         color: plan.highlight ? "rgba(255,255,255,0.5)" : "#aaa",
//                       }}
//                     >
//                       {plan.period}
//                     </span>
//                   </div>

//                   <p
//                     style={{
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 14,
//                       color: plan.highlight ? "rgba(255,255,255,0.6)" : "#999",
//                       marginBottom: 24,
//                       fontWeight: 300,
//                     }}
//                   >
//                     {plan.desc}
//                   </p>

//                   <div
//                     style={{
//                       borderTop: plan.highlight
//                         ? "1px solid rgba(255,255,255,0.15)"
//                         : "1px solid #eee",
//                       paddingTop: 20,
//                       marginBottom: 28,
//                     }}
//                   >
//                     {plan.features.map((f) => (
//                       <div
//                         key={f}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 10,
//                           marginBottom: 12,
//                           fontFamily: "'DM Sans', sans-serif",
//                           fontSize: 14,
//                           color: plan.highlight ? "rgba(255,255,255,0.85)" : "#444",
//                           fontWeight: 400,
//                         }}
//                       >
//                         <span
//                           style={{
//                             color: plan.highlight ? "#7de8b0" : "#2d8a4e",
//                             fontSize: 16,
//                           }}
//                         >
//                           ✓
//                         </span>
//                         {f}
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     style={{
//                       width: "100%",
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 15,
//                       fontWeight: 500,
//                       background: plan.highlight ? "#fff" : "#1a3c5e",
//                       color: plan.highlight ? "#1a3c5e" : "#fff",
//                       border: "none",
//                       borderRadius: 10,
//                       padding: "14px",
//                       cursor: "pointer",
//                       transition: "all 0.2s",
//                       letterSpacing: "0.2px",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.opacity = "0.88";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.opacity = "1";
//                     }}
//                   >
//                     {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
//                   </button>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <AnimatedSection>
//         <section
//           style={{
//             padding: "100px 5vw",
//             textAlign: "center",
//             background: "#fff",
//           }}
//         >
//           <div style={{ maxWidth: 700, margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "clamp(30px, 4.5vw, 52px)",
//                 fontWeight: 700,
//                 color: "#0d1f30",
//                 letterSpacing: "-1px",
//                 lineHeight: 1.15,
//                 marginBottom: 20,
//               }}
//             >
//               Ready to transform your school?
//             </h2>
//             <p
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 18,
//                 color: "#666",
//                 fontWeight: 300,
//                 marginBottom: 40,
//                 lineHeight: 1.6,
//               }}
//             >
//               Join thousands of schools already saving time and improving outcomes with EduCore.
//             </p>
//             <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//               <button
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 16,
//                   fontWeight: 500,
//                   background: "#1a3c5e",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 10,
//                   padding: "16px 36px",
//                   cursor: "pointer",
//                   boxShadow: "0 4px 20px rgba(26,60,94,0.3)",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 8px 28px rgba(26,60,94,0.35)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 20px rgba(26,60,94,0.3)";
//                 }}
//               >
//                 Start 30-Day Free Trial
//               </button>
//               <button
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 16,
//                   fontWeight: 400,
//                   background: "transparent",
//                   color: "#1a3c5e",
//                   border: "1.5px solid #1a3c5e",
//                   borderRadius: 10,
//                   padding: "16px 32px",
//                   cursor: "pointer",
//                   transition: "all 0.2s",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.background = "#1a3c5e";
//                   e.target.style.color = "#fff";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.background = "transparent";
//                   e.target.style.color = "#1a3c5e";
//                 }}
//               >
//                 Schedule a Demo
//               </button>
//             </div>
//             <p
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 13,
//                 color: "#bbb",
//                 marginTop: 20,
//                 fontWeight: 400,
//               }}
//             >
//               No credit card required · Setup in under 24 hours · Cancel anytime
//             </p>
//           </div>
//         </section>
//       </AnimatedSection>

//       {/* FOOTER */}
//       <footer style={{ background: "#0d1f30", padding: "48px 5vw 32px", color: "#fff" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//               gap: 40,
//               marginBottom: 48,
//             }}
//           >
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//                 <div
//                   style={{
//                     width: 32,
//                     height: 32,
//                     background: "#1a3c5e",
//                     borderRadius: 6,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 16,
//                   }}
//                 >
//                   🎓
//                 </div>
//                 <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>EduCore</span>
//               </div>
//               <p
//                 style={{
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontSize: 14,
//                   color: "rgba(255,255,255,0.45)",
//                   lineHeight: 1.6,
//                   fontWeight: 300,
//                 }}
//               >
//                 Empowering schools with technology that works.
//               </p>
//             </div>

//             {[
//               {
//                 title: "Product",
//                 links: ["Features", "Modules", "Pricing", "Changelog"],
//               },
//               {
//                 title: "Company",
//                 links: ["About Us", "Careers", "Blog", "Press"],
//               },
//               {
//                 title: "Support",
//                 links: ["Documentation", "Help Center", "Contact", "Status"],
//               },
//             ].map((col) => (
//               <div key={col.title}>
//                 <h4
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: 13,
//                     fontWeight: 500,
//                     color: "rgba(255,255,255,0.5)",
//                     letterSpacing: "1px",
//                     textTransform: "uppercase",
//                     marginBottom: 16,
//                   }}
//                 >
//                   {col.title}
//                 </h4>
//                 {col.links.map((l) => (
//                   <a
//                     key={l}
//                     href="#"
//                     style={{
//                       display: "block",
//                       fontFamily: "'DM Sans', sans-serif",
//                       fontSize: 14,
//                       color: "rgba(255,255,255,0.6)",
//                       textDecoration: "none",
//                       marginBottom: 10,
//                       fontWeight: 300,
//                       transition: "color 0.2s",
//                     }}
//                     onMouseEnter={(e) => (e.target.style.color = "#fff")}
//                     onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
//                   >
//                     {l}
//                   </a>
//                 ))}
//               </div>
//             ))}
//           </div>

//           <div
//             style={{
//               borderTop: "1px solid rgba(255,255,255,0.1)",
//               paddingTop: 24,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 12,
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: 13,
//                 color: "rgba(255,255,255,0.35)",
//               }}
//             >
//               © 2026 EduCore Technologies Pvt. Ltd.
//             </span>
//             <div style={{ display: "flex", gap: 24 }}>
//               {["Privacy", "Terms", "Cookies"].map((l) => (
//                 <a
//                   key={l}
//                   href="#"
//                   style={{
//                     fontFamily: "'DM Sans', sans-serif",
//                     fontSize: 13,
//                     color: "rgba(255,255,255,0.35)",
//                     textDecoration: "none",
//                     transition: "color 0.2s",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
//                   onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
//                 >
//                   {l}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { 
  FiBookOpen, 
  FiUsers, 
  FiCalendar, 
  FiShield, 
  FiBarChart2, 
  FiCheckCircle, 
  FiMenu, 
  FiX, 
  FiArrowRight 
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa'; // Using FontAwesome for the brand logo

export default function SchoolERP() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <FiUsers className="h-6 w-6 text-indigo-600" />,
      title: "Student & Staff Management",
      description: "Effortlessly manage digital profiles, attendance, admissions, and performance tracking for everyone."
    },
    {
      icon: <FiBookOpen className="h-6 w-6 text-indigo-600" />,
      title: "Academics & Examination",
      description: "Schedule classes, manage report cards, create custom grading systems, and track curriculum progress."
    },
    {
      icon: <FiCalendar className="h-6 w-6 text-indigo-600" />,
      title: "Fee & Finance Control",
      description: "Automate fee collection, send instant payment reminders, and generate detailed financial reports."
    },
    {
      icon: <FiBarChart2 className="h-6 w-6 text-indigo-600" />,
      title: "Advanced Analytics",
      description: "Gain actionable insights into school performance, student demographics, and operational costs."
    },
    {
      icon: <FiShield className="h-6 w-6 text-indigo-600" />,
      title: "Secure & Cloud-Based",
      description: "Your data is protected with enterprise-grade encryption and accessible 24/7 from any device."
    },
    {
      icon: <FiCheckCircle className="h-6 w-6 text-indigo-600" />,
      title: "Communication Hub",
      description: "Bridge the gap between parents, teachers, and students with SMS notifications, emails, and portals."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 to-violet-600">EduPulse ERP</span>
            </div>
            
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-indigo-600 transition">Features</a>
              <a href="#stats" className="hover:text-indigo-600 transition">Impact</a>
              <a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Sign In</button>
              <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-200">
                Book a Demo
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
            <a href="#features" className="block text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#stats" className="block text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Impact</a>
            <a href="#testimonials" className="block text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <hr className="border-slate-100" />
            <button className="w-full text-center text-slate-600 py-2 text-sm font-medium">Sign In</button>
            <button className="w-full bg-indigo-600 text-white text-center py-2 rounded-lg text-sm font-medium">Book a Demo</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700">
              <span>Next-Gen School Management</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Simplify Administration. <span className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 to-violet-600">Empower Learning.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              The all-in-one ERP system designed to digitize your institution's operations—from admissions and grading to fee collections and parent updates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200 group">
                <span>Get Started Today</span>
                <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 transition">
                Watch 2-Min Tour
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-violet-200 rounded-3xl filter blur-2xl opacity-40 -z-10 transform scale-95"></div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="flex space-x-1.5 mb-3">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-slate-900 aspect-video rounded-lg flex items-center justify-center text-slate-400 text-sm font-mono p-4 text-center">
                [Interactive Dashboard Preview Mockup]
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">Everything your institution needs to thrive</h2>
            <p className="text-lg text-slate-600">Eliminate manual paperwork and streamline collaboration across your entire campus ecosystem.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="p-3 bg-indigo-50 inline-block rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.4),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-200">500+</div>
              <div className="text-xs sm:text-sm font-medium text-indigo-100 uppercase tracking-wider">Schools Trust Us</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-200">250k+</div>
              <div className="text-xs sm:text-sm font-medium text-indigo-100 uppercase tracking-wider">Active Students</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-200">40%</div>
              <div className="text-xs sm:text-sm font-medium text-indigo-100 uppercase tracking-wider">Admin Time Saved</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-200">99.9%</div>
              <div className="text-xs sm:text-sm font-medium text-indigo-100 uppercase tracking-wider">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Loved by Educators & Principals</h2>
            <p className="text-slate-600">See how schools are transforming their administration.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <p className="text-slate-600 italic mb-6 leading-relaxed">
                "Switching to this ERP platform reduced our registration bottleneck by 80%. Parents love the transparent billing portal, and our teachers save hours grading papers."
              </p>
              <div>
                <h4 className="font-bold text-slate-900">Dr. Aris Thorne</h4>
                <p className="text-xs text-slate-500 font-medium">Principal, Oakwood Academy</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <p className="text-slate-600 italic mb-6 leading-relaxed">
                "The attendance automation and real-time dashboard notification alerts changed everything for us. Data management is no longer a headache."
              </p>
              <div>
                <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                <p className="text-xs text-slate-500 font-medium">IT Administrator, Beacon Hill Schools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent)]"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to modernize your institution?</h2>
              <p className="text-indigo-100 text-lg">
                Get in touch with our product experts today for a tailored live environment demonstration.
              </p>
              <div className="pt-4">
                <button className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition shadow-md">
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="h-6 w-6 text-indigo-400" />
            <span className="font-bold text-white">EduPulse ERP</span>
          </div>
          <p>© 2026 EduPulse Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}