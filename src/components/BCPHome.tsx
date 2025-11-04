// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from 'three';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: ""
//   });
//   const [menuOpen, setMenuOpen] = useState(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);

//   // Three.js Scene Setup
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for(let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 50;

//       const colorChoice = Math.random();
//       if (colorChoice < 0.33) {
//         colorsArray[i] = 0.4 + Math.random() * 0.6;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
//       } else if (colorChoice < 0.66) {
//         colorsArray[i] = 0.7 + Math.random() * 0.3;
//         if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
//       } else {
//         colorsArray[i] = 0.8 + Math.random() * 0.2;
//         if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//       }
//     }

//     for(let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
//     particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x667eea, 0.3);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.3, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.z = 15;

//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = () => {
//       scrollY = window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       particlesMesh.rotation.y += 0.0005;
//       particlesMesh.rotation.x += 0.0003;

//       const parallaxY = scrollY * 0.001;
//       particlesMesh.position.y = parallaxY * 0.3;

//       camera.position.x += (mouseX - camera.position.x) * 0.05;
//       camera.position.y += (-mouseY - camera.position.y) * 0.05;
//       camera.lookAt(scene.position);

//       pointLight.position.x = Math.sin(time) * 5;
//       pointLight.position.y = Math.cos(time) * 5;

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
//         canvasRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 150; i++) {
//       const star = document.createElement('div');
//       star.className = 'star';
//       star.style.width = Math.random() * 3 + 'px';
//       star.style.height = star.style.width;
//       star.style.left = Math.random() * 100 + '%';
//       star.style.top = Math.random() * 100 + '%';
//       star.style.animationDelay = Math.random() * 3 + 's';
//       star.style.animationDuration = (Math.random() * 3 + 2) + 's';
//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const el = document.querySelector(selector);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setMenuOpen(false);
//     }
//   };

//   const submitDemo = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
//     const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
//     if (!emailOk) {
//       alert("Please enter a valid work email address.");
//       return;
//     }
//     if (!phoneOk) {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     if (!form.source) {
//       alert("Please tell us how you heard about us.");
//       return;
//     }
//     alert(`Thank you for your interest! We will contact you soon to schedule your demo.`);
//     setForm({ firstName: "", lastName: "", phone: "", email: "", company: "", location: "", source: "" });
//   };

//   return (
//     <div className="app">
//       <div id="canvas-container" ref={canvasRef} />
//       <div className="stars-container" ref={starsContainerRef} />
//       <div className="gradient-bg" />

//       {/* Navigation */}
//       <nav>
//         <div className="logo">Artemis</div>
//         <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//           <li><a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a></li>
//           <li><a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a></li>
//           <li><a href="#about" onClick={handleScrollTo("#about")}>About</a></li>
//           <li><a href="#demo" className="nav-cta" onClick={handleScrollTo("#demo")}>Book Demo</a></li>
//           <li><a href="#contact" onClick={handleScrollTo("#contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">Artemis stays colorful yet calm: no unnecessary complexity, easy to learn, and fast to use. With only basic knowledge and minimal navigation training, you become an expert.</p>
//           <div className="cta-buttons">
//             <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//               Book a Demo
//             </a>
//             <a href="#superpowers" className="cta-button secondary" onClick={handleScrollTo("#superpowers")}>
//               View Superpowers
//             </a>
//           </div>
//         </div>

//         <div className="scroll-indicator" />
//       </section>

//       {/* Superpowers Section */}
//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">A revolution in staffing technology—innovation that empowers your every hire.</p>
//         <div className="superpowers-grid">
//           <div className="superpower-card">
//             <div className="superpower-icon">⚡</div>
//             <h3>Instant Talent Discovery</h3>
//             <ul>
//               <li>Lightning-fast candidate search with precise results</li>
//               <li>Deep VMS integrations for seamless workflow</li>
//               <li>Interactive Skills Checklist</li>
//             </ul>
//           </div>
//           <div className="superpower-card">
//             <div className="superpower-icon">🚀</div>
//             <h3>Next-Gen Workflow Power</h3>
//             <ul>
//               <li>Send Right-to-Represent (RTR) instantly to candidates</li>
//               <li>Design and manage dynamic candidate pipelines</li>
//               <li>Smart resume upload & parsing with bulk automation</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Voices Section */}
//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">Real stories from teams that thrive with Artemis.</p>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">MS</div>
//               <div className="author-info">
//                 <h4>Maria Sanchez</h4>
//                 <p>Ops Manager at a staffing company</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Artemis gives us speed without chaos. Our time-to-submit dropped immediately."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">JT</div>
//               <div className="author-info">
//                 <h4>James Turner</h4>
//                 <p>Director at a healthcare agency</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"The interface feels obvious. My team adopted it in a day—no long training calls."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">AK</div>
//               <div className="author-info">
//                 <h4>Anita Kapoor</h4>
//                 <p>CEO of a leading staffing firm</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Bulk parsing + RTR flows in one place—this is exactly what we needed."</p>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">Built for clarity and speed—be productive after a short walkthrough.</p>
//         <div className="about-content">
//           <div className="about-block">
//             <h3>Our Mission</h3>
//             <p>To make high-quality recruiting workflows accessible without enterprise bloat or surprise fees.</p>
//           </div>
//           <div className="about-block">
//             <h3>Principles</h3>
//             <ul>
//               <li>Clarity over complexity</li>
//               <li>Security by design</li>
//               <li>Feedback loops with customers</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Demo Section */}
//       <section className="demo-section" id="demo">
//         <div className="demo-container">
//           <h2 className="section-title">Book a Demo</h2>
//           <p className="section-subtitle">See Artemis in action.</p>

//           <div className="demo-card">
//             <form onSubmit={submitDemo} className="demo-form">
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>First Name</label>
//                   <input
//                     required
//                     type="text"
//                     value={form.firstName}
//                     onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Last Name</label>
//                   <input
//                     required
//                     type="text"
//                     value={form.lastName}
//                     onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input
//                     required
//                     type="tel"
//                     value={form.phone}
//                     onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Work Email</label>
//                   <input
//                     required
//                     type="email"
//                     autoComplete="email"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Company</label>
//                   <input
//                     required
//                     type="text"
//                     value={form.company}
//                     onChange={(e) => setForm({ ...form, company: e.target.value })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Location (State)</label>
//                   <input
//                     required
//                     type="text"
//                     value={form.location}
//                     onChange={(e) => setForm({ ...form, location: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>How did you hear about us?</label>
//                 <select
//                   required
//                   value={form.source}
//                   onChange={(e) => setForm({ ...form, source: e.target.value })}
//                 >
//                   <option value="">Select one</option>
//                   <option value="google">Google Search</option>
//                   <option value="linkedin">LinkedIn</option>
//                   <option value="referral">Referral / Word of Mouth</option>
//                   <option value="conference">Conference / Event</option>
//                   <option value="email">Email Outreach</option>
//                   <option value="customer">Existing Customer</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <button type="submit" className="submit-button">
//                 Request Demo
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">💼</a>
//               <a href="#" title="Facebook">📘</a>
//               <a href="#" title="Twitter">🐦</a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>Book Demo</a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>9330 Lyndon B Johnson Fwy #900<br/>Dallas, TX, 75243</p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style >{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//           position: relative;
//         }

//         #canvas-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           pointer-events: none;
//         }

//         .stars-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .star {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           animation: twinkle 3s infinite ease-in-out;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }

//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//         }

//         .gradient-bg::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
//           animation: shimmer 8s ease-in-out infinite;
//         }

//         @keyframes shimmer {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }

//         nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           padding: 20px 50px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           z-index: 1000;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: logoFloat 3s ease-in-out infinite;
//         }

//         @keyframes logoFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         .menu-toggle {
//           display: none;
//           flex-direction: column;
//           cursor: pointer;
//           gap: 5px;
//         }

//         .menu-toggle span {
//           width: 25px;
//           height: 3px;
//           background: #fff;
//           transition: all 0.3s;
//         }

//         .nav-links {
//           display: flex;
//           gap: 30px;
//           list-style: none;
//           align-items: center;
//         }

//         .nav-links a {
//           color: #fff;
//           text-decoration: none;
//           font-size: 16px;
//           transition: all 0.3s;
//           position: relative;
//           cursor: pointer;
//         }

//         .nav-links a::after {
//           content: '';
//           position: absolute;
//           bottom: -5px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           transition: width 0.3s;
//         }

//         .nav-links a:hover::after {
//           width: 100%;
//         }

//         .nav-links a:hover {
//           color: #667eea;
//         }

//         .nav-cta {
//           padding: 10px 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 25px;
//           transition: all 0.3s;
//         }

//         .nav-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
//         }

//         .nav-cta::after {
//           display: none;
//         }

//         .hero {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 120px 20px 60px;
//           z-index: 10;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 10;
//           max-width: 900px;
//         }

//         .hero h1 {
//           font-size: clamp(36px, 8vw, 72px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInUp 1s ease-out;
//         }

//         .hero .subtitle {
//           font-size: clamp(18px, 3vw, 28px);
//           margin-bottom: 15px;
//           color: #b8c5d6;
//           animation: fadeInUp 1s ease-out 0.2s both;
//         }

//         .hero .tagline {
//           font-size: clamp(16px, 2.5vw, 20px);
//           margin-bottom: 40px;
//           color: #8a95a8;
//           animation: fadeInUp 1s ease-out 0.4s both;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 20px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 1s ease-out 0.6s both;
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//           cursor: pointer;
//         }

//         .cta-button.secondary {
//           background: transparent;
//           border: 2px solid #667eea;
//           box-shadow: none;
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//           transition: left 0.5s;
//           z-index: -1;
//         }

//         .cta-button:hover::before {
//           left: 0;
//         }

//         .cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         .superpowers, .voices, .about, .demo-section {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .section-title {
//           text-align: center;
//           font-size: clamp(36px, 6vw, 48px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .section-subtitle {
//           text-align: center;
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #b8c5d6;
//           margin-bottom: 60px;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .superpowers-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .superpower-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s;
//           position: relative;
//           overflow: hidden;
//         }

//         .superpower-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           transform: rotate(45deg);
//           transition: all 0.6s;
//         }

//         .superpower-card:hover::before {
//           top: -10%;
//           left: -10%;
//         }

//         .superpower-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .superpower-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card h3 {
//           font-size: 24px;
//           margin-bottom: 15px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card ul {
//           list-style: none;
//           position: relative;
//           z-index: 1;
//           padding-left: 0;
//         }

//         .superpower-card li {
//           color: #b8c5d6;
//           line-height: 1.8;
//           padding-left: 20px;
//           position: relative;
//           margin-bottom: 10px;
//         }

//         .superpower-card li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         .testimonials-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .testimonial-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.3s;
//         }

//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//         }

//         .testimonial-author {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .author-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           font-weight: bold;
//           flex-shrink: 0;
//         }

//         .author-info h4 {
//           margin-bottom: 5px;
//           font-size: 18px;
//         }

//         .author-info p {
//           color: #8a95a8;
//           font-size: 14px;
//         }

//         .testimonial-text {
//           color: #b8c5d6;
//           line-height: 1.8;
//           font-style: italic;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 60px;
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p {
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block li {
//           padding-left: 25px;
//           position: relative;
//           margin-bottom: 15px;
//         }

//         .about-block li::before {
//           content: '→';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         .demo-container {
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         .demo-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 50px;
//         }

//         .demo-form {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .form-group label {
//           color: #b8c5d6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .form-group input,
//         .form-group select {
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           color: white;
//           font-size: 16px;
//           transition: all 0.3s;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
//         }

//         .form-group input::placeholder {
//           color: rgba(255, 255, 255, 0.5);
//         }

//         .form-group select {
//           cursor: pointer;
//         }

//         .submit-button {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//         }

//         .submit-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         footer {
//           position: relative;
//           padding: 50px;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 40px;
//           margin-bottom: 30px;
//         }

//         .footer-section h4 {
//           margin-bottom: 20px;
//           color: #667eea;
//           font-size: 20px;
//         }

//         .footer-section p {
//           color: #b8c5d6;
//           line-height: 1.8;
//           margin-bottom: 10px;
//         }

//         .footer-section a {
//           color: #b8c5d6;
//           line-height: 1.8;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//           transition: color 0.3s;
//         }

//         .footer-section a:hover {
//           color: #667eea;
//         }

//         .social-links {
//           display: flex;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//           font-size: 20px;
//         }

//         .social-links a:hover {
//           transform: translateY(-5px) rotate(360deg);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
//         }

//         .footer-bottom {
//           text-align: center;
//           padding-top: 30px;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           color: #8a95a8;
//         }

//         .scroll-indicator {
//           position: absolute;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateX(-50%) translateY(0); }
//           50% { transform: translateX(-50%) translateY(10px); }
//         }

//         .scroll-indicator::after {
//           content: '↓';
//           font-size: 32px;
//           color: #667eea;
//         }

//         @media (max-width: 968px) {
//           nav {
//             padding: 15px 30px;
//           }

//           .nav-links {
//             position: fixed;
//             top: 70px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 70px);
//             background: rgba(10, 14, 39, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 50px;
//             transition: right 0.3s;
//           }

//           .nav-links.active {
//             right: 0;
//           }

//           .menu-toggle {
//             display: flex;
//           }

//           .superpowers, .voices, .about, .demo-section {
//             padding: 60px 30px;
//           }

//           .demo-card {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 600px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .cta-buttons {
//             flex-direction: column;
//           }

//           .cta-button {
//             width: 100%;
//           }

//           .about-content {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from 'three';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: ""
//   });
//   const [menuOpen, setMenuOpen] = useState(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);

//   // Three.js Scene Setup
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     // Enhanced particles system
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for(let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 50;

//       // Color variation (purple/blue/pink gradient)
//       const colorChoice = Math.random();
//       if (colorChoice < 0.33) {
//         colorsArray[i] = 0.4 + Math.random() * 0.6; // Blue
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
//       } else if (colorChoice < 0.66) {
//         colorsArray[i] = 0.7 + Math.random() * 0.3; // Purple
//         if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
//       } else {
//         colorsArray[i] = 0.8 + Math.random() * 0.2; // Pink
//         if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//       }
//     }

//     for(let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
//     particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     // Enhanced lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x667eea, 0.3);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.3, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.z = 15;

//     // Animation variables
//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = () => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         // Particle animation - subtle movement
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         // Enhanced parallax effect based on scroll
//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2; // Increased multiplier for stronger effect

//         // Additional parallax effects
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       if (cameraRef.current) {
//         // Camera movement based on mouse with parallax
//         cameraRef.current.position.x += (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y += (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         // Additional camera movement based on scroll for depth
//         cameraRef.current.position.z = 15 + (scrollY * 0.001);
//       }

//       // Dynamic lighting effects
//       pointLight.position.x = Math.sin(time) * 5;
//       pointLight.position.y = Math.cos(time) * 5;

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = () => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   // Stars background
//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 150; i++) {
//       const star = document.createElement('div');
//       star.className = 'star';
//       star.style.width = Math.random() * 3 + 'px';
//       star.style.height = star.style.width;
//       star.style.left = Math.random() * 100 + '%';
//       star.style.top = Math.random() * 100 + '%';
//       star.style.animationDelay = Math.random() * 3 + 's';
//       star.style.animationDuration = (Math.random() * 3 + 2) + 's';
//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const el = document.querySelector(selector);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setMenuOpen(false);
//     }
//   };

//   const submitDemo = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
//     const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
//     if (!emailOk) {
//       alert("Please enter a valid work email address.");
//       return;
//     }
//     if (!phoneOk) {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     if (!form.source) {
//       alert("Please tell us how you heard about us.");
//       return;
//     }
//     alert(`Thank you for your interest! We will contact you soon to schedule your demo.`);
//     setForm({ firstName: "", lastName: "", phone: "", email: "", company: "", location: "", source: "" });
//   };

//   return (
//     <div className="app">
//       {/* Background Elements */}
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Navigation */}
//       <nav>
//         <div className="logo">Artemis</div>
//         <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//           <li><a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a></li>
//           <li><a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a></li>
//           <li><a href="#about" onClick={handleScrollTo("#about")}>About</a></li>
//           <li><a href="#demo" className="nav-cta" onClick={handleScrollTo("#demo")}>Book Demo</a></li>
//           <li><a href="#contact" onClick={handleScrollTo("#contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">Artemis stays colorful yet calm: no unnecessary complexity, easy to learn, and fast to use. With only basic knowledge and minimal navigation training, you become an expert.</p>
//           <div className="cta-buttons">
//             <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//               Book a Demo
//             </a>
//             <a href="#superpowers" className="cta-button secondary" onClick={handleScrollTo("#superpowers")}>
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       {/* Superpowers Section */}
//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">A revolution in staffing technology—innovation that empowers your every hire.</p>
//         <div className="superpowers-grid">
//           <div className="superpower-card">
//             <div className="superpower-icon">⚡</div>
//             <h3>Instant Talent Discovery</h3>
//             <ul>
//               <li>Lightning-fast candidate search with precise results</li>
//               <li>Deep VMS integrations for seamless workflow</li>
//               <li>Interactive Skills Checklist</li>
//             </ul>
//           </div>
//           <div className="superpower-card">
//             <div className="superpower-icon">🚀</div>
//             <h3>Next-Gen Workflow Power</h3>
//             <ul>
//               <li>Send Right-to-Represent (RTR) instantly to candidates</li>
//               <li>Design and manage dynamic candidate pipelines</li>
//               <li>Smart resume upload & parsing with bulk automation</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Voices Section */}
//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">Real stories from teams that thrive with Artemis.</p>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">MS</div>
//               <div className="author-info">
//                 <h4>Maria Sanchez</h4>
//                 <p>Ops Manager at a staffing company</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Artemis gives us speed without chaos. Our time-to-submit dropped immediately."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">JT</div>
//               <div className="author-info">
//                 <h4>James Turner</h4>
//                 <p>Director at a healthcare agency</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"The interface feels obvious. My team adopted it in a day—no long training calls."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">AK</div>
//               <div className="author-info">
//                 <h4>Anita Kapoor</h4>
//                 <p>CEO of a leading staffing firm</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Bulk parsing + RTR flows in one place—this is exactly what we needed."</p>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">Built for clarity and speed—be productive after a short walkthrough.</p>
//         <div className="about-content">
//           <div className="about-block">
//             <h3>Our Mission</h3>
//             <p>To make high-quality recruiting workflows accessible without enterprise bloat or surprise fees.</p>
//           </div>
//           <div className="about-block">
//             <h3>Principles</h3>
//             <ul>
//               <li>Clarity over complexity</li>
//               <li>Security by design</li>
//               <li>Feedback loops with customers</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="contact-form-section" id="demo">
//         <h2 className="section-title">Book a Demo</h2>
//         <p className="section-subtitle">See Artemis in action.</p>
//         <div className="form-container">
//           <form onSubmit={submitDemo}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   required
//                   value={form.firstName}
//                   onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   required
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Work Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="company">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   required
//                   value={form.company}
//                   onChange={(e) => setForm({ ...form, company: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="source">How did you hear about us?</label>
//               <select
//                 id="source"
//                 required
//                 value={form.source}
//                 onChange={(e) => setForm({ ...form, source: e.target.value })}
//               >
//                 <option value="">Select one</option>
//                 <option value="google">Google Search</option>
//                 <option value="linkedin">LinkedIn</option>
//                 <option value="referral">Referral / Word of Mouth</option>
//                 <option value="conference">Conference / Event</option>
//                 <option value="email">Email Outreach</option>
//                 <option value="customer">Existing Customer</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <button type="submit" className="submit-btn">Request Demo</button>
//           </form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">💼</a>
//               <a href="#" title="Facebook">📘</a>
//               <a href="#" title="Twitter">🐦</a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>Book Demo</a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>9330 Lyndon B Johnson Fwy #900<br />Dallas, TX, 75243</p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style >{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//         }

//         /* Enhanced 3D Canvas Container */
//         #canvas-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           pointer-events: none;
//         }

//         /* Animated Stars Background */
//         .stars-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .star {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           animation: twinkle 3s infinite ease-in-out;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }

//         /* Shiny Black Background */
//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//         }

//         .gradient-bg::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
//           animation: shimmer 8s ease-in-out infinite;
//         }

//         @keyframes shimmer {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }

//         /* Navigation */
//         nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           padding: 20px 50px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           z-index: 1000;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: logoFloat 3s ease-in-out infinite;
//         }

//         @keyframes logoFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         .nav-links {
//           display: flex;
//           gap: 30px;
//           list-style: none;
//           align-items: center;
//         }

//         .nav-links a {
//           color: #fff;
//           text-decoration: none;
//           font-size: 16px;
//           transition: all 0.3s;
//           position: relative;
//           cursor: pointer;
//         }

//         .nav-links a::after {
//           content: '';
//           position: absolute;
//           bottom: -5px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           transition: width 0.3s;
//         }

//         .nav-links a:hover::after {
//           width: 100%;
//         }

//         .nav-links a:hover {
//           color: #667eea;
//         }

//         .nav-cta {
//           padding: 10px 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 25px;
//           transition: all 0.3s;
//         }

//         .nav-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
//         }

//         .nav-cta::after {
//           display: none;
//         }

//         /* Mobile Menu Toggle */
//         .menu-toggle {
//           display: none;
//           flex-direction: column;
//           cursor: pointer;
//           gap: 5px;
//         }

//         .menu-toggle span {
//           width: 25px;
//           height: 3px;
//           background: #fff;
//           transition: all 0.3s;
//         }

//         /* Hero Section */
//         .hero {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 120px 20px 60px;
//           z-index: 10;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 10;
//           max-width: 900px;
//         }

//         .hero h1 {
//           font-size: clamp(36px, 8vw, 72px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInUp 1s ease-out;
//         }

//         .hero .subtitle {
//           font-size: clamp(18px, 3vw, 28px);
//           margin-bottom: 15px;
//           color: #b8c5d6;
//           animation: fadeInUp 1s ease-out 0.2s both;
//         }

//         .hero .tagline {
//           font-size: clamp(16px, 2.5vw, 20px);
//           margin-bottom: 40px;
//           color: #8a95a8;
//           animation: fadeInUp 1s ease-out 0.4s both;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 20px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 1s ease-out 0.6s both;
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//           cursor: pointer;
//           border: none;
//         }

//         .cta-button.secondary {
//           background: transparent;
//           border: 2px solid #667eea;
//           box-shadow: none;
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//           transition: left 0.5s;
//           z-index: -1;
//         }

//         .cta-button:hover::before {
//           left: 0;
//         }

//         .cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Superpowers Section */
//         .superpowers {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .section-title {
//           text-align: center;
//           font-size: clamp(36px, 6vw, 48px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .section-subtitle {
//           text-align: center;
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #b8c5d6;
//           margin-bottom: 60px;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .superpowers-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .superpower-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s;
//           position: relative;
//           overflow: hidden;
//         }

//         .superpower-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           transform: rotate(45deg);
//           transition: all 0.6s;
//         }

//         .superpower-card:hover::before {
//           top: -10%;
//           left: -10%;
//         }

//         .superpower-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .superpower-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card h3 {
//           font-size: 24px;
//           margin-bottom: 15px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card ul {
//           list-style: none;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card li {
//           color: #b8c5d6;
//           line-height: 1.8;
//           padding-left: 20px;
//           position: relative;
//           margin-bottom: 10px;
//         }

//         .superpower-card li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Voices Section */
//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .testimonial-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.3s;
//         }

//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//         }

//         .testimonial-author {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .author-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           font-weight: bold;
//         }

//         .author-info h4 {
//           margin-bottom: 5px;
//         }

//         .author-info p {
//           color: #8a95a8;
//           font-size: 14px;
//         }

//         .testimonial-text {
//           color: #b8c5d6;
//           line-height: 1.8;
//           font-style: italic;
//         }

//         /* About Section */
//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 60px;
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p, .about-block ul {
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           padding-left: 25px;
//           position: relative;
//           margin-bottom: 15px;
//         }

//         .about-block li::before {
//           content: '→';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Contact Form Section */
//         .contact-form-section {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .form-container {
//           max-width: 800px;
//           margin: 0 auto;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 50px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           color: #b8c5d6;
//           font-size: 14px;
//         }

//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           color: #fff;
//           font-size: 16px;
//           transition: all 0.3s;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
//         }

//         .form-group select {
//           cursor: pointer;
//         }

//         .form-group option {
//           background: #0a0e27;
//           color: #fff;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border: none;
//           border-radius: 50px;
//           color: white;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//         }

//         .submit-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Footer */
//         footer {
//           position: relative;
//           padding: 50px;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 40px;
//         }

//         .footer-section h4 {
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .footer-section p,
//         .footer-section a {
//           color: #b8c5d6;
//           line-height: 1.8;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//         }

//         .footer-section a:hover {
//           color: #667eea;
//         }

//         .social-links {
//           display: flex;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//         }

//         .social-links a:hover {
//           transform: translateY(-5px) rotate(360deg);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 40px;
//           padding-top: 30px;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           color: #8a95a8;
//         }

//         /* Scroll Indicator */
//         .scroll-indicator {
//           position: absolute;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateX(-50%) translateY(0); }
//           50% { transform: translateX(-50%) translateY(10px); }
//         }

//         .scroll-indicator::after {
//           content: '↓';
//           font-size: 32px;
//           color: #667eea;
//         }

//         /* Responsive */
//         @media (max-width: 968px) {
//           nav {
//             padding: 15px 30px;
//           }

//           .nav-links {
//             position: fixed;
//             top: 70px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 70px);
//             background: rgba(10, 14, 39, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 50px;
//             transition: right 0.3s;
//           }

//           .nav-links.active {
//             right: 0;
//           }

//           .menu-toggle {
//             display: flex;
//           }

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 600px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .cta-buttons {
//             flex-direction: column;
//           }

//           .cta-button {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from 'three';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: ""
//   });
//   const [menuOpen, setMenuOpen] = useState(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);
//   const mysteryPlanetRef = useRef<THREE.Group | null>(null);
//   const cometsRef = useRef<THREE.Points[]>([]);

//   // Three.js Scene Setup
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     // Enhanced particles system
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for(let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 50;

//       // Color variation (purple/blue/pink gradient)
//       const colorChoice = Math.random();
//       if (colorChoice < 0.33) {
//         colorsArray[i] = 0.4 + Math.random() * 0.6; // Blue
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
//       } else if (colorChoice < 0.66) {
//         colorsArray[i] = 0.7 + Math.random() * 0.3; // Purple
//         if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
//       } else {
//         colorsArray[i] = 0.8 + Math.random() * 0.2; // Pink
//         if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//       }
//     }

//     for(let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
//     particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     // Create Mysterious Planet
//     const planetGroup = new THREE.Group();
//     mysteryPlanetRef.current = planetGroup;

//     // Main planet body with irregular shape
//     const planetGeometry = new THREE.IcosahedronGeometry(2.5, 2);
//     // Distort the geometry to make it more mysterious
//     const positions = planetGeometry.attributes.position.array as Float32Array;
//     for (let i = 0; i < positions.length; i += 3) {
//       const x = positions[i];
//       const y = positions[i + 1];
//       const z = positions[i + 2];
//       const distance = Math.sqrt(x * x + y * y + z * z);
//       const distortion = 1 + 0.3 * Math.sin(distance * 5) * Math.random();
//       positions[i] *= distortion;
//       positions[i + 1] *= distortion;
//       positions[i + 2] *= distortion;
//     }
//     planetGeometry.attributes.position.needsUpdate = true;

//     const planetMaterial = new THREE.MeshPhongMaterial({
//       color: 0x4a1c6f,
//       shininess: 100,
//       specular: 0x9370db,
//       emissive: 0x2d1b44,
//       transparent: true,
//       opacity: 0.9,
//     });

//     const planet = new THREE.Mesh(planetGeometry, planetMaterial);
//     planetGroup.add(planet);

//     // Add glowing atmosphere
//     const atmosphereGeometry = new THREE.SphereGeometry(2.8, 32, 32);
//     const atmosphereMaterial = new THREE.MeshPhongMaterial({
//       color: 0x9370db,
//       transparent: true,
//       opacity: 0.2,
//       side: THREE.DoubleSide,
//     });
//     const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//     planetGroup.add(atmosphere);

//     // Add mysterious rings
//     const ringGeometry = new THREE.RingGeometry(3.5, 5, 64);
//     const ringMaterial = new THREE.MeshPhongMaterial({
//       color: 0xffd700,
//       transparent: true,
//       opacity: 0.3,
//       side: THREE.DoubleSide,
//     });
//     const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//     ring.rotation.x = Math.PI / 3;
//     planetGroup.add(ring);

//     // Add floating crystals/orbs around the planet
//     for (let i = 0; i < 8; i++) {
//       const crystalGeometry = new THREE.OctahedronGeometry(0.3, 0);
//       const crystalMaterial = new THREE.MeshPhongMaterial({
//         color: 0xffd700,
//         shininess: 100,
//         emissive: 0x333300,
//         transparent: true,
//         opacity: 0.8,
//       });
//       const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);

//       const angle = (i / 8) * Math.PI * 2;
//       const radius = 4;
//       crystal.position.set(
//         Math.cos(angle) * radius,
//         Math.sin(angle) * 0.5,
//         Math.sin(angle) * radius
//       );
//       planetGroup.add(crystal);
//     }

//     // Position the mysterious planet
//     planetGroup.position.set(15, 5, -10);
//     scene.add(planetGroup);

//     // Create golden comets
//     const createGoldenComet = () => {
//       const cometGeometry = new THREE.BufferGeometry();
//       const cometCount = 50;
//       const cometPositions = new Float32Array(cometCount * 3);
//       const cometColors = new Float32Array(cometCount * 3);

//       for (let i = 0; i < cometCount * 3; i += 3) {
//         const progress = i / (cometCount * 3);
//         cometPositions[i] = progress * 10 - 5;
//         cometPositions[i + 1] = Math.sin(progress * Math.PI) * 2;
//         cometPositions[i + 2] = 0;

//         // Golden gradient (white to gold)
//         cometColors[i] = 1; // Red remains high
//         cometColors[i + 1] = 0.843 - progress * 0.3; // Green reduces to gold
//         cometColors[i + 2] = 0; // Blue remains low
//       }

//       cometGeometry.setAttribute('position', new THREE.BufferAttribute(cometPositions, 3));
//       cometGeometry.setAttribute('color', new THREE.BufferAttribute(cometColors, 3));

//       const cometMaterial = new THREE.PointsMaterial({
//         size: 0.15,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.9,
//         sizeAttenuation: true,
//         blending: THREE.AdditiveBlending
//       });

//       return new THREE.Points(cometGeometry, cometMaterial);
//     };

//     // Add multiple golden comets
//     for (let i = 0; i < 4; i++) {
//       const comet = createGoldenComet();
//       comet.position.set(
//         (Math.random() - 0.5) * 40,
//         (Math.random() - 0.5) * 30,
//         (Math.random() - 0.5) * 25
//       );
//       comet.rotation.x = Math.random() * Math.PI;
//       comet.rotation.y = Math.random() * Math.PI;
//       scene.add(comet);
//       cometsRef.current.push(comet);
//     }

//     // Enhanced lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x667eea, 0.3);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.3, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     // Special lighting for the mysterious planet
//     const planetLight = new THREE.PointLight(0x9370db, 0.7, 40);
//     planetGroup.add(planetLight);

//     // Golden light for crystals
//     const goldenLight = new THREE.PointLight(0xffd700, 0.5, 20);
//     planetGroup.add(goldenLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.z = 15;

//     // Animation variables
//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = () => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       // Mysterious Planet animation with scroll effects
//       if (mysteryPlanetRef.current) {
//         const planetGroup = mysteryPlanetRef.current;

//         // Base rotation - planet rotates slowly
//         planetGroup.rotation.y += 0.003;
//         planetGroup.rotation.x += 0.001;

//         // Floating crystals animation
//         planetGroup.children.forEach((child, index) => {
//           if (index > 2) { // Crystals start from index 3
//             child.rotation.x += 0.02;
//             child.rotation.y += 0.03;
//             // Floating motion
//             child.position.y += Math.sin(time * 2 + index) * 0.01;
//           }
//         });

//         // Ring rotation
//         if (planetGroup.children[2]) {
//           planetGroup.children[2].rotation.y += 0.01;
//         }

//         // Scroll-based transformations
//         const scrollProgress = Math.min(scrollY / 2000, 1);

//         // Zoom effect - planet gets larger as you scroll
//         const scale = 1 + scrollProgress * 2;
//         planetGroup.scale.set(scale, scale, scale);

//         // Position change - moves across screen as you scroll
//         planetGroup.position.x = 15 - scrollProgress * 25;
//         planetGroup.position.y = 5 - scrollProgress * 8;
//         planetGroup.position.z = -10 + scrollProgress * 5;

//         // Enhanced glow effect based on scroll
//         const planetMaterial = (planetGroup.children[0] as THREE.Mesh).material as THREE.MeshPhongMaterial;
//         planetMaterial.emissive.setRGB(
//           0.2 + scrollProgress * 0.4,
//           0.1 + scrollProgress * 0.2,
//           0.3 + scrollProgress * 0.3
//         );

//         // Atmosphere pulse
//         const atmosphereMaterial = (planetGroup.children[1] as THREE.Mesh).material as THREE.MeshPhongMaterial;
//         atmosphereMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.1;
//       }

//       // Golden comets animation
//       cometsRef.current.forEach((comet, index) => {
//         comet.rotation.y += 0.015;
//         comet.rotation.x += 0.01;

//         // Move comets in elegant patterns
//         const cometSpeed = 0.03 + index * 0.008;
//         comet.position.x += Math.sin(time * 1.5 + index) * cometSpeed;
//         comet.position.y += Math.cos(time * 1.2 + index * 2) * cometSpeed * 0.7;
//         comet.position.z += Math.sin(time * 0.8 + index) * cometSpeed * 0.5;

//         // Golden pulsing effect
//         const scale = 1 + Math.sin(time * 3 + index) * 0.4;
//         comet.scale.set(scale, scale, scale);

//         // Trail effect
//         comet.rotation.z += 0.005;
//       });

//       if (cameraRef.current) {
//         cameraRef.current.position.x += (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y += (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         // Enhanced camera movement based on scroll
//         const baseZ = 15;
//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.position.z = baseZ + scrollEffect * 5;

//         // Slight camera tilt based on scroll
//         cameraRef.current.rotation.z = scrollEffect * 0.1;
//       }

//       // Dynamic lighting effects
//       pointLight.position.x = Math.sin(time) * 5;
//       pointLight.position.y = Math.cos(time) * 5;

//       // Golden light movement
//       if (mysteryPlanetRef.current && mysteryPlanetRef.current.children[4]) {
//         const goldenLight = mysteryPlanetRef.current.children[4] as THREE.PointLight;
//         goldenLight.position.x = Math.sin(time * 1.5) * 3;
//         goldenLight.position.z = Math.cos(time * 1.5) * 3;
//       }

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = () => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   // Golden stars background
//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 200; i++) {
//       const star = document.createElement('div');
//       star.className = 'star';

//       // Random size
//       const size = Math.random() * 4 + 1;
//       star.style.width = size + 'px';
//       star.style.height = size + 'px';

//       // Random position
//       star.style.left = Math.random() * 100 + '%';
//       star.style.top = Math.random() * 100 + '%';

//       // Golden color for some stars
//       const isGolden = Math.random() > 0.7;
//       if (isGolden) {
//         star.style.backgroundColor = '#ffd700';
//         star.style.boxShadow = '0 0 8px #ffd700, 0 0 16px #ffd700';
//         star.style.animationDelay = Math.random() * 5 + 's';
//         star.style.animationDuration = (Math.random() * 4 + 3) + 's';
//       } else {
//         star.style.backgroundColor = '#ffffff';
//         star.style.animationDelay = Math.random() * 3 + 's';
//         star.style.animationDuration = (Math.random() * 3 + 2) + 's';
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const el = document.querySelector(selector);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setMenuOpen(false);
//     }
//   };

//   const submitDemo = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
//     const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
//     if (!emailOk) {
//       alert("Please enter a valid work email address.");
//       return;
//     }
//     if (!phoneOk) {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     if (!form.source) {
//       alert("Please tell us how you heard about us.");
//       return;
//     }
//     alert(`Thank you for your interest! We will contact you soon to schedule your demo.`);
//     setForm({ firstName: "", lastName: "", phone: "", email: "", company: "", location: "", source: "" });
//   };

//   return (
//     <div className="app">
//       {/* Background Elements */}
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Navigation */}
//       <nav>
//         <div className="logo">Artemis</div>
//         <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//           <li><a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a></li>
//           <li><a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a></li>
//           <li><a href="#about" onClick={handleScrollTo("#about")}>About</a></li>
//           <li><a href="#demo" className="nav-cta" onClick={handleScrollTo("#demo")}>Book Demo</a></li>
//           <li><a href="#contact" onClick={handleScrollTo("#contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">Artemis stays colorful yet calm: no unnecessary complexity, easy to learn, and fast to use. With only basic knowledge and minimal navigation training, you become an expert.</p>
//           <div className="cta-buttons">
//             <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//               Book a Demo
//             </a>
//             <a href="#superpowers" className="cta-button secondary" onClick={handleScrollTo("#superpowers")}>
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       {/* Rest of your sections remain the same */}
//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">A revolution in staffing technology—innovation that empowers your every hire.</p>
//         <div className="superpowers-grid">
//           <div className="superpower-card">
//             <div className="superpower-icon">⚡</div>
//             <h3>Instant Talent Discovery</h3>
//             <ul>
//               <li>Lightning-fast candidate search with precise results</li>
//               <li>Deep VMS integrations for seamless workflow</li>
//               <li>Interactive Skills Checklist</li>
//             </ul>
//           </div>
//           <div className="superpower-card">
//             <div className="superpower-icon">🚀</div>
//             <h3>Next-Gen Workflow Power</h3>
//             <ul>
//               <li>Send Right-to-Represent (RTR) instantly to candidates</li>
//               <li>Design and manage dynamic candidate pipelines</li>
//               <li>Smart resume upload & parsing with bulk automation</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">Real stories from teams that thrive with Artemis.</p>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">MS</div>
//               <div className="author-info">
//                 <h4>Maria Sanchez</h4>
//                 <p>Ops Manager at a staffing company</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Artemis gives us speed without chaos. Our time-to-submit dropped immediately."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">JT</div>
//               <div className="author-info">
//                 <h4>James Turner</h4>
//                 <p>Director at a healthcare agency</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"The interface feels obvious. My team adopted it in a day—no long training calls."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">AK</div>
//               <div className="author-info">
//                 <h4>Anita Kapoor</h4>
//                 <p>CEO of a leading staffing firm</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Bulk parsing + RTR flows in one place—this is exactly what we needed."</p>
//           </div>
//         </div>
//       </section>

//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">Built for clarity and speed—be productive after a short walkthrough.</p>
//         <div className="about-content">
//           <div className="about-block">
//             <h3>Our Mission</h3>
//             <p>To make high-quality recruiting workflows accessible without enterprise bloat or surprise fees.</p>
//           </div>
//           <div className="about-block">
//             <h3>Principles</h3>
//             <ul>
//               <li>Clarity over complexity</li>
//               <li>Security by design</li>
//               <li>Feedback loops with customers</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className="contact-form-section" id="demo">
//         <h2 className="section-title">Book a Demo</h2>
//         <p className="section-subtitle">See Artemis in action.</p>
//         <div className="form-container">
//           <form onSubmit={submitDemo}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   required
//                   value={form.firstName}
//                   onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   required
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Work Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="company">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   required
//                   value={form.company}
//                   onChange={(e) => setForm({ ...form, company: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="source">How did you hear about us?</label>
//               <select
//                 id="source"
//                 required
//                 value={form.source}
//                 onChange={(e) => setForm({ ...form, source: e.target.value })}
//               >
//                 <option value="">Select one</option>
//                 <option value="google">Google Search</option>
//                 <option value="linkedin">LinkedIn</option>
//                 <option value="referral">Referral / Word of Mouth</option>
//                 <option value="conference">Conference / Event</option>
//                 <option value="email">Email Outreach</option>
//                 <option value="customer">Existing Customer</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <button type="submit" className="submit-btn">Request Demo</button>
//           </form>
//         </div>
//       </section>

//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">💼</a>
//               <a href="#" title="Facebook">📘</a>
//               <a href="#" title="Twitter">🐦</a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>Book Demo</a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>9330 Lyndon B Johnson Fwy #900<br />Dallas, TX, 75243</p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style >{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//         }

//         /* Enhanced 3D Canvas Container */
//         #canvas-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           pointer-events: none;
//         }

//         /* Animated Stars Background with Golden Stars */
//         .stars-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .star {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           animation: twinkle 3s infinite ease-in-out;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }

//         /* Enhanced golden star animation */
//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% {
//             opacity: 0.4;
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 8px #ffd700, 0 0 16px #ffd700;
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.4) rotate(180deg);
//             box-shadow: 0 0 12px #ffd700, 0 0 24px #ffd700, 0 0 36px #ffd700;
//           }
//         }

//         /* Shiny Black Background */
//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//         }

//         .gradient-bg::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
//           animation: shimmer 8s ease-in-out infinite;
//         }

//         @keyframes shimmer {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }

//         /* Navigation */
//         nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           padding: 20px 50px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           z-index: 1000;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: logoFloat 3s ease-in-out infinite;
//         }

//         @keyframes logoFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         .nav-links {
//           display: flex;
//           gap: 30px;
//           list-style: none;
//           align-items: center;
//         }

//         .nav-links a {
//           color: #fff;
//           text-decoration: none;
//           font-size: 16px;
//           transition: all 0.3s;
//           position: relative;
//           cursor: pointer;
//         }

//         .nav-links a::after {
//           content: '';
//           position: absolute;
//           bottom: -5px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           transition: width 0.3s;
//         }

//         .nav-links a:hover::after {
//           width: 100%;
//         }

//         .nav-links a:hover {
//           color: #667eea;
//         }

//         .nav-cta {
//           padding: 10px 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 25px;
//           transition: all 0.3s;
//         }

//         .nav-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
//         }

//         .nav-cta::after {
//           display: none;
//         }

//         /* Mobile Menu Toggle */
//         .menu-toggle {
//           display: none;
//           flex-direction: column;
//           cursor: pointer;
//           gap: 5px;
//         }

//         .menu-toggle span {
//           width: 25px;
//           height: 3px;
//           background: #fff;
//           transition: all 0.3s;
//         }

//         /* Hero Section */
//         .hero {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 120px 20px 60px;
//           z-index: 10;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 10;
//           max-width: 900px;
//         }

//         .hero h1 {
//           font-size: clamp(36px, 8vw, 72px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInUp 1s ease-out;
//         }

//         .hero .subtitle {
//           font-size: clamp(18px, 3vw, 28px);
//           margin-bottom: 15px;
//           color: #b8c5d6;
//           animation: fadeInUp 1s ease-out 0.2s both;
//         }

//         .hero .tagline {
//           font-size: clamp(16px, 2.5vw, 20px);
//           margin-bottom: 40px;
//           color: #8a95a8;
//           animation: fadeInUp 1s ease-out 0.4s both;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 20px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 1s ease-out 0.6s both;
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//           cursor: pointer;
//           border: none;
//         }

//         .cta-button.secondary {
//           background: transparent;
//           border: 2px solid #667eea;
//           box-shadow: none;
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//           transition: left 0.5s;
//           z-index: -1;
//         }

//         .cta-button:hover::before {
//           left: 0;
//         }

//         .cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Superpowers Section */
//         .superpowers {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .section-title {
//           text-align: center;
//           font-size: clamp(36px, 6vw, 48px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .section-subtitle {
//           text-align: center;
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #b8c5d6;
//           margin-bottom: 60px;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .superpowers-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .superpower-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s;
//           position: relative;
//           overflow: hidden;
//         }

//         .superpower-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           transform: rotate(45deg);
//           transition: all 0.6s;
//         }

//         .superpower-card:hover::before {
//           top: -10%;
//           left: -10%;
//         }

//         .superpower-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .superpower-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card h3 {
//           font-size: 24px;
//           margin-bottom: 15px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card ul {
//           list-style: none;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card li {
//           color: #b8c5d6;
//           line-height: 1.8;
//           padding-left: 20px;
//           position: relative;
//           margin-bottom: 10px;
//         }

//         .superpower-card li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Voices Section */
//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .testimonial-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.3s;
//         }

//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//         }

//         .testimonial-author {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .author-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           font-weight: bold;
//         }

//         .author-info h4 {
//           margin-bottom: 5px;
//         }

//         .author-info p {
//           color: #8a95a8;
//           font-size: 14px;
//         }

//         .testimonial-text {
//           color: #b8c5d6;
//           line-height: 1.8;
//           font-style: italic;
//         }

//         /* About Section */
//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 60px;
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p, .about-block ul {
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           padding-left: 25px;
//           position: relative;
//           margin-bottom: 15px;
//         }

//         .about-block li::before {
//           content: '→';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Contact Form Section */
//         .contact-form-section {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .form-container {
//           max-width: 800px;
//           margin: 0 auto;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 50px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           color: #b8c5d6;
//           font-size: 14px;
//         }

//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           color: #fff;
//           font-size: 16px;
//           transition: all 0.3s;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
//         }

//         .form-group select {
//           cursor: pointer;
//         }

//         .form-group option {
//           background: #0a0e27;
//           color: #fff;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border: none;
//           border-radius: 50px;
//           color: white;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//         }

//         .submit-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Footer */
//         footer {
//           position: relative;
//           padding: 50px;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 40px;
//         }

//         .footer-section h4 {
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .footer-section p,
//         .footer-section a {
//           color: #b8c5d6;
//           line-height: 1.8;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//         }

//         .footer-section a:hover {
//           color: #667eea;
//         }

//         .social-links {
//           display: flex;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//         }

//         .social-links a:hover {
//           transform: translateY(-5px) rotate(360deg);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 40px;
//           padding-top: 30px;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           color: #8a95a8;
//         }

//         /* Scroll Indicator */
//         .scroll-indicator {
//           position: absolute;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateX(-50%) translateY(0); }
//           50% { transform: translateX(-50%) translateY(10px); }
//         }

//         .scroll-indicator::after {
//           content: '↓';
//           font-size: 32px;
//           color: #667eea;
//         }

//         /* Responsive */
//         @media (max-width: 968px) {
//           nav {
//             padding: 15px 30px;
//           }

//           .nav-links {
//             position: fixed;
//             top: 70px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 70px);
//             background: rgba(10, 14, 39, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 50px;
//             transition: right 0.3s;
//           }

//           .nav-links.active {
//             right: 0;
//           }

//           .menu-toggle {
//             display: flex;
//           }

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 600px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .cta-buttons {
//             flex-direction: column;
//           }

//           .cta-button {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// // StarField Component for Hero Section Only
// const StarField: React.FC = () => {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const effectRef = useRef<any>(null);

//   useEffect(() => {
//     class Effect {
//       private container: HTMLDivElement;
//       private scene!: THREE.Scene;
//       private camera!: THREE.PerspectiveCamera;
//       private renderer!: THREE.WebGLRenderer;
//       private controls!: OrbitControls;
//       private clock!: THREE.Clock;

//       // Main object properties
//       private mainObject!: THREE.Mesh;
//       private secondaryObjects: THREE.Mesh[] = [];

//       // Background elements
//       private sphereBg!: THREE.Mesh;
//       private pointStars!: THREE.Points;

//       // Animation timing
//       private startTime: number;

//       // Other properties
//       private time: number = 0;
//       private delta: number = 0;
//       private textures: { [key: string]: THREE.Texture } = {};
//       private rafAnimate!: number;
//       private resizeObserver!: ResizeObserver;
//       private hasInteracted: boolean = false;

//       constructor(container: HTMLDivElement) {
//         this.container = container;
//         this.startTime = Date.now();
//       }

//       async init() {
//         this.threeInit();
//         await this.textureLoader();
//         this.createElements();
//         this.createBackgroundStars();
//         this.bannerInit();

//         this.resizeObserver = new ResizeObserver(() => this.onResize());
//         this.resizeObserver.observe(this.container);

//         this.limitFPS(1 / 60);
//       }

//       private threeInit() {
//         const container = this.container;

//         this.renderer = new THREE.WebGLRenderer({
//           powerPreference: "high-performance",
//           alpha: true,
//           antialias: true,
//           stencil: false,
//         });
//         this.renderer.setSize(container.clientWidth, container.clientHeight);
//         this.renderer.setPixelRatio(window.devicePixelRatio);
//         this.renderer.outputColorSpace = THREE.SRGBColorSpace;
//         container.appendChild(this.renderer.domElement);

//         this.scene = new THREE.Scene();

//         this.camera = new THREE.PerspectiveCamera(
//           55,
//           container.clientWidth / container.clientHeight,
//           0.01,
//           1000
//         );
//         this.camera.position.set(0, 0, 120);

//         this.clock = new THREE.Clock();

//         // Enhanced lighting for shiny effect
//         const mainLight = new THREE.DirectionalLight("#ffffff", 2);
//         mainLight.position.set(10, 10, 5);
//         this.scene.add(mainLight);

//         const ambientLight = new THREE.AmbientLight("#ffffff", 0.8);
//         this.scene.add(ambientLight);

//         const pointLight1 = new THREE.PointLight("#4488ff", 1, 100);
//         pointLight1.position.set(-10, -10, -5);
//         this.scene.add(pointLight1);

//         const pointLight2 = new THREE.PointLight("#ff8844", 0.8, 100);
//         pointLight2.position.set(5, -5, -10);
//         this.scene.add(pointLight2);

//         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//         this.controls.autoRotate = true;
//         this.controls.autoRotateSpeed = 1.5;
//         this.controls.maxDistance = 250;
//         this.controls.minDistance = 80;
//         this.controls.enablePan = false;
//       }

//       private textureLoader(): Promise<void> {
//         const textureLoader = new THREE.TextureLoader();
//         textureLoader.crossOrigin = 'anonymous';
//         const textureMap = {
//           sky: "https://i.ibb.co/HC0vxMw/sky2.jpg",
//         };

//         return Promise.all(
//           Object.entries(textureMap).map(([key, path]) => {
//             return new Promise<void>((resolve, reject) => {
//               textureLoader.load(
//                 path,
//                 (texture) => {
//                   texture.colorSpace = THREE.SRGBColorSpace;
//                   texture.anisotropy = 16;
//                   this.textures[key] = texture;
//                   resolve();
//                 },
//                 undefined,
//                 (error) => reject(`Error loading texture ${path}: ${error}`)
//               );
//             });
//           })
//         ).then(() => {});
//       }

//       private createElements() {
//         // Create main shiny object - using TorusKnot for an interesting shape
//         const geometry = new THREE.TorusKnotGeometry(8, 3, 256, 32, 2, 3);

//         // Create shiny, glossy material
//         const material = new THREE.MeshPhysicalMaterial({
//           color: 0x4488ff,
//           metalness: 0.95,
//           roughness: 0.05,
//           clearcoat: 1.0,
//           clearcoatRoughness: 0.05,
//           reflectivity: 1.0,
//           transparent: true,
//           opacity: 0.92,
//           emissive: 0x112244,
//           emissiveIntensity: 0.3,
//           side: THREE.DoubleSide,
//           sheen: 0.5,
//           sheenColor: 0x4488ff
//         });

//         this.mainObject = new THREE.Mesh(geometry, material);
//         this.mainObject.position.set(0, 0, 0);
//         this.scene.add(this.mainObject);

//         // Create secondary shiny objects
//         this.createSecondaryObjects();

//         // Background sphere with space texture
//         const geometrySphereBg = new THREE.SphereGeometry(85, 50, 50);
//         const materialSphereBg = new THREE.MeshBasicMaterial({
//           side: THREE.BackSide,
//           map: this.textures.sky
//         });
//         this.sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
//         this.sphereBg.position.set(0, 0, 0);
//         this.scene.add(this.sphereBg);
//       }

//       private createSecondaryObjects() {
//         // Object 1 - Crystal-like
//         const geometry1 = new THREE.OctahedronGeometry(4, 0);
//         const material1 = new THREE.MeshPhysicalMaterial({
//           color: 0xff44aa,
//           metalness: 0.8,
//           roughness: 0.1,
//           clearcoat: 1.0,
//           transmission: 0.4,
//           transparent: true,
//           opacity: 0.9,
//           emissive: 0x330022,
//           emissiveIntensity: 0.2
//         });
//         const obj1 = new THREE.Mesh(geometry1, material1);
//         obj1.position.set(20, 15, -15);
//         this.scene.add(obj1);
//         this.secondaryObjects.push(obj1);

//         // Object 2 - Metallic Sphere
//         const geometry2 = new THREE.SphereGeometry(3.5, 32, 32);
//         const material2 = new THREE.MeshPhysicalMaterial({
//           color: 0x44ff88,
//           metalness: 0.9,
//           roughness: 0.05,
//           clearcoat: 0.8,
//           emissive: 0x113311,
//           emissiveIntensity: 0.1
//         });
//         const obj2 = new THREE.Mesh(geometry2, material2);
//         obj2.position.set(-25, -10, 10);
//         this.scene.add(obj2);
//         this.secondaryObjects.push(obj2);

//         // Object 3 - Gem-like
//         const geometry3 = new THREE.DodecahedronGeometry(3, 1);
//         const material3 = new THREE.MeshPhysicalMaterial({
//           color: 0x8844ff,
//           metalness: 0.7,
//           roughness: 0.08,
//           clearcoat: 1.0,
//           clearcoatRoughness: 0.02,
//           sheen: 0.8,
//           sheenColor: 0x4411ff,
//           emissive: 0x220044,
//           emissiveIntensity: 0.4
//         });
//         const obj3 = new THREE.Mesh(geometry3, material3);
//         obj3.position.set(10, -20, 15);
//         this.scene.add(obj3);
//         this.secondaryObjects.push(obj3);
//       }

//       private createBackgroundStars() {
//         const starCount = 200;
//         const positions = new Float32Array(starCount * 3);
//         const colors = new Float32Array(starCount * 3);

//         for (let i = 0; i < starCount; i++) {
//           const i3 = i * 3;
//           const radius = THREE.MathUtils.randFloat(80, 120);
//           const theta = Math.random() * Math.PI * 2;
//           const phi = Math.acos(Math.random() * 2 - 1);

//           positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
//           positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//           positions[i3 + 2] = radius * Math.cos(phi);

//           // Random star colors
//           colors[i3] = THREE.MathUtils.randFloat(0.5, 1); // R
//           colors[i3 + 1] = THREE.MathUtils.randFloat(0.5, 1); // G
//           colors[i3 + 2] = THREE.MathUtils.randFloat(0.8, 1); // B
//         }

//         const geometry = new THREE.BufferGeometry();
//         geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//         geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//         const material = new THREE.PointsMaterial({
//           size: 1.2,
//           vertexColors: true,
//           transparent: true,
//           opacity: 0.8,
//           blending: THREE.AdditiveBlending,
//           sizeAttenuation: true
//         });

//         this.pointStars = new THREE.Points(geometry, material);
//         this.scene.add(this.pointStars);
//       }

//       private randomPointSphere(radius: number): THREE.Vector3 {
//         const theta = 2 * Math.PI * Math.random();
//         const phi = Math.acos(2 * Math.random() - 1);
//         const dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
//         const dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
//         const dz = 0 + radius * Math.cos(phi);

//         return new THREE.Vector3(dx, dy, dz);
//       }

//       private onResize() {
//         const container = this.container;
//         this.camera.aspect = container.clientWidth / container.clientHeight;
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(container.clientWidth, container.clientHeight);
//       }

//       private limitFPS(interval: number) {
//         this.rafAnimate = requestAnimationFrame(() => this.limitFPS(interval));
//         this.delta += this.clock.getDelta();

//         if (this.delta > interval) {
//           this.loop();
//           this.delta = this.delta % interval;
//         }
//       }

//       private updateMainObject() {
//         const elapsed = (Date.now() - this.startTime) * 0.001;

//         // Pulsing scale effect
//         const pulse = Math.sin(elapsed * 2) * 0.1 + 1;
//         this.mainObject.scale.set(pulse, pulse, pulse);

//         // Color shift over time
//         const hue = (elapsed * 0.1) % 1;
//         const color = new THREE.Color().setHSL(hue, 0.9, 0.6);
//         (this.mainObject.material as THREE.MeshPhysicalMaterial).color = color;

//         // Rotation
//         this.mainObject.rotation.x = elapsed * 0.3;
//         this.mainObject.rotation.y = elapsed * 0.5;
//         this.mainObject.rotation.z = elapsed * 0.2;

//         // Floating motion
//         this.mainObject.position.y = Math.sin(elapsed * 0.8) * 2;
//       }

//       private updateSecondaryObjects() {
//         const elapsed = (Date.now() - this.startTime) * 0.001;

//         this.secondaryObjects.forEach((obj, index) => {
//           // Individual rotations
//           obj.rotation.x = elapsed * (0.2 + index * 0.1);
//           obj.rotation.y = elapsed * (0.3 + index * 0.15);

//           // Orbital motions
//           const orbitSpeed = 0.2 + index * 0.1;
//           const orbitRadius = 15 + index * 5;
//           obj.position.x = Math.cos(elapsed * orbitSpeed + index) * orbitRadius;
//           obj.position.z = Math.sin(elapsed * orbitSpeed + index) * orbitRadius;

//           // Pulsing effects
//           const pulse = Math.sin(elapsed * 3 + index) * 0.2 + 1;
//           obj.scale.set(pulse, pulse, pulse);
//         });
//       }

//       private updateBackgroundStars() {
//         this.pointStars.rotation.y += 0.0001;
//       }

//       private loop() {
//         this.time = Date.now();

//         this.updateMainObject();
//         this.updateSecondaryObjects();
//         this.updateBackgroundStars();

//         this.controls.update();
//         this.renderer.render(this.scene, this.camera);
//       }

//       private bannerInit() {
//         const banner = document.querySelector(".hero-banner");
//         if (!banner) return;

//         const hideBanner = () => {
//           if (!this.hasInteracted && banner) {
//             (banner as HTMLElement).style.opacity = "0";
//             (banner as HTMLElement).style.transition = "opacity 0.5s ease";
//             setTimeout(() => {
//               if (banner.parentNode) {
//                 banner.remove();
//               }
//             }, 500);
//             this.hasInteracted = true;
//           }
//         };

//         window.addEventListener("wheel", hideBanner, { once: true });
//         this.renderer.domElement.addEventListener("pointerdown", hideBanner, {
//           once: true,
//         });
//       }
//     }

//     if (!mountRef.current) return;

//     const effect = new Effect(mountRef.current);
//     effectRef.current = effect;
//     effect.init();

//     return () => {
//       if (effectRef.current) {
//         if (effectRef.current.resizeObserver) {
//           effectRef.current.resizeObserver.disconnect();
//         }
//         if (effectRef.current.rafAnimate) {
//           cancelAnimationFrame(effectRef.current.rafAnimate);
//         }
//         if (effectRef.current.renderer) {
//           effectRef.current.renderer.dispose();
//         }
//         if (mountRef.current && effectRef.current.renderer?.domElement) {
//           mountRef.current.removeChild(effectRef.current.renderer.domElement);
//         }
//       }
//     };
//   }, []);

//   return (
//     <div className="starfield-container">
//       <div className="hero-banner">
//         You can zoom in and click and drag to explore the scene.
//       </div>
//       <div
//         ref={mountRef}
//         className="webgl"
//       />
//     </div>
//   );
// };

// // Main Home Component
// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: ""
//   });
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const el = document.querySelector(selector);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setMenuOpen(false);
//     }
//   };

//   const submitDemo = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
//     const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
//     if (!emailOk) {
//       alert("Please enter a valid work email address.");
//       return;
//     }
//     if (!phoneOk) {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     if (!form.source) {
//       alert("Please tell us how you heard about us.");
//       return;
//     }
//     alert(`Thank you for your interest! We will contact you soon to schedule your demo.`);
//     setForm({ firstName: "", lastName: "", phone: "", email: "", company: "", location: "", source: "" });
//   };

//   return (
//     <div className="app">
//       {/* Navigation */}
//       <nav>
//         <div className="logo">Artemis</div>
//         <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//           <li><a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a></li>
//           <li><a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a></li>
//           <li><a href="#about" onClick={handleScrollTo("#about")}>About</a></li>
//           <li><a href="#demo" className="nav-cta" onClick={handleScrollTo("#demo")}>Book Demo</a></li>
//           <li><a href="#contact" onClick={handleScrollTo("#contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section with StarField on Left */}
//       <section className="hero" id="home">
//         <div className="hero-container">
//           <div className="hero-left">
//             <StarField />
//           </div>
//           <div className="hero-right">
//             <div className="hero-content">
//               <h1>Supercharged by Next-Gen AI Brilliance</h1>
//               <p className="subtitle">Streamlined · Minimalist · Balance</p>
//               <p className="tagline">Artemis stays colorful yet calm: no unnecessary complexity, easy to learn, and fast to use. With only basic knowledge and minimal navigation training, you become an expert.</p>
//               <div className="cta-buttons">
//                 <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//                   Book a Demo
//                 </a>
//                 <a href="#superpowers" className="cta-button secondary" onClick={handleScrollTo("#superpowers")}>
//                   View Superpowers
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       {/* Superpowers Section */}
//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">A revolution in staffing technology—innovation that empowers your every hire.</p>
//         <div className="superpowers-grid">
//           <div className="superpower-card">
//             <div className="superpower-icon">⚡</div>
//             <h3>Instant Talent Discovery</h3>
//             <ul>
//               <li>Lightning-fast candidate search with precise results</li>
//               <li>Deep VMS integrations for seamless workflow</li>
//               <li>Interactive Skills Checklist</li>
//             </ul>
//           </div>
//           <div className="superpower-card">
//             <div className="superpower-icon">🚀</div>
//             <h3>Next-Gen Workflow Power</h3>
//             <ul>
//               <li>Send Right-to-Represent (RTR) instantly to candidates</li>
//               <li>Design and manage dynamic candidate pipelines</li>
//               <li>Smart resume upload & parsing with bulk automation</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Voices Section */}
//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">Real stories from teams that thrive with Artemis.</p>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">MS</div>
//               <div className="author-info">
//                 <h4>Maria Sanchez</h4>
//                 <p>Ops Manager at a staffing company</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Artemis gives us speed without chaos. Our time-to-submit dropped immediately."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">JT</div>
//               <div className="author-info">
//                 <h4>James Turner</h4>
//                 <p>Director at a healthcare agency</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"The interface feels obvious. My team adopted it in a day—no long training calls."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">AK</div>
//               <div className="author-info">
//                 <h4>Anita Kapoor</h4>
//                 <p>CEO of a leading staffing firm</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Bulk parsing + RTR flows in one place—this is exactly what we needed."</p>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">Built for clarity and speed—be productive after a short walkthrough.</p>
//         <div className="about-content">
//           <div className="about-block">
//             <h3>Our Mission</h3>
//             <p>To make high-quality recruiting workflows accessible without enterprise bloat or surprise fees.</p>
//           </div>
//           <div className="about-block">
//             <h3>Principles</h3>
//             <ul>
//               <li>Clarity over complexity</li>
//               <li>Security by design</li>
//               <li>Feedback loops with customers</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="contact-form-section" id="demo">
//         <h2 className="section-title">Book a Demo</h2>
//         <p className="section-subtitle">See Artemis in action.</p>
//         <div className="form-container">
//           <form onSubmit={submitDemo}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   required
//                   value={form.firstName}
//                   onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   required
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Work Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="company">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   required
//                   value={form.company}
//                   onChange={(e) => setForm({ ...form, company: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="source">How did you hear about us?</label>
//               <select
//                 id="source"
//                 required
//                 value={form.source}
//                 onChange={(e) => setForm({ ...form, source: e.target.value })}
//               >
//                 <option value="">Select one</option>
//                 <option value="google">Google Search</option>
//                 <option value="linkedin">LinkedIn</option>
//                 <option value="referral">Referral / Word of Mouth</option>
//                 <option value="conference">Conference / Event</option>
//                 <option value="email">Email Outreach</option>
//                 <option value="customer">Existing Customer</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <button type="submit" className="submit-btn">Request Demo</button>
//           </form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">💼</a>
//               <a href="#" title="Facebook">📘</a>
//               <a href="#" title="Twitter">🐦</a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>Book Demo</a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>9330 Lyndon B Johnson Fwy #900<br />Dallas, TX, 75243</p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//           position: relative;
//         }

//         /* StarField Styles */
//         .starfield-container {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }

//         .hero-banner {
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           padding: 10px 20px;
//           background: rgba(0, 0, 0, 0.4);
//           backdrop-filter: blur(5px);
//           color: white;
//           text-align: center;
//           font-family: 'Arial', sans-serif;
//           font-size: 14px;
//           z-index: 10;
//           border-radius: 20px;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .webgl {
//           width: 100%;
//           height: 100%;
//           display: block;
//         }

//         /* Navigation */
//         nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           padding: 20px 50px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           z-index: 1000;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: logoFloat 3s ease-in-out infinite;
//         }

//         @keyframes logoFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         .nav-links {
//           display: flex;
//           gap: 30px;
//           list-style: none;
//           align-items: center;
//         }

//         .nav-links a {
//           color: #fff;
//           text-decoration: none;
//           font-size: 16px;
//           transition: all 0.3s;
//           position: relative;
//           cursor: pointer;
//         }

//         .nav-links a::after {
//           content: '';
//           position: absolute;
//           bottom: -5px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           transition: width 0.3s;
//         }

//         .nav-links a:hover::after {
//           width: 100%;
//         }

//         .nav-links a:hover {
//           color: #667eea;
//         }

//         .nav-cta {
//           padding: 10px 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 25px;
//           transition: all 0.3s;
//         }

//         .nav-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
//         }

//         .nav-cta::after {
//           display: none;
//         }

//         /* Mobile Menu Toggle */
//         .menu-toggle {
//           display: none;
//           flex-direction: column;
//           cursor: pointer;
//           gap: 5px;
//         }

//         .menu-toggle span {
//           width: 25px;
//           height: 3px;
//           background: #fff;
//           transition: all 0.3s;
//         }

//         /* Hero Section */
//         .hero {
//           position: relative;
//           min-height: 100vh;
//           padding: 0;
//           z-index: 10;
//           background: linear-gradient(135deg, #0a0e27 0%, #1a1f4b 100%);
//         }

//         .hero-container {
//           display: flex;
//           width: 100%;
//           height: 100vh;
//         }

//         .hero-left {
//           flex: 1;
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-right {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0 50px;
//         }

//         .hero-content {
//           max-width: 600px;
//           text-align: left;
//         }

//         .hero h1 {
//           font-size: clamp(36px, 5vw, 60px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInUp 1s ease-out;
//           line-height: 1.2;
//         }

//         .hero .subtitle {
//           font-size: clamp(18px, 2.5vw, 24px);
//           margin-bottom: 15px;
//           color: #b8c5d6;
//           animation: fadeInUp 1s ease-out 0.2s both;
//         }

//         .hero .tagline {
//           font-size: clamp(16px, 2vw, 18px);
//           margin-bottom: 40px;
//           color: #8a95a8;
//           animation: fadeInUp 1s ease-out 0.4s both;
//           line-height: 1.6;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 20px;
//           flex-wrap: wrap;
//           animation: fadeInUp 1s ease-out 0.6s both;
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//           cursor: pointer;
//           border: none;
//         }

//         .cta-button.secondary {
//           background: transparent;
//           border: 2px solid #667eea;
//           box-shadow: none;
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//           transition: left 0.5s;
//           z-index: -1;
//         }

//         .cta-button:hover::before {
//           left: 0;
//         }

//         .cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Rest of the styles remain the same as before for other sections */
//         .superpowers {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .section-title {
//           text-align: center;
//           font-size: clamp(36px, 6vw, 48px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .section-subtitle {
//           text-align: center;
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #b8c5d6;
//           margin-bottom: 60px;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .superpowers-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .superpower-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s;
//           position: relative;
//           overflow: hidden;
//         }

//         .superpower-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           transform: rotate(45deg);
//           transition: all 0.6s;
//         }

//         .superpower-card:hover::before {
//           top: -10%;
//           left: -10%;
//         }

//         .superpower-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .superpower-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card h3 {
//           font-size: 24px;
//           margin-bottom: 15px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card ul {
//           list-style: none;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card li {
//           color: #b8c5d6;
//           line-height: 1.8;
//           padding-left: 20px;
//           position: relative;
//           margin-bottom: 10px;
//         }

//         .superpower-card li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Voices Section */
//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .testimonial-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.3s;
//         }

//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//         }

//         .testimonial-author {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .author-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           font-weight: bold;
//         }

//         .author-info h4 {
//           margin-bottom: 5px;
//         }

//         .author-info p {
//           color: #8a95a8;
//           font-size: 14px;
//         }

//         .testimonial-text {
//           color: #b8c5d6;
//           line-height: 1.8;
//           font-style: italic;
//         }

//         /* About Section */
//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 60px;
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p, .about-block ul {
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           padding-left: 25px;
//           position: relative;
//           margin-bottom: 15px;
//         }

//         .about-block li::before {
//           content: '→';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Contact Form Section */
//         .contact-form-section {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .form-container {
//           max-width: 800px;
//           margin: 0 auto;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 50px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           color: #b8c5d6;
//           font-size: 14px;
//         }

//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           color: #fff;
//           font-size: 16px;
//           transition: all 0.3s;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
//         }

//         .form-group select {
//           cursor: pointer;
//         }

//         .form-group option {
//           background: #0a0e27;
//           color: #fff;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border: none;
//           border-radius: 50px;
//           color: white;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//         }

//         .submit-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Footer */
//         footer {
//           position: relative;
//           padding: 50px;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 40px;
//         }

//         .footer-section h4 {
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .footer-section p,
//         .footer-section a {
//           color: #b8c5d6;
//           line-height: 1.8;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//         }

//         .footer-section a:hover {
//           color: #667eea;
//         }

//         .social-links {
//           display: flex;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//         }

//         .social-links a:hover {
//           transform: translateY(-5px) rotate(360deg);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 40px;
//           padding-top: 30px;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           color: #8a95a8;
//         }

//         /* Scroll Indicator */
//         .scroll-indicator {
//           position: absolute;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateX(-50%) translateY(0); }
//           50% { transform: translateX(-50%) translateY(10px); }
//         }

//         .scroll-indicator::after {
//           content: '↓';
//           font-size: 32px;
//           color: #667eea;
//         }

//         /* Responsive */
//         @media (max-width: 968px) {
//           nav {
//             padding: 15px 30px;
//           }

//           .nav-links {
//             position: fixed;
//             top: 70px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 70px);
//             background: rgba(10, 14, 39, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 50px;
//             transition: right 0.3s;
//           }

//           .nav-links.active {
//             right: 0;
//           }

//           .menu-toggle {
//             display: flex;
//           }

//           .hero-container {
//             flex-direction: column;
//             height: auto;
//           }

//           .hero-left {
//             height: 50vh;
//             min-height: 400px;
//           }

//           .hero-right {
//             padding: 60px 30px;
//             text-align: center;
//           }

//           .hero-content {
//             text-align: center;
//           }

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 600px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .cta-buttons {
//             flex-direction: column;
//           }

//           .cta-button {
//             width: 100%;
//           }

//           .hero-banner {
//             font-size: 12px;
//             padding: 8px 16px;
//             top: 10px;
//             left: 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from 'three';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: ""
//   });
//   const [menuOpen, setMenuOpen] = useState(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);
//   const mysteryPlanetRef = useRef<THREE.Group | null>(null);
//   const cometsRef = useRef<THREE.Points[]>([]);

//   // Three.js Scene Setup
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     // Enhanced particles system
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for(let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 50;

//       // Color variation (purple/blue/pink gradient)
//       const colorChoice = Math.random();
//       if (colorChoice < 0.33) {
//         colorsArray[i] = 0.4 + Math.random() * 0.6; // Blue
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
//       } else if (colorChoice < 0.66) {
//         colorsArray[i] = 0.7 + Math.random() * 0.3; // Purple
//         if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
//         if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
//       } else {
//         colorsArray[i] = 0.8 + Math.random() * 0.2; // Pink
//         if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
//         if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
//       }
//     }

//     for(let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
//     particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     // Create Mysterious Planet
//     const planetGroup = new THREE.Group();
//     mysteryPlanetRef.current = planetGroup;

//     // Main planet body with irregular shape
//     const planetGeometry = new THREE.IcosahedronGeometry(2.5, 2);
//     // Distort the geometry to make it more mysterious
//     const positions = planetGeometry.attributes.position.array as Float32Array;
//     for (let i = 0; i < positions.length; i += 3) {
//       const x = positions[i];
//       const y = positions[i + 1];
//       const z = positions[i + 2];
//       const distance = Math.sqrt(x * x + y * y + z * z);
//       const distortion = 1 + 0.3 * Math.sin(distance * 5) * Math.random();
//       positions[i] *= distortion;
//       positions[i + 1] *= distortion;
//       positions[i + 2] *= distortion;
//     }
//     planetGeometry.attributes.position.needsUpdate = true;

//     const planetMaterial = new THREE.MeshPhongMaterial({
//       color: 0x4a1c6f,
//       shininess: 100,
//       specular: 0x9370db,
//       emissive: 0x2d1b44,
//       transparent: true,
//       opacity: 0.9,
//     });

//     const planet = new THREE.Mesh(planetGeometry, planetMaterial);
//     planetGroup.add(planet);

//     // Add glowing atmosphere
//     const atmosphereGeometry = new THREE.SphereGeometry(2.8, 32, 32);
//     const atmosphereMaterial = new THREE.MeshPhongMaterial({
//       color: 0x9370db,
//       transparent: true,
//       opacity: 0.2,
//       side: THREE.DoubleSide,
//     });
//     const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//     planetGroup.add(atmosphere);

//     // Add mysterious rings
//     const ringGeometry = new THREE.RingGeometry(3.5, 5, 64);
//     const ringMaterial = new THREE.MeshPhongMaterial({
//       color: 0xffd700,
//       transparent: true,
//       opacity: 0.3,
//       side: THREE.DoubleSide,
//     });
//     const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//     ring.rotation.x = Math.PI / 3;
//     planetGroup.add(ring);

//     // Add floating crystals/orbs around the planet
//     for (let i = 0; i < 8; i++) {
//       const crystalGeometry = new THREE.OctahedronGeometry(0.3, 0);
//       const crystalMaterial = new THREE.MeshPhongMaterial({
//         color: 0xffd700,
//         shininess: 100,
//         emissive: 0x333300,
//         transparent: true,
//         opacity: 0.8,
//       });
//       const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);

//       const angle = (i / 8) * Math.PI * 2;
//       const radius = 4;
//       crystal.position.set(
//         Math.cos(angle) * radius,
//         Math.sin(angle) * 0.5,
//         Math.sin(angle) * radius
//       );
//       planetGroup.add(crystal);
//     }

//     // Position the mysterious planet
//     planetGroup.position.set(15, 5, -10);
//     scene.add(planetGroup);

//     // Create golden comets
//     const createGoldenComet = () => {
//       const cometGeometry = new THREE.BufferGeometry();
//       const cometCount = 50;
//       const cometPositions = new Float32Array(cometCount * 3);
//       const cometColors = new Float32Array(cometCount * 3);

//       for (let i = 0; i < cometCount * 3; i += 3) {
//         const progress = i / (cometCount * 3);
//         cometPositions[i] = progress * 10 - 5;
//         cometPositions[i + 1] = Math.sin(progress * Math.PI) * 2;
//         cometPositions[i + 2] = 0;

//         // Golden gradient (white to gold)
//         cometColors[i] = 1; // Red remains high
//         cometColors[i + 1] = 0.843 - progress * 0.3; // Green reduces to gold
//         cometColors[i + 2] = 0; // Blue remains low
//       }

//       cometGeometry.setAttribute('position', new THREE.BufferAttribute(cometPositions, 3));
//       cometGeometry.setAttribute('color', new THREE.BufferAttribute(cometColors, 3));

//       const cometMaterial = new THREE.PointsMaterial({
//         size: 0.15,
//         vertexColors: true,
//         transparent: true,
//         opacity: 0.9,
//         sizeAttenuation: true,
//         blending: THREE.AdditiveBlending
//       });

//       return new THREE.Points(cometGeometry, cometMaterial);
//     };

//     // Add multiple golden comets
//     for (let i = 0; i < 4; i++) {
//       const comet = createGoldenComet();
//       comet.position.set(
//         (Math.random() - 0.5) * 40,
//         (Math.random() - 0.5) * 30,
//         (Math.random() - 0.5) * 25
//       );
//       comet.rotation.x = Math.random() * Math.PI;
//       comet.rotation.y = Math.random() * Math.PI;
//       scene.add(comet);
//       cometsRef.current.push(comet);
//     }

//     // Enhanced lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x667eea, 0.3);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.3, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     // Special lighting for the mysterious planet
//     const planetLight = new THREE.PointLight(0x9370db, 0.7, 40);
//     planetGroup.add(planetLight);

//     // Golden light for crystals
//     const goldenLight = new THREE.PointLight(0xffd700, 0.5, 20);
//     planetGroup.add(goldenLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.z = 15;

//     // Animation variables
//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = () => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener('scroll', handleScroll);
//     document.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       // Mysterious Planet animation with scroll effects
//       if (mysteryPlanetRef.current) {
//         const planetGroup = mysteryPlanetRef.current;

//         // Base rotation - planet rotates slowly
//         planetGroup.rotation.y += 0.003;
//         planetGroup.rotation.x += 0.001;

//         // Floating crystals animation
//         planetGroup.children.forEach((child, index) => {
//           if (index > 2) { // Crystals start from index 3
//             child.rotation.x += 0.02;
//             child.rotation.y += 0.03;
//             // Floating motion
//             child.position.y += Math.sin(time * 2 + index) * 0.01;
//           }
//         });

//         // Ring rotation
//         if (planetGroup.children[2]) {
//           planetGroup.children[2].rotation.y += 0.01;
//         }

//         // Scroll-based transformations
//         const scrollProgress = Math.min(scrollY / 2000, 1);

//         // Zoom effect - planet gets larger as you scroll
//         const scale = 1 + scrollProgress * 2;
//         planetGroup.scale.set(scale, scale, scale);

//         // Position change - moves across screen as you scroll
//         planetGroup.position.x = 15 - scrollProgress * 25;
//         planetGroup.position.y = 5 - scrollProgress * 8;
//         planetGroup.position.z = -10 + scrollProgress * 5;

//         // Enhanced glow effect based on scroll
//         const planetMaterial = (planetGroup.children[0] as THREE.Mesh).material as THREE.MeshPhongMaterial;
//         planetMaterial.emissive.setRGB(
//           0.2 + scrollProgress * 0.4,
//           0.1 + scrollProgress * 0.2,
//           0.3 + scrollProgress * 0.3
//         );

//         // Atmosphere pulse
//         const atmosphereMaterial = (planetGroup.children[1] as THREE.Mesh).material as THREE.MeshPhongMaterial;
//         atmosphereMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.1;
//       }

//       // Golden comets animation
//       cometsRef.current.forEach((comet, index) => {
//         comet.rotation.y += 0.015;
//         comet.rotation.x += 0.01;

//         // Move comets in elegant patterns
//         const cometSpeed = 0.03 + index * 0.008;
//         comet.position.x += Math.sin(time * 1.5 + index) * cometSpeed;
//         comet.position.y += Math.cos(time * 1.2 + index * 2) * cometSpeed * 0.7;
//         comet.position.z += Math.sin(time * 0.8 + index) * cometSpeed * 0.5;

//         // Golden pulsing effect
//         const scale = 1 + Math.sin(time * 3 + index) * 0.4;
//         comet.scale.set(scale, scale, scale);

//         // Trail effect
//         comet.rotation.z += 0.005;
//       });

//       if (cameraRef.current) {
//         cameraRef.current.position.x += (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y += (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         // Enhanced camera movement based on scroll
//         const baseZ = 15;
//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.position.z = baseZ + scrollEffect * 5;

//         // Slight camera tilt based on scroll
//         cameraRef.current.rotation.z = scrollEffect * 0.1;
//       }

//       // Dynamic lighting effects
//       pointLight.position.x = Math.sin(time) * 5;
//       pointLight.position.y = Math.cos(time) * 5;

//       // Golden light movement
//       if (mysteryPlanetRef.current && mysteryPlanetRef.current.children[4]) {
//         const goldenLight = mysteryPlanetRef.current.children[4] as THREE.PointLight;
//         goldenLight.position.x = Math.sin(time * 1.5) * 3;
//         goldenLight.position.z = Math.cos(time * 1.5) * 3;
//       }

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = () => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   // Golden stars background
//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 200; i++) {
//       const star = document.createElement('div');
//       star.className = 'star';

//       // Random size
//       const size = Math.random() * 4 + 1;
//       star.style.width = size + 'px';
//       star.style.height = size + 'px';

//       // Random position
//       star.style.left = Math.random() * 100 + '%';
//       star.style.top = Math.random() * 100 + '%';

//       // Golden color for some stars
//       const isGolden = Math.random() > 0.7;
//       if (isGolden) {
//         star.style.backgroundColor = '#ffd700';
//         star.style.boxShadow = '0 0 8px #ffd700, 0 0 16px #ffd700';
//         star.style.animationDelay = Math.random() * 5 + 's';
//         star.style.animationDuration = (Math.random() * 4 + 3) + 's';
//       } else {
//         star.style.backgroundColor = '#ffffff';
//         star.style.animationDelay = Math.random() * 3 + 's';
//         star.style.animationDuration = (Math.random() * 3 + 2) + 's';
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   const handleScrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const el = document.querySelector(selector);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       setMenuOpen(false);
//     }
//   };

//   const submitDemo = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
//     const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
//     if (!emailOk) {
//       alert("Please enter a valid work email address.");
//       return;
//     }
//     if (!phoneOk) {
//       alert("Please enter a valid phone number.");
//       return;
//     }
//     if (!form.source) {
//       alert("Please tell us how you heard about us.");
//       return;
//     }
//     alert(`Thank you for your interest! We will contact you soon to schedule your demo.`);
//     setForm({ firstName: "", lastName: "", phone: "", email: "", company: "", location: "", source: "" });
//   };

//   return (
//     <div className="app">
//       {/* Background Elements */}
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Navigation */}
//       <nav>
//         <div className="logo">Artemis</div>
//         <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//           <li><a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a></li>
//           <li><a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a></li>
//           <li><a href="#about" onClick={handleScrollTo("#about")}>About</a></li>
//           <li><a href="#demo" className="nav-cta" onClick={handleScrollTo("#demo")}>Book Demo</a></li>
//           <li><a href="#contact" onClick={handleScrollTo("#contact")}>Contact</a></li>
//         </ul>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">Artemis stays colorful yet calm: no unnecessary complexity, easy to learn, and fast to use. With only basic knowledge and minimal navigation training, you become an expert.</p>
//           <div className="cta-buttons">
//             <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//               Book a Demo
//             </a>
//             <a href="#superpowers" className="cta-button secondary" onClick={handleScrollTo("#superpowers")}>
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       {/* Rest of your sections remain the same */}
//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">A revolution in staffing technology—innovation that empowers your every hire.</p>
//         <div className="superpowers-grid">
//           <div className="superpower-card">
//             <div className="superpower-icon">⚡</div>
//             <h3>Instant Talent Discovery</h3>
//             <ul>
//               <li>Lightning-fast candidate search with precise results</li>
//               <li>Deep VMS integrations for seamless workflow</li>
//               <li>Interactive Skills Checklist</li>
//             </ul>
//           </div>
//           <div className="superpower-card">
//             <div className="superpower-icon">🚀</div>
//             <h3>Next-Gen Workflow Power</h3>
//             <ul>
//               <li>Send Right-to-Represent (RTR) instantly to candidates</li>
//               <li>Design and manage dynamic candidate pipelines</li>
//               <li>Smart resume upload & parsing with bulk automation</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">Real stories from teams that thrive with Artemis.</p>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">MS</div>
//               <div className="author-info">
//                 <h4>Maria Sanchez</h4>
//                 <p>Ops Manager at a staffing company</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Artemis gives us speed without chaos. Our time-to-submit dropped immediately."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">JT</div>
//               <div className="author-info">
//                 <h4>James Turner</h4>
//                 <p>Director at a healthcare agency</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"The interface feels obvious. My team adopted it in a day—no long training calls."</p>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-author">
//               <div className="author-avatar">AK</div>
//               <div className="author-info">
//                 <h4>Anita Kapoor</h4>
//                 <p>CEO of a leading staffing firm</p>
//               </div>
//             </div>
//             <p className="testimonial-text">"Bulk parsing + RTR flows in one place—this is exactly what we needed."</p>
//           </div>
//         </div>
//       </section>

//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">Built for clarity and speed—be productive after a short walkthrough.</p>
//         <div className="about-content">
//           <div className="about-block">
//             <h3>Our Mission</h3>
//             <p>To make high-quality recruiting workflows accessible without enterprise bloat or surprise fees.</p>
//           </div>
//           <div className="about-block">
//             <h3>Principles</h3>
//             <ul>
//               <li>Clarity over complexity</li>
//               <li>Security by design</li>
//               <li>Feedback loops with customers</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className="contact-form-section" id="demo">
//         <h2 className="section-title">Book a Demo</h2>
//         <p className="section-subtitle">See Artemis in action.</p>
//         <div className="form-container">
//           <form onSubmit={submitDemo}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   required
//                   value={form.firstName}
//                   onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   required
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Work Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="company">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   required
//                   value={form.company}
//                   onChange={(e) => setForm({ ...form, company: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="source">How did you hear about us?</label>
//               <select
//                 id="source"
//                 required
//                 value={form.source}
//                 onChange={(e) => setForm({ ...form, source: e.target.value })}
//               >
//                 <option value="">Select one</option>
//                 <option value="google">Google Search</option>
//                 <option value="linkedin">LinkedIn</option>
//                 <option value="referral">Referral / Word of Mouth</option>
//                 <option value="conference">Conference / Event</option>
//                 <option value="email">Email Outreach</option>
//                 <option value="customer">Existing Customer</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//             <button type="submit" className="submit-btn">Request Demo</button>
//           </form>
//         </div>
//       </section>

//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">💼</a>
//               <a href="#" title="Facebook">📘</a>
//               <a href="#" title="Twitter">🐦</a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>Voices</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>Book Demo</a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>9330 Lyndon B Johnson Fwy #900<br />Dallas, TX, 75243</p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style >{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//         }

//         /* Enhanced 3D Canvas Container */
//         #canvas-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//           pointer-events: none;
//         }

//         /* Animated Stars Background with Golden Stars */
//         .stars-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .star {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           animation: twinkle 3s infinite ease-in-out;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.2); }
//         }

//         /* Enhanced golden star animation */
//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% {
//             opacity: 0.4;
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 8px #ffd700, 0 0 16px #ffd700;
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.4) rotate(180deg);
//             box-shadow: 0 0 12px #ffd700, 0 0 24px #ffd700, 0 0 36px #ffd700;
//           }
//         }

//         /* Shiny Black Background */
//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//         }

//         .gradient-bg::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
//                       radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
//           animation: shimmer 8s ease-in-out infinite;
//         }

//         @keyframes shimmer {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }

//         /* Navigation */
//         nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           padding: 20px 50px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           z-index: 1000;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .logo {
//           font-size: 32px;
//           font-weight: bold;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: logoFloat 3s ease-in-out infinite;
//         }

//         @keyframes logoFloat {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         .nav-links {
//           display: flex;
//           gap: 30px;
//           list-style: none;
//           align-items: center;
//         }

//         .nav-links a {
//           color: #fff;
//           text-decoration: none;
//           font-size: 16px;
//           transition: all 0.3s;
//           position: relative;
//           cursor: pointer;
//         }

//         .nav-links a::after {
//           content: '';
//           position: absolute;
//           bottom: -5px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           transition: width 0.3s;
//         }

//         .nav-links a:hover::after {
//           width: 100%;
//         }

//         .nav-links a:hover {
//           color: #667eea;
//         }

//         .nav-cta {
//           padding: 10px 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 25px;
//           transition: all 0.3s;
//         }

//         .nav-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
//         }

//         .nav-cta::after {
//           display: none;
//         }

//         /* Mobile Menu Toggle */
//         .menu-toggle {
//           display: none;
//           flex-direction: column;
//           cursor: pointer;
//           gap: 5px;
//         }

//         .menu-toggle span {
//           width: 25px;
//           height: 3px;
//           background: #fff;
//           transition: all 0.3s;
//         }

//         /* Hero Section */
//         .hero {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 120px 20px 60px;
//           z-index: 10;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 10;
//           max-width: 900px;
//         }

//         .hero h1 {
//           font-size: clamp(36px, 8vw, 72px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInUp 1s ease-out;
//         }

//         .hero .subtitle {
//           font-size: clamp(18px, 3vw, 28px);
//           margin-bottom: 15px;
//           color: #b8c5d6;
//           animation: fadeInUp 1s ease-out 0.2s both;
//         }

//         .hero .tagline {
//           font-size: clamp(16px, 2.5vw, 20px);
//           margin-bottom: 40px;
//           color: #8a95a8;
//           animation: fadeInUp 1s ease-out 0.4s both;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .cta-buttons {
//           display: flex;
//           gap: 20px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 1s ease-out 0.6s both;
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 50px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           position: relative;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//           cursor: pointer;
//           border: none;
//         }

//         .cta-button.secondary {
//           background: transparent;
//           border: 2px solid #667eea;
//           box-shadow: none;
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
//           transition: left 0.5s;
//           z-index: -1;
//         }

//         .cta-button:hover::before {
//           left: 0;
//         }

//         .cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Superpowers Section */
//         .superpowers {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .section-title {
//           text-align: center;
//           font-size: clamp(36px, 6vw, 48px);
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .section-subtitle {
//           text-align: center;
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #b8c5d6;
//           margin-bottom: 60px;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .superpowers-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .superpower-card {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s;
//           position: relative;
//           overflow: hidden;
//         }

//         .superpower-card::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           transform: rotate(45deg);
//           transition: all 0.6s;
//         }

//         .superpower-card:hover::before {
//           top: -10%;
//           left: -10%;
//         }

//         .superpower-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .superpower-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card h3 {
//           font-size: 24px;
//           margin-bottom: 15px;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card ul {
//           list-style: none;
//           position: relative;
//           z-index: 1;
//         }

//         .superpower-card li {
//           color: #b8c5d6;
//           line-height: 1.8;
//           padding-left: 20px;
//           position: relative;
//           margin-bottom: 10px;
//         }

//         .superpower-card li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Voices Section */
//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 40px;
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .testimonial-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.3s;
//         }

//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
//         }

//         .testimonial-author {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .author-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 24px;
//           font-weight: bold;
//         }

//         .author-info h4 {
//           margin-bottom: 5px;
//         }

//         .author-info p {
//           color: #8a95a8;
//           font-size: 14px;
//         }

//         .testimonial-text {
//           color: #b8c5d6;
//           line-height: 1.8;
//           font-style: italic;
//         }

//         /* About Section */
//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 60px;
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p, .about-block ul {
//           color: #b8c5d6;
//           line-height: 1.8;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           padding-left: 25px;
//           position: relative;
//           margin-bottom: 15px;
//         }

//         .about-block li::before {
//           content: '→';
//           position: absolute;
//           left: 0;
//           color: #667eea;
//         }

//         /* Contact Form Section */
//         .contact-form-section {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .form-container {
//           max-width: 800px;
//           margin: 0 auto;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 50px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 20px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           color: #b8c5d6;
//           font-size: 14px;
//         }

//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 15px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//           color: #fff;
//           font-size: 16px;
//           transition: all 0.3s;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
//         }

//         .form-group select {
//           cursor: pointer;
//         }

//         .form-group option {
//           background: #0a0e27;
//           color: #fff;
//         }

//         .submit-btn {
//           width: 100%;
//           padding: 18px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border: none;
//           border-radius: 50px;
//           color: white;
//           font-size: 18px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
//         }

//         .submit-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
//         }

//         /* Footer */
//         footer {
//           position: relative;
//           padding: 50px;
//           background: rgba(10, 14, 39, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1200px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 40px;
//         }

//         .footer-section h4 {
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .footer-section p,
//         .footer-section a {
//           color: #b8c5d6;
//           line-height: 1.8;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 10px;
//         }

//         .footer-section a:hover {
//           color: #667eea;
//         }

//         .social-links {
//           display: flex;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 45px;
//           height: 45px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//         }

//         .social-links a:hover {
//           transform: translateY(-5px) rotate(360deg);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
//         }

//         .footer-bottom {
//           text-align: center;
//           margin-top: 40px;
//           padding-top: 30px;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           color: #8a95a8;
//         }

//         /* Scroll Indicator */
//         .scroll-indicator {
//           position: absolute;
//           bottom: 30px;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//           animation: bounce 2s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateX(-50%) translateY(0); }
//           50% { transform: translateX(-50%) translateY(10px); }
//         }

//         .scroll-indicator::after {
//           content: '↓';
//           font-size: 32px;
//           color: #667eea;
//         }

//         /* Responsive */
//         @media (max-width: 968px) {
//           nav {
//             padding: 15px 30px;
//           }

//           .nav-links {
//             position: fixed;
//             top: 70px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 70px);
//             background: rgba(10, 14, 39, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 50px;
//             transition: right 0.3s;
//           }

//           .nav-links.active {
//             right: 0;
//           }

//           .menu-toggle {
//             display: flex;
//           }

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }
//         }

//         @media (max-width: 600px) {
//           .form-grid {
//             grid-template-columns: 1fr;
//           }

//           .cta-buttons {
//             flex-direction: column;
//           }

//           .cta-button {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;












































