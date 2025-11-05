// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";

// if (typeof window !== 'undefined') {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

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
//     source: "",
//   });
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [currentProduct, setCurrentProduct] = useState(0);
//   const [typedText, setTypedText] = useState("");
//   const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const headlines = [
//     "Supercharged by Next-Gen AI Brilliance",
//     "Transform Your Hiring Process Today",
//     "Intelligent Recruitment Made Simple",
//     "Empowering Staffing Teams Worldwide"
//   ];

//   const testimonials = [
//     {
//       initials: "MS",
//       name: "Maria Sanchez",
//       title: "Ops Manager at a staffing company",
//       text: "Artemis gives us speed without chaos. Our time-to-submit dropped immediately."
//     },
//     {
//       initials: "JT",
//       name: "James Turner",
//       title: "Director at a healthcare agency",
//       text: "The interface feels obvious. My team adopted it in a day—no long training calls."
//     },
//     {
//       initials: "AK",
//       name: "Anita Kapoor",
//       title: "CEO of a leading staffing firm",
//       text: "Bulk parsing + RTR flows in one place—this is exactly what we needed."
//     }
//   ];

//   const products = [
//     {
//       title: "Product 1",
//       description: "Advanced ATS platform with AI-powered candidate matching and seamless VMS integration.",
//       image: "/path/to/product1.jpg",
//       features: ["AI Matching", "VMS Integration", "Real-time Analytics"]
//     },
//     {
//       title: "Product 2",
//       description: "Intelligent recruitment automation with bulk resume parsing and instant RTR workflows.",
//       image: "/path/to/product2.jpg",
//       features: ["Bulk Processing", "RTR Automation", "Smart Pipelines"]
//     },
//     {
//       title: "Product 3",
//       description: "Enterprise staffing solution with advanced reporting and compliance management.",
//       image: "/path/to/product3.jpg",
//       features: ["Compliance Tools", "Advanced Reports", "Enterprise Scale"]
//     }
//   ];

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);
//   const mysteryPlanetRef = useRef<THREE.Group | null>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
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

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const planetGroup = new THREE.Group();
//     mysteryPlanetRef.current = planetGroup;

//     const planetGeometry = new THREE.IcosahedronGeometry(2.5, 4);
//     const positions = planetGeometry.attributes.position.array as Float32Array;
//     for (let i = 0; i < positions.length; i += 3) {
//       const x = positions[i];
//       const y = positions[i + 1];
//       const z = positions[i + 2];
//       const distance = Math.sqrt(x * x + y * y + z * z);
//       const distortion = 1 + 0.08 * Math.sin(distance * 2) * Math.random();
//       positions[i] *= distortion;
//       positions[i + 1] *= distortion;
//       positions[i + 2] *= distortion;
//     }
//     planetGeometry.attributes.position.needsUpdate = true;
//     planetGeometry.computeVertexNormals();

//     const planetMaterial = new THREE.MeshStandardMaterial({
//       color: 0x8b6f9e,
//       metalness: 0.1,
//       roughness: 0.7,
//       emissive: 0x2d1f3d,
//       emissiveIntensity: 0.15,
//     });

//     const planet = new THREE.Mesh(planetGeometry, planetMaterial);
//     planetGroup.add(planet);

//     const atmosphereGeometry = new THREE.SphereGeometry(2.9, 64, 64);
//     const atmosphereMaterial = new THREE.MeshStandardMaterial({
//       color: 0x9a7db3,
//       transparent: true,
//       opacity: 0.08,
//       side: THREE.BackSide,
//       metalness: 0,
//       roughness: 1,
//     });
//     const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//     planetGroup.add(atmosphere);

//     const asteroidBelt = new THREE.Group();
//     const asteroidCount = 300;
    
//     for (let i = 0; i < asteroidCount; i++) {
//       const asteroidSize = 0.05 + Math.random() * 0.15;
//       const asteroidGeometry = new THREE.DodecahedronGeometry(asteroidSize, 0);
//       const asteroidMaterial = new THREE.MeshStandardMaterial({
//         color: new THREE.Color().setHSL(0.08, 0.3, 0.3 + Math.random() * 0.2),
//         metalness: 0.2,
//         roughness: 0.9,
//       });
//       const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

//       const angle = (i / asteroidCount) * Math.PI * 2;
//       const radius = 3.7 + Math.random() * 1.1;
//       const height = (Math.random() - 0.5) * 0.3;

//       asteroid.position.set(
//         Math.cos(angle) * radius,
//         height,
//         Math.sin(angle) * radius
//       );

//       asteroid.rotation.x = Math.random() * Math.PI;
//       asteroid.rotation.y = Math.random() * Math.PI;
//       asteroid.rotation.z = Math.random() * Math.PI;

//       asteroidBelt.add(asteroid);
//     }
//     planetGroup.add(asteroidBelt);

//     for (let i = 0; i < 8; i++) {
//       const crystalGeometry = new THREE.OctahedronGeometry(0.3, 1);
//       const crystalMaterial = new THREE.MeshStandardMaterial({
//         color: 0xc9a967,
//         metalness: 0.4,
//         roughness: 0.5,
//         emissive: 0x3a2f1a,
//         emissiveIntensity: 0.1,
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

//     planetGroup.position.set(15, 5, -10);
//     scene.add(planetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.2, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const planetLight = new THREE.PointLight(0x8b7ba8, 0.3, 30);
//     planetLight.position.set(0, 0, 0);
//     planetGroup.add(planetLight);

//     const goldenLight = new THREE.PointLight(0xddb87a, 0.2, 20);
//     goldenLight.position.set(0, 0, 0);
//     planetGroup.add(goldenLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.z = 15;

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

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

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

//       if (mysteryPlanetRef.current) {
//         const planetGroup = mysteryPlanetRef.current;

//         planetGroup.rotation.y += 0.003;
//         planetGroup.rotation.x += 0.001;

//         planetGroup.children.forEach((child, index) => {
//           if (index > 2) {
//             child.rotation.x += 0.02;
//             child.rotation.y += 0.03;
//             child.position.y += Math.sin(time * 2 + index) * 0.01;
//           }
//         });

//         if (planetGroup.children[2] && planetGroup.children[2].type === 'Group') {
//           planetGroup.children[2].rotation.y += 0.005;
//         }

//         const scrollProgress = Math.min(scrollY / 2000, 1);

//         const scale = 1 + scrollProgress * 2;
//         planetGroup.scale.set(scale, scale, scale);

//         planetGroup.position.x = 15 - scrollProgress * 25;
//         planetGroup.position.y = 5 - scrollProgress * 8;
//         planetGroup.position.z = -10 + scrollProgress * 5;

//         const planetMaterial = (planetGroup.children[0] as THREE.Mesh)
//           .material as THREE.MeshStandardMaterial;
//         planetMaterial.emissiveIntensity = 0.15 + scrollProgress * 0.05;

//         const atmosphereMaterial = (planetGroup.children[1] as THREE.Mesh)
//           .material as THREE.MeshStandardMaterial;
//         atmosphereMaterial.opacity = 0.08 + Math.sin(time * 2) * 0.02;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 15;
//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.position.z = baseZ + scrollEffect * 5;

//         cameraRef.current.rotation.z = scrollEffect * 0.1;
//       }

//       pointLight.position.x = Math.sin(time) * 5;
//       pointLight.position.y = Math.cos(time) * 5;

//       if (mysteryPlanetRef.current && mysteryPlanetRef.current.children[4]) {
//         const goldenLight = mysteryPlanetRef.current
//           .children[4] as THREE.PointLight;
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

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 200; i++) {
//       const star = document.createElement("div");
//       star.className = "star";

//       const size = Math.random() * 4 + 1;
//       star.style.width = size + "px";
//       star.style.height = size + "px";

//       star.style.left = Math.random() * 100 + "%";
//       star.style.top = Math.random() * 100 + "%";

//       const isGolden = Math.random() > 0.7;
//       if (isGolden) {
//         star.style.backgroundColor = "#ffd700";
//         star.style.boxShadow = "0 0 8px #ffd700, 0 0 16px #ffd700";
//         star.style.animationDelay = Math.random() * 5 + "s";
//         star.style.animationDuration = Math.random() * 4 + 3 + "s";
//       } else {
//         star.style.backgroundColor = "#ffffff";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         star.style.animationDuration = Math.random() * 3 + 2 + "s";
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProduct((prev) => (prev + 1) % products.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [products.length]);

//   useEffect(() => {
//     const currentHeadline = headlines[currentHeadlineIndex];
//     const typingSpeed = isDeleting ? 50 : 100;
//     const pauseEnd = 2000;

//     if (!isDeleting && typedText === currentHeadline) {
//       setTimeout(() => setIsDeleting(true), pauseEnd);
//       return;
//     }

//     if (isDeleting && typedText === "") {
//       setIsDeleting(false);
//       setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setTypedText((prev) => {
//         if (isDeleting) {
//           return currentHeadline.substring(0, prev.length - 1);
//         } else {
//           return currentHeadline.substring(0, prev.length + 1);
//         }
//       });
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [typedText, isDeleting, currentHeadlineIndex, headlines]);

//   const handleScrollTo =
//     (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

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
//     alert(
//       "Thank you for your interest! We will contact you soon to schedule your demo."
//     );
//     setForm({
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//       location: "",
//       source: "",
//     });
//   };

//   return (
//     <div className="app">
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <div id="canvas-container" ref={canvasRef} />

//       <nav>
//         <div className="logo">Artemis</div>
//         <div
//           className={`menu-toggle ${menuOpen ? "active" : ""}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <li>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//           </li>
//           <li>
//             <a href="#products" onClick={handleScrollTo("#products")}>
//               Products
//             </a>
//           </li>
//           <li>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//           </li>
//           <li>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="#demo"
//               className="nav-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Demo
//             </a>
//           </li>
//           <li>
//             <a href="#contact" onClick={handleScrollTo("#contact")}>
//               Contact
//             </a>
//           </li>
//         </ul>
//       </nav>

//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>
//             {typedText}
//             <span className="typing-cursor">|</span>
//           </h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">
//             Artemis stays colorful yet calm: no unnecessary complexity, easy to
//             learn, and fast to use. With only basic knowledge and minimal
//             navigation training, you become an expert.
//           </p>
//           <div className="cta-buttons">
//             <a
//               href="#demo"
//               className="cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="cta-button secondary"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">
//           A revolution in staffing technology—innovation that empowers your
//           every hire.
//         </p>
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

//       <section className="products" id="products">
//         <h2 className="section-title">Our Products</h2>
//         <p className="section-subtitle">
//           Cutting-edge solutions designed to transform your staffing operations.
//         </p>
//         <div className="products-slider-container">
//           <div className="products-3d-slider">
//             <div 
//               className="products-carousel" 
//               style={{ 
//                 transform: `translateX(-${currentProduct * 100}%)` 
//               }}
//             >
//               {products.map((product, index) => (
//                 <div 
//                   key={index} 
//                   className="product-card-3d"
//                   style={{
//                     transform: currentProduct === index 
//                       ? 'perspective(1000px) rotateY(0deg) scale(1)' 
//                       : currentProduct === index - 1 || (currentProduct === 0 && index === products.length - 1)
//                       ? 'perspective(1000px) rotateY(45deg) scale(0.85) translateX(30%)'
//                       : 'perspective(1000px) rotateY(-45deg) scale(0.85) translateX(-30%)'
//                   }}
//                 >
//                   <div className="product-image-container">
//                     <img 
//                       src={product.image} 
//                       alt={product.title}
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23667eea" width="400" height="300"/%3E%3Ctext fill="white" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + product.title + '%3C/text%3E%3C/svg%3E';
//                       }}
//                     />
//                   </div>
//                   <div className="product-content">
//                     <h3>{product.title}</h3>
//                     <p className="product-description">{product.description}</p>
//                     <ul className="product-features">
//                       {product.features.map((feature, idx) => (
//                         <li key={idx}>{feature}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="product-controls">
//             <button 
//               className="product-nav-btn prev" 
//               onClick={() => setCurrentProduct((prev) => (prev - 1 + products.length) % products.length)}
//               aria-label="Previous product"
//             >
//               ‹
//             </button>
//             <div className="product-dots">
//               {products.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`dot ${currentProduct === index ? 'active' : ''}`}
//                   onClick={() => setCurrentProduct(index)}
//                   aria-label={`Go to product ${index + 1}`}
//                 />
//               ))}
//             </div>
//             <button 
//               className="product-nav-btn next" 
//               onClick={() => setCurrentProduct((prev) => (prev + 1) % products.length)}
//               aria-label="Next product"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="voices" id="voices">
//         <h2 className="section-title">Voices of Success</h2>
//         <p className="section-subtitle">
//           Real stories from teams that thrive with Artemis.
//         </p>
//         <div className="testimonials-slider">
//           <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-author">
//                   <div className="author-avatar">{testimonial.initials}</div>
//                   <div className="author-info">
//                     <h4>{testimonial.name}</h4>
//                     <p>{testimonial.title}</p>
//                   </div>
//                 </div>
//                 <p className="testimonial-text">
//                   &quot;{testimonial.text}&quot;
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="testimonial-dots">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`dot ${currentTestimonial === index ? 'active' : ''}`}
//                 onClick={() => setCurrentTestimonial(index)}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">
//           Building the future of recruitment technology with innovation, integrity, and intelligence.
//         </p>
        
//         <div className="about-hero">
//           <div className="about-hero-content">
//             <h3>Redefining Staffing Excellence</h3>
//             <p>
//               Artemis is more than an Applicant Tracking System—it's a complete ecosystem designed 
//               to revolutionize how staffing agencies operate. Built on cutting-edge AI technology 
//               and decades of industry expertise, we deliver solutions that are both powerful and 
//               intuitive, enabling teams to focus on what matters most: connecting great talent 
//               with exceptional opportunities.
//             </p>
//           </div>
//         </div>

//         <div className="about-content">
//           <div className="about-block">
//             <div className="about-icon">🎯</div>
//             <h3>Our Mission</h3>
//             <p>
//               To democratize enterprise-grade recruitment technology, making sophisticated 
//               ATS capabilities accessible to staffing agencies of all sizes. We believe that 
//               powerful tools shouldn't come with complexity or prohibitive costs—they should 
//               empower teams to work smarter, faster, and more effectively.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">👁️</div>
//             <h3>Our Vision</h3>
//             <p>
//               To become the global standard for intelligent staffing solutions, where every 
//               recruiter has access to AI-powered tools that eliminate repetitive tasks, 
//               surface the best candidates instantly, and provide actionable insights that 
//               drive better hiring decisions.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">💎</div>
//             <h3>Core Values</h3>
//             <ul>
//               <li><strong>Simplicity First:</strong> Elegant interfaces that reduce training time to minutes, not days</li>
//               <li><strong>Security by Design:</strong> Enterprise-grade protection for sensitive candidate data</li>
//               <li><strong>Continuous Innovation:</strong> Regular updates driven by real user feedback</li>
//               <li><strong>Customer Success:</strong> Your growth is our success—we're partners, not just vendors</li>
//               <li><strong>Transparency:</strong> No hidden fees, no surprise charges, no complicated pricing tiers</li>
//             </ul>
//           </div>
//         </div>

//         <div className="about-stats">
//           <div className="stat-card">
//             <div className="stat-number">10K+</div>
//             <div className="stat-label">Candidates Placed</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">500+</div>
//             <div className="stat-label">Active Agencies</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">99.9%</div>
//             <div className="stat-label">Platform Uptime</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">24/7</div>
//             <div className="stat-label">Support Available</div>
//           </div>
//         </div>

//         <div className="about-features-grid">
//           <div className="feature-item">
//             <div className="feature-icon">🚀</div>
//             <h4>Fast Implementation</h4>
//             <p>Go live in days, not months. Our streamlined onboarding gets you operational quickly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔗</div>
//             <h4>Seamless Integrations</h4>
//             <p>Connect with major VMS platforms, job boards, and HRMS systems effortlessly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🤖</div>
//             <h4>AI-Powered Matching</h4>
//             <p>Advanced algorithms surface the best candidates based on skills, experience, and fit.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">📊</div>
//             <h4>Real-Time Analytics</h4>
//             <p>Track key metrics, identify bottlenecks, and optimize your recruitment funnel.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔒</div>
//             <h4>Enterprise Security</h4>
//             <p>SOC 2 compliant infrastructure with end-to-end encryption and regular audits.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">💼</div>
//             <h4>Dedicated Support</h4>
//             <p>Expert assistance whenever you need it, with personalized training and resources.</p>
//           </div>
//         </div>

//         <div className="about-cta">
//           <h3>Ready to Transform Your Staffing Operations?</h3>
//           <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
//           <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//             Schedule Your Demo
//           </a>
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
//                   onChange={(e) =>
//                     setForm({ ...form, firstName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) =>
//                     setForm({ ...form, lastName: e.target.value })
//                   }
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
//                   onChange={(e) =>
//                     setForm({ ...form, company: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) =>
//                     setForm({ ...form, location: e.target.value })
//                   }
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
//             <button type="submit" className="submit-btn">
//               Request Demo
//             </button>
//           </form>
//         </div>
//       </section>

//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">
//                 💼
//               </a>
//               <a href="#" title="Facebook">
//                 📘
//               </a>
//               <a href="#" title="Twitter">
//                 🐦
//               </a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//             <a href="#products" onClick={handleScrollTo("#products")}>
//               Products
//             </a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>
//               Book Demo
//             </a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>
//               9330 Lyndon B Johnson Fwy #900
//               <br />
//               Dallas, TX, 75243
//             </p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         .app {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
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
//           min-height: 1.2em;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .typing-cursor {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: blink 1s step-end infinite;
//           margin-left: 4px;
//         }

//         @keyframes blink {
//           0%, 50% { opacity: 1; }
//           51%, 100% { opacity: 0; }
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

//         .superpowers {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .products {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//           overflow: hidden;
//         }

//         .products-slider-container {
//           max-width: 1400px;
//           margin: 0 auto;
//           position: relative;
//         }

//         .products-3d-slider {
//           overflow: hidden;
//           padding: 60px 0;
//           perspective: 2000px;
//         }

//         .products-carousel {
//           display: flex;
//           transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .product-card-3d {
//           min-width: 100%;
//           display: flex;
//           flex-direction: column;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(255, 255, 255, 0.15);
//           border-radius: 25px;
//           overflow: hidden;
//           transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//           transform-style: preserve-3d;
//           box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
//           animation: productFloat 4s ease-in-out infinite;
//         }

//         @keyframes productFloat {
//           0%, 100% { 
//             transform: translateY(0) rotateX(0deg);
//           }
//           50% { 
//             transform: translateY(-15px) rotateX(2deg);
//           }
//         }

//         .product-card-3d:hover {
//           box-shadow: 0 40px 100px rgba(102, 126, 234, 0.4);
//           border-color: rgba(102, 126, 234, 0.4);
//         }

//         .product-image-container {
//           width: 100%;
//           height: 400px;
//           overflow: hidden;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           position: relative;
//         }

//         .product-image-container img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s;
//         }

//         .product-card-3d:hover .product-image-container img {
//           transform: scale(1.05);
//         }

//         .product-content {
//           padding: 40px;
//         }

//         .product-content h3 {
//           font-size: 32px;
//           margin-bottom: 20px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .product-description {
//           color: #b8c5d6;
//           font-size: 18px;
//           line-height: 1.8;
//           margin-bottom: 25px;
//         }

//         .product-features {
//           list-style: none;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 12px;
//         }

//         .product-features li {
//           background: rgba(102, 126, 234, 0.2);
//           padding: 8px 20px;
//           border-radius: 20px;
//           color: #e0e6f0;
//           font-size: 14px;
//           border: 1px solid rgba(102, 126, 234, 0.3);
//         }

//         .product-controls {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 30px;
//           margin-top: 40px;
//         }

//         .product-nav-btn {
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border: none;
//           color: white;
//           font-size: 32px;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
//         }

//         .product-nav-btn:hover {
//           transform: scale(1.1);
//           box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
//         }

//         .product-dots {
//           display: flex;
//           gap: 12px;
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
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         @keyframes card3DFloat {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0);
//           }
//           33% { 
//             transform: perspective(1000px) rotateY(2deg) rotateX(1deg) translateY(-8px);
//           }
//           66% { 
//             transform: perspective(1000px) rotateY(-2deg) rotateX(-1deg) translateY(-4px);
//           }
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
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-15px);
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

//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-slider {
//           max-width: 900px;
//           margin: 0 auto;
//           overflow: hidden;
//           position: relative;
//         }

//         .testimonials-track {
//           display: flex;
//           transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .testimonial-card {
//           min-width: 100%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 60px 50px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           animation: card3DRotate 8s ease-in-out infinite;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//         }

//         @keyframes card3DRotate {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           25% { 
//             transform: perspective(1000px) rotateY(3deg) rotateX(2deg);
//           }
//           50% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           75% { 
//             transform: perspective(1000px) rotateY(-3deg) rotateX(-2deg);
//           }
//         }

//         .testimonial-card:hover {
//           box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4);
//           border-color: rgba(102, 126, 234, 0.3);
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-5px);
//         }

//         .testimonial-dots {
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//           margin-top: 40px;
//         }

//         .dot {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s;
//           padding: 0;
//         }

//         .dot:hover {
//           background: rgba(255, 255, 255, 0.5);
//           transform: scale(1.2);
//         }

//         .dot.active {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           width: 32px;
//           border-radius: 6px;
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
//           color: #e0e6f0;
//           line-height: 1.9;
//           font-style: italic;
//           font-size: 20px;
//           font-weight: 400;
//         }

//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-hero {
//           max-width: 1000px;
//           margin: 0 auto 80px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(255, 255, 255, 0.1);
//           border-radius: 25px;
//           padding: 60px;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         .about-hero-content h3 {
//           font-size: 36px;
//           margin-bottom: 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .about-hero-content p {
//           color: #d0d8e6;
//           font-size: 19px;
//           line-height: 1.9;
//           font-weight: 400;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 40px;
//         }

//         .about-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
//         }

//         .about-block {
//           background: rgba(255, 255, 255, 0.03);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .about-block:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
//           border-color: rgba(102, 126, 234, 0.3);
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p {
//           color: #c5d0e0;
//           line-height: 1.8;
//           font-size: 16px;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           color: #c5d0e0;
//           line-height: 1.9;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           font-size: 16px;
//         }

//         .about-block li:last-child {
//           border-bottom: none;
//         }

//         .about-block li strong {
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .about-stats {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 30px;
//         }

//         .stat-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(102, 126, 234, 0.2);
//           border-radius: 20px;
//           padding: 40px 30px;
//           text-align: center;
//           transition: all 0.4s;
//           animation: card3DFloat 5s ease-in-out infinite;
//         }

//         .stat-card:nth-child(2) {
//           animation-delay: 0.5s;
//         }

//         .stat-card:nth-child(3) {
//           animation-delay: 1s;
//         }

//         .stat-card:nth-child(4) {
//           animation-delay: 1.5s;
//         }

//         .stat-card:hover {
//           transform: translateY(-10px) scale(1.05);
//           border-color: rgba(102, 126, 234, 0.5);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
//         }

//         .stat-number {
//           font-size: 48px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 10px;
//         }

//         .stat-label {
//           color: #b8c5d6;
//           font-size: 16px;
//           font-weight: 500;
//         }

//         .about-features-grid {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 30px;
//         }

//         .feature-item {
//           background: rgba(255, 255, 255, 0.02);
//           backdrop-filter: blur(8px);
//           border: 1px solid rgba(255, 255, 255, 0.06);
//           border-radius: 15px;
//           padding: 30px;
//           transition: all 0.4s;
//         }

//         .feature-item:hover {
//           transform: translateY(-8px);
//           background: rgba(255, 255, 255, 0.04);
//           border-color: rgba(102, 126, 234, 0.3);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
//         }

//         .feature-icon {
//           font-size: 40px;
//           margin-bottom: 15px;
//           filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.3));
//         }

//         .feature-item h4 {
//           font-size: 20px;
//           margin-bottom: 12px;
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .feature-item p {
//           color: #b0bccf;
//           font-size: 15px;
//           line-height: 1.7;
//         }

//         .about-cta {
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: center;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(102, 126, 234, 0.25);
//           border-radius: 25px;
//           padding: 60px 40px;
//           box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
//         }

//         .about-cta h3 {
//           font-size: 32px;
//           margin-bottom: 20px;
//           color: #fff;
//         }

//         .about-cta p {
//           font-size: 18px;
//           color: #c5d0e0;
//           margin-bottom: 35px;
//           line-height: 1.8;
//         }

//         .about-cta .cta-button {
//           display: inline-block;
//           padding: 18px 50px;
//           font-size: 18px;
//         }

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

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }

//           .testimonial-card {
//             padding: 40px 30px;
//           }

//           .testimonial-text {
//             font-size: 18px;
//           }

//           .product-image-container {
//             height: 300px;
//           }

//           .product-content {
//             padding: 30px;
//           }

//           .product-content h3 {
//             font-size: 26px;
//           }

//           .product-description {
//             font-size: 16px;
//           }

//           .product-nav-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .about-hero {
//             padding: 40px 30px;
//           }

//           .about-hero-content h3 {
//             font-size: 28px;
//           }

//           .about-hero-content p {
//             font-size: 16px;
//           }

//           .about-stats {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 20px;
//           }

//           .stat-number {
//             font-size: 36px;
//           }

//           .stat-label {
//             font-size: 14px;
//           }

//           .about-cta {
//             padding: 40px 30px;
//           }

//           .about-cta h3 {
//             font-size: 26px;
//           }

//           .about-cta p {
//             font-size: 16px;
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

//           .about-stats {
//             grid-template-columns: 1fr;
//           }

//           .about-features-grid {
//             grid-template-columns: 1fr;
//           }

//           .about-hero {
//             padding: 30px 20px;
//           }

//           .stat-card {
//             padding: 30px 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
















// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";

// if (typeof window !== 'undefined') {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

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
//     source: "",
//   });
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const testimonials = [
//     {
//       initials: "MS",
//       name: "Maria Sanchez",
//       title: "Ops Manager at a staffing company",
//       text: "Artemis gives us speed without chaos. Our time-to-submit dropped immediately."
//     },
//     {
//       initials: "JT",
//       name: "James Turner",
//       title: "Director at a healthcare agency",
//       text: "The interface feels obvious. My team adopted it in a day—no long training calls."
//     },
//     {
//       initials: "AK",
//       name: "Anita Kapoor",
//       title: "CEO of a leading staffing firm",
//       text: "Bulk parsing + RTR flows in one place—this is exactly what we needed."
//     }
//   ];

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);
//   const mysteryPlanetRef = useRef<THREE.Group | null>(null);
//   // const cometsRef = useRef<THREE.Points[]>([]);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
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

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const planetGroup = new THREE.Group();
//     mysteryPlanetRef.current = planetGroup;

//     const planetGeometry = new THREE.IcosahedronGeometry(4.0, 5);
//     const positions = planetGeometry.attributes.position.array as Float32Array;
//     for (let i = 0; i < positions.length; i += 3) {
//       const x = positions[i];
//       const y = positions[i + 1];
//       const z = positions[i + 2];
//       const distance = Math.sqrt(x * x + y * y + z * z);
//       const distortion = 1 + 0.04 * Math.sin(distance * 3) * Math.random();
//       positions[i] *= distortion;
//       positions[i + 1] *= distortion;
//       positions[i + 2] *= distortion;
//     }
//     planetGeometry.attributes.position.needsUpdate = true;
//     planetGeometry.computeVertexNormals();

//     const planetMaterial = new THREE.MeshStandardMaterial({
//       color: 0xb59ac7,
//       metalness: 0.05,
//       roughness: 0.85,
//       emissive: 0x1a0f25,
//       emissiveIntensity: 0.08,
//     });

//     const planet = new THREE.Mesh(planetGeometry, planetMaterial);
//     planetGroup.add(planet);

//     const atmosphereGeometry = new THREE.SphereGeometry(4.65, 64, 64);
//     const atmosphereMaterial = new THREE.MeshStandardMaterial({
//       color: 0xc5aed8,
//       transparent: true,
//       opacity: 0.04,
//       side: THREE.BackSide,
//       metalness: 0,
//       roughness: 1,
//       depthWrite: false,
//     });
//     const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
//     planetGroup.add(atmosphere);

//     const asteroidBelt = new THREE.Group();
//     const asteroidCount = 500;
    
//     for (let i = 0; i < asteroidCount; i++) {
//       const asteroidSize = 0.06 + Math.random() * 0.18;
//       const asteroidGeometry = new THREE.DodecahedronGeometry(asteroidSize, 0);
      
//       const hue = 0.08 + Math.random() * 0.05;
//       const saturation = 0.25 + Math.random() * 0.15;
//       const lightness = 0.25 + Math.random() * 0.2;
      
//       const asteroidMaterial = new THREE.MeshStandardMaterial({
//         color: new THREE.Color().setHSL(hue, saturation, lightness),
//         metalness: 0.15,
//         roughness: 0.95,
//       });
//       const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

//       const angle = (i / asteroidCount) * Math.PI * 2;
//       const radius = 5.5 + Math.random() * 2.0;
//       const height = (Math.random() - 0.5) * 0.4;

//       asteroid.position.set(
//         Math.cos(angle) * radius,
//         height,
//         Math.sin(angle) * radius
//       );

//       asteroid.rotation.x = Math.random() * Math.PI;
//       asteroid.rotation.y = Math.random() * Math.PI;
//       asteroid.rotation.z = Math.random() * Math.PI;

//       asteroidBelt.add(asteroid);
//     }
//     planetGroup.add(asteroidBelt);

//     for (let i = 0; i < 3; i++) {
//       const crystalGeometry = new THREE.OctahedronGeometry(0.35, 1);
//       const crystalMaterial = new THREE.MeshStandardMaterial({
//         color: 0xa89488,
//         metalness: 0.2,
//         roughness: 0.75,
//         emissive: 0x000000,
//         emissiveIntensity: 0,
//       });
//       const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);

//       const angle = (i / 3) * Math.PI * 2;
//       const radius = 6.5;
//       crystal.position.set(
//         Math.cos(angle) * radius,
//         Math.sin(angle) * 0.8,
//         Math.sin(angle) * radius
//       );
//       planetGroup.add(crystal);
//     }

//     planetGroup.position.set(22, 6, -12);
//     scene.add(planetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.35);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xf093fb, 0.12, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const planetLight = new THREE.PointLight(0xc5b3d8, 0.15, 30);
//     planetLight.position.set(0, 0, 0);
//     planetGroup.add(planetLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.12);
//     scene.add(hemisphereLight);

//     camera.position.set(0, 0, 20);

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

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

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

//       if (mysteryPlanetRef.current) {
//         const planetGroup = mysteryPlanetRef.current;

//         planetGroup.rotation.y += 0.003;
//         planetGroup.rotation.x += 0.001;

//         planetGroup.children.forEach((child, index) => {
//           if (index > 2) {
//             child.rotation.x += 0.02;
//             child.rotation.y += 0.03;
//             child.position.y += Math.sin(time * 2 + index) * 0.01;
//           }
//         });

//         if (planetGroup.children[2] && planetGroup.children[2].type === 'Group') {
//           planetGroup.children[2].rotation.y += 0.005;
//         }

//         const scrollProgress = Math.min(scrollY / 2000, 1);

//         const scale = 1 + scrollProgress * 0.5;
//         planetGroup.scale.set(scale, scale, scale);

//         planetGroup.position.x = 22 - scrollProgress * 8;
//         planetGroup.position.y = 6 + scrollProgress * 5;
//         planetGroup.position.z = -12 + scrollProgress * 3;

//         const planetMaterial = (planetGroup.children[0] as THREE.Mesh)
//           .material as THREE.MeshStandardMaterial;
//         planetMaterial.emissiveIntensity = 0.08 + scrollProgress * 0.02;

//         const atmosphereMaterial = (planetGroup.children[1] as THREE.Mesh)
//           .material as THREE.MeshStandardMaterial;
//         atmosphereMaterial.opacity = 0.04 + Math.sin(time * 2) * 0.01;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 20;
//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.position.z = baseZ;

//         cameraRef.current.rotation.z = scrollEffect * 0.05;
//       }

//       pointLight.position.x = Math.sin(time) * 2.5;
//       pointLight.position.y = Math.cos(time) * 2.5;

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

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 200; i++) {
//       const star = document.createElement("div");
//       star.className = "star";

//       const size = Math.random() * 4 + 1;
//       star.style.width = size + "px";
//       star.style.height = size + "px";

//       star.style.left = Math.random() * 100 + "%";
//       star.style.top = Math.random() * 100 + "%";

//       const isGolden = Math.random() > 0.92;
//       if (isGolden) {
//         star.style.backgroundColor = "#ffd700";
//         star.style.boxShadow = "0 0 4px #ffd700, 0 0 8px #ffd700";
//         star.style.animationDelay = Math.random() * 5 + "s";
//         star.style.animationDuration = Math.random() * 4 + 3 + "s";
//       } else {
//         star.style.backgroundColor = "#ffffff";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         star.style.animationDuration = Math.random() * 3 + 2 + "s";
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const handleScrollTo =
//     (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

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
//     alert(
//       "Thank you for your interest! We will contact you soon to schedule your demo."
//     );
//     setForm({
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//       location: "",
//       source: "",
//     });
//   };

//   return (
//     <div className="app">
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <div id="canvas-container" ref={canvasRef} />

//       <nav>
//         <div className="logo">Artemis</div>
//         <div
//           className={`menu-toggle ${menuOpen ? "active" : ""}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <li>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//           </li>
//           <li>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//           </li>
//           <li>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="#demo"
//               className="nav-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Demo
//             </a>
//           </li>
//           <li>
//             <a href="#contact" onClick={handleScrollTo("#contact")}>
//               Contact
//             </a>
//           </li>
//         </ul>
//       </nav>

//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">
//             Artemis stays colorful yet calm: no unnecessary complexity, easy to
//             learn, and fast to use. With only basic knowledge and minimal
//             navigation training, you become an expert.
//           </p>
//           <div className="cta-buttons">
//             <a
//               href="#demo"
//               className="cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="cta-button secondary"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">
//           A revolution in staffing technology—innovation that empowers your
//           every hire.
//         </p>
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
//         <p className="section-subtitle">
//           Real stories from teams that thrive with Artemis.
//         </p>
//         <div className="testimonials-slider">
//           <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-author">
//                   <div className="author-avatar">{testimonial.initials}</div>
//                   <div className="author-info">
//                     <h4>{testimonial.name}</h4>
//                     <p>{testimonial.title}</p>
//                   </div>
//                 </div>
//                 <p className="testimonial-text">
//                   &quot;{testimonial.text}&quot;
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="testimonial-dots">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`dot ${currentTestimonial === index ? 'active' : ''}`}
//                 onClick={() => setCurrentTestimonial(index)}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">
//           Building the future of recruitment technology with innovation, integrity, and intelligence.
//         </p>
        
//         <div className="about-hero">
//           <div className="about-hero-content">
//             <h3>Redefining Staffing Excellence</h3>
//             <p>
//               Artemis is more than an Applicant Tracking System—it's a complete ecosystem designed 
//               to revolutionize how staffing agencies operate. Built on cutting-edge AI technology 
//               and decades of industry expertise, we deliver solutions that are both powerful and 
//               intuitive, enabling teams to focus on what matters most: connecting great talent 
//               with exceptional opportunities.
//             </p>
//           </div>
//         </div>

//         <div className="about-content">
//           <div className="about-block">
//             <div className="about-icon">🎯</div>
//             <h3>Our Mission</h3>
//             <p>
//               To democratize enterprise-grade recruitment technology, making sophisticated 
//               ATS capabilities accessible to staffing agencies of all sizes. We believe that 
//               powerful tools shouldn't come with complexity or prohibitive costs—they should 
//               empower teams to work smarter, faster, and more effectively.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">👁️</div>
//             <h3>Our Vision</h3>
//             <p>
//               To become the global standard for intelligent staffing solutions, where every 
//               recruiter has access to AI-powered tools that eliminate repetitive tasks, 
//               surface the best candidates instantly, and provide actionable insights that 
//               drive better hiring decisions.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">💎</div>
//             <h3>Core Values</h3>
//             <ul>
//               <li><strong>Simplicity First:</strong> Elegant interfaces that reduce training time to minutes, not days</li>
//               <li><strong>Security by Design:</strong> Enterprise-grade protection for sensitive candidate data</li>
//               <li><strong>Continuous Innovation:</strong> Regular updates driven by real user feedback</li>
//               <li><strong>Customer Success:</strong> Your growth is our success—we're partners, not just vendors</li>
//               <li><strong>Transparency:</strong> No hidden fees, no surprise charges, no complicated pricing tiers</li>
//             </ul>
//           </div>
//         </div>

//         <div className="about-stats">
//           <div className="stat-card">
//             <div className="stat-number">10K+</div>
//             <div className="stat-label">Candidates Placed</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">500+</div>
//             <div className="stat-label">Active Agencies</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">99.9%</div>
//             <div className="stat-label">Platform Uptime</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">24/7</div>
//             <div className="stat-label">Support Available</div>
//           </div>
//         </div>

//         <div className="about-features-grid">
//           <div className="feature-item">
//             <div className="feature-icon">🚀</div>
//             <h4>Fast Implementation</h4>
//             <p>Go live in days, not months. Our streamlined onboarding gets you operational quickly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔗</div>
//             <h4>Seamless Integrations</h4>
//             <p>Connect with major VMS platforms, job boards, and HRMS systems effortlessly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🤖</div>
//             <h4>AI-Powered Matching</h4>
//             <p>Advanced algorithms surface the best candidates based on skills, experience, and fit.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">📊</div>
//             <h4>Real-Time Analytics</h4>
//             <p>Track key metrics, identify bottlenecks, and optimize your recruitment funnel.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔒</div>
//             <h4>Enterprise Security</h4>
//             <p>SOC 2 compliant infrastructure with end-to-end encryption and regular audits.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">💼</div>
//             <h4>Dedicated Support</h4>
//             <p>Expert assistance whenever you need it, with personalized training and resources.</p>
//           </div>
//         </div>

//         <div className="about-cta">
//           <h3>Ready to Transform Your Staffing Operations?</h3>
//           <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
//           <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//             Schedule Your Demo
//           </a>
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
//                   onChange={(e) =>
//                     setForm({ ...form, firstName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) =>
//                     setForm({ ...form, lastName: e.target.value })
//                   }
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
//                   onChange={(e) =>
//                     setForm({ ...form, company: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) =>
//                     setForm({ ...form, location: e.target.value })
//                   }
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
//             <button type="submit" className="submit-btn">
//               Request Demo
//             </button>
//           </form>
//         </div>
//       </section>

//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">
//                 💼
//               </a>
//               <a href="#" title="Facebook">
//                 📘
//               </a>
//               <a href="#" title="Twitter">
//                 🐦
//               </a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>
//               Book Demo
//             </a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>
//               9330 Lyndon B Johnson Fwy #900
//               <br />
//               Dallas, TX, 75243
//             </p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         html {
//           touch-action: manipulation;
//         }

//         html, body {
//           overflow-x: hidden;
//           overflow-y: scroll;
//           height: auto;
//           min-height: 100%;
//           scroll-behavior: smooth;
//         }

//         .app {
//           font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//           position: relative;
//           min-height: 100vh;
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

//         #canvas-container * {
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
//           pointer-events: none;
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

//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% { 
//             opacity: 0.3; 
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
//           }
//           50% { 
//             opacity: 0.8; 
//             transform: scale(1.2) rotate(180deg);
//             box-shadow: 0 0 6px #ffd700, 0 0 12px #ffd700;
//           }
//         }

//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//           pointer-events: none;
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
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         @keyframes card3DFloat {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0);
//           }
//           33% { 
//             transform: perspective(1000px) rotateY(2deg) rotateX(1deg) translateY(-8px);
//           }
//           66% { 
//             transform: perspective(1000px) rotateY(-2deg) rotateX(-1deg) translateY(-4px);
//           }
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
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-15px);
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

//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-slider {
//           max-width: 900px;
//           margin: 0 auto;
//           overflow: hidden;
//           position: relative;
//         }

//         .testimonials-track {
//           display: flex;
//           transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .testimonial-card {
//           min-width: 100%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 60px 50px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           animation: card3DRotate 8s ease-in-out infinite;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//         }

//         @keyframes card3DRotate {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           25% { 
//             transform: perspective(1000px) rotateY(3deg) rotateX(2deg);
//           }
//           50% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           75% { 
//             transform: perspective(1000px) rotateY(-3deg) rotateX(-2deg);
//           }
//         }

//         .testimonial-card:hover {
//           box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4);
//           border-color: rgba(102, 126, 234, 0.3);
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-5px);
//         }

//         .testimonial-dots {
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//           margin-top: 40px;
//         }

//         .dot {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s;
//           padding: 0;
//         }

//         .dot:hover {
//           background: rgba(255, 255, 255, 0.5);
//           transform: scale(1.2);
//         }

//         .dot.active {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           width: 32px;
//           border-radius: 6px;
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
//           color: #e0e6f0;
//           line-height: 1.9;
//           font-style: italic;
//           font-size: 20px;
//           font-weight: 400;
//         }

//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-hero {
//           max-width: 1000px;
//           margin: 0 auto 80px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(255, 255, 255, 0.1);
//           border-radius: 25px;
//           padding: 60px;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         .about-hero-content h3 {
//           font-size: 36px;
//           margin-bottom: 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .about-hero-content p {
//           color: #d0d8e6;
//           font-size: 19px;
//           line-height: 1.9;
//           font-weight: 400;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 40px;
//         }

//         .about-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
//         }

//         .about-block {
//           background: rgba(255, 255, 255, 0.03);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .about-block:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
//           border-color: rgba(102, 126, 234, 0.3);
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p {
//           color: #c5d0e0;
//           line-height: 1.8;
//           font-size: 16px;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           color: #c5d0e0;
//           line-height: 1.9;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           font-size: 16px;
//         }

//         .about-block li:last-child {
//           border-bottom: none;
//         }

//         .about-block li strong {
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .about-stats {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 30px;
//         }

//         .stat-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(102, 126, 234, 0.2);
//           border-radius: 20px;
//           padding: 40px 30px;
//           text-align: center;
//           transition: all 0.4s;
//           animation: card3DFloat 5s ease-in-out infinite;
//         }

//         .stat-card:nth-child(2) {
//           animation-delay: 0.5s;
//         }

//         .stat-card:nth-child(3) {
//           animation-delay: 1s;
//         }

//         .stat-card:nth-child(4) {
//           animation-delay: 1.5s;
//         }

//         .stat-card:hover {
//           transform: translateY(-10px) scale(1.05);
//           border-color: rgba(102, 126, 234, 0.5);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
//         }

//         .stat-number {
//           font-size: 48px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 10px;
//         }

//         .stat-label {
//           color: #b8c5d6;
//           font-size: 16px;
//           font-weight: 500;
//         }

//         .about-features-grid {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 30px;
//         }

//         .feature-item {
//           background: rgba(255, 255, 255, 0.02);
//           backdrop-filter: blur(8px);
//           border: 1px solid rgba(255, 255, 255, 0.06);
//           border-radius: 15px;
//           padding: 30px;
//           transition: all 0.4s;
//         }

//         .feature-item:hover {
//           transform: translateY(-8px);
//           background: rgba(255, 255, 255, 0.04);
//           border-color: rgba(102, 126, 234, 0.3);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
//         }

//         .feature-icon {
//           font-size: 40px;
//           margin-bottom: 15px;
//           filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.3));
//         }

//         .feature-item h4 {
//           font-size: 20px;
//           margin-bottom: 12px;
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .feature-item p {
//           color: #b0bccf;
//           font-size: 15px;
//           line-height: 1.7;
//         }

//         .about-cta {
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: center;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(102, 126, 234, 0.25);
//           border-radius: 25px;
//           padding: 60px 40px;
//           box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
//         }

//         .about-cta h3 {
//           font-size: 32px;
//           margin-bottom: 20px;
//           color: #fff;
//         }

//         .about-cta p {
//           font-size: 18px;
//           color: #c5d0e0;
//           margin-bottom: 35px;
//           line-height: 1.8;
//         }

//         .about-cta .cta-button {
//           display: inline-block;
//           padding: 18px 50px;
//           font-size: 18px;
//         }

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

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }

//           .testimonial-card {
//             padding: 40px 30px;
//           }

//           .testimonial-text {
//             font-size: 18px;
//           }

//           .about-hero {
//             padding: 40px 30px;
//           }

//           .about-hero-content h3 {
//             font-size: 28px;
//           }

//           .about-hero-content p {
//             font-size: 16px;
//           }

//           .about-stats {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 20px;
//           }

//           .stat-number {
//             font-size: 36px;
//           }

//           .stat-label {
//             font-size: 14px;
//           }

//           .about-cta {
//             padding: 40px 30px;
//           }

//           .about-cta h3 {
//             font-size: 26px;
//           }

//           .about-cta p {
//             font-size: 16px;
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

//           .about-stats {
//             grid-template-columns: 1fr;
//           }

//           .about-features-grid {
//             grid-template-columns: 1fr;
//           }

//           .about-hero {
//             padding: 30px 20px;
//           }

//           .stat-card {
//             padding: 30px 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;














































































// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";

// // Font loading
// if (typeof window !== 'undefined') {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   company: string;
//   location: string;
//   source: string;
// }

// interface Testimonial {
//   initials: string;
//   name: string;
//   title: string;
//   text: string;
// }

// const Home: React.FC = () => {
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     company: "",
//     location: "",
//     source: "",
//   });
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

//   const testimonials: Testimonial[] = [
//     {
//       initials: "MS",
//       name: "Maria Sanchez",
//       title: "Ops Manager at a staffing company",
//       text: "Artemis gives us speed without chaos. Our time-to-submit dropped immediately."
//     },
//     {
//       initials: "JT",
//       name: "James Turner",
//       title: "Director at a healthcare agency",
//       text: "The interface feels obvious. My team adopted it in a day—no long training calls."
//     },
//     {
//       initials: "AK",
//       name: "Anita Kapoor",
//       title: "CEO of a leading staffing firm",
//       text: "Bulk parsing + RTR flows in one place—this is exactly what we needed."
//     }
//   ];

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const moonCanvasRef = useRef<HTMLCanvasElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);

//   // Canvas moon animation
//   useEffect(() => {
//     if (!moonCanvasRef.current) return;

//     const canvas = moonCanvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);
//     let scrollY = 0;
//     let rotationAngle = 0;

//     const handleResize = (): void => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("scroll", handleScroll);

//     let moonAngle = Math.PI * 0.2;
//     const baseMoonRadius = 70;
//     const baseOrbitRadiusX = width * 0.12;
//     const baseOrbitRadiusY = width * 0.1;
//     const baseMoonCenterX = width * 0.75;
//     const baseMoonCenterY = height * 0.25;

//     const drawMoon = (): void => {
//       const scrollProgress = Math.min(scrollY / 2000, 1);
      
//       const moonRadius = baseMoonRadius * (1 + scrollProgress * 0.5);
//       const orbitRadiusX = baseOrbitRadiusX * (1 + scrollProgress * 0.3);
//       const orbitRadiusY = baseOrbitRadiusY * (1 + scrollProgress * 0.3);
      
//       const moonCenterX = baseMoonCenterX - scrollProgress * width * 0.1;
//       const moonCenterY = baseMoonCenterY + scrollProgress * height * 0.08;
      
//       const moonX = moonCenterX + Math.cos(moonAngle) * orbitRadiusX;
//       const moonY = moonCenterY + Math.sin(moonAngle) * orbitRadiusY;

//       ctx.save();
//       ctx.translate(moonX, moonY);
//       ctx.rotate(rotationAngle);

//       const moonGlow = ctx.createRadialGradient(
//         0, 0, moonRadius * 0.3,
//         0, 0, moonRadius * 2.8
//       );
//       moonGlow.addColorStop(0, "rgba(255,255,245,0.5)");
//       moonGlow.addColorStop(0.4, "rgba(255,255,235,0.25)");
//       moonGlow.addColorStop(0.7, "rgba(250,245,230,0.1)");
//       moonGlow.addColorStop(1, "rgba(245,240,225,0)");

//       ctx.fillStyle = moonGlow;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius * 2.8, 0, Math.PI * 2);
//       ctx.fill();

//       const moonBase = ctx.createRadialGradient(
//         -moonRadius * 0.3, -moonRadius * 0.3, 0,
//         0, 0, moonRadius
//       );
//       moonBase.addColorStop(0, "rgba(255,255,255,1)");
//       moonBase.addColorStop(0.5, "rgba(252,252,250,0.98)");
//       moonBase.addColorStop(1, "rgba(248,248,245,0.95)");

//       ctx.fillStyle = moonBase;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
//       ctx.fill();

//       for (let i = 0; i < 15; i++) {
//         const angle = (i / 15) * Math.PI * 2;
//         const radius = moonRadius * 0.6;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;
        
//         const textureGradient = ctx.createRadialGradient(
//           x, y, 0,
//           x, y, moonRadius * 0.25
//         );
//         textureGradient.addColorStop(0, "rgba(255,255,255,0.08)");
//         textureGradient.addColorStop(1, "rgba(255,255,255,0)");
        
//         ctx.fillStyle = textureGradient;
//         ctx.beginPath();
//         ctx.arc(x, y, moonRadius * 0.25, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       for (let i = 0; i < 8; i++) {
//         const waveAngle = (i / 8) * Math.PI * 2 + rotationAngle * 2;
//         const waveRadius = moonRadius * 0.7;
//         const waveX = Math.cos(waveAngle) * waveRadius;
//         const waveY = Math.sin(waveAngle) * waveRadius;
        
//         const waveGradient = ctx.createRadialGradient(
//           waveX, waveY, 0,
//           waveX, waveY, moonRadius * 0.2
//         );
//         waveGradient.addColorStop(0, "rgba(255,255,255,0.06)");
//         waveGradient.addColorStop(1, "rgba(255,255,255,0)");
        
//         ctx.fillStyle = waveGradient;
//         ctx.beginPath();
//         ctx.arc(waveX, waveY, moonRadius * 0.2, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       const shineGradient = ctx.createRadialGradient(
//         -moonRadius * 0.35, -moonRadius * 0.35, 0,
//         -moonRadius * 0.35, -moonRadius * 0.35, moonRadius * 0.65
//       );
//       shineGradient.addColorStop(0, "rgba(255,255,255,0.9)");
//       shineGradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
//       shineGradient.addColorStop(1, "rgba(255,255,255,0)");

//       ctx.fillStyle = shineGradient;
//       ctx.beginPath();
//       ctx.arc(-moonRadius * 0.35, -moonRadius * 0.35, moonRadius * 0.65, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.restore();
//     };

//     const animate = (): void => {
//       ctx.clearRect(0, 0, width, height);
//       drawMoon();
//       moonAngle += 0.0006;
//       rotationAngle += 0.0003;
//       requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 80; i++) {
//       const star = document.createElement("div");
//       star.className = "star";

//       const size = Math.random() * 3 + 1;
//       star.style.width = size + "px";
//       star.style.height = size + "px";

//       star.style.left = Math.random() * 100 + "%";
//       star.style.top = Math.random() * 100 + "%";

//       const isGolden = Math.random() > 0.94;
//       if (isGolden) {
//         star.style.backgroundColor = "#ffd700";
//         star.style.boxShadow = "0 0 4px #ffd700, 0 0 8px #ffd700";
//         star.style.animationDelay = Math.random() * 5 + "s";
//         star.style.animationDuration = Math.random() * 4 + 3 + "s";
//       } else {
//         star.style.backgroundColor = "#ffffff";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         star.style.animationDuration = Math.random() * 3 + 2 + "s";
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
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

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const bluePlanetGroup = new THREE.Group();
//     const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
//     const bluePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0x6b9fff,
//       metalness: 0.3,
//       roughness: 0.5,
//       emissive: 0x4a7acc,
//       emissiveIntensity: 0.1,
//     });
//     const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
//     bluePlanetGroup.add(bluePlanet);
//     bluePlanetGroup.position.set(35, 15, -40);
//     scene.add(bluePlanetGroup);

//     const orangePlanetGroup = new THREE.Group();
//     const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
//     const orangePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0xffaa66,
//       metalness: 0.2,
//       roughness: 0.6,
//       emissive: 0xcc6633,
//       emissiveIntensity: 0.08,
//     });
//     const orangePlanet = new THREE.Mesh(orangePlanetGeometry, orangePlanetMaterial);
//     orangePlanetGroup.add(orangePlanet);
//     orangePlanetGroup.position.set(-30, -12, -45);
//     scene.add(orangePlanetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.set(0, 0, 20);

//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent): void => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

//     const animate = (): void => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 20;
//         cameraRef.current.position.z = baseZ;

//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.rotation.z = scrollEffect * 0.05;
//       }

//       pointLight.position.x = Math.sin(time) * 2.5;
//       pointLight.position.y = Math.cos(time) * 2.5;

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = (): void => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   const handleScrollTo =
//     (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

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
//     alert(
//       "Thank you for your interest! We will contact you soon to schedule your demo."
//     );
//     setForm({
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//       location: "",
//       source: "",
//     });
//   };

//   return (
//     <div className="app">
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <canvas 
//         ref={moonCanvasRef} 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 2,
//           pointerEvents: 'none'
//         }}
//       />
//       <div id="canvas-container" ref={canvasRef} />

//       <nav>
//         <div className="logo">Artemis</div>
//         <div
//           className={`menu-toggle ${menuOpen ? "active" : ""}`}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//           <li>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//           </li>
//           <li>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//           </li>
//           <li>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="#demo"
//               className="nav-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Demo
//             </a>
//           </li>
//           <li>
//             <a href="#contact" onClick={handleScrollTo("#contact")}>
//               Contact
//             </a>
//           </li>
//         </ul>
//       </nav>

//       <section className="hero" id="home">
//         <div className="hero-content">
//           <h1>Supercharged by Next-Gen AI Brilliance</h1>
//           <p className="subtitle">Streamlined · Minimalist · Balance</p>
//           <p className="tagline">
//             Artemis stays colorful yet calm: no unnecessary complexity, easy to
//             learn, and fast to use. With only basic knowledge and minimal
//             navigation training, you become an expert.
//           </p>
//           <div className="cta-buttons">
//             <a
//               href="#demo"
//               className="cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="cta-button secondary"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               View Superpowers
//             </a>
//           </div>
//         </div>
//         <div className="scroll-indicator"></div>
//       </section>

//       <section className="superpowers" id="superpowers">
//         <h2 className="section-title">Talent Superpowers</h2>
//         <p className="section-subtitle">
//           A revolution in staffing technology—innovation that empowers your
//           every hire.
//         </p>
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
//         <p className="section-subtitle">
//           Real stories from teams that thrive with Artemis.
//         </p>
//         <div className="testimonials-slider">
//           <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-author">
//                   <div className="author-avatar">{testimonial.initials}</div>
//                   <div className="author-info">
//                     <h4>{testimonial.name}</h4>
//                     <p>{testimonial.title}</p>
//                   </div>
//                 </div>
//                 <p className="testimonial-text">
//                   &quot;{testimonial.text}&quot;
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="testimonial-dots">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`dot ${currentTestimonial === index ? 'active' : ''}`}
//                 onClick={() => setCurrentTestimonial(index)}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="about" id="about">
//         <h2 className="section-title">About Artemis</h2>
//         <p className="section-subtitle">
//           Building the future of recruitment technology with innovation, integrity, and intelligence.
//         </p>
        
//         <div className="about-hero">
//           <div className="about-hero-content">
//             <h3>Redefining Staffing Excellence</h3>
//             <p>
//               Artemis is more than an Applicant Tracking System—it's a complete ecosystem designed 
//               to revolutionize how staffing agencies operate. Built on cutting-edge AI technology 
//               and decades of industry expertise, we deliver solutions that are both powerful and 
//               intuitive, enabling teams to focus on what matters most: connecting great talent 
//               with exceptional opportunities.
//             </p>
//           </div>
//         </div>

//         <div className="about-content">
//           <div className="about-block">
//             <div className="about-icon">🎯</div>
//             <h3>Our Mission</h3>
//             <p>
//               To democratize enterprise-grade recruitment technology, making sophisticated 
//               ATS capabilities accessible to staffing agencies of all sizes. We believe that 
//               powerful tools shouldn't come with complexity or prohibitive costs—they should 
//               empower teams to work smarter, faster, and more effectively.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">👁️</div>
//             <h3>Our Vision</h3>
//             <p>
//               To become the global standard for intelligent staffing solutions, where every 
//               recruiter has access to AI-powered tools that eliminate repetitive tasks, 
//               surface the best candidates instantly, and provide actionable insights that 
//               drive better hiring decisions.
//             </p>
//           </div>

//           <div className="about-block">
//             <div className="about-icon">💎</div>
//             <h3>Core Values</h3>
//             <ul>
//               <li><strong>Simplicity First:</strong> Elegant interfaces that reduce training time to minutes, not days</li>
//               <li><strong>Security by Design:</strong> Enterprise-grade protection for sensitive candidate data</li>
//               <li><strong>Continuous Innovation:</strong> Regular updates driven by real user feedback</li>
//               <li><strong>Customer Success:</strong> Your growth is our success—we're partners, not just vendors</li>
//               <li><strong>Transparency:</strong> No hidden fees, no surprise charges, no complicated pricing tiers</li>
//             </ul>
//           </div>
//         </div>

//         <div className="about-stats">
//           <div className="stat-card">
//             <div className="stat-number">10K+</div>
//             <div className="stat-label">Candidates Placed</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">500+</div>
//             <div className="stat-label">Active Agencies</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">99.9%</div>
//             <div className="stat-label">Platform Uptime</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">24/7</div>
//             <div className="stat-label">Support Available</div>
//           </div>
//         </div>

//         <div className="about-features-grid">
//           <div className="feature-item">
//             <div className="feature-icon">🚀</div>
//             <h4>Fast Implementation</h4>
//             <p>Go live in days, not months. Our streamlined onboarding gets you operational quickly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔗</div>
//             <h4>Seamless Integrations</h4>
//             <p>Connect with major VMS platforms, job boards, and HRMS systems effortlessly.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🤖</div>
//             <h4>AI-Powered Matching</h4>
//             <p>Advanced algorithms surface the best candidates based on skills, experience, and fit.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">📊</div>
//             <h4>Real-Time Analytics</h4>
//             <p>Track key metrics, identify bottlenecks, and optimize your recruitment funnel.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">🔒</div>
//             <h4>Enterprise Security</h4>
//             <p>SOC 2 compliant infrastructure with end-to-end encryption and regular audits.</p>
//           </div>
//           <div className="feature-item">
//             <div className="feature-icon">💼</div>
//             <h4>Dedicated Support</h4>
//             <p>Expert assistance whenever you need it, with personalized training and resources.</p>
//           </div>
//         </div>

//         <div className="about-cta">
//           <h3>Ready to Transform Your Staffing Operations?</h3>
//           <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
//           <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
//             Schedule Your Demo
//           </a>
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
//                   onChange={(e) =>
//                     setForm({ ...form, firstName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   required
//                   value={form.lastName}
//                   onChange={(e) =>
//                     setForm({ ...form, lastName: e.target.value })
//                   }
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
//                   onChange={(e) =>
//                     setForm({ ...form, company: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="location">Location (State)</label>
//                 <input
//                   type="text"
//                   id="location"
//                   required
//                   value={form.location}
//                   onChange={(e) =>
//                     setForm({ ...form, location: e.target.value })
//                   }
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
//             <button type="submit" className="submit-btn">
//               Request Demo
//             </button>
//           </form>
//         </div>
//       </section>

//       <footer id="contact">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h4>Artemis ATS</h4>
//             <p>Supercharged recruiting technology for modern staffing teams.</p>
//             <div className="social-links">
//               <a href="#" title="LinkedIn">
//                 💼
//               </a>
//               <a href="#" title="Facebook">
//                 📘
//               </a>
//               <a href="#" title="Twitter">
//                 🐦
//               </a>
//             </div>
//           </div>
//           <div className="footer-section">
//             <h4>Quick Links</h4>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
//               Superpowers
//             </a>
//             <a href="#voices" onClick={handleScrollTo("#voices")}>
//               Voices
//             </a>
//             <a href="#about" onClick={handleScrollTo("#about")}>
//               About
//             </a>
//             <a href="#demo" onClick={handleScrollTo("#demo")}>
//               Book Demo
//             </a>
//           </div>
//           <div className="footer-section">
//             <h4>Contact</h4>
//             <p>
//               9330 Lyndon B Johnson Fwy #900
//               <br />
//               Dallas, TX, 75243
//             </p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         html {
//           touch-action: manipulation;
//         }

//         html, body {
//           overflow-x: hidden;
//           overflow-y: scroll;
//           height: auto;
//           min-height: 100%;
//           scroll-behavior: smooth;
//         }

//         .app {
//           font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           background: #0a0e27;
//           color: #fff;
//           overflow-x: hidden;
//           position: relative;
//           min-height: 100vh;
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

//         #canvas-container * {
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
//           pointer-events: none;
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

//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% { 
//             opacity: 0.3; 
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
//           }
//           50% { 
//             opacity: 0.8; 
//             transform: scale(1.2) rotate(180deg);
//             box-shadow: 0 0 6px #ffd700, 0 0 12px #ffd700;
//           }
//         }

//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//           pointer-events: none;
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
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         @keyframes card3DFloat {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0);
//           }
//           33% { 
//             transform: perspective(1000px) rotateY(2deg) rotateX(1deg) translateY(-8px);
//           }
//           66% { 
//             transform: perspective(1000px) rotateY(-2deg) rotateX(-1deg) translateY(-4px);
//           }
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
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-15px);
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

//         .voices {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .testimonials-slider {
//           max-width: 900px;
//           margin: 0 auto;
//           overflow: hidden;
//           position: relative;
//         }

//         .testimonials-track {
//           display: flex;
//           transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .testimonial-card {
//           min-width: 100%;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 60px 50px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           animation: card3DRotate 8s ease-in-out infinite;
//           transform-style: preserve-3d;
//           perspective: 1000px;
//         }

//         @keyframes card3DRotate {
//           0%, 100% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           25% { 
//             transform: perspective(1000px) rotateY(3deg) rotateX(2deg);
//           }
//           50% { 
//             transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
//           }
//           75% { 
//             transform: perspective(1000px) rotateY(-3deg) rotateX(-2deg);
//           }
//         }

//         .testimonial-card:hover {
//           box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4);
//           border-color: rgba(102, 126, 234, 0.3);
//           transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-5px);
//         }

//         .testimonial-dots {
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//           margin-top: 40px;
//         }

//         .dot {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s;
//           padding: 0;
//         }

//         .dot:hover {
//           background: rgba(255, 255, 255, 0.5);
//           transform: scale(1.2);
//         }

//         .dot.active {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           width: 32px;
//           border-radius: 6px;
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
//           color: #e0e6f0;
//           line-height: 1.9;
//           font-style: italic;
//           font-size: 20px;
//           font-weight: 400;
//         }

//         .about {
//           position: relative;
//           padding: 100px 50px;
//           z-index: 10;
//         }

//         .about-hero {
//           max-width: 1000px;
//           margin: 0 auto 80px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(255, 255, 255, 0.1);
//           border-radius: 25px;
//           padding: 60px;
//           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
//           animation: card3DFloat 6s ease-in-out infinite;
//         }

//         .about-hero-content h3 {
//           font-size: 36px;
//           margin-bottom: 25px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .about-hero-content p {
//           color: #d0d8e6;
//           font-size: 19px;
//           line-height: 1.9;
//           font-weight: 400;
//         }

//         .about-content {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 40px;
//         }

//         .about-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//           filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
//         }

//         .about-block {
//           background: rgba(255, 255, 255, 0.03);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .about-block:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
//           border-color: rgba(102, 126, 234, 0.3);
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .about-block h3 {
//           font-size: 28px;
//           margin-bottom: 20px;
//           color: #667eea;
//         }

//         .about-block p {
//           color: #c5d0e0;
//           line-height: 1.8;
//           font-size: 16px;
//         }

//         .about-block ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         .about-block li {
//           color: #c5d0e0;
//           line-height: 1.9;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           font-size: 16px;
//         }

//         .about-block li:last-child {
//           border-bottom: none;
//         }

//         .about-block li strong {
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .about-stats {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 30px;
//         }

//         .stat-card {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(102, 126, 234, 0.2);
//           border-radius: 20px;
//           padding: 40px 30px;
//           text-align: center;
//           transition: all 0.4s;
//           animation: card3DFloat 5s ease-in-out infinite;
//         }

//         .stat-card:nth-child(2) {
//           animation-delay: 0.5s;
//         }

//         .stat-card:nth-child(3) {
//           animation-delay: 1s;
//         }

//         .stat-card:nth-child(4) {
//           animation-delay: 1.5s;
//         }

//         .stat-card:hover {
//           transform: translateY(-10px) scale(1.05);
//           border-color: rgba(102, 126, 234, 0.5);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
//         }

//         .stat-number {
//           font-size: 48px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 10px;
//         }

//         .stat-label {
//           color: #b8c5d6;
//           font-size: 16px;
//           font-weight: 500;
//         }

//         .about-features-grid {
//           max-width: 1200px;
//           margin: 0 auto 80px;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 30px;
//         }

//         .feature-item {
//           background: rgba(255, 255, 255, 0.02);
//           backdrop-filter: blur(8px);
//           border: 1px solid rgba(255, 255, 255, 0.06);
//           border-radius: 15px;
//           padding: 30px;
//           transition: all 0.4s;
//         }

//         .feature-item:hover {
//           transform: translateY(-8px);
//           background: rgba(255, 255, 255, 0.04);
//           border-color: rgba(102, 126, 234, 0.3);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
//         }

//         .feature-icon {
//           font-size: 40px;
//           margin-bottom: 15px;
//           filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.3));
//         }

//         .feature-item h4 {
//           font-size: 20px;
//           margin-bottom: 12px;
//           color: #8a9dea;
//           font-weight: 600;
//         }

//         .feature-item p {
//           color: #b0bccf;
//           font-size: 15px;
//           line-height: 1.7;
//         }

//         .about-cta {
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: center;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
//           backdrop-filter: blur(15px);
//           border: 2px solid rgba(102, 126, 234, 0.25);
//           border-radius: 25px;
//           padding: 60px 40px;
//           box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
//         }

//         .about-cta h3 {
//           font-size: 32px;
//           margin-bottom: 20px;
//           color: #fff;
//         }

//         .about-cta p {
//           font-size: 18px;
//           color: #c5d0e0;
//           margin-bottom: 35px;
//           line-height: 1.8;
//         }

//         .about-cta .cta-button {
//           display: inline-block;
//           padding: 18px 50px;
//           font-size: 18px;
//         }

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

//           .superpowers, .voices, .about, .contact-form-section {
//             padding: 60px 30px;
//           }

//           .form-container {
//             padding: 30px 20px;
//           }

//           .footer-content {
//             grid-template-columns: 1fr;
//           }

//           .testimonial-card {
//             padding: 40px 30px;
//           }

//           .testimonial-text {
//             font-size: 18px;
//           }

//           .about-hero {
//             padding: 40px 30px;
//           }

//           .about-hero-content h3 {
//             font-size: 28px;
//           }

//           .about-hero-content p {
//             font-size: 16px;
//           }

//           .about-stats {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 20px;
//           }

//           .stat-number {
//             font-size: 36px;
//           }

//           .stat-label {
//             font-size: 14px;
//           }

//           .about-cta {
//             padding: 40px 30px;
//           }

//           .about-cta h3 {
//             font-size: 26px;
//           }

//           .about-cta p {
//             font-size: 16px;
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

//           .about-stats {
//             grid-template-columns: 1fr;
//           }

//           .about-features-grid {
//             grid-template-columns: 1fr;
//           }

//           .about-hero {
//             padding: 30px 20px;
//           }

//           .stat-card {
//             padding: 30px 20px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;














// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";

// // Font loading
// if (typeof window !== 'undefined') {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

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
//     source: "",
//   });
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const moonCanvasRef = useRef<HTMLCanvasElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);

//   // Canvas moon animation
//   useEffect(() => {
//     if (!moonCanvasRef.current) return;

//     const canvas = moonCanvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);
//     let scrollY = 0;
//     let rotationAngle = 0;

//     const handleResize = (): void => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("scroll", handleScroll);

//     let moonAngle = Math.PI * 0.2;
//     const baseMoonRadius = 70;
//     const baseOrbitRadiusX = width * 0.12;
//     const baseOrbitRadiusY = width * 0.1;
//     const baseMoonCenterX = width * 0.75;
//     const baseMoonCenterY = height * 0.25;

//     const drawMoon = (): void => {
//       const scrollProgress = Math.min(scrollY / 2000, 1);
      
//       const moonRadius = baseMoonRadius * (1 + scrollProgress * 0.5);
//       const orbitRadiusX = baseOrbitRadiusX * (1 + scrollProgress * 0.3);
//       const orbitRadiusY = baseOrbitRadiusY * (1 + scrollProgress * 0.3);
      
//       const moonCenterX = baseMoonCenterX - scrollProgress * width * 0.1;
//       const moonCenterY = baseMoonCenterY + scrollProgress * height * 0.08;
      
//       const moonX = moonCenterX + Math.cos(moonAngle) * orbitRadiusX;
//       const moonY = moonCenterY + Math.sin(moonAngle) * orbitRadiusY;

//       ctx.save();
//       ctx.translate(moonX, moonY);
//       ctx.rotate(rotationAngle);

//       const moonGlow = ctx.createRadialGradient(
//         0, 0, moonRadius * 0.3,
//         0, 0, moonRadius * 2.8
//       );
//       moonGlow.addColorStop(0, "rgba(255,255,245,0.5)");
//       moonGlow.addColorStop(0.4, "rgba(255,255,235,0.25)");
//       moonGlow.addColorStop(0.7, "rgba(250,245,230,0.1)");
//       moonGlow.addColorStop(1, "rgba(245,240,225,0)");

//       ctx.fillStyle = moonGlow;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius * 2.8, 0, Math.PI * 2);
//       ctx.fill();

//       const moonBase = ctx.createRadialGradient(
//         -moonRadius * 0.3, -moonRadius * 0.3, 0,
//         0, 0, moonRadius
//       );
//       moonBase.addColorStop(0, "rgba(255,255,255,1)");
//       moonBase.addColorStop(0.5, "rgba(252,252,250,0.98)");
//       moonBase.addColorStop(1, "rgba(248,248,245,0.95)");

//       ctx.fillStyle = moonBase;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
//       ctx.fill();

//       for (let i = 0; i < 15; i++) {
//         const angle = (i / 15) * Math.PI * 2;
//         const radius = moonRadius * 0.6;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;
        
//         const textureGradient = ctx.createRadialGradient(
//           x, y, 0,
//           x, y, moonRadius * 0.25
//         );
//         textureGradient.addColorStop(0, "rgba(255,255,255,0.08)");
//         textureGradient.addColorStop(1, "rgba(255,255,255,0)");
        
//         ctx.fillStyle = textureGradient;
//         ctx.beginPath();
//         ctx.arc(x, y, moonRadius * 0.25, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       for (let i = 0; i < 8; i++) {
//         const waveAngle = (i / 8) * Math.PI * 2 + rotationAngle * 2;
//         const waveRadius = moonRadius * 0.7;
//         const waveX = Math.cos(waveAngle) * waveRadius;
//         const waveY = Math.sin(waveAngle) * waveRadius;
        
//         const waveGradient = ctx.createRadialGradient(
//           waveX, waveY, 0,
//           waveX, waveY, moonRadius * 0.2
//         );
//         waveGradient.addColorStop(0, "rgba(255,255,255,0.06)");
//         waveGradient.addColorStop(1, "rgba(255,255,255,0)");
        
//         ctx.fillStyle = waveGradient;
//         ctx.beginPath();
//         ctx.arc(waveX, waveY, moonRadius * 0.2, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       const shineGradient = ctx.createRadialGradient(
//         -moonRadius * 0.35, -moonRadius * 0.35, 0,
//         -moonRadius * 0.35, -moonRadius * 0.35, moonRadius * 0.65
//       );
//       shineGradient.addColorStop(0, "rgba(255,255,255,0.9)");
//       shineGradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
//       shineGradient.addColorStop(1, "rgba(255,255,255,0)");

//       ctx.fillStyle = shineGradient;
//       ctx.beginPath();
//       ctx.arc(-moonRadius * 0.35, -moonRadius * 0.35, moonRadius * 0.65, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.restore();
//     };

//     const animate = (): void => {
//       ctx.clearRect(0, 0, width, height);
//       drawMoon();
//       moonAngle += 0.0006;
//       rotationAngle += 0.0003;
//       requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 80; i++) {
//       const star = document.createElement("div");
//       star.className = "star";

//       const size = Math.random() * 3 + 1;
//       star.style.width = size + "px";
//       star.style.height = size + "px";

//       star.style.left = Math.random() * 100 + "%";
//       star.style.top = Math.random() * 100 + "%";

//       const isGolden = Math.random() > 0.94;
//       if (isGolden) {
//         star.style.backgroundColor = "#ffd700";
//         star.style.boxShadow = "0 0 4px #ffd700, 0 0 8px #ffd700";
//         star.style.animationDelay = Math.random() * 5 + "s";
//         star.style.animationDuration = Math.random() * 4 + 3 + "s";
//       } else {
//         star.style.backgroundColor = "#ffffff";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         star.style.animationDuration = Math.random() * 3 + 2 + "s";
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
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

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const bluePlanetGroup = new THREE.Group();
//     const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
//     const bluePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0x6b9fff,
//       metalness: 0.3,
//       roughness: 0.5,
//       emissive: 0x4a7acc,
//       emissiveIntensity: 0.1,
//     });
//     const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
//     bluePlanetGroup.add(bluePlanet);
//     bluePlanetGroup.position.set(35, 15, -40);
//     scene.add(bluePlanetGroup);

//     const orangePlanetGroup = new THREE.Group();
//     const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
//     const orangePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0xffaa66,
//       metalness: 0.2,
//       roughness: 0.6,
//       emissive: 0xcc6633,
//       emissiveIntensity: 0.08,
//     });
//     const orangePlanet = new THREE.Mesh(orangePlanetGeometry, orangePlanetMaterial);
//     orangePlanetGroup.add(orangePlanet);
//     orangePlanetGroup.position.set(-30, -12, -45);
//     scene.add(orangePlanetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.set(0, 0, 20);

//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent): void => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

//     const animate = (): void => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 20;
//         cameraRef.current.position.z = baseZ;

//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.rotation.z = scrollEffect * 0.05;
//       }

//       pointLight.position.x = Math.sin(time) * 2.5;
//       pointLight.position.y = Math.cos(time) * 2.5;

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = (): void => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   const handleScrollTo =
//     (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

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
//     alert(
//       "Thank you for your interest! We will contact you soon to schedule your demo."
//     );
//     setForm({
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//       location: "",
//       source: "",
//     });
//   };

//   return (
//     <div className="app">
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <canvas 
//         ref={moonCanvasRef} 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 2,
//           pointerEvents: 'none'
//         }}
//       />
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Enhanced Navigation Bar */}
//       <nav className="main-nav">
//         <div className="nav-container">
//           <div className="brand-section">
//             <div className="logo-icon"></div>
//             <div className="logo-text">Artemis</div>
//           </div>
          
//           <div
//             className={`menu-toggle ${menuOpen ? "active" : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
          
//           <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
//             <div className="nav-links-group">
//               <a href="#home" onClick={handleScrollTo("#home")} className="nav-link">
//                 Home
//               </a>
//               <a href="#about" onClick={handleScrollTo("#about")} className="nav-link">
//                 About
//               </a>
//               <a href="#superpowers" onClick={handleScrollTo("#superpowers")} className="nav-link">
//                 Superpowers
//               </a>
//               <a href="#pricing" onClick={handleScrollTo("#pricing")} className="nav-link">
//                 Pricing
//               </a>
//               <a href="#integrations" onClick={handleScrollTo("#integrations")} className="nav-link">
//                 Integrations
//               </a>
//               <a href="#resources" onClick={handleScrollTo("#resources")} className="nav-link">
//                 Resources
//               </a>
//             </div>
//             <a
//               href="#demo"
//               className="nav-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section" id="home">
//         <div className="hero-content-wrapper">
//           <div className="hero-badge">AI-powered ATS for Healthcare Staffing</div>
//           <h1 className="hero-title">Recruit faster with clarity, not clutter.</h1>
//           <p className="hero-description">
//             Streamlined workflows, intelligent automation, and minimalist design 
//             that empowers healthcare staffing teams to focus on what matters most: 
//             connecting great talent with exceptional opportunities.
//           </p>
//           <div className="hero-cta-group">
//             <a
//               href="#demo"
//               className="hero-primary-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="hero-secondary-cta"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               Explore Features
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* The Challenge Section */}
//       <section className="challenge-section" id="challenge">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">The Challenge We Solve</h2>
//             <p className="section-subtitle-main">
//               Healthcare staffing agencies face overwhelming complexity in their daily operations
//             </p>
//           </div>
          
//           <div className="challenge-grid">
//             <div className="challenge-card">
//               <div className="challenge-icon">⏱️</div>
//               <h3>Time-Consuming Manual Work</h3>
//               <p>
//                 Hours spent on resume parsing, data entry, and candidate tracking that 
//                 could be automated, pulling recruiters away from relationship building.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon">🔍</div>
//               <h3>Difficulty Finding Qualified Talent</h3>
//               <p>
//                 Traditional search methods make it nearly impossible to quickly identify 
//                 candidates with the right skills, certifications, and availability.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon">🔗</div>
//               <h3>Disconnected Systems</h3>
//               <p>
//                 VMS platforms, ATS software, and communication tools operating in silos, 
//                 creating data gaps and workflow friction.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon">📋</div>
//               <h3>Compliance & Credentialing Complexity</h3>
//               <p>
//                 Tracking licenses, certifications, and compliance documentation across 
//                 dozens or hundreds of healthcare professionals is error-prone and stressful.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="highlights-section" id="superpowers">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Talent Superpowers</h2>
//             <p className="section-subtitle-main">
//               Designed for recruiters. Powered by AI. Built for speed and simplicity.
//             </p>
//           </div>
          
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon-box">🔎</div>
//               <h3 className="feature-title">AI-Powered Candidate Search</h3>
//               <p className="feature-description">
//                 Find the perfect match instantly with intelligent search that understands 
//                 skills, experience, certifications, and availability patterns.
//               </p>
//               <ul className="feature-list">
//                 <li>Natural language search queries</li>
//                 <li>Smart skill matching algorithms</li>
//                 <li>Real-time availability tracking</li>
//               </ul>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon-box">⚡</div>
//               <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
//               <p className="feature-description">
//                 Seamlessly integrate with major VMS platforms. Jobs flow automatically 
//                 into Artemis, eliminating manual data entry.
//               </p>
//               <ul className="feature-list">
//                 <li>Automatic job ingestion</li>
//                 <li>Real-time updates</li>
//                 <li>Multi-VMS support</li>
//               </ul>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon-box">✅</div>
//               <h3 className="feature-title">Built-In Skills Checklists</h3>
//               <p className="feature-description">
//                 Interactive checklists that capture candidate qualifications with precision, 
//                 convert to PDFs, and distribute to stakeholders instantly.
//               </p>
//               <ul className="feature-list">
//                 <li>Customizable checklist templates</li>
//                 <li>Digital signature collection</li>
//                 <li>Automated distribution</li>
//               </ul>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon-box">📊</div>
//               <h3 className="feature-title">Smart Onboarding Dashboards</h3>
//               <p className="feature-description">
//                 Visual pipelines that show exactly where every candidate stands, 
//                 with automated reminders and next-step recommendations.
//               </p>
//               <ul className="feature-list">
//                 <li>Drag-and-drop pipeline management</li>
//                 <li>Automated workflow triggers</li>
//                 <li>Real-time status updates</li>
//               </ul>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon-box">🎯</div>
//               <h3 className="feature-title">Candidate Pipeline Management</h3>
//               <p className="feature-description">
//                 Design dynamic, stage-based workflows that adapt to your process. 
//                 Never lose track of a candidate again.
//               </p>
//               <ul className="feature-list">
//                 <li>Customizable pipeline stages</li>
//                 <li>Bulk candidate actions</li>
//                 <li>Advanced filtering</li>
//               </ul>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon-box">📝</div>
//               <h3 className="feature-title">Right-to-Represent Automation</h3>
//               <p className="feature-description">
//                 Send RTR forms instantly, track signatures, and maintain compliance 
//                 documentation—all within a single, streamlined workflow.
//               </p>
//               <ul className="feature-list">
//                 <li>One-click RTR distribution</li>
//                 <li>E-signature integration</li>
//                 <li>Automatic record keeping</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Who We Serve */}
//       <section className="serve-section" id="about">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Who We Serve</h2>
//             <p className="section-subtitle-main">
//               Built specifically for healthcare staffing agencies of all sizes
//             </p>
//           </div>
          
//           <div className="serve-content">
//             <div className="serve-text-block">
//               <h3>Healthcare Staffing Agencies</h3>
//               <p>
//                 Whether you place travel nurses, allied health professionals, locum tenens physicians, 
//                 or per diem staff, Artemis adapts to your unique workflows. From boutique agencies 
//                 placing 10 candidates per month to enterprise operations managing thousands of placements, 
//                 our platform scales with your business.
//               </p>
              
//               <div className="serve-stats">
//                 <div className="stat-item">
//                   <div className="stat-number">500+</div>
//                   <div className="stat-label">Active Agencies</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-number">10K+</div>
//                   <div className="stat-label">Candidates Placed</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-number">99.9%</div>
//                   <div className="stat-label">Platform Uptime</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="serve-image-placeholder">
//               <div className="placeholder-content">
//                 <div className="placeholder-icon">🏥</div>
//                 <p>Healthcare Staffing Excellence</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing-section" id="pricing">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Flexible Pricing for Every Stage of Growth</h2>
//             <p className="section-subtitle-main">
//               Custom plans designed around your agency's unique needs
//             </p>
//           </div>
          
//           <div className="pricing-content">
//             <div className="pricing-card">
//               <h3>What's Included</h3>
//               <ul className="pricing-features-list">
//                 <li>✓ Unlimited users and candidates</li>
//                 <li>✓ AI-powered search and matching</li>
//                 <li>✓ VMS integration (Bullhorn, others)</li>
//                 <li>✓ Skills checklists with PDF generation</li>
//                 <li>✓ Right-to-Represent automation</li>
//                 <li>✓ Pipeline management tools</li>
//                 <li>✓ Credentials tracking</li>
//                 <li>✓ 24/7 customer support</li>
//                 <li>✓ Regular feature updates</li>
//                 <li>✓ Enterprise-grade security</li>
//               </ul>
//             </div>
            
//             <div className="pricing-card highlighted">
//               <h3>Why Custom Pricing?</h3>
//               <p>
//                 Every staffing agency operates differently. Your pricing should reflect your 
//                 agency's size, placement volume, integration needs, and growth trajectory.
//               </p>
//               <p>
//                 We work with you to create a plan that makes sense for your business—no 
//                 hidden fees, no surprise charges, no complicated tier systems.
//               </p>
//               <a href="#demo" className="pricing-cta" onClick={handleScrollTo("#demo")}>
//                 Contact Us for Pricing
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Integrations Section */}
//       <section className="integrations-section" id="integrations">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Stay in Sync with Your Workflow</h2>
//             <p className="section-subtitle-main">
//               Seamless connections to the tools you already use
//             </p>
//           </div>
          
//           <div className="integrations-content">
//             <div className="integration-card primary">
//               <div className="integration-icon">🔗</div>
//               <h3>VMS Integrations</h3>
//               <p>
//                 Connect Artemis to your Vendor Management Systems for automatic job feed synchronization. 
//                 New opportunities appear in Artemis instantly, ready for candidate matching.
//               </p>
//               <div className="integration-logos">
//                 <div className="logo-placeholder">Bullhorn</div>
//                 <div className="logo-placeholder">Fieldglass</div>
//                 <div className="logo-placeholder">Beeline</div>
//                 <div className="logo-placeholder">+ More</div>
//               </div>
//             </div>
            
//             <div className="integration-card">
//               <div className="integration-icon">🚀</div>
//               <h3>Coming Soon</h3>
//               <p>
//                 We're continuously expanding our integration ecosystem based on customer feedback.
//               </p>
//               <ul className="roadmap-list">
//                 <li>• Calendar sync (Google, Outlook)</li>
//                 <li>• Email integration</li>
//                 <li>• Background check providers</li>
//                 <li>• Payroll systems</li>
//                 <li>• Communication platforms</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Resources Section */}
//       <section className="resources-section" id="resources">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Resources & Insights</h2>
//             <p className="section-subtitle-main">
//               Expert guidance to transform your healthcare staffing operations
//             </p>
//           </div>
          
//           <div className="resources-grid">
//             <div className="resource-category-card">
//               <div className="category-icon">💡</div>
//               <h3>Practical Tips for Recruiters</h3>
//               <p>
//                 Time-saving strategies, workflow optimizations, and proven techniques 
//                 to increase placement velocity and candidate satisfaction.
//               </p>
//             </div>
            
//             <div className="resource-category-card">
//               <div className="category-icon">🤖</div>
//               <h3>Technology in Healthcare Staffing</h3>
//               <p>
//                 Explore how AI, automation, and modern ATS platforms are reshaping 
//                 the healthcare staffing landscape.
//               </p>
//             </div>
            
//             <div className="resource-category-card">
//               <div className="category-icon">📈</div>
//               <h3>Industry Trends & Market Insights</h3>
//               <p>
//                 Stay ahead with analysis of healthcare labor markets, regulatory changes, 
//                 and emerging opportunities.
//               </p>
//             </div>
//           </div>
          
//           <div className="newsletter-section">
//             <h3>Stay Updated</h3>
//             <p>Get the latest insights delivered to your inbox</p>
//             <div className="newsletter-form">
//               <input type="email" placeholder="Enter your email" className="newsletter-input" />
//               <button className="newsletter-button">Subscribe</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision Teaser + CTA */}
//       <section className="vision-section">
//         <div className="content-container">
//           <div className="vision-content">
//             <h2>Experience Clarity in Every Click</h2>
//             <p>
//               Join hundreds of healthcare staffing agencies who have transformed their 
//               recruitment process with Artemis. Faster placements, happier teams, better outcomes.
//             </p>
//             <a
//               href="#demo"
//               className="vision-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Your Demo Today
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Book a Demo Section */}
//       <section className="demo-section" id="demo">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Book a Demo</h2>
//             <p className="section-subtitle-main">
//               See Artemis in action and discover how we can transform your staffing operations
//             </p>
//           </div>
          
//           <div className="demo-layout">
//             <div className="demo-form-container">
//               <form onSubmit={submitDemo} className="demo-form">
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="firstName">First Name</label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       required
//                       value={form.firstName}
//                       onChange={(e) =>
//                         setForm({ ...form, firstName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="lastName">Last Name</label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       required
//                       value={form.lastName}
//                       onChange={(e) =>
//                         setForm({ ...form, lastName: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="email">Work Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={form.email}
//                       onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="phone">Phone</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       required
//                       value={form.phone}
//                       onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="company">Company</label>
//                     <input
//                       type="text"
//                       id="company"
//                       required
//                       value={form.company}
//                       onChange={(e) =>
//                         setForm({ ...form, company: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="location">Location (State)</label>
//                     <input
//                       type="text"
//                       id="location"
//                       required
//                       value={form.location}
//                       onChange={(e) =>
//                         setForm({ ...form, location: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-field full-width">
//                   <label htmlFor="source">How did you hear about us?</label>
//                   <select
//                     id="source"
//                     required
//                     value={form.source}
//                     onChange={(e) => setForm({ ...form, source: e.target.value })}
//                   >
//                     <option value="">Select one</option>
//                     <option value="google">Google Search</option>
//                     <option value="linkedin">LinkedIn</option>
//                     <option value="referral">Referral / Word of Mouth</option>
//                     <option value="conference">Conference / Event</option>
//                     <option value="email">Email Outreach</option>
//                     <option value="customer">Existing Customer</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
                
//                 <button type="submit" className="demo-submit-button">
//                   Request Demo
//                 </button>
//               </form>
//             </div>
            
//             <div className="demo-info-container">
//               <h3>What to Expect</h3>
//               <ul className="expectations-list">
//                 <li>
//                   <div className="expectation-icon">🎯</div>
//                   <div>
//                     <strong>Personalized Walkthrough</strong>
//                     <p>See Artemis configured for your agency's specific workflows</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon">⏱️</div>
//                   <div>
//                     <strong>30-Minute Session</strong>
//                     <p>Quick, focused demo that respects your time</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon">💬</div>
//                   <div>
//                     <strong>Q&A Included</strong>
//                     <p>Ask anything about features, pricing, or implementation</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon">📊</div>
//                   <div>
//                     <strong>Live Platform Access</strong>
//                     <p>Hands-on experience with real candidate and job data</p>
//                   </div>
//                 </li>
//               </ul>
              
//               <div className="social-proof">
//                 <p className="proof-label">Trusted by leading agencies</p>
//                 <div className="proof-stats">
//                   <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
//                   <span>500+ Active Users</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="site-footer" id="contact">
//         <div className="footer-content">
//           <div className="footer-column">
//             <h4>Artemis ATS</h4>
//             <p>AI-powered recruitment technology for healthcare staffing excellence.</p>
//             <div className="social-links">
//               <a href="#" aria-label="LinkedIn">💼</a>
//               <a href="#" aria-label="Facebook">📘</a>
//               <a href="#" aria-label="Twitter">🐦</a>
//             </div>
//           </div>
          
//           <div className="footer-column">
//             <h4>Quick Links</h4>
//             <a href="#home" onClick={handleScrollTo("#home")}>Home</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#pricing" onClick={handleScrollTo("#pricing")}>Pricing</a>
//             <a href="#integrations" onClick={handleScrollTo("#integrations")}>Integrations</a>
//             <a href="#resources" onClick={handleScrollTo("#resources")}>Resources</a>
//           </div>
          
//           <div className="footer-column">
//             <h4>Contact</h4>
//             <p>
//               9330 Lyndon B Johnson Fwy #900
//               <br />
//               Dallas, TX, 75243
//             </p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
        
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         html {
//           touch-action: manipulation;
//         }

//         html, body {
//           overflow-x: hidden;
//           overflow-y: scroll;
//           height: auto;
//           min-height: 100%;
//           scroll-behavior: smooth;
//         }

//         .app {
//           font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           background: #0a0e27;
//           color: #e6e6e9;
//           overflow-x: hidden;
//           position: relative;
//           min-height: 100vh;
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

//         #canvas-container * {
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
//           pointer-events: none;
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

//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% { 
//             opacity: 0.3; 
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
//           }
//           50% { 
//             opacity: 0.8; 
//             transform: scale(1.2) rotate(180deg);
//             box-shadow: 0 0 6px #ffd700, 0 0 12px #ffd700;
//           }
//         }

//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//           pointer-events: none;
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

//         /* Enhanced Navigation */
//         .main-nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           z-index: 1000;
//           background: rgba(10, 12, 18, 0.85);
//           backdrop-filter: saturate(180%) blur(12px);
//           border-bottom: 1px solid #2a2e36;
//         }

//         .nav-container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 16px 40px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 40px;
//         }

//         .brand-section {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .logo-icon {
//           width: 32px;
//           height: 32px;
//           border-radius: 8px;
//           background: conic-gradient(from 180deg, #6ea8fe, #b77dff, #7ef0ff, #6ea8fe);
//           box-shadow: 0 0 24px rgba(110, 168, 254, 0.15) inset;
//         }

//         .logo-text {
//           font-size: 22px;
//           font-weight: 700;
//           letter-spacing: 0.4px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .nav-menu {
//           display: flex;
//           align-items: center;
//           gap: 32px;
//           flex: 1;
//           justify-content: flex-end;
//         }

//         .nav-links-group {
//           display: flex;
//           gap: 8px;
//           align-items: center;
//         }

//         .nav-link {
//           padding: 10px 16px;
//           color: #e6e6e9;
//           text-decoration: none;
//           font-size: 15px;
//           font-weight: 500;
//           border-radius: 8px;
//           border: 1px solid transparent;
//           transition: all 0.2s ease;
//           position: relative;
//         }

//         .nav-link:hover {
//           border-color: #2a2e36;
//           background: #0c0f16;
//           color: #6ea8fe;
//         }

//         .nav-cta-button {
//           padding: 10px 24px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 8px;
//           font-size: 15px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
//           border: none;
//         }

//         .nav-cta-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
//           background: #e6e6e9;
//           transition: all 0.3s;
//           border-radius: 2px;
//         }

//         /* Hero Section */
//         .hero-section {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 140px 40px 80px;
//           z-index: 10;
//         }

//         .hero-content-wrapper {
//           max-width: 900px;
//           text-align: center;
//         }

//         .hero-badge {
//           display: inline-block;
//           padding: 8px 20px;
//           background: rgba(110, 168, 254, 0.1);
//           border: 1px solid rgba(110, 168, 254, 0.3);
//           border-radius: 999px;
//           color: #6ea8fe;
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 24px;
//           animation: fadeInUp 0.8s ease-out;
//         }

//         .hero-title {
//           font-size: clamp(40px, 7vw, 68px);
//           font-weight: 700;
//           line-height: 1.15;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//           animation: fadeInUp 0.8s ease-out 0.1s both;
//         }

//         .hero-description {
//           font-size: clamp(17px, 2.5vw, 20px);
//           line-height: 1.7;
//           color: #9aa0a6;
//           margin-bottom: 40px;
//           max-width: 750px;
//           margin-left: auto;
//           margin-right: auto;
//           animation: fadeInUp 0.8s ease-out 0.2s both;
//         }

//         .hero-cta-group {
//           display: flex;
//           gap: 16px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 0.8s ease-out 0.3s both;
//         }

//         .hero-primary-cta {
//           padding: 16px 40px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//           border: none;
//         }

//         .hero-primary-cta:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         .hero-secondary-cta {
//           padding: 16px 40px;
//           background: transparent;
//           color: #e6e6e9;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           border: 1px solid #2a2e36;
//         }

//         .hero-secondary-cta:hover {
//           border-color: #667eea;
//           background: rgba(102, 126, 234, 0.05);
//           color: #6ea8fe;
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

//         /* Content Container */
//         .content-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 40px;
//         }

//         /* Section Headers */
//         .section-header {
//           text-align: center;
//           margin-bottom: 60px;
//         }

//         .section-title-main {
//           font-size: clamp(32px, 5vw, 48px);
//           font-weight: 700;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//         }

//         .section-subtitle-main {
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #9aa0a6;
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         /* Challenge Section */
//         .challenge-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .challenge-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 32px;
//         }

//         .challenge-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 32px;
//           transition: all 0.3s ease;
//         }

//         .challenge-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(110, 168, 254, 0.3);
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
//         }

//         .challenge-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//         }

//         .challenge-card h3 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .challenge-card p {
//           color: #9aa0a6;
//           line-height: 1.7;
//           font-size: 16px;
//         }

//         /* Features/Highlights Section */
//         .highlights-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//         }

//         .features-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//           gap: 32px;
//         }

//         .feature-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 36px;
//           transition: all 0.3s ease;
//         }

//         .feature-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(102, 126, 234, 0.4);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
//         }

//         .feature-icon-box {
//           width: 64px;
//           height: 64px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 32px;
//           margin-bottom: 20px;
//         }

//         .feature-title {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .feature-description {
//           color: #9aa0a6;
//           line-height: 1.7;
//           margin-bottom: 20px;
//           font-size: 16px;
//         }

//         .feature-list {
//           list-style: none;
//           padding: 0;
//         }

//         .feature-list li {
//           color: #b8c5d6;
//           padding: 8px 0;
//           padding-left: 24px;
//           position: relative;
//           font-size: 15px;
//         }

//         .feature-list li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #6ea8fe;
//           font-weight: bold;
//         }

//         /* Who We Serve Section */
//         .serve-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .serve-content {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr;
//           gap: 60px;
//           align-items: center;
//         }

//         .serve-text-block h3 {
//           font-size: 32px;
//           font-weight: 600;
//           margin-bottom: 20px;
//           color: #e6e6e9;
//         }

//         .serve-text-block p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           font-size: 17px;
//           margin-bottom: 36px;
//         }

//         .serve-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 24px;
//         }

//         .stat-item {
//           text-align: center;
//           padding: 20px;
//           background: rgba(110, 168, 254, 0.05);
//           border: 1px solid rgba(110, 168, 254, 0.2);
//           border-radius: 12px;
//         }

//         .stat-number {
//           font-size: 36px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #6ea8fe 0%, #b77dff 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 8px;
//         }

//         .stat-label {
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .serve-image-placeholder {
//           background: rgba(255, 255, 255, 0.03);
//           border: 2px dashed #2a2e36;
//           border-radius: 16px;
//           min-height: 400px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .placeholder-content {
//           text-align: center;
//         }

//         .placeholder-icon {
//           font-size: 80px;
//           margin-bottom: 16px;
//         }

//         .placeholder-content p {
//           color: #9aa0a6;
//           font-size: 16px;
//         }

//         /* Pricing Section */
//         .pricing-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//         }

//         .pricing-content {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 32px;
//         }

//         .pricing-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .pricing-card.highlighted {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//           border-color: rgba(102, 126, 234, 0.3);
//         }

//         .pricing-card h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .pricing-features-list {
//           list-style: none;
//           padding: 0;
//         }

//         .pricing-features-list li {
//           color: #b8c5d6;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           font-size: 16px;
//         }

//         .pricing-features-list li:last-child {
//           border-bottom: none;
//         }

//         .pricing-card p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 20px;
//           font-size: 16px;
//         }

//         .pricing-cta {
//           display: inline-block;
//           padding: 16px 32px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//           margin-top: 12px;
//         }

//         .pricing-cta:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         /* Integrations Section */
//         .integrations-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .integrations-content {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 32px;
//         }

//         .integration-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .integration-card.primary {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//           border-color: rgba(102, 126, 234, 0.3);
//         }

//         .integration-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//         }

//         .integration-card h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//         }

//         .integration-card p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 24px;
//           font-size: 16px;
//         }

//         .integration-logos {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 12px;
//         }

//         .logo-placeholder {
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 8px;
//           padding: 16px;
//           text-align: center;
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .roadmap-list {
//           list-style: none;
//           padding: 0;
//         }

//         .roadmap-list li {
//           color: #b8c5d6;
//           padding: 8px 0;
//           font-size: 16px;
//         }

//         /* Resources Section */
//         .resources-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//         }

//         .resources-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 32px;
//           margin-bottom: 60px;
//         }

//         .resource-category-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 36px;
//           transition: all 0.3s ease;
//         }

//         .resource-category-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(110, 168, 254, 0.3);
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
//         }

//         .category-icon {
//           font-size: 48px;
//           margin-bottom: 20px;
//         }

//         .resource-category-card h3 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .resource-category-card p {
//           color: #9aa0a6;
//           line-height: 1.7;
//           font-size: 16px;
//         }

//         .newsletter-section {
//           max-width: 700px;
//           margin: 0 auto;
//           text-align: center;
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 48px;
//         }

//         .newsletter-section h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .newsletter-section p {
//           color: #9aa0a6;
//           margin-bottom: 24px;
//           font-size: 16px;
//         }

//         .newsletter-form {
//           display: flex;
//           gap: 12px;
//           max-width: 500px;
//           margin: 0 auto;
//         }

//         .newsletter-input {
//           flex: 1;
//           padding: 14px 20px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 10px;
//           color: #e6e6e9;
//           font-size: 15px;
//         }

//         .newsletter-input:focus {
//           outline: none;
//           border-color: #6ea8fe;
//         }

//         .newsletter-button {
//           padding: 14px 28px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-size: 15px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .newsletter-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
//         }

//         /* Vision Section */
//         .vision-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//         }

//         .vision-content {
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: center;
//         }

//         .vision-content h2 {
//           font-size: clamp(32px, 5vw, 48px);
//           font-weight: 700;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .vision-content p {
//           font-size: clamp(17px, 2.5vw, 20px);
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 36px;
//         }

//         .vision-cta-button {
//           display: inline-block;
//           padding: 18px 48px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
//         }

//         .vision-cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
//         }

//         /* Demo Section */
//         .demo-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .demo-layout {
//           display: grid;
//           grid-template-columns: 1.2fr 1fr;
//           gap: 48px;
//           align-items: start;
//         }

//         .demo-form-container {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .demo-form {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//         }

//         .form-row {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 20px;
//         }

//         .form-field {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .form-field.full-width {
//           grid-column: 1 / -1;
//         }

//         .form-field label {
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .form-field input,
//         .form-field select {
//           padding: 14px 16px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 10px;
//           color: #e6e6e9;
//           font-size: 15px;
//           transition: all 0.2s;
//         }

//         .form-field input:focus,
//         .form-field select:focus {
//           outline: none;
//           border-color: #6ea8fe;
//           box-shadow: 0 0 0 3px rgba(110, 168, 254, 0.1);
//         }

//         .form-field select {
//           cursor: pointer;
//         }

//         .form-field option {
//           background: #0a0e27;
//           color: #e6e6e9;
//         }

//         .demo-submit-button {
//           padding: 16px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//         }

//         .demo-submit-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         .demo-info-container {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .demo-info-container h3 {
//           font-size: 24px;
//           font-weight: 600;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .expectations-list {
//           list-style: none;
//           padding: 0;
//           margin-bottom: 36px;
//         }

//         .expectations-list li {
//           display: flex;
//           gap: 16px;
//           margin-bottom: 24px;
//         }

//         .expectation-icon {
//           font-size: 32px;
//           flex-shrink: 0;
//         }

//         .expectations-list strong {
//           display: block;
//           color: #e6e6e9;
//           font-size: 16px;
//           margin-bottom: 4px;
//         }

//         .expectations-list p {
//           color: #9aa0a6;
//           font-size: 14px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .social-proof {
//           padding: 24px;
//           background: rgba(110, 168, 254, 0.05);
//           border: 1px solid rgba(110, 168, 254, 0.2);
//           border-radius: 12px;
//         }

//         .proof-label {
//           font-size: 14px;
//           color: #9aa0a6;
//           margin-bottom: 12px;
//         }

//         .proof-stats {
//           display: flex;
//           gap: 16px;
//           flex-wrap: wrap;
//         }

//         .proof-stats span {
//           color: #e6e6e9;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         /* Footer */
//         .site-footer {
//           position: relative;
//           padding: 60px 40px 30px;
//           background: rgba(10, 12, 18, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid #2a2e36;
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1280px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 48px;
//           margin-bottom: 40px;
//         }

//         .footer-column h4 {
//           font-size: 18px;
//           font-weight: 600;
//           margin-bottom: 20px;
//           color: #6ea8fe;
//         }

//         .footer-column p,
//         .footer-column a {
//           color: #9aa0a6;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 12px;
//           line-height: 1.7;
//           font-size: 15px;
//         }

//         .footer-column a:hover {
//           color: #6ea8fe;
//         }

//         .social-links {
//           display: flex;
//           gap: 12px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 42px;
//           height: 42px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//           margin-bottom: 0;
//         }

//         .social-links a:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
//         }

//         .footer-bottom {
//           max-width: 1280px;
//           margin: 0 auto;
//           text-align: center;
//           padding-top: 30px;
//           border-top: 1px solid #2a2e36;
//         }

//         .footer-bottom p {
//           color: #9aa0a6;
//           font-size: 14px;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .nav-container {
//             padding: 16px 30px;
//           }

//           .content-container {
//             padding: 0 30px;
//           }

//           .demo-layout {
//             grid-template-columns: 1fr;
//           }

//           .serve-content {
//             grid-template-columns: 1fr;
//           }

//           .pricing-content,
//           .integrations-content {
//             grid-template-columns: 1fr;
//           }

//           .features-grid {
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           }
//         }

//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: flex;
//             z-index: 1001;
//           }

//           .nav-menu {
//             position: fixed;
//             top: 68px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 68px);
//             background: rgba(10, 12, 18, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 40px;
//             transition: right 0.3s ease;
//             align-items: stretch;
//           }

//           .nav-menu.active {
//             right: 0;
//           }

//           .nav-links-group {
//             flex-direction: column;
//             width: 100%;
//           }

//           .nav-link {
//             width: 100%;
//             text-align: center;
//             padding: 16px;
//           }

//           .nav-cta-button {
//             width: 100%;
//             text-align: center;
//           }

//           .hero-section {
//             padding: 120px 20px 60px;
//           }

//           .challenge-section,
//           .highlights-section,
//           .serve-section,
//           .pricing-section,
//           .integrations-section,
//           .resources-section,
//           .vision-section,
//           .demo-section {
//             padding: 80px 0;
//           }

//           .content-container {
//             padding: 0 20px;
//           }

//           .form-row {
//             grid-template-columns: 1fr;
//           }

//           .serve-stats {
//             grid-template-columns: 1fr;
//           }

//           .hero-cta-group {
//             flex-direction: column;
//             width: 100%;
//           }

//           .hero-primary-cta,
//           .hero-secondary-cta {
//             width: 100%;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;


















































// import React, { useState, useEffect, useRef } from "react";
// import * as THREE from "three";

// // Font loading
// if (typeof window !== 'undefined') {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// }

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
//     source: "",
//   });
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);

//   const canvasRef = useRef<HTMLDivElement>(null);
//   const starsContainerRef = useRef<HTMLDivElement>(null);
//   const moonCanvasRef = useRef<HTMLCanvasElement>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const particlesMeshRef = useRef<THREE.Points | null>(null);

//   // Canvas moon animation
//   useEffect(() => {
//     if (!moonCanvasRef.current) return;

//     const canvas = moonCanvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);
//     let scrollY = 0;
//     let rotationAngle = 0;

//     const handleResize = (): void => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("scroll", handleScroll);

//     let moonAngle = Math.PI * 0.2;
//     const baseMoonRadius = 70;
//     const baseOrbitRadiusX = width * 0.12;
//     const baseOrbitRadiusY = width * 0.1;
//     const baseMoonCenterX = width * 0.75;
//     const baseMoonCenterY = height * 0.25;

//     const drawMoon = (): void => {
//       const scrollProgress = Math.min(scrollY / 2000, 1);
      
//       const moonRadius = baseMoonRadius * (1 + scrollProgress * 0.5);
//       const orbitRadiusX = baseOrbitRadiusX * (1 + scrollProgress * 0.3);
//       const orbitRadiusY = baseOrbitRadiusY * (1 + scrollProgress * 0.3);
      
//       const moonCenterX = baseMoonCenterX - scrollProgress * width * 0.1;
//       const moonCenterY = baseMoonCenterY + scrollProgress * height * 0.08;
      
//       const moonX = moonCenterX + Math.cos(moonAngle) * orbitRadiusX;
//       const moonY = moonCenterY + Math.sin(moonAngle) * orbitRadiusY;

//       ctx.save();
//       ctx.translate(moonX, moonY);
//       ctx.rotate(rotationAngle);

//       // Subtle outer glow - much more refined
//       const moonGlow = ctx.createRadialGradient(
//         0, 0, moonRadius * 0.4,
//         0, 0, moonRadius * 2.0
//       );
//       moonGlow.addColorStop(0, "rgba(255,255,250,0.15)");
//       moonGlow.addColorStop(0.5, "rgba(255,255,245,0.08)");
//       moonGlow.addColorStop(0.8, "rgba(250,245,240,0.03)");
//       moonGlow.addColorStop(1, "rgba(245,240,235,0)");

//       ctx.fillStyle = moonGlow;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius * 2.0, 0, Math.PI * 2);
//       ctx.fill();

//       // Moon base with subtle gradient
//       const moonBase = ctx.createRadialGradient(
//         -moonRadius * 0.3, -moonRadius * 0.3, 0,
//         0, 0, moonRadius
//       );
//       moonBase.addColorStop(0, "rgba(250,250,248,0.95)");
//       moonBase.addColorStop(0.5, "rgba(245,245,243,0.90)");
//       moonBase.addColorStop(1, "rgba(240,240,238,0.85)");

//       ctx.fillStyle = moonBase;
//       ctx.beginPath();
//       ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
//       ctx.fill();

//       // Subtle texture craters - reduced opacity
//       for (let i = 0; i < 12; i++) {
//         const angle = (i / 12) * Math.PI * 2;
//         const radius = moonRadius * 0.6;
//         const x = Math.cos(angle) * radius;
//         const y = Math.sin(angle) * radius;
        
//         const textureGradient = ctx.createRadialGradient(
//           x, y, 0,
//           x, y, moonRadius * 0.2
//         );
//         textureGradient.addColorStop(0, "rgba(240,240,240,0.03)");
//         textureGradient.addColorStop(1, "rgba(240,240,240,0)");
        
//         ctx.fillStyle = textureGradient;
//         ctx.beginPath();
//         ctx.arc(x, y, moonRadius * 0.2, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Very subtle rotating waves - minimal visibility
//       for (let i = 0; i < 6; i++) {
//         const waveAngle = (i / 6) * Math.PI * 2 + rotationAngle * 2;
//         const waveRadius = moonRadius * 0.7;
//         const waveX = Math.cos(waveAngle) * waveRadius;
//         const waveY = Math.sin(waveAngle) * waveRadius;
        
//         const waveGradient = ctx.createRadialGradient(
//           waveX, waveY, 0,
//           waveX, waveY, moonRadius * 0.15
//         );
//         waveGradient.addColorStop(0, "rgba(245,245,245,0.02)");
//         waveGradient.addColorStop(1, "rgba(245,245,245,0)");
        
//         ctx.fillStyle = waveGradient;
//         ctx.beginPath();
//         ctx.arc(waveX, waveY, moonRadius * 0.15, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       // Refined shine/highlight - more subtle
//       const shineGradient = ctx.createRadialGradient(
//         -moonRadius * 0.3, -moonRadius * 0.3, 0,
//         -moonRadius * 0.3, -moonRadius * 0.3, moonRadius * 0.5
//       );
//       shineGradient.addColorStop(0, "rgba(255,255,255,0.3)");
//       shineGradient.addColorStop(0.5, "rgba(255,255,255,0.12)");
//       shineGradient.addColorStop(1, "rgba(255,255,255,0)");

//       ctx.fillStyle = shineGradient;
//       ctx.beginPath();
//       ctx.arc(-moonRadius * 0.3, -moonRadius * 0.3, moonRadius * 0.5, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.restore();
//     };

//     const animate = (): void => {
//       ctx.clearRect(0, 0, width, height);
//       drawMoon();
//       moonAngle += 0.0006;
//       rotationAngle += 0.0003;
//       requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     if (!starsContainerRef.current) return;

//     for (let i = 0; i < 35; i++) {
//       const star = document.createElement("div");
//       star.className = "star";

//       const size = Math.random() * 2.5 + 0.8;
//       star.style.width = size + "px";
//       star.style.height = size + "px";

//       star.style.left = Math.random() * 100 + "%";
//       star.style.top = Math.random() * 100 + "%";

//       const isGolden = Math.random() > 0.96;
//       if (isGolden) {
//         star.style.backgroundColor = "#ffd700";
//         star.style.boxShadow = "0 0 3px #ffd700, 0 0 6px #ffd700";
//         star.style.animationDelay = Math.random() * 5 + "s";
//         star.style.animationDuration = Math.random() * 4 + 3 + "s";
//       } else {
//         star.style.backgroundColor = "#ffffff";
//         star.style.animationDelay = Math.random() * 3 + "s";
//         star.style.animationDuration = Math.random() * 3 + 2 + "s";
//       }

//       starsContainerRef.current.appendChild(star);
//     }
//   }, []);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
//     rendererRef.current = renderer;

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     canvasRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 3000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);
//     const sizesArray = new Float32Array(particlesCount);

//     for (let i = 0; i < particlesCount * 3; i++) {
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

//     for (let i = 0; i < particlesCount; i++) {
//       sizesArray[i] = Math.random() * 0.05;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "color",
//       new THREE.BufferAttribute(colorsArray, 3)
//     );
//     particlesGeometry.setAttribute(
//       "size",
//       new THREE.BufferAttribute(sizesArray, 1)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.03,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       sizeAttenuation: true,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const bluePlanetGroup = new THREE.Group();
//     const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
//     const bluePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0x6b9fff,
//       metalness: 0.3,
//       roughness: 0.5,
//       emissive: 0x4a7acc,
//       emissiveIntensity: 0.1,
//     });
//     const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
//     bluePlanetGroup.add(bluePlanet);
//     bluePlanetGroup.position.set(35, 15, -40);
//     scene.add(bluePlanetGroup);

//     const orangePlanetGroup = new THREE.Group();
//     const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
//     const orangePlanetMaterial = new THREE.MeshStandardMaterial({
//       color: 0xffaa66,
//       metalness: 0.2,
//       roughness: 0.6,
//       emissive: 0xcc6633,
//       emissiveIntensity: 0.08,
//     });
//     const orangePlanet = new THREE.Mesh(orangePlanetGeometry, orangePlanetMaterial);
//     orangePlanetGroup.add(orangePlanet);
//     orangePlanetGroup.position.set(-30, -12, -45);
//     scene.add(orangePlanetGroup);

//     const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(10, 10, 10);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
//     pointLight.position.set(0, 0, 5);
//     scene.add(pointLight);

//     const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
//     scene.add(hemisphereLight);

//     camera.position.set(0, 0, 20);

//     let scrollY = 0;
//     let mouseX = 0;
//     let mouseY = 0;
//     let time = 0;

//     const handleScroll = (): void => {
//       scrollY = window.scrollY || window.pageYOffset;
//     };

//     const handleMouseMove = (event: MouseEvent): void => {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     };

//     window.addEventListener("scroll", handleScroll);
//     document.addEventListener("mousemove", handleMouseMove);

//     const animate = (): void => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       if (particlesMeshRef.current) {
//         particlesMeshRef.current.rotation.y += 0.0005;
//         particlesMeshRef.current.rotation.x += 0.0003;

//         const parallaxY = scrollY * 0.001;
//         particlesMeshRef.current.position.y = -parallaxY * 2;
//         particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
//       }

//       if (cameraRef.current) {
//         cameraRef.current.position.x +=
//           (mouseX - cameraRef.current.position.x) * 0.05;
//         cameraRef.current.position.y +=
//           (-mouseY - cameraRef.current.position.y) * 0.05;
//         cameraRef.current.lookAt(scene.position);

//         const baseZ = 20;
//         cameraRef.current.position.z = baseZ;

//         const scrollEffect = scrollY * 0.001;
//         cameraRef.current.rotation.z = scrollEffect * 0.05;
//       }

//       pointLight.position.x = Math.sin(time) * 2.5;
//       pointLight.position.y = Math.cos(time) * 2.5;

//       if (rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//     };

//     animate();

//     const handleResize = (): void => {
//       if (cameraRef.current) {
//         cameraRef.current.aspect = window.innerWidth / window.innerHeight;
//         cameraRef.current.updateProjectionMatrix();
//       }
//       if (rendererRef.current) {
//         rendererRef.current.setSize(window.innerWidth, window.innerHeight);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (canvasRef.current && rendererRef.current?.domElement) {
//         canvasRef.current.removeChild(rendererRef.current.domElement);
//       }
//     };
//   }, []);

//   const handleScrollTo =
//     (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
//       e.preventDefault();
//       const el = document.querySelector(selector);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         setMenuOpen(false);
//       }
//     };

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
//     alert(
//       "Thank you for your interest! We will contact you soon to schedule your demo."
//     );
//     setForm({
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       company: "",
//       location: "",
//       source: "",
//     });
//   };

//   return (
//     <div className="app">
//       <div className="gradient-bg"></div>
//       <div className="stars-container" ref={starsContainerRef}></div>
//       <canvas 
//         ref={moonCanvasRef} 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 2,
//           pointerEvents: 'none'
//         }}
//       />
//       <div id="canvas-container" ref={canvasRef} />

//       {/* Enhanced Navigation Bar */}
//       <nav className="main-nav">
//         <div className="nav-container">
//           <div className="brand-section">
//             <div className="logo-icon"></div>
//             <div className="logo-text">Artemis</div>
//           </div>
          
//           <div
//             className={`menu-toggle ${menuOpen ? "active" : ""}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
          
//           <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
//             <div className="nav-links-group">
//               <a href="#home" onClick={handleScrollTo("#home")} className="nav-link">
//                 Home
//               </a>
//               <a href="#about" onClick={handleScrollTo("#about")} className="nav-link">
//                 About
//               </a>
//               <a href="#superpowers" onClick={handleScrollTo("#superpowers")} className="nav-link">
//                 Superpowers
//               </a>
//               <a href="#pricing" onClick={handleScrollTo("#pricing")} className="nav-link">
//                 Pricing
//               </a>
//               <a href="#integrations" onClick={handleScrollTo("#integrations")} className="nav-link">
//                 Integrations
//               </a>
//               <a href="#resources" onClick={handleScrollTo("#resources")} className="nav-link">
//                 Resources
//               </a>
//             </div>
//             <a
//               href="#demo"
//               className="nav-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section" id="home">
//         <div className="hero-content-wrapper">
//           <div className="hero-badge">AI-powered ATS for Healthcare Staffing</div>
//           <h1 className="hero-title">Recruit faster with clarity, not clutter.</h1>
//           <p className="hero-description">
//             Streamlined workflows, intelligent automation, and minimalist design 
//             that empowers healthcare staffing teams to focus on what matters most: 
//             connecting great talent with exceptional opportunities.
//           </p>
//           <div className="hero-cta-group">
//             <a
//               href="#demo"
//               className="hero-primary-cta"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book a Demo
//             </a>
//             <a
//               href="#superpowers"
//               className="hero-secondary-cta"
//               onClick={handleScrollTo("#superpowers")}
//             >
//               Explore Features
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* The Challenge Section */}
//       <section className="challenge-section" id="challenge">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">The Challenge We Solve</h2>
//             <p className="section-subtitle-main">
//               Healthcare staffing agencies face overwhelming complexity in their daily operations
//             </p>
//           </div>
          
//           <div className="challenge-grid">
//             <div className="challenge-card">
//               <div className="challenge-icon-wrapper">
//                 <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//               </div>
//               <h3>Time-Consuming Manual Work</h3>
//               <p>
//                 Hours spent on resume parsing, data entry, and candidate tracking that 
//                 could be automated, pulling recruiters away from relationship building.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon-wrapper">
//                 <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="11" cy="11" r="8"></circle>
//                   <path d="m21 21-4.35-4.35"></path>
//                 </svg>
//               </div>
//               <h3>Difficulty Finding Qualified Talent</h3>
//               <p>
//                 Traditional search methods make it nearly impossible to quickly identify 
//                 candidates with the right skills, certifications, and availability.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon-wrapper">
//                 <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
//                 </svg>
//               </div>
//               <h3>Disconnected Systems</h3>
//               <p>
//                 VMS platforms, ATS software, and communication tools operating in silos, 
//                 creating data gaps and workflow friction.
//               </p>
//             </div>
            
//             <div className="challenge-card">
//               <div className="challenge-icon-wrapper">
//                 <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
//                   <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
//                   <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
//                   <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
//                 </svg>
//               </div>
//               <h3>Compliance & Credentialing Complexity</h3>
//               <p>
//                 Tracking licenses, certifications, and compliance documentation across 
//                 dozens or hundreds of healthcare professionals is error-prone and stressful.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights with 3D Carousel */}
//       <section className="highlights-section" id="superpowers">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Talent Superpowers</h2>
//             <p className="section-subtitle-main">
//               Designed for recruiters. Powered by AI. Built for speed and simplicity.
//             </p>
//           </div>
          
//           {/* 3D Carousel Container */}
//           <div className="carousel-3d-container">
//             <div className="carousel-3d-wrapper">
//               <div className="feature-card-3d" style={{ '--card-index': 0 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <path d="m21 21-4.35-4.35"></path>
//                     <circle cx="11" cy="11" r="3"></circle>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">AI-Powered Candidate Search</h3>
//                 <p className="feature-description">
//                   Find the perfect match instantly with intelligent search that understands 
//                   skills, experience, certifications, and availability patterns.
//                 </p>
//                 <ul className="feature-list">
//                   <li>Natural language search queries</li>
//                   <li>Smart skill matching algorithms</li>
//                   <li>Real-time availability tracking</li>
//                 </ul>
//               </div>
              
//               <div className="feature-card-3d" style={{ '--card-index': 1 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
//                 <p className="feature-description">
//                   Seamlessly integrate with major VMS platforms. Jobs flow automatically 
//                   into Artemis, eliminating manual data entry.
//                 </p>
//                 <ul className="feature-list">
//                   <li>Automatic job ingestion</li>
//                   <li>Real-time updates</li>
//                   <li>Multi-VMS support</li>
//                 </ul>
//               </div>
              
//               <div className="feature-card-3d" style={{ '--card-index': 2 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                     <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">Built-In Skills Checklists</h3>
//                 <p className="feature-description">
//                   Interactive checklists that capture candidate qualifications with precision, 
//                   convert to PDFs, and distribute to stakeholders instantly.
//                 </p>
//                 <ul className="feature-list">
//                   <li>Customizable checklist templates</li>
//                   <li>Digital signature collection</li>
//                   <li>Automated distribution</li>
//                 </ul>
//               </div>
              
//               <div className="feature-card-3d" style={{ '--card-index': 3 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                     <line x1="3" y1="9" x2="21" y2="9"></line>
//                     <line x1="9" y1="21" x2="9" y2="9"></line>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">Smart Onboarding Dashboards</h3>
//                 <p className="feature-description">
//                   Visual pipelines that show exactly where every candidate stands, 
//                   with automated reminders and next-step recommendations.
//                 </p>
//                 <ul className="feature-list">
//                   <li>Drag-and-drop pipeline management</li>
//                   <li>Automated workflow triggers</li>
//                   <li>Real-time status updates</li>
//                 </ul>
//               </div>
              
//               <div className="feature-card-3d" style={{ '--card-index': 4 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                     <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
//                     <line x1="12" y1="22.08" x2="12" y2="12"></line>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">Candidate Pipeline Management</h3>
//                 <p className="feature-description">
//                   Design dynamic, stage-based workflows that adapt to your process. 
//                   Never lose track of a candidate again.
//                 </p>
//                 <ul className="feature-list">
//                   <li>Customizable pipeline stages</li>
//                   <li>Bulk candidate actions</li>
//                   <li>Advanced filtering</li>
//                 </ul>
//               </div>
              
//               <div className="feature-card-3d" style={{ '--card-index': 5 } as React.CSSProperties}>
//                 <div className="feature-icon-box-pro">
//                   <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                     <polyline points="14 2 14 8 20 8"></polyline>
//                     <line x1="9" y1="15" x2="15" y2="15"></line>
//                   </svg>
//                 </div>
//                 <h3 className="feature-title">Right-to-Represent Automation</h3>
//                 <p className="feature-description">
//                   Send RTR forms instantly, track signatures, and maintain compliance 
//                   documentation—all within a single, streamlined workflow.
//                 </p>
//                 <ul className="feature-list">
//                   <li>One-click RTR distribution</li>
//                   <li>E-signature integration</li>
//                   <li>Automatic record keeping</li>
//                 </ul>
//               </div>
//             </div>
            
//             {/* Carousel Navigation */}
//             <div className="carousel-nav">
//               <button className="carousel-prev" onClick={() => {/* carousel prev logic */}}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polyline points="15 18 9 12 15 6"></polyline>
//                 </svg>
//               </button>
//               <div className="carousel-indicators">
//                 {[0, 1, 2, 3, 4, 5].map((index) => (
//                   <button 
//                     key={index} 
//                     className="carousel-dot"
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//               <button className="carousel-next" onClick={() => {/* carousel next logic */}}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polyline points="9 18 15 12 9 6"></polyline>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Artemis Section */}
//       <section className="about-section" id="about">
//         <div className="content-container">
//           {/* Hero Copy */}
//           <div className="about-hero">
//             <h2 className="about-hero-title">Built to bring clarity back to recruiting</h2>
//             <p className="about-hero-subtitle">
//               Artemis combines cutting-edge AI technology with intuitive design to deliver 
//               the most powerful yet simple ATS for healthcare staffing agencies.
//             </p>
//           </div>
          
//           {/* Story/Approach + Illustration */}
//           <div className="about-story-grid">
//             <div className="about-story-content">
//               <h3>Our Approach</h3>
//               <p>
//                 Born from real-world staffing challenges, Artemis was designed by industry veterans 
//                 who understand the unique pressures of healthcare recruitment. We've eliminated the 
//                 bloat and complexity that plague traditional ATS platforms, focusing instead on the 
//                 features that actually drive placements.
//               </p>
//               <p>
//                 Every workflow, every interface element, and every automation has been carefully 
//                 crafted to save you time while improving accuracy. Whether you're placing travel 
//                 nurses, allied health professionals, or locum tenens physicians, Artemis adapts 
//                 to your process—not the other way around.
//               </p>
              
//               <div className="about-stats-inline">
//                 <div className="stat-inline-item">
//                   <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="9" cy="7" r="4"></circle>
//                     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-number">500+</div>
//                     <div className="stat-inline-label">Active Agencies</div>
//                   </div>
//                 </div>
                
//                 <div className="stat-inline-item">
//                   <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="8.5" cy="7" r="4"></circle>
//                     <polyline points="17 11 19 13 23 9"></polyline>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-number">10K+</div>
//                     <div className="stat-inline-label">Candidates Placed</div>
//                   </div>
//                 </div>
                
//                 <div className="stat-inline-item">
//                   <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                   </svg>
//                   <div>
//                     <div className="stat-inline-number">99.9%</div>
//                     <div className="stat-inline-label">Platform Uptime</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="about-illustration">
//               <div className="illustration-card">
//                 <svg className="illustration-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                   <line x1="8" y1="21" x2="16" y2="21"></line>
//                   <line x1="12" y1="17" x2="12" y2="21"></line>
//                   <path d="M7 8h10M7 12h6"></path>
//                 </svg>
//                 <h4>Modern Platform</h4>
//                 <p>Cloud-based architecture built for speed and reliability</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Mission, Vision, Values */}
//           <div className="about-mvv-grid">
//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <polyline points="12 6 12 12 16 14"></polyline>
//                 </svg>
//               </div>
//               <h3>Our Mission</h3>
//               <p>
//                 To democratize enterprise-grade recruitment technology, making sophisticated 
//                 ATS capabilities accessible to staffing agencies of all sizes. We believe powerful 
//                 tools shouldn't come with complexity or prohibitive costs.
//               </p>
//             </div>
            
//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                   <circle cx="12" cy="12" r="3"></circle>
//                 </svg>
//               </div>
//               <h3>Our Vision</h3>
//               <p>
//                 To become the global standard for intelligent staffing solutions, where every 
//                 recruiter has access to AI-powered tools that eliminate repetitive tasks and 
//                 provide actionable insights that drive better hiring decisions.
//               </p>
//             </div>
            
//             <div className="mvv-card">
//               <div className="mvv-icon-wrapper">
//                 <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//                 </svg>
//               </div>
//               <h3>Core Values</h3>
//               <ul className="values-list">
//                 <li>
//                   <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span><strong>Simplicity First:</strong> Elegant interfaces that reduce training time</span>
//                 </li>
//                 <li>
//                   <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span><strong>Security by Design:</strong> Enterprise-grade protection for sensitive data</span>
//                 </li>
//                 <li>
//                   <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span><strong>Continuous Innovation:</strong> Regular updates driven by user feedback</span>
//                 </li>
//                 <li>
//                   <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   <span><strong>Customer Success:</strong> Your growth is our success</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           {/* CTA Banner */}
//           <div className="about-cta-banner">
//             <h3>Ready to Transform Your Staffing Operations?</h3>
//             <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
//             <a href="#demo" className="about-cta-button" onClick={handleScrollTo("#demo")}>
//               Book a Demo
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing-section" id="pricing">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Flexible Pricing for Every Stage of Growth</h2>
//             <p className="section-subtitle-main">
//               Custom plans designed around your agency's unique needs
//             </p>
//           </div>
          
//           <div className="pricing-content">
//             <div className="pricing-card">
//               <h3>What's Included</h3>
//               <ul className="pricing-features-list">
//                 <li>✓ Unlimited users and candidates</li>
//                 <li>✓ AI-powered search and matching</li>
//                 <li>✓ VMS integration (Bullhorn, others)</li>
//                 <li>✓ Skills checklists with PDF generation</li>
//                 <li>✓ Right-to-Represent automation</li>
//                 <li>✓ Pipeline management tools</li>
//                 <li>✓ Credentials tracking</li>
//                 <li>✓ 24/7 customer support</li>
//                 <li>✓ Regular feature updates</li>
//                 <li>✓ Enterprise-grade security</li>
//               </ul>
//             </div>
            
//             <div className="pricing-card highlighted">
//               <h3>Why Custom Pricing?</h3>
//               <p>
//                 Every staffing agency operates differently. Your pricing should reflect your 
//                 agency's size, placement volume, integration needs, and growth trajectory.
//               </p>
//               <p>
//                 We work with you to create a plan that makes sense for your business—no 
//                 hidden fees, no surprise charges, no complicated tier systems.
//               </p>
//               <a href="#demo" className="pricing-cta" onClick={handleScrollTo("#demo")}>
//                 Contact Us for Pricing
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Integrations Section */}
//       <section className="integrations-section" id="integrations">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Stay in Sync with Your Workflow</h2>
//             <p className="section-subtitle-main">
//               Seamless connections to the tools you already use
//             </p>
//           </div>
          
//           <div className="integrations-content">
//             <div className="integration-card primary">
//               <div className="integration-icon-wrapper">
//                 <svg className="integration-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="18" cy="5" r="3"></circle>
//                   <circle cx="6" cy="12" r="3"></circle>
//                   <circle cx="18" cy="19" r="3"></circle>
//                   <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//                   <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//                 </svg>
//               </div>
//               <h3>VMS Integrations</h3>
//               <p>
//                 Connect Artemis to your Vendor Management Systems for automatic job feed synchronization. 
//                 New opportunities appear in Artemis instantly, ready for candidate matching.
//               </p>
//               <div className="integration-logos">
//                 <div className="logo-placeholder">Bullhorn</div>
//                 <div className="logo-placeholder">Fieldglass</div>
//                 <div className="logo-placeholder">Beeline</div>
//                 <div className="logo-placeholder">+ More</div>
//               </div>
//             </div>
            
//             <div className="integration-card">
//               <div className="integration-icon-wrapper">
//                 <svg className="integration-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
//                   <path d="M2 17l10 5 10-5"></path>
//                   <path d="M2 12l10 5 10-5"></path>
//                 </svg>
//               </div>
//               <h3>Coming Soon</h3>
//               <p>
//                 We're continuously expanding our integration ecosystem based on customer feedback.
//               </p>
//               <ul className="roadmap-list">
//                 <li>• Calendar sync (Google, Outlook)</li>
//                 <li>• Email integration</li>
//                 <li>• Background check providers</li>
//                 <li>• Payroll systems</li>
//                 <li>• Communication platforms</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Resources Section */}
//       <section className="resources-section" id="resources">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Resources & Insights</h2>
//             <p className="section-subtitle-main">
//               Expert guidance to transform your healthcare staffing operations
//             </p>
//           </div>
          
//           <div className="resources-grid">
//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//                   <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//                 </svg>
//               </div>
//               <h3>Practical Tips for Recruiters</h3>
//               <p>
//                 Time-saving strategies, workflow optimizations, and proven techniques 
//                 to increase placement velocity and candidate satisfaction.
//               </p>
//             </div>
            
//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                   <line x1="8" y1="21" x2="16" y2="21"></line>
//                   <line x1="12" y1="17" x2="12" y2="21"></line>
//                 </svg>
//               </div>
//               <h3>Technology in Healthcare Staffing</h3>
//               <p>
//                 Explore how AI, automation, and modern ATS platforms are reshaping 
//                 the healthcare staffing landscape.
//               </p>
//             </div>
            
//             <div className="resource-category-card">
//               <div className="category-icon-wrapper">
//                 <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <line x1="12" y1="1" x2="12" y2="23"></line>
//                   <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                 </svg>
//               </div>
//               <h3>Industry Trends & Market Insights</h3>
//               <p>
//                 Stay ahead with analysis of healthcare labor markets, regulatory changes, 
//                 and emerging opportunities.
//               </p>
//             </div>
//           </div>
          
//           <div className="newsletter-section">
//             <h3>Stay Updated</h3>
//             <p>Get the latest insights delivered to your inbox</p>
//             <div className="newsletter-form">
//               <input type="email" placeholder="Enter your email" className="newsletter-input" />
//               <button className="newsletter-button">Subscribe</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision Teaser + CTA */}
//       <section className="vision-section">
//         <div className="content-container">
//           <div className="vision-content">
//             <h2>Experience Clarity in Every Click</h2>
//             <p>
//               Join hundreds of healthcare staffing agencies who have transformed their 
//               recruitment process with Artemis. Faster placements, happier teams, better outcomes.
//             </p>
//             <a
//               href="#demo"
//               className="vision-cta-button"
//               onClick={handleScrollTo("#demo")}
//             >
//               Book Your Demo Today
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Book a Demo Section */}
//       <section className="demo-section" id="demo">
//         <div className="content-container">
//           <div className="section-header">
//             <h2 className="section-title-main">Book a Demo</h2>
//             <p className="section-subtitle-main">
//               See Artemis in action and discover how we can transform your staffing operations
//             </p>
//           </div>
          
//           <div className="demo-layout">
//             <div className="demo-form-container">
//               <form onSubmit={submitDemo} className="demo-form">
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="firstName">First Name</label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       required
//                       value={form.firstName}
//                       onChange={(e) =>
//                         setForm({ ...form, firstName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="lastName">Last Name</label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       required
//                       value={form.lastName}
//                       onChange={(e) =>
//                         setForm({ ...form, lastName: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="email">Work Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={form.email}
//                       onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="phone">Phone</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       required
//                       value={form.phone}
//                       onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-row">
//                   <div className="form-field">
//                     <label htmlFor="company">Company</label>
//                     <input
//                       type="text"
//                       id="company"
//                       required
//                       value={form.company}
//                       onChange={(e) =>
//                         setForm({ ...form, company: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="form-field">
//                     <label htmlFor="location">Location (State)</label>
//                     <input
//                       type="text"
//                       id="location"
//                       required
//                       value={form.location}
//                       onChange={(e) =>
//                         setForm({ ...form, location: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
                
//                 <div className="form-field full-width">
//                   <label htmlFor="source">How did you hear about us?</label>
//                   <select
//                     id="source"
//                     required
//                     value={form.source}
//                     onChange={(e) => setForm({ ...form, source: e.target.value })}
//                   >
//                     <option value="">Select one</option>
//                     <option value="google">Google Search</option>
//                     <option value="linkedin">LinkedIn</option>
//                     <option value="referral">Referral / Word of Mouth</option>
//                     <option value="conference">Conference / Event</option>
//                     <option value="email">Email Outreach</option>
//                     <option value="customer">Existing Customer</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
                
//                 <button type="submit" className="demo-submit-button">
//                   Request Demo
//                 </button>
//               </form>
//             </div>
            
//             <div className="demo-info-container">
//               <h3>What to Expect</h3>
//               <ul className="expectations-list">
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <path d="M12 6v6l4 2"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Personalized Walkthrough</strong>
//                     <p>See Artemis configured for your agency's specific workflows</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>30-Minute Session</strong>
//                     <p>Quick, focused demo that respects your time</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Q&A Included</strong>
//                     <p>Ask anything about features, pricing, or implementation</p>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="expectation-icon-wrapper">
//                     <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <line x1="18" y1="20" x2="18" y2="10"></line>
//                       <line x1="12" y1="20" x2="12" y2="4"></line>
//                       <line x1="6" y1="20" x2="6" y2="14"></line>
//                     </svg>
//                   </div>
//                   <div>
//                     <strong>Live Platform Access</strong>
//                     <p>Hands-on experience with real candidate and job data</p>
//                   </div>
//                 </li>
//               </ul>
              
//               <div className="social-proof">
//                 <p className="proof-label">Trusted by leading agencies</p>
//                 <div className="proof-stats">
//                   <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
//                   <span>500+ Active Users</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="site-footer" id="contact">
//         <div className="footer-content">
//           <div className="footer-column">
//             <h4>Artemis ATS</h4>
//             <p>AI-powered recruitment technology for healthcare staffing excellence.</p>
//             <div className="social-links">
//               <a href="#" aria-label="LinkedIn">💼</a>
//               <a href="#" aria-label="Facebook">📘</a>
//               <a href="#" aria-label="Twitter">🐦</a>
//             </div>
//           </div>
          
//           <div className="footer-column">
//             <h4>Quick Links</h4>
//             <a href="#home" onClick={handleScrollTo("#home")}>Home</a>
//             <a href="#about" onClick={handleScrollTo("#about")}>About</a>
//             <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
//             <a href="#pricing" onClick={handleScrollTo("#pricing")}>Pricing</a>
//             <a href="#integrations" onClick={handleScrollTo("#integrations")}>Integrations</a>
//             <a href="#resources" onClick={handleScrollTo("#resources")}>Resources</a>
//           </div>
          
//           <div className="footer-column">
//             <h4>Contact</h4>
//             <p>
//               9330 Lyndon B Johnson Fwy #900
//               <br />
//               Dallas, TX, 75243
//             </p>
//             <p>📧 info@artemisats.com</p>
//           </div>
//         </div>
        
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
//         </div>
//       </footer>

//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         html {
//           touch-action: manipulation;
//         }

//         html, body {
//           overflow-x: hidden;
//           overflow-y: scroll;
//           height: auto;
//           min-height: 100%;
//           scroll-behavior: smooth;
//         }

//         .app {
//           font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           background: #0a0e27;
//           color: #e6e6e9;
//           overflow-x: hidden;
//           position: relative;
//           min-height: 100vh;
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

//         #canvas-container * {
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
//           pointer-events: none;
//         }

//         .star {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           animation: twinkle 3s infinite ease-in-out;
//           opacity: 0.7;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0.2; transform: scale(1); }
//           50% { opacity: 0.7; transform: scale(1.15); }
//         }

//         .star[style*="ffd700"] {
//           animation: goldenTwinkle 4s infinite ease-in-out;
//         }

//         @keyframes goldenTwinkle {
//           0%, 100% { 
//             opacity: 0.25; 
//             transform: scale(1) rotate(0deg);
//             box-shadow: 0 0 3px #ffd700, 0 0 6px #ffd700;
//           }
//           50% { 
//             opacity: 0.6; 
//             transform: scale(1.15) rotate(180deg);
//             box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
//           }
//         }

//         .gradient-bg {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
//           z-index: 0;
//           pointer-events: none;
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

//         /* Enhanced Navigation */
//         .main-nav {
//           position: fixed;
//           top: 0;
//           width: 100%;
//           z-index: 1000;
//           background: rgba(10, 12, 18, 0.85);
//           backdrop-filter: saturate(180%) blur(12px);
//           border-bottom: 1px solid #2a2e36;
//         }

//         .nav-container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 16px 40px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 40px;
//         }

//         .brand-section {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .logo-icon {
//           width: 32px;
//           height: 32px;
//           border-radius: 8px;
//           background: conic-gradient(from 180deg, #6ea8fe, #b77dff, #7ef0ff, #6ea8fe);
//           box-shadow: 0 0 24px rgba(110, 168, 254, 0.15) inset;
//         }

//         .logo-text {
//           font-size: 22px;
//           font-weight: 700;
//           letter-spacing: 0.4px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .nav-menu {
//           display: flex;
//           align-items: center;
//           gap: 32px;
//           flex: 1;
//           justify-content: flex-end;
//         }

//         .nav-links-group {
//           display: flex;
//           gap: 8px;
//           align-items: center;
//         }

//         .nav-link {
//           padding: 10px 16px;
//           color: #e6e6e9;
//           text-decoration: none;
//           font-size: 15px;
//           font-weight: 500;
//           border-radius: 8px;
//           border: 1px solid transparent;
//           transition: all 0.2s ease;
//           position: relative;
//         }

//         .nav-link:hover {
//           border-color: #2a2e36;
//           background: #0c0f16;
//           color: #6ea8fe;
//         }

//         .nav-cta-button {
//           padding: 10px 24px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 8px;
//           font-size: 15px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
//           border: none;
//         }

//         .nav-cta-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
//           background: #e6e6e9;
//           transition: all 0.3s;
//           border-radius: 2px;
//         }

//         /* Hero Section */
//         .hero-section {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 140px 40px 80px;
//           z-index: 10;
//         }

//         .hero-content-wrapper {
//           max-width: 900px;
//           text-align: center;
//         }

//         .hero-badge {
//           display: inline-block;
//           padding: 8px 20px;
//           background: rgba(110, 168, 254, 0.1);
//           border: 1px solid rgba(110, 168, 254, 0.3);
//           border-radius: 999px;
//           color: #6ea8fe;
//           font-size: 14px;
//           font-weight: 500;
//           margin-bottom: 24px;
//           animation: fadeInUp 0.8s ease-out;
//         }

//         .hero-title {
//           font-size: clamp(40px, 7vw, 68px);
//           font-weight: 700;
//           line-height: 1.15;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//           animation: fadeInUp 0.8s ease-out 0.1s both;
//         }

//         .hero-description {
//           font-size: clamp(17px, 2.5vw, 20px);
//           line-height: 1.7;
//           color: #9aa0a6;
//           margin-bottom: 40px;
//           max-width: 750px;
//           margin-left: auto;
//           margin-right: auto;
//           animation: fadeInUp 0.8s ease-out 0.2s both;
//         }

//         .hero-cta-group {
//           display: flex;
//           gap: 16px;
//           justify-content: center;
//           flex-wrap: wrap;
//           animation: fadeInUp 0.8s ease-out 0.3s both;
//         }

//         .hero-primary-cta {
//           padding: 16px 40px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//           border: none;
//         }

//         .hero-primary-cta:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         .hero-secondary-cta {
//           padding: 16px 40px;
//           background: transparent;
//           color: #e6e6e9;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           border: 1px solid #2a2e36;
//         }

//         .hero-secondary-cta:hover {
//           border-color: #667eea;
//           background: rgba(102, 126, 234, 0.05);
//           color: #6ea8fe;
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

//         /* Content Container */
//         .content-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 40px;
//         }

//         /* Section Headers */
//         .section-header {
//           text-align: center;
//           margin-bottom: 60px;
//         }

//         .section-title-main {
//           font-size: clamp(32px, 5vw, 48px);
//           font-weight: 700;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//         }

//         .section-subtitle-main {
//           font-size: clamp(16px, 2.5vw, 20px);
//           color: #9aa0a6;
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         /* Challenge Section */
//         .challenge-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .challenge-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 32px;
//         }

//         .challenge-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 32px;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .challenge-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, #667eea, #764ba2);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.4s ease;
//         }

//         .challenge-card:hover::before {
//           transform: scaleX(1);
//         }

//         .challenge-card:hover {
//           transform: translateY(-10px);
//           border-color: rgba(110, 168, 254, 0.4);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .challenge-icon-wrapper {
//           width: 64px;
//           height: 64px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 24px;
//           transition: all 0.3s ease;
//         }

//         .challenge-card:hover .challenge-icon-wrapper {
//           transform: scale(1.1) rotate(5deg);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .challenge-icon {
//           width: 32px;
//           height: 32px;
//           color: #6ea8fe;
//         }

//         .challenge-card h3 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .challenge-card p {
//           color: #9aa0a6;
//           line-height: 1.7;
//           font-size: 16px;
//         }

//         /* Features/Highlights Section with 3D Carousel */
//         .highlights-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//           overflow: hidden;
//         }

//         .carousel-3d-container {
//           position: relative;
//           max-width: 1000px;
//           margin: 0 auto;
//           perspective: 1500px;
//           height: 380px;
//         }

//         .carousel-3d-wrapper {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           animation: rotate3d 36s linear infinite;
//         }

//         @keyframes rotate3d {
//           from {
//             transform: rotateY(0deg);
//           }
//           to {
//             transform: rotateY(360deg);
//           }
//         }

//         .feature-card-3d {
//           position: absolute;
//           width: 300px;
//           left: 50%;
//           top: 50%;
//           margin-left: -150px;
//           margin-top: -145px;
//           background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(102, 126, 234, 0.25);
//           border-radius: 18px;
//           padding: 26px 24px;
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//           transform-style: preserve-3d;
//           box-shadow: 
//             0 10px 40px rgba(0, 0, 0, 0.3),
//             inset 0 1px 0 rgba(255, 255, 255, 0.1);
//           transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px);
//           animation: cardFloat 6s ease-in-out infinite;
//           animation-delay: calc(var(--card-index) * 1s);
//         }

//         @keyframes cardFloat {
//           0%, 100% {
//             transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px) translateY(0);
//           }
//           50% {
//             transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px) translateY(-8px);
//           }
//         }

//         .feature-card-3d::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
//           border-radius: 18px;
//           opacity: 0;
//           transition: opacity 0.5s ease;
//           z-index: -1;
//         }

//         .feature-card-3d:hover::before {
//           opacity: 1;
//         }

//         .feature-card-3d::after {
//           content: '';
//           position: absolute;
//           top: -2px;
//           left: -2px;
//           right: -2px;
//           bottom: -2px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           border-radius: 18px;
//           opacity: 0;
//           z-index: -2;
//           filter: blur(10px);
//           transition: opacity 0.5s ease;
//         }

//         .feature-card-3d:hover::after {
//           opacity: 0.4;
//         }

//         .feature-card-3d:hover {
//           transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(490px) scale(1.05);
//           border-color: rgba(102, 126, 234, 0.6);
//           box-shadow: 
//             0 20px 60px rgba(102, 126, 234, 0.4),
//             inset 0 1px 0 rgba(255, 255, 255, 0.2);
//         }

//         .feature-icon-box-pro {
//           width: 56px;
//           height: 56px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
//           border: 2px solid rgba(102, 126, 234, 0.4);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 18px;
//           position: relative;
//           overflow: hidden;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .feature-icon-box-pro::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
//           transform: rotate(45deg);
//           animation: shimmer 3s infinite;
//         }

//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%) translateY(-100%) rotate(45deg);
//           }
//           100% {
//             transform: translateX(100%) translateY(100%) rotate(45deg);
//           }
//         }

//         .feature-card-3d:hover .feature-icon-box-pro {
//           transform: scale(1.1);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
//           border-color: rgba(102, 126, 234, 0.7);
//           box-shadow: 
//             0 10px 30px rgba(102, 126, 234, 0.4),
//             inset 0 2px 4px rgba(255, 255, 255, 0.1);
//         }

//         .feature-icon-svg {
//           width: 28px;
//           height: 28px;
//           color: #6ea8fe;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.5));
//         }

//         .feature-card-3d:hover .feature-icon-svg {
//           color: #8ab4fe;
//           transform: scale(1.15) rotate(5deg);
//           filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.7));
//         }

//         .feature-title {
//           font-size: 18px;
//           font-weight: 600;
//           margin-bottom: 10px;
//           color: #e6e6e9;
//           line-height: 1.3;
//           transition: color 0.3s ease;
//         }

//         .feature-card-3d:hover .feature-title {
//           color: #ffffff;
//         }

//         .feature-description {
//           color: #9aa0a6;
//           line-height: 1.5;
//           margin-bottom: 14px;
//           font-size: 13px;
//           transition: color 0.3s ease;
//         }

//         .feature-card-3d:hover .feature-description {
//           color: #b8c5d6;
//         }

//         .feature-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .feature-list li {
//           color: #b8c5d6;
//           padding: 5px 0;
//           padding-left: 18px;
//           position: relative;
//           font-size: 12px;
//           line-height: 1.4;
//           transition: all 0.3s ease;
//         }

//         .feature-list li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           color: #6ea8fe;
//           font-weight: bold;
//           font-size: 11px;
//           transition: all 0.3s ease;
//         }

//         .feature-card-3d:hover .feature-list li {
//           color: #d0d8e6;
//           padding-left: 22px;
//         }

//         .feature-card-3d:hover .feature-list li::before {
//           color: #8ab4fe;
//           left: 4px;
//         }

//         /* Carousel Navigation */
//         .carousel-nav {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 24px;
//           margin-top: 60px;
//         }

//         .carousel-prev,
//         .carousel-next {
//           width: 48px;
//           height: 48px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .carousel-prev::before,
//         .carousel-next::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .carousel-prev:hover::before,
//         .carousel-next:hover::before {
//           opacity: 1;
//         }

//         .carousel-prev:hover,
//         .carousel-next:hover {
//           border-color: rgba(102, 126, 234, 0.6);
//           transform: scale(1.1);
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//         }

//         .carousel-prev svg,
//         .carousel-next svg {
//           width: 24px;
//           height: 24px;
//           color: #6ea8fe;
//           position: relative;
//           z-index: 1;
//           transition: transform 0.3s ease;
//         }

//         .carousel-prev:hover svg {
//           transform: translateX(-2px);
//         }

//         .carousel-next:hover svg {
//           transform: translateX(2px);
//         }

//         .carousel-indicators {
//           display: flex;
//           gap: 12px;
//         }

//         .carousel-dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.25);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           cursor: pointer;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           padding: 0;
//           position: relative;
//         }

//         .carousel-dot::before {
//           content: '';
//           position: absolute;
//           inset: -4px;
//           border-radius: 50%;
//           border: 2px solid transparent;
//           transition: border-color 0.3s ease;
//         }

//         .carousel-dot:hover {
//           background: rgba(255, 255, 255, 0.4);
//           transform: scale(1.3);
//         }

//         .carousel-dot:hover::before {
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .carousel-dot.active {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           width: 28px;
//           border-radius: 5px;
//           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
//         }

//         .carousel-dot.active::before {
//           border-radius: 7px;
//         }

//         /* About Artemis Section */
//         .about-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .about-hero {
//           text-align: center;
//           max-width: 900px;
//           margin: 0 auto 80px;
//         }

//         .about-hero-title {
//           font-size: clamp(36px, 6vw, 52px);
//           font-weight: 700;
//           margin-bottom: 20px;
//           color: #e6e6e9;
//           line-height: 1.2;
//         }

//         .about-hero-subtitle {
//           font-size: clamp(17px, 2.5vw, 20px);
//           color: #9aa0a6;
//           line-height: 1.7;
//         }

//         .about-story-grid {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr;
//           gap: 60px;
//           margin-bottom: 80px;
//           align-items: center;
//         }

//         .about-story-content h3 {
//           font-size: 32px;
//           font-weight: 600;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .about-story-content p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           font-size: 17px;
//           margin-bottom: 24px;
//         }

//         .about-stats-inline {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 24px;
//           margin-top: 40px;
//         }

//         .stat-inline-item {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           padding: 20px;
//           background: rgba(110, 168, 254, 0.05);
//           border: 1px solid rgba(110, 168, 254, 0.2);
//           border-radius: 12px;
//           transition: all 0.3s ease;
//         }

//         .stat-inline-item:hover {
//           transform: translateY(-5px);
//           border-color: rgba(110, 168, 254, 0.4);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
//         }

//         .stat-icon {
//           width: 40px;
//           height: 40px;
//           color: #6ea8fe;
//           flex-shrink: 0;
//         }

//         .stat-inline-number {
//           font-size: 28px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #6ea8fe 0%, #b77dff 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .stat-inline-label {
//           color: #9aa0a6;
//           font-size: 13px;
//           font-weight: 500;
//         }

//         .about-illustration {
//           background: rgba(255, 255, 255, 0.03);
//           border: 2px dashed rgba(102, 126, 234, 0.3);
//           border-radius: 20px;
//           padding: 60px 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-height: 400px;
//           transition: all 0.4s ease;
//         }

//         .about-illustration:hover {
//           border-color: rgba(102, 126, 234, 0.5);
//           background: rgba(255, 255, 255, 0.05);
//           transform: scale(1.02);
//         }

//         .illustration-card {
//           text-align: center;
//         }

//         .illustration-icon {
//           width: 120px;
//           height: 120px;
//           margin: 0 auto 24px;
//           color: #6ea8fe;
//           opacity: 0.8;
//         }

//         .illustration-card h4 {
//           font-size: 24px;
//           font-weight: 600;
//           color: #e6e6e9;
//           margin-bottom: 12px;
//         }

//         .illustration-card p {
//           color: #9aa0a6;
//           font-size: 16px;
//         }

//         /* Mission, Vision, Values Grid */
//         .about-mvv-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//           gap: 36px;
//           margin-bottom: 80px;
//         }

//         .mvv-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 20px;
//           padding: 40px;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .mvv-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 4px;
//           background: linear-gradient(90deg, #667eea, #764ba2);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.4s ease;
//         }

//         .mvv-card:hover::before {
//           transform: scaleX(1);
//         }

//         .mvv-card:hover {
//           transform: translateY(-12px);
//           border-color: rgba(102, 126, 234, 0.4);
//           box-shadow: 0 25px 60px rgba(102, 126, 234, 0.2);
//           background: rgba(255, 255, 255, 0.05);
//         }

//         .mvv-icon-wrapper {
//           width: 72px;
//           height: 72px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 2px solid rgba(102, 126, 234, 0.3);
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 24px;
//           transition: all 0.3s ease;
//         }

//         .mvv-card:hover .mvv-icon-wrapper {
//           transform: scale(1.1) rotate(10deg);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
//           border-color: rgba(102, 126, 234, 0.6);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
//         }

//         .mvv-icon {
//           width: 36px;
//           height: 36px;
//           color: #6ea8fe;
//         }

//         .mvv-card h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//         }

//         .mvv-card p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           font-size: 16px;
//         }

//         .values-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }

//         .values-list li {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//         }

//         .values-list li:last-child {
//           border-bottom: none;
//         }

//         .check-icon {
//           width: 20px;
//           height: 20px;
//           color: #6ea8fe;
//           flex-shrink: 0;
//           margin-top: 2px;
//         }

//         .values-list li span {
//           color: #b8c5d6;
//           font-size: 15px;
//           line-height: 1.6;
//         }

//         .values-list li strong {
//           color: #e6e6e9;
//           font-weight: 600;
//         }

//         /* About CTA Banner */
//         .about-cta-banner {
//           max-width: 900px;
//           margin: 0 auto;
//           text-align: center;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
//           border: 2px solid rgba(102, 126, 234, 0.3);
//           border-radius: 24px;
//           padding: 60px 40px;
//           position: relative;
//           overflow: hidden;
//         }

//         .about-cta-banner::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
//           transition: left 0.7s ease;
//         }

//         .about-cta-banner:hover::before {
//           left: 100%;
//         }

//         .about-cta-banner h3 {
//           font-size: 36px;
//           font-weight: 700;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//           position: relative;
//         }

//         .about-cta-banner p {
//           font-size: 18px;
//           color: #b8c5d6;
//           margin-bottom: 32px;
//           line-height: 1.7;
//           position: relative;
//         }

//         .about-cta-button {
//           display: inline-block;
//           padding: 18px 48px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
//           position: relative;
//         }

//         .about-cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
//         }

//         /* Who We Serve Section */
//         .serve-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .serve-content {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr;
//           gap: 60px;
//           align-items: center;
//         }

//         .serve-text-block h3 {
//           font-size: 32px;
//           font-weight: 600;
//           margin-bottom: 20px;
//           color: #e6e6e9;
//         }

//         .serve-text-block p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           font-size: 17px;
//           margin-bottom: 36px;
//         }

//         .serve-stats {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 24px;
//         }

//         .stat-item {
//           text-align: center;
//           padding: 20px;
//           background: rgba(110, 168, 254, 0.05);
//           border: 1px solid rgba(110, 168, 254, 0.2);
//           border-radius: 12px;
//         }

//         .stat-number {
//           font-size: 36px;
//           font-weight: 800;
//           background: linear-gradient(135deg, #6ea8fe 0%, #b77dff 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 8px;
//         }

//         .stat-label {
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .serve-image-placeholder {
//           background: rgba(255, 255, 255, 0.03);
//           border: 2px dashed #2a2e36;
//           border-radius: 16px;
//           min-height: 400px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .placeholder-content {
//           text-align: center;
//         }

//         .placeholder-icon {
//           font-size: 80px;
//           margin-bottom: 16px;
//         }

//         .placeholder-content p {
//           color: #9aa0a6;
//           font-size: 16px;
//         }

//         /* Pricing Section */
//         .pricing-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//         }

//         .pricing-content {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 32px;
//         }

//         .pricing-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .pricing-card.highlighted {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//           border-color: rgba(102, 126, 234, 0.3);
//         }

//         .pricing-card h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .pricing-features-list {
//           list-style: none;
//           padding: 0;
//         }

//         .pricing-features-list li {
//           color: #b8c5d6;
//           padding: 12px 0;
//           border-bottom: 1px solid rgba(255, 255, 255, 0.05);
//           font-size: 16px;
//         }

//         .pricing-features-list li:last-child {
//           border-bottom: none;
//         }

//         .pricing-card p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 20px;
//           font-size: 16px;
//         }

//         .pricing-cta {
//           display: inline-block;
//           padding: 16px 32px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//           margin-top: 12px;
//         }

//         .pricing-cta:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         /* Integrations Section */
//         .integrations-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .integrations-content {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 32px;
//         }

//         .integration-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .integration-card.primary {
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//           border-color: rgba(102, 126, 234, 0.3);
//         }

//         .integration-icon-wrapper {
//           width: 72px;
//           height: 72px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 2px solid rgba(102, 126, 234, 0.3);
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 24px;
//           transition: all 0.3s ease;
//         }

//         .integration-card:hover .integration-icon-wrapper {
//           transform: scale(1.1) rotate(10deg);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
//           border-color: rgba(102, 126, 234, 0.6);
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
//         }

//         .integration-icon-svg {
//           width: 40px;
//           height: 40px;
//           color: #6ea8fe;
//         }

//         .integration-card h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 16px;
//           color: #e6e6e9;
//         }

//         .integration-card p {
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 24px;
//           font-size: 16px;
//         }

//         .integration-logos {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 12px;
//         }

//         .logo-placeholder {
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 8px;
//           padding: 16px;
//           text-align: center;
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .roadmap-list {
//           list-style: none;
//           padding: 0;
//         }

//         .roadmap-list li {
//           color: #b8c5d6;
//           padding: 8px 0;
//           font-size: 16px;
//         }

//         /* Resources Section */
//         .resources-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: rgba(10, 12, 18, 0.5);
//         }

//         .resources-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 32px;
//           margin-bottom: 60px;
//         }

//         .resource-category-card {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 36px;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .resource-category-card::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
//           opacity: 0;
//           transition: opacity 0.4s ease;
//         }

//         .resource-category-card:hover::before {
//           opacity: 1;
//         }

//         .resource-category-card:hover {
//           transform: translateY(-10px);
//           border-color: rgba(110, 168, 254, 0.4);
//           box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
//         }

//         .category-icon-wrapper {
//           width: 64px;
//           height: 64px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 20px;
//           transition: all 0.3s ease;
//         }

//         .resource-category-card:hover .category-icon-wrapper {
//           transform: scale(1.15) rotate(10deg);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
//           border-color: rgba(102, 126, 234, 0.5);
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//         }

//         .category-icon-svg {
//           width: 32px;
//           height: 32px;
//           color: #6ea8fe;
//         }

//         .resource-category-card h3 {
//           font-size: 22px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .resource-category-card p {
//           color: #9aa0a6;
//           line-height: 1.7;
//           font-size: 16px;
//         }

//         .newsletter-section {
//           max-width: 700px;
//           margin: 0 auto;
//           text-align: center;
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 48px;
//         }

//         .newsletter-section h3 {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 12px;
//           color: #e6e6e9;
//         }

//         .newsletter-section p {
//           color: #9aa0a6;
//           margin-bottom: 24px;
//           font-size: 16px;
//         }

//         .newsletter-form {
//           display: flex;
//           gap: 12px;
//           max-width: 500px;
//           margin: 0 auto;
//         }

//         .newsletter-input {
//           flex: 1;
//           padding: 14px 20px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 10px;
//           color: #e6e6e9;
//           font-size: 15px;
//         }

//         .newsletter-input:focus {
//           outline: none;
//           border-color: #6ea8fe;
//         }

//         .newsletter-button {
//           padding: 14px 28px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-size: 15px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .newsletter-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
//         }

//         /* Vision Section */
//         .vision-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
//         }

//         .vision-content {
//           max-width: 800px;
//           margin: 0 auto;
//           text-align: center;
//         }

//         .vision-content h2 {
//           font-size: clamp(32px, 5vw, 48px);
//           font-weight: 700;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .vision-content p {
//           font-size: clamp(17px, 2.5vw, 20px);
//           color: #9aa0a6;
//           line-height: 1.8;
//           margin-bottom: 36px;
//         }

//         .vision-cta-button {
//           display: inline-block;
//           padding: 18px 48px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           text-decoration: none;
//           border-radius: 12px;
//           font-size: 18px;
//           font-weight: 600;
//           transition: all 0.3s;
//           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
//         }

//         .vision-cta-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
//         }

//         /* Demo Section */
//         .demo-section {
//           position: relative;
//           padding: 120px 0;
//           z-index: 10;
//         }

//         .demo-layout {
//           display: grid;
//           grid-template-columns: 1.2fr 1fr;
//           gap: 48px;
//           align-items: start;
//         }

//         .demo-form-container {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .demo-form {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//         }

//         .form-row {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 20px;
//         }

//         .form-field {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .form-field.full-width {
//           grid-column: 1 / -1;
//         }

//         .form-field label {
//           color: #9aa0a6;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         .form-field input,
//         .form-field select {
//           padding: 14px 16px;
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid #2a2e36;
//           border-radius: 10px;
//           color: #e6e6e9;
//           font-size: 15px;
//           transition: all 0.2s;
//         }

//         .form-field input:focus,
//         .form-field select:focus {
//           outline: none;
//           border-color: #6ea8fe;
//           box-shadow: 0 0 0 3px rgba(110, 168, 254, 0.1);
//         }

//         .form-field select {
//           cursor: pointer;
//         }

//         .form-field option {
//           background: #0a0e27;
//           color: #e6e6e9;
//         }

//         .demo-submit-button {
//           padding: 16px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 12px;
//           font-size: 17px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
//         }

//         .demo-submit-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
//         }

//         .demo-info-container {
//           background: rgba(255, 255, 255, 0.03);
//           border: 1px solid #2a2e36;
//           border-radius: 16px;
//           padding: 40px;
//         }

//         .demo-info-container h3 {
//           font-size: 24px;
//           font-weight: 600;
//           margin-bottom: 24px;
//           color: #e6e6e9;
//         }

//         .expectations-list {
//           list-style: none;
//           padding: 0;
//           margin-bottom: 36px;
//         }

//         .expectations-list li {
//           display: flex;
//           gap: 16px;
//           margin-bottom: 24px;
//           align-items: flex-start;
//         }

//         .expectation-icon-wrapper {
//           width: 48px;
//           height: 48px;
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
//           border: 1px solid rgba(102, 126, 234, 0.3);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//           transition: all 0.3s ease;
//         }

//         .expectations-list li:hover .expectation-icon-wrapper {
//           transform: scale(1.1) rotate(5deg);
//           background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
//           border-color: rgba(102, 126, 234, 0.5);
//         }

//         .expectation-icon-svg {
//           width: 24px;
//           height: 24px;
//           color: #6ea8fe;
//         }

//         .expectations-list strong {
//           display: block;
//           color: #e6e6e9;
//           font-size: 16px;
//           margin-bottom: 4px;
//         }

//         .expectations-list p {
//           color: #9aa0a6;
//           font-size: 14px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .social-proof {
//           padding: 24px;
//           background: rgba(110, 168, 254, 0.05);
//           border: 1px solid rgba(110, 168, 254, 0.2);
//           border-radius: 12px;
//         }

//         .proof-label {
//           font-size: 14px;
//           color: #9aa0a6;
//           margin-bottom: 12px;
//         }

//         .proof-stats {
//           display: flex;
//           gap: 16px;
//           flex-wrap: wrap;
//         }

//         .proof-stats span {
//           color: #e6e6e9;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         /* Footer */
//         .site-footer {
//           position: relative;
//           padding: 60px 40px 30px;
//           background: rgba(10, 12, 18, 0.8);
//           backdrop-filter: blur(10px);
//           border-top: 1px solid #2a2e36;
//           z-index: 10;
//         }

//         .footer-content {
//           max-width: 1280px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 48px;
//           margin-bottom: 40px;
//         }

//         .footer-column h4 {
//           font-size: 18px;
//           font-weight: 600;
//           margin-bottom: 20px;
//           color: #6ea8fe;
//         }

//         .footer-column p,
//         .footer-column a {
//           color: #9aa0a6;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 12px;
//           line-height: 1.7;
//           font-size: 15px;
//         }

//         .footer-column a:hover {
//           color: #6ea8fe;
//         }

//         .social-links {
//           display: flex;
//           gap: 12px;
//           margin-top: 20px;
//         }

//         .social-links a {
//           display: inline-flex;
//           width: 42px;
//           height: 42px;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 50%;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s;
//           margin-bottom: 0;
//         }

//         .social-links a:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
//         }

//         .footer-bottom {
//           max-width: 1280px;
//           margin: 0 auto;
//           text-align: center;
//           padding-top: 30px;
//           border-top: 1px solid #2a2e36;
//         }

//         .footer-bottom p {
//           color: #9aa0a6;
//           font-size: 14px;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .nav-container {
//             padding: 16px 30px;
//           }

//           .content-container {
//             padding: 0 30px;
//           }

//           .demo-layout {
//             grid-template-columns: 1fr;
//           }

//           .pricing-content,
//           .integrations-content {
//             grid-template-columns: 1fr;
//           }

//           .about-story-grid {
//             grid-template-columns: 1fr;
//             gap: 40px;
//           }

//           .about-stats-inline {
//             grid-template-columns: 1fr;
//           }

//           .about-mvv-grid {
//             grid-template-columns: 1fr;
//           }

//           /* Adjust 3D carousel for tablets */
//           .carousel-3d-container {
//             height: 340px;
//             perspective: 1200px;
//           }

//           .feature-card-3d {
//             width: 270px;
//             margin-left: -135px;
//             margin-top: -135px;
//             padding: 24px 20px;
//             transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px);
//           }

//           @keyframes cardFloat {
//             0%, 100% {
//               transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px) translateY(0);
//             }
//             50% {
//               transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px) translateY(-7px);
//             }
//           }

//           .feature-card-3d:hover {
//             transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(410px) scale(1.05);
//           }

//           .feature-icon-box-pro {
//             width: 50px;
//             height: 50px;
//           }

//           .feature-icon-svg {
//             width: 25px;
//             height: 25px;
//           }

//           .feature-title {
//             font-size: 17px;
//             margin-bottom: 9px;
//           }

//           .feature-description {
//             font-size: 12px;
//             margin-bottom: 12px;
//           }

//           .feature-list li {
//             font-size: 11px;
//             padding: 4px 0;
//             padding-left: 16px;
//           }
//         }

//         @media (max-width: 768px) {
//           .menu-toggle {
//             display: flex;
//             z-index: 1001;
//           }

//           .nav-menu {
//             position: fixed;
//             top: 68px;
//             right: -100%;
//             width: 100%;
//             height: calc(100vh - 68px);
//             background: rgba(10, 12, 18, 0.98);
//             flex-direction: column;
//             justify-content: flex-start;
//             padding: 40px;
//             transition: right 0.3s ease;
//             align-items: stretch;
//           }

//           .nav-menu.active {
//             right: 0;
//           }

//           .nav-links-group {
//             flex-direction: column;
//             width: 100%;
//           }

//           .nav-link {
//             width: 100%;
//             text-align: center;
//             padding: 16px;
//           }

//           .nav-cta-button {
//             width: 100%;
//             text-align: center;
//           }

//           .hero-section {
//             padding: 120px 20px 60px;
//           }

//           .challenge-section,
//           .highlights-section,
//           .about-section,
//           .pricing-section,
//           .integrations-section,
//           .resources-section,
//           .vision-section,
//           .demo-section {
//             padding: 80px 0;
//           }

//           .content-container {
//             padding: 0 20px;
//           }

//           .form-row {
//             grid-template-columns: 1fr;
//           }

//           .hero-cta-group {
//             flex-direction: column;
//             width: 100%;
//           }

//           .hero-primary-cta,
//           .hero-secondary-cta {
//             width: 100%;
//             text-align: center;
//           }

//           .about-cta-banner {
//             padding: 40px 24px;
//           }

//           .about-cta-banner h3 {
//             font-size: 28px;
//           }

//           /* Convert 3D carousel to grid on mobile */
//           .carousel-3d-wrapper {
//             animation: none;
//             position: static;
//             height: auto;
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 20px;
//             padding: 0 10px;
//           }

//           .carousel-3d-container {
//             perspective: none;
//             height: auto;
//             overflow: visible;
//           }

//           .feature-card-3d {
//             position: static;
//             width: 100%;
//             max-width: 100%;
//             margin: 0;
//             transform: none !important;
//             animation: none;
//             padding: 24px 20px;
//           }

//           .feature-card-3d:hover {
//             transform: translateY(-8px) !important;
//           }

//           .carousel-nav {
//             display: none;
//           }

//           .feature-icon-box-pro {
//             width: 48px;
//             height: 48px;
//           }

//           .feature-icon-svg {
//             width: 24px;
//             height: 24px;
//           }

//           .feature-title {
//             font-size: 16px;
//             margin-bottom: 8px;
//           }

//           .feature-description {
//             font-size: 12px;
//             margin-bottom: 10px;
//           }

//           .feature-list li {
//             font-size: 11px;
//             padding: 4px 0;
//             padding-left: 16px;
//           }

//           .feature-list li::before {
//             font-size: 10px;
//           }
//         }

//         @media (max-width: 480px) {
//           .feature-card-3d {
//             padding: 20px 18px;
//           }

//           .feature-icon-box-pro {
//             width: 44px;
//             height: 44px;
//             margin-bottom: 14px;
//           }

//           .feature-icon-svg {
//             width: 22px;
//             height: 22px;
//           }

//           .feature-title {
//             font-size: 15px;
//           }

//           .feature-description {
//             font-size: 11px;
//           }

//           .feature-list li {
//             font-size: 10px;
//           }

//           .about-stats-inline {
//             gap: 16px;
//           }

//           .stat-inline-item {
//             padding: 16px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;






















































import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Font loading
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  source: string;
}

const Home: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    location: "",
    source: "",
  });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const moonCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);

  // Canvas moon animation
  useEffect(() => {
    if (!moonCanvasRef.current) return;

    const canvas = moonCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = 0;
    let rotationAngle = 0;

    const handleResize = (): void => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = (): void => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    let moonAngle = Math.PI * 0.2;
    const baseMoonRadius = 70;
    const baseOrbitRadiusX = width * 0.12;
    const baseOrbitRadiusY = width * 0.1;
    const baseMoonCenterX = width * 0.75;
    const baseMoonCenterY = height * 0.25;

    const drawMoon = (): void => {
      const scrollProgress = Math.min(scrollY / 2000, 1);
      
      const moonRadius = baseMoonRadius * (1 + scrollProgress * 0.5);
      const orbitRadiusX = baseOrbitRadiusX * (1 + scrollProgress * 0.3);
      const orbitRadiusY = baseOrbitRadiusY * (1 + scrollProgress * 0.3);
      
      const moonCenterX = baseMoonCenterX - scrollProgress * width * 0.1;
      const moonCenterY = baseMoonCenterY + scrollProgress * height * 0.08;
      
      const moonX = moonCenterX + Math.cos(moonAngle) * orbitRadiusX;
      const moonY = moonCenterY + Math.sin(moonAngle) * orbitRadiusY;

      ctx.save();
      ctx.translate(moonX, moonY);
      ctx.rotate(rotationAngle);

      // Subtle outer glow - much more refined
      const moonGlow = ctx.createRadialGradient(
        0, 0, moonRadius * 0.4,
        0, 0, moonRadius * 2.0
      );
      // moonGlow.addColorStop(0, "rgba(255,255,250,0.15)");
      // moonGlow.addColorStop(0.5, "rgba(255,255,245,0.08)");
      // moonGlow.addColorStop(0.8, "rgba(250,245,240,0.03)");
      // moonGlow.addColorStop(1, "rgba(245,240,235,0)");

      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(0, 0, moonRadius * 2.0, 0, Math.PI * 2);
      ctx.fill();

      // Moon base with subtle gradient
      const moonBase = ctx.createRadialGradient(
        -moonRadius * 0.3, -moonRadius * 0.3, 0,
        0, 0, moonRadius
      );
      // moonBase.addColorStop(0, "rgba(250,250,248,0.95)");
      // moonBase.addColorStop(0.5, "rgba(245,245,243,0.90)");
      // moonBase.addColorStop(1, "rgba(240,240,238,0.85)");

      ctx.fillStyle = moonBase;
      ctx.beginPath();
      ctx.arc(0, 0, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle texture craters - reduced opacity
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = moonRadius * 0.6;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const textureGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, moonRadius * 0.2
        );
        // textureGradient.addColorStop(0, "rgba(240,240,240,0.03)");
        // textureGradient.addColorStop(1, "rgba(240,240,240,0)");
        
        ctx.fillStyle = textureGradient;
        ctx.beginPath();
        ctx.arc(x, y, moonRadius * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Very subtle rotating waves - minimal visibility
      for (let i = 0; i < 6; i++) {
        const waveAngle = (i / 6) * Math.PI * 2 + rotationAngle * 2;
        const waveRadius = moonRadius * 0.7;
        const waveX = Math.cos(waveAngle) * waveRadius;
        const waveY = Math.sin(waveAngle) * waveRadius;
        
        const waveGradient = ctx.createRadialGradient(
          waveX, waveY, 0,
          waveX, waveY, moonRadius * 0.15
        );
        // waveGradient.addColorStop(0, "rgba(245,245,245,0.02)");
        // waveGradient.addColorStop(1, "rgba(245,245,245,0)");
        
        ctx.fillStyle = waveGradient;
        ctx.beginPath();
        ctx.arc(waveX, waveY, moonRadius * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Refined shine/highlight - more subtle
      const shineGradient = ctx.createRadialGradient(
        -moonRadius * 0.3, -moonRadius * 0.3, 0,
        -moonRadius * 0.3, -moonRadius * 0.3, moonRadius * 0.5
      );
      // shineGradient.addColorStop(0, "rgba(255,255,255,0.3)");
      // shineGradient.addColorStop(0.5, "rgba(255,255,255,0.12)");
      // shineGradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = shineGradient;
      ctx.beginPath();
      ctx.arc(-moonRadius * 0.3, -moonRadius * 0.3, moonRadius * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, width, height);
      drawMoon();
      moonAngle += 0.0006;
      rotationAngle += 0.0003;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!starsContainerRef.current) return;

    for (let i = 0; i < 35; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const size = Math.random() * 2.5 + 0.8;
      star.style.width = size + "px";
      star.style.height = size + "px";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";

      const isGolden = Math.random() > 0.96;
      if (isGolden) {
        star.style.backgroundColor = "#ffd700";
        star.style.boxShadow = "0 0 3px #ffd700, 0 0 6px #ffd700";
        star.style.animationDelay = Math.random() * 5 + "s";
        star.style.animationDuration = Math.random() * 4 + 3 + "s";
      } else {
        star.style.backgroundColor = "#ffffff";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = Math.random() * 3 + 2 + "s";
      }

      starsContainerRef.current.appendChild(star);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colorsArray[i] = 0.4 + Math.random() * 0.6;
        if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
        if (i % 3 === 2) colorsArray[i] = 0.8 + Math.random() * 0.2;
      } else if (colorChoice < 0.66) {
        colorsArray[i] = 0.7 + Math.random() * 0.3;
        if (i % 3 === 0) colorsArray[i] = 0.4 + Math.random() * 0.3;
        if (i % 3 === 2) colorsArray[i] = 0.6 + Math.random() * 0.4;
      } else {
        colorsArray[i] = 0.8 + Math.random() * 0.2;
        if (i % 3 === 0) colorsArray[i] = 0.9 + Math.random() * 0.1;
        if (i % 3 === 1) colorsArray[i] = 0.5 + Math.random() * 0.3;
      }
    }

    for (let i = 0; i < particlesCount; i++) {
      sizesArray[i] = Math.random() * 0.05;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );
    particlesGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizesArray, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    particlesMeshRef.current = particlesMesh;
    scene.add(particlesMesh);

    const bluePlanetGroup = new THREE.Group();
    const bluePlanetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const bluePlanetMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b9fff,
      metalness: 0.3,
      roughness: 0.5,
      emissive: 0x4a7acc,
      emissiveIntensity: 0.1,
    });
    const bluePlanet = new THREE.Mesh(bluePlanetGeometry, bluePlanetMaterial);
    bluePlanetGroup.add(bluePlanet);
    bluePlanetGroup.position.set(35, 15, -40);
    scene.add(bluePlanetGroup);

    const orangePlanetGroup = new THREE.Group();
    const orangePlanetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const orangePlanetMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa66,
      metalness: 0.2,
      roughness: 0.6,
      emissive: 0xcc6633,
      emissiveIntensity: 0.08,
    });
    const orangePlanet = new THREE.Mesh(orangePlanetGeometry, orangePlanetMaterial);
    orangePlanetGroup.add(orangePlanet);
    orangePlanetGroup.position.set(-30, -12, -45);
    scene.add(orangePlanetGroup);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.15, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.2);
    scene.add(hemisphereLight);

    camera.position.set(0, 0, 20);

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleScroll = (): void => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const handleMouseMove = (event: MouseEvent): void => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);

    const animate = (): void => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y += 0.0005;
        particlesMeshRef.current.rotation.x += 0.0003;

        const parallaxY = scrollY * 0.001;
        particlesMeshRef.current.position.y = -parallaxY * 2;
        particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
      }

      if (cameraRef.current) {
        cameraRef.current.position.x +=
          (mouseX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y +=
          (-mouseY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(scene.position);

        const baseZ = 20;
        cameraRef.current.position.z = baseZ;

        const scrollEffect = scrollY * 0.001;
        cameraRef.current.rotation.z = scrollEffect * 0.05;
      }

      pointLight.position.x = Math.sin(time) * 2.5;
      pointLight.position.y = Math.cos(time) * 2.5;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = (): void => {
      if (cameraRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current && rendererRef.current?.domElement) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const handleScrollTo =
    (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault();
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
      }
    };

  const submitDemo = (e: React.FormEvent): void => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
    const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(form.phone);
    if (!emailOk) {
      alert("Please enter a valid work email address.");
      return;
    }
    if (!phoneOk) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (!form.source) {
      alert("Please tell us how you heard about us.");
      return;
    }
    alert(
      "Thank you for your interest! We will contact you soon to schedule your demo."
    );
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      location: "",
      source: "",
    });
  };

  return (
    <div className="app">
      <div className="gradient-bg"></div>
      <div className="stars-container" ref={starsContainerRef}></div>
      <canvas 
        ref={moonCanvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div id="canvas-container" ref={canvasRef} />

      {/* Enhanced Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="brand-section">
            <div className="artemis-logo">
              <svg className="logo-svg" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Artemis Icon - Bow and Arrow Symbol */}
                <g className="logo-icon">
                  <path d="M8 20 L18 20" stroke="url(#logoGradient1)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M18 20 L24 14 L18 20 L24 26 Z" fill="url(#logoGradient1)"/>
                  <circle cx="8" cy="20" r="3" fill="url(#logoGradient2)" opacity="0.8"/>
                  <path d="M12 14 Q18 20 12 26" stroke="url(#logoGradient1)" strokeWidth="2" fill="none"/>
                </g>
                
                {/* Artemis Text */}
                <g className="logo-text">
                  <text x="32" y="27" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="18" fill="url(#logoGradient3)" letterSpacing="1">
                    ARTEMIS
                  </text>
                </g>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                  <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6ea8fe"/>
                    <stop offset="100%" stopColor="#667eea"/>
                  </linearGradient>
                  <linearGradient id="logoGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="50%" stopColor="#764ba2"/>
                    <stop offset="100%" stopColor="#6ea8fe"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <div className="nav-links-group">
              <a href="#home" onClick={handleScrollTo("#home")} className="nav-link">
                Home
              </a>
              <a href="#about" onClick={handleScrollTo("#about")} className="nav-link">
                About
              </a>
              <a href="#superpowers" onClick={handleScrollTo("#superpowers")} className="nav-link">
                Superpowers
              </a>
              <a href="#pricing" onClick={handleScrollTo("#pricing")} className="nav-link">
                Pricing
              </a>
              <a href="#integrations" onClick={handleScrollTo("#integrations")} className="nav-link">
                Integrations
              </a>
              <a href="#resources" onClick={handleScrollTo("#resources")} className="nav-link">
                Resources
              </a>
            </div>
            <a
              href="#demo"
              className="nav-cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* <section className="hero-section" id="home">
        <div className="hero-content-wrapper">
          <div className="hero-badge">Enterprise-Grade ATS for Healthcare Staffing</div>
          <h1 className="hero-title">Transform Healthcare Recruitment with Intelligent Automation</h1>
          <p className="hero-description">
            Artemis delivers sophisticated AI-powered solutions that streamline your entire recruitment workflow. 
            From candidate sourcing to placement, experience unparalleled efficiency with our enterprise-grade 
            platform designed exclusively for healthcare staffing professionals.
          </p>
          <div className="hero-cta-group">
            <a
              href="#demo"
              className="hero-primary-cta"
              onClick={handleScrollTo("#demo")}
            >
              Schedule a Demo
            </a>
            <a
              href="#superpowers"
              className="hero-secondary-cta"
              onClick={handleScrollTo("#superpowers")}
            >
              Explore Platform
            </a>
          </div>
        </div>
      </section> */}


 {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content-wrapper">
          <div className="hero-badge">AI-powered ATS for Healthcare Staffing</div>
          <h1 className="hero-title">Recruit faster with clarity, not clutter.</h1>
          <p className="hero-description">
            Streamlined workflows, intelligent automation, and minimalist design 
            that empowers healthcare staffing teams to focus on what matters most: 
            connecting great talent with exceptional opportunities.
          </p>
          <div className="hero-cta-group">
            <a
              href="#demo"
              className="hero-primary-cta"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
            <a
              href="#superpowers"
              className="hero-secondary-cta"
              onClick={handleScrollTo("#superpowers")}
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="challenge-section" id="challenge">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">The Challenge We Solve</h2>
            <p className="section-subtitle-main">
              Healthcare staffing agencies face overwhelming complexity in their daily operations
            </p>
          </div>
          
          <div className="challenge-grid">
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Time-Consuming Manual Work</h3>
              <p>
                Hours spent on resume parsing, data entry, and candidate tracking that 
                could be automated, pulling recruiters away from relationship building.
              </p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Difficulty Finding Qualified Talent</h3>
              <p>
                Traditional search methods make it nearly impossible to quickly identify 
                candidates with the right skills, certifications, and availability.
              </p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <h3>Disconnected Systems</h3>
              <p>
                VMS platforms, ATS software, and communication tools operating in silos, 
                creating data gaps and workflow friction.
              </p>
            </div>
            
            <div className="challenge-card">
              <div className="challenge-icon-wrapper">
                <svg className="challenge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H3v5a2 2 0 0 0 2 2h4"></path>
                  <path d="M9 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"></path>
                  <path d="M15 11h6v5a2 2 0 0 1-2 2h-4"></path>
                  <path d="M15 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                </svg>
              </div>
              <h3>Compliance & Credentialing Complexity</h3>
              <p>
                Tracking licenses, certifications, and compliance documentation across 
                dozens or hundreds of healthcare professionals is error-prone and stressful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Automatic Success Stories Slider */}
      <section className="success-slider-section">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Trusted by Leading Healthcare Staffing Agencies</h2>
            <p className="section-subtitle-main">
              Join hundreds of agencies achieving remarkable results with Artemis
            </p>
          </div>
          
          <div className="auto-slider-container">
            <div className="auto-slider-track">
              {/* Slide 1 */}
              <div className="success-slide">
                <div className="success-slide-content">
                  <div className="success-metric">
                    <div className="metric-value">67%</div>
                    <div className="metric-label">Faster Time-to-Submit</div>
                  </div>
                  <div className="success-company">
                    <div className="company-logo-placeholder">
                      <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="url(#companyGrad1)"/>
                        <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white" opacity="0.9"/>
                      </svg>
                    </div>
                    <div className="company-info">
                      <div className="company-name">HealthStaff Pro</div>
                      <div className="company-type">Travel Nursing Agency</div>
                    </div>
                  </div>
                  <p className="success-quote">
                    "Artemis transformed our candidate submission process. What used to take 
                    hours now takes minutes."
                  </p>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="success-slide">
                <div className="success-slide-content">
                  <div className="success-metric">
                    <div className="metric-value">3.2x</div>
                    <div className="metric-label">More Placements Per Month</div>
                  </div>
                  <div className="success-company">
                    <div className="company-logo-placeholder">
                      <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="url(#companyGrad2)"/>
                        <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2" fill="none"/>
                        <path d="M20 14 L20 26 M14 20 L26 20" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="company-info">
                      <div className="company-name">MedTalent Solutions</div>
                      <div className="company-type">Allied Health Staffing</div>
                    </div>
                  </div>
                  <p className="success-quote">
                    "The AI-powered matching helped us scale our placement volume without 
                    adding headcount."
                  </p>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="success-slide">
                <div className="success-slide-content">
                  <div className="success-metric">
                    <div className="metric-value">$420K</div>
                    <div className="metric-label">Annual Cost Savings</div>
                  </div>
                  <div className="success-company">
                    <div className="company-logo-placeholder">
                      <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="url(#companyGrad3)"/>
                        <path d="M20 8 L32 20 L20 32 L8 20 Z" stroke="white" strokeWidth="2" fill="none"/>
                        <circle cx="20" cy="20" r="4" fill="white"/>
                      </svg>
                    </div>
                    <div className="company-info">
                      <div className="company-name">Apex Healthcare Staffing</div>
                      <div className="company-type">Multi-Specialty Agency</div>
                    </div>
                  </div>
                  <p className="success-quote">
                    "ROI was immediate. Artemis paid for itself in the first quarter through 
                    efficiency gains alone."
                  </p>
                </div>
              </div>

              {/* Slide 4 */}
              <div className="success-slide">
                <div className="success-slide-content">
                  <div className="success-metric">
                    <div className="metric-value">94%</div>
                    <div className="metric-label">Candidate Satisfaction</div>
                  </div>
                  <div className="success-company">
                    <div className="company-logo-placeholder">
                      <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="url(#companyGrad4)"/>
                        <path d="M10 20 Q20 10 30 20 Q20 30 10 20" fill="white" opacity="0.9"/>
                      </svg>
                    </div>
                    <div className="company-info">
                      <div className="company-name">CareLink Professionals</div>
                      <div className="company-type">Locum Tenens Placement</div>
                    </div>
                  </div>
                  <p className="success-quote">
                    "Our candidates love the smooth onboarding experience. It's a competitive 
                    advantage for us."
                  </p>
                </div>
              </div>

              {/* Duplicate slides for seamless loop */}
              <div className="success-slide">
                <div className="success-slide-content">
                  <div className="success-metric">
                    <div className="metric-value">67%</div>
                    <div className="metric-label">Faster Time-to-Submit</div>
                  </div>
                  <div className="success-company">
                    <div className="company-logo-placeholder">
                      <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="8" fill="url(#companyGrad1)"/>
                        <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white" opacity="0.9"/>
                      </svg>
                    </div>
                    <div className="company-info">
                      <div className="company-name">HealthStaff Pro</div>
                      <div className="company-type">Travel Nursing Agency</div>
                    </div>
                  </div>
                  <p className="success-quote">
                    "Artemis transformed our candidate submission process. What used to take 
                    hours now takes minutes."
                  </p>
                </div>
              </div>
            </div>

            {/* Gradient definitions for company logos */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <linearGradient id="companyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea"/>
                  <stop offset="100%" stopColor="#764ba2"/>
                </linearGradient>
                <linearGradient id="companyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6ea8fe"/>
                  <stop offset="100%" stopColor="#667eea"/>
                </linearGradient>
                <linearGradient id="companyGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#764ba2"/>
                  <stop offset="100%" stopColor="#6ea8fe"/>
                </linearGradient>
                <linearGradient id="companyGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea"/>
                  <stop offset="100%" stopColor="#8ab4fe"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Feature Highlights with 3D Carousel */}
      <section className="highlights-section" id="superpowers">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Talent Superpowers</h2>
            <p className="section-subtitle-main">
              Designed for recruiters. Powered by AI. Built for speed and simplicity.
            </p>
          </div>
          
          {/* 3D Carousel Container */}
          <div className="carousel-3d-container">
            <div className="carousel-3d-wrapper">
              <div className="feature-card-3d" style={{ '--card-index': 0 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                    <circle cx="11" cy="11" r="3"></circle>
                  </svg>
                </div>
                <h3 className="feature-title">AI-Powered Candidate Search</h3>
                <p className="feature-description">
                  Find the perfect match instantly with intelligent search that understands 
                  skills, experience, certifications, and availability patterns.
                </p>
                <ul className="feature-list">
                  <li>Natural language search queries</li>
                  <li>Smart skill matching algorithms</li>
                  <li>Real-time availability tracking</li>
                </ul>
              </div>
              
              <div className="feature-card-3d" style={{ '--card-index': 1 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
                  </svg>
                </div>
                <h3 className="feature-title">Lightning-Fast VMS Job Sync</h3>
                <p className="feature-description">
                  Seamlessly integrate with major VMS platforms. Jobs flow automatically 
                  into Artemis, eliminating manual data entry.
                </p>
                <ul className="feature-list">
                  <li>Automatic job ingestion</li>
                  <li>Real-time updates</li>
                  <li>Multi-VMS support</li>
                </ul>
              </div>
              
              <div className="feature-card-3d" style={{ '--card-index': 2 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="feature-title">Built-In Skills Checklists</h3>
                <p className="feature-description">
                  Interactive checklists that capture candidate qualifications with precision, 
                  convert to PDFs, and distribute to stakeholders instantly.
                </p>
                <ul className="feature-list">
                  <li>Customizable checklist templates</li>
                  <li>Digital signature collection</li>
                  <li>Automated distribution</li>
                </ul>
              </div>
              
              <div className="feature-card-3d" style={{ '--card-index': 3 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="feature-title">Smart Onboarding Dashboards</h3>
                <p className="feature-description">
                  Visual pipelines that show exactly where every candidate stands, 
                  with automated reminders and next-step recommendations.
                </p>
                <ul className="feature-list">
                  <li>Drag-and-drop pipeline management</li>
                  <li>Automated workflow triggers</li>
                  <li>Real-time status updates</li>
                </ul>
              </div>
              
              <div className="feature-card-3d" style={{ '--card-index': 4 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="feature-title">Candidate Pipeline Management</h3>
                <p className="feature-description">
                  Design dynamic, stage-based workflows that adapt to your process. 
                  Never lose track of a candidate again.
                </p>
                <ul className="feature-list">
                  <li>Customizable pipeline stages</li>
                  <li>Bulk candidate actions</li>
                  <li>Advanced filtering</li>
                </ul>
              </div>
              
              <div className="feature-card-3d" style={{ '--card-index': 5 } as React.CSSProperties}>
                <div className="feature-icon-box-pro">
                  <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h3 className="feature-title">Right-to-Represent Automation</h3>
                <p className="feature-description">
                  Send RTR forms instantly, track signatures, and maintain compliance 
                  documentation—all within a single, streamlined workflow.
                </p>
                <ul className="feature-list">
                  <li>One-click RTR distribution</li>
                  <li>E-signature integration</li>
                  <li>Automatic record keeping</li>
                </ul>
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="carousel-nav">
              <button className="carousel-prev" onClick={() => {/* carousel prev logic */}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="carousel-indicators">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <button 
                    key={index} 
                    className="carousel-dot"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button className="carousel-next" onClick={() => {/* carousel next logic */}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Artemis Section */}
      <section className="about-section" id="about">
        <div className="content-container">
          {/* Hero Copy */}
          <div className="about-hero">
            <h2 className="about-hero-title">Built to bring clarity back to recruiting</h2>
            <p className="about-hero-subtitle">
              Artemis combines cutting-edge AI technology with intuitive design to deliver 
              the most powerful yet simple ATS for healthcare staffing agencies.
            </p>
          </div>
          
          {/* Story/Approach + Illustration */}
          <div className="about-story-grid">
            <div className="about-story-content">
              <h3>Our Approach</h3>
              <p>
                Born from real-world staffing challenges, Artemis was designed by industry veterans 
                who understand the unique pressures of healthcare recruitment. We've eliminated the 
                bloat and complexity that plague traditional ATS platforms, focusing instead on the 
                features that actually drive placements.
              </p>
              <p>
                Every workflow, every interface element, and every automation has been carefully 
                crafted to save you time while improving accuracy. Whether you're placing travel 
                nurses, allied health professionals, or locum tenens physicians, Artemis adapts 
                to your process—not the other way around.
              </p>
              
              <div className="about-stats-inline">
                <div className="stat-inline-item">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <div>
                    <div className="stat-inline-number">500+</div>
                    <div className="stat-inline-label">Active Agencies</div>
                  </div>
                </div>
                
                <div className="stat-inline-item">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                  <div>
                    <div className="stat-inline-number">10K+</div>
                    <div className="stat-inline-label">Candidates Placed</div>
                  </div>
                </div>
                
                <div className="stat-inline-item">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <div>
                    <div className="stat-inline-number">99.9%</div>
                    <div className="stat-inline-label">Platform Uptime</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-illustration">
              <div className="illustration-card">
                <svg className="illustration-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <path d="M7 8h10M7 12h6"></path>
                </svg>
                <h4>Modern Platform</h4>
                <p>Cloud-based architecture built for speed and reliability</p>
              </div>
            </div>
          </div>
          
          {/* Mission, Vision, Values */}
          <div className="about-mvv-grid">
            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To democratize enterprise-grade recruitment technology, making sophisticated 
                ATS capabilities accessible to staffing agencies of all sizes. We believe powerful 
                tools shouldn't come with complexity or prohibitive costs.
              </p>
            </div>
            
            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the global standard for intelligent staffing solutions, where every 
                recruiter has access to AI-powered tools that eliminate repetitive tasks and 
                provide actionable insights that drive better hiring decisions.
              </p>
            </div>
            
            <div className="mvv-card">
              <div className="mvv-icon-wrapper">
                <svg className="mvv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3>Core Values</h3>
              <ul className="values-list">
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Simplicity First:</strong> Elegant interfaces that reduce training time</span>
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Security by Design:</strong> Enterprise-grade protection for sensitive data</span>
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Continuous Innovation:</strong> Regular updates driven by user feedback</span>
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span><strong>Customer Success:</strong> Your growth is our success</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* CTA Banner */}
          <div className="about-cta-banner">
            <h3>Ready to Transform Your Staffing Operations?</h3>
            <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
            <a href="#demo" className="about-cta-button" onClick={handleScrollTo("#demo")}>
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Flexible Pricing for Every Stage of Growth</h2>
            <p className="section-subtitle-main">
              Custom plans designed around your agency's unique needs
            </p>
          </div>
          
          <div className="pricing-content">
            <div className="pricing-card">
              <h3>What's Included</h3>
              <ul className="pricing-features-list">
                <li>✓ Unlimited users and candidates</li>
                <li>✓ AI-powered search and matching</li>
                <li>✓ VMS integration (Bullhorn, others)</li>
                <li>✓ Skills checklists with PDF generation</li>
                <li>✓ Right-to-Represent automation</li>
                <li>✓ Pipeline management tools</li>
                <li>✓ Credentials tracking</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Regular feature updates</li>
                <li>✓ Enterprise-grade security</li>
              </ul>
            </div>
            
            <div className="pricing-card highlighted">
              <h3>Why Custom Pricing?</h3>
              <p>
                Every staffing agency operates differently. Your pricing should reflect your 
                agency's size, placement volume, integration needs, and growth trajectory.
              </p>
              <p>
                We work with you to create a plan that makes sense for your business—no 
                hidden fees, no surprise charges, no complicated tier systems.
              </p>
              <a href="#demo" className="pricing-cta" onClick={handleScrollTo("#demo")}>
                Contact Us for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations-section" id="integrations">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Stay in Sync with Your Workflow</h2>
            <p className="section-subtitle-main">
              Seamless connections to the tools you already use
            </p>
          </div>
          
          <div className="integrations-content">
            <div className="integration-card primary">
              <div className="integration-icon-wrapper">
                <svg className="integration-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <h3>VMS Integrations</h3>
              <p>
                Connect Artemis to your Vendor Management Systems for automatic job feed synchronization. 
                New opportunities appear in Artemis instantly, ready for candidate matching.
              </p>
              <div className="integration-logos">
                <div className="logo-placeholder">Bullhorn</div>
                <div className="logo-placeholder">Fieldglass</div>
                <div className="logo-placeholder">Beeline</div>
                <div className="logo-placeholder">+ More</div>
              </div>
            </div>
            
            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <svg className="integration-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Coming Soon</h3>
              <p>
                We're continuously expanding our integration ecosystem based on customer feedback.
              </p>
              <ul className="roadmap-list">
                <li>• Calendar sync (Google, Outlook)</li>
                <li>• Email integration</li>
                <li>• Background check providers</li>
                <li>• Payroll systems</li>
                <li>• Communication platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section" id="resources">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Resources & Insights</h2>
            <p className="section-subtitle-main">
              Expert guidance to transform your healthcare staffing operations
            </p>
          </div>
          
          <div className="resources-grid">
            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Practical Tips for Recruiters</h3>
              <p>
                Time-saving strategies, workflow optimizations, and proven techniques 
                to increase placement velocity and candidate satisfaction.
              </p>
            </div>
            
            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Technology in Healthcare Staffing</h3>
              <p>
                Explore how AI, automation, and modern ATS platforms are reshaping 
                the healthcare staffing landscape.
              </p>
            </div>
            
            <div className="resource-category-card">
              <div className="category-icon-wrapper">
                <svg className="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3>Industry Trends & Market Insights</h3>
              <p>
                Stay ahead with analysis of healthcare labor markets, regulatory changes, 
                and emerging opportunities.
              </p>
            </div>
          </div>
          
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <p>Get the latest insights delivered to your inbox</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Teaser + CTA */}
      <section className="vision-section">
        <div className="content-container">
          <div className="vision-content">
            <h2>Experience Clarity in Every Click</h2>
            <p>
              Join hundreds of healthcare staffing agencies who have transformed their 
              recruitment process with Artemis. Faster placements, happier teams, better outcomes.
            </p>
            <a
              href="#demo"
              className="vision-cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book Your Demo Today
            </a>
          </div>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section className="demo-section" id="demo">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title-main">Book a Demo</h2>
            <p className="section-subtitle-main">
              See Artemis in action and discover how we can transform your staffing operations
            </p>
          </div>
          
          <div className="demo-layout">
            <div className="demo-form-container">
              <form onSubmit={submitDemo} className="demo-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="location">Location (State)</label>
                    <input
                      type="text"
                      id="location"
                      required
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                <div className="form-field full-width">
                  <label htmlFor="source">How did you hear about us?</label>
                  <select
                    id="source"
                    required
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                  >
                    <option value="">Select one</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral / Word of Mouth</option>
                    <option value="conference">Conference / Event</option>
                    <option value="email">Email Outreach</option>
                    <option value="customer">Existing Customer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <button type="submit" className="demo-submit-button">
                  Request Demo
                </button>
              </form>
            </div>
            
            <div className="demo-info-container">
              <h3>What to Expect</h3>
              <ul className="expectations-list">
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Personalized Walkthrough</strong>
                    <p>See Artemis configured for your agency's specific workflows</p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <strong>30-Minute Session</strong>
                    <p>Quick, focused demo that respects your time</p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <strong>Q&A Included</strong>
                    <p>Ask anything about features, pricing, or implementation</p>
                  </div>
                </li>
                <li>
                  <div className="expectation-icon-wrapper">
                    <svg className="expectation-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div>
                    <strong>Live Platform Access</strong>
                    <p>Hands-on experience with real candidate and job data</p>
                  </div>
                </li>
              </ul>
              
              <div className="social-proof">
                <p className="proof-label">Trusted by leading agencies</p>
                <div className="proof-stats">
                  <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
                  <span>500+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" id="contact">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Artemis ATS</h4>
            <p>AI-powered recruitment technology for healthcare staffing excellence.</p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#home" onClick={handleScrollTo("#home")}>Home</a>
            <a href="#about" onClick={handleScrollTo("#about")}>About</a>
            <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>Superpowers</a>
            <a href="#pricing" onClick={handleScrollTo("#pricing")}>Pricing</a>
            <a href="#integrations" onClick={handleScrollTo("#integrations")}>Integrations</a>
            <a href="#resources" onClick={handleScrollTo("#resources")}>Resources</a>
          </div>
          
          <div className="footer-column">
            <h4>Contact</h4>
            <p>
              9330 Lyndon B Johnson Fwy #900
              <br />
              Dallas, TX, 75243
            </p>
            <p>📧 info@artemisats.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          touch-action: manipulation;
        }

        html, body {
          overflow-x: hidden;
          overflow-y: scroll;
          height: auto;
          min-height: 100%;
          scroll-behavior: smooth;
        }

        .app {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0e27;
          color: #e6e6e9;
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
        }

        #canvas-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        #canvas-container * {
          pointer-events: none;
        }

        .stars-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite ease-in-out;
          opacity: 0.7;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        .star[style*="ffd700"] {
          animation: goldenTwinkle 4s infinite ease-in-out;
        }

        @keyframes goldenTwinkle {
          0%, 100% { 
            opacity: 0.25; 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 3px #ffd700, 0 0 6px #ffd700;
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.15) rotate(180deg);
            box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
          }
        }

        .gradient-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
          z-index: 0;
          pointer-events: none;
        }

        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          animation: shimmer 8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Enhanced Navigation */
        .main-nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(10, 12, 18, 0.85);
          backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid #2a2e36;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .artemis-logo {
          position: relative;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .logo-svg {
          height: 40px;
          width: auto;
          filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
          transition: all 0.3s ease;
        }

        .artemis-logo:hover .logo-svg {
          filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.5));
          transform: translateY(-2px);
        }

        .logo-svg .logo-icon {
          animation: logoIconPulse 3s ease-in-out infinite;
        }

        @keyframes logoIconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .logo-svg .logo-text text {
          font-family: 'Poppins', sans-serif;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 32px;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-links-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .nav-link {
          padding: 10px 16px;
          color: #e6e6e9;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          border-color: #2a2e36;
          background: #0c0f16;
          color: #6ea8fe;
        }

        .nav-cta-button {
          padding: 10px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
          border: none;
        }

        .nav-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }

        .menu-toggle span {
          width: 25px;
          height: 3px;
          background: #e6e6e9;
          transition: all 0.3s;
          border-radius: 2px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 40px 80px;
          z-index: 10;
        }

        .hero-content-wrapper {
          max-width: 900px;
          text-align: center;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(110, 168, 254, 0.1);
          border: 1px solid rgba(110, 168, 254, 0.3);
          border-radius: 999px;
          color: #6ea8fe;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-title {
          font-size: clamp(40px, 7vw, 68px);
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 24px;
          color: #e6e6e9;
          animation: fadeInUp 0.8s ease-out 0.1s both;
        }

        .hero-description {
          font-size: clamp(17px, 2.5vw, 20px);
          line-height: 1.7;
          color: #9aa0a6;
          margin-bottom: 40px;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .hero-cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .hero-primary-cta {
          padding: 16px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          border: none;
        }

        .hero-primary-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
        }

        .hero-secondary-cta {
          padding: 16px 40px;
          background: transparent;
          color: #e6e6e9;
          text-decoration: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          transition: all 0.3s;
          border: 1px solid #2a2e36;
        }

        .hero-secondary-cta:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
          color: #6ea8fe;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Content Container */
        .content-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title-main {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          margin-bottom: 16px;
          color: #e6e6e9;
        }

        .section-subtitle-main {
          font-size: clamp(16px, 2.5vw, 20px);
          color: #9aa0a6;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Challenge Section */
        .challenge-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
        }

        .challenge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .challenge-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .challenge-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .challenge-card:hover::before {
          transform: scaleX(1);
        }

        .challenge-card:hover {
          transform: translateY(-10px);
          border-color: rgba(110, 168, 254, 0.4);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .challenge-icon-wrapper {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .challenge-card:hover .challenge-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
          border-color: rgba(102, 126, 234, 0.5);
        }

        .challenge-icon {
          width: 32px;
          height: 32px;
          color: #6ea8fe;
        }

        .challenge-card h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #e6e6e9;
        }

        .challenge-card p {
          color: #9aa0a6;
          line-height: 1.7;
          font-size: 16px;
        }

        /* Automatic Success Stories Slider */
        .success-slider-section {
          position: relative;
          padding: 100px 0;
          z-index: 10;
          background: linear-gradient(180deg, rgba(10, 12, 18, 0) 0%, rgba(10, 12, 18, 0.5) 50%, rgba(10, 12, 18, 0) 100%);
          overflow: hidden;
        }

        .auto-slider-container {
        top:10;
          position: relative;
          max-width: 100%;
          overflow: hidden;
          margin-top: 40px;
          
         
        }

        .auto-slider-container::before,
        .auto-slider-container::after {
          content: '';
          position: absolute;
          top: 0;
          width: 200px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .auto-slider-container::before {
          left: 0;
          background: linear-gradient(90deg, rgba(10, 14, 39, 1) 0%, rgba(10, 14, 39, 0) 100%);
        }

        .auto-slider-container::after {
          right: 0;
          background: linear-gradient(270deg, rgba(10, 14, 39, 1) 0%, rgba(10, 14, 39, 0) 100%);
        }

        .auto-slider-track {
          display: flex;
          gap: 32px;
          animation: autoScroll 6s linear infinite;
          width: max-content;
          margin-top: 40px;
        
        }

        @keyframes autoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-20% - 32px));
          }
        }

        .auto-slider-track:hover {
          animation-play-state: paused;
        }

        .success-slide {
          flex-shrink: 0;
          width: 420px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.25);
          border-radius: 20px;
          padding: 36px 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .success-slide:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        .success-metric {
          text-align: center;
          padding: 24px 0;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .metric-value {
          font-size: 52px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          line-height: 1;
        }

        .metric-label {
          font-size: 15px;
          color: #b8c5d6;
          font-weight: 500;
        }

        .success-company {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .company-logo-placeholder {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));
        }

        .company-logo-placeholder svg {
          width: 100%;
          height: 100%;
        }

        .company-info {
          flex: 1;
        }

        .company-name {
          font-size: 17px;
          font-weight: 600;
          color: #e6e6e9;
          margin-bottom: 4px;
        }

        .company-type {
          font-size: 13px;
          color: #9aa0a6;
        }

        .success-quote {
          color: #b8c5d6;
          line-height: 1.7;
          font-size: 15px;
          font-style: italic;
          position: relative;
          padding-left: 20px;
        }

        .success-quote::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -5px;
          font-size: 36px;
          color: rgba(102, 126, 234, 0.3);
          font-family: Georgia, serif;
          line-height: 1;
        }

        /* Features/Highlights Section with 3D Carousel */
        .highlights-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
          background: rgba(10, 12, 18, 0.5);
          overflow: hidden;
        }

        .carousel-3d-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          perspective: 1500px;
          height: 380px;
        }

        .carousel-3d-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate3d 36s linear infinite;
        }

        @keyframes rotate3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        .feature-card-3d {
          position: absolute;
          width: 300px;
          left: 50%;
          top: 50%;
          margin-left: -150px;
          margin-top: -145px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.25);
          border-radius: 18px;
          padding: 26px 24px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px);
          animation: cardFloat 6s ease-in-out infinite;
          animation-delay: calc(var(--card-index) * 1s);
        }

        @keyframes cardFloat {
          0%, 100% {
            transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px) translateY(0);
          }
          50% {
            transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(440px) translateY(-8px);
          }
        }

        .feature-card-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-radius: 18px;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
        }

        .feature-card-3d:hover::before {
          opacity: 1;
        }

        .feature-card-3d::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 18px;
          opacity: 0;
          z-index: -2;
          filter: blur(10px);
          transition: opacity 0.5s ease;
        }

        .feature-card-3d:hover::after {
          opacity: 0.4;
        }

        .feature-card-3d:hover {
          transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(490px) scale(1.05);
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 
            0 20px 60px rgba(102, 126, 234, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .feature-icon-box-pro {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 2px solid rgba(102, 126, 234, 0.4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-icon-box-pro::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .feature-card-3d:hover .feature-icon-box-pro {
          transform: scale(1.1);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
          border-color: rgba(102, 126, 234, 0.7);
          box-shadow: 
            0 10px 30px rgba(102, 126, 234, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.1);
        }

        .feature-icon-svg {
          width: 28px;
          height: 28px;
          color: #6ea8fe;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.5));
        }

        .feature-card-3d:hover .feature-icon-svg {
          color: #8ab4fe;
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.7));
        }

        .feature-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #e6e6e9;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .feature-card-3d:hover .feature-title {
          color: #ffffff;
        }

        .feature-description {
          color: #9aa0a6;
          line-height: 1.5;
          margin-bottom: 14px;
          font-size: 13px;
          transition: color 0.3s ease;
        }

        .feature-card-3d:hover .feature-description {
          color: #b8c5d6;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-list li {
          color: #b8c5d6;
          padding: 5px 0;
          padding-left: 18px;
          position: relative;
          font-size: 12px;
          line-height: 1.4;
          transition: all 0.3s ease;
        }

        .feature-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #6ea8fe;
          font-weight: bold;
          font-size: 11px;
          transition: all 0.3s ease;
        }

        .feature-card-3d:hover .feature-list li {
          color: #d0d8e6;
          padding-left: 22px;
        }

        .feature-card-3d:hover .feature-list li::before {
          color: #8ab4fe;
          left: 4px;
        }

        /* Carousel Navigation */
        .carousel-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 60px;
        }

        .carousel-prev,
        .carousel-next {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .carousel-prev::before,
        .carousel-next::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .carousel-prev:hover::before,
        .carousel-next:hover::before {
          opacity: 1;
        }

        .carousel-prev:hover,
        .carousel-next:hover {
          border-color: rgba(102, 126, 234, 0.6);
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .carousel-prev svg,
        .carousel-next svg {
          width: 24px;
          height: 24px;
          color: #6ea8fe;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .carousel-prev:hover svg {
          transform: translateX(-2px);
        }

        .carousel-next:hover svg {
          transform: translateX(2px);
        }

        .carousel-indicators {
          display: flex;
          gap: 12px;
        }

        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(102, 126, 234, 0.3);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          position: relative;
        }

        .carousel-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: border-color 0.3s ease;
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.3);
        }

        .carousel-dot:hover::before {
          border-color: rgba(102, 126, 234, 0.5);
        }

        .carousel-dot.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 28px;
          border-radius: 5px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
        }

        .carousel-dot.active::before {
          border-radius: 7px;
        }

        /* About Artemis Section */
        .about-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
        }

        .about-hero {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 80px;
        }

        .about-hero-title {
          font-size: clamp(36px, 6vw, 52px);
          font-weight: 700;
          margin-bottom: 20px;
          color: #e6e6e9;
          line-height: 1.2;
        }

        .about-hero-subtitle {
          font-size: clamp(17px, 2.5vw, 20px);
          color: #9aa0a6;
          line-height: 1.7;
        }

        .about-story-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
          align-items: center;
        }

        .about-story-content h3 {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #e6e6e9;
        }

        .about-story-content p {
          color: #9aa0a6;
          line-height: 1.8;
          font-size: 17px;
          margin-bottom: 24px;
        }

        .about-stats-inline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .stat-inline-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(110, 168, 254, 0.05);
          border: 1px solid rgba(110, 168, 254, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .stat-inline-item:hover {
          transform: translateY(-5px);
          border-color: rgba(110, 168, 254, 0.4);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          color: #6ea8fe;
          flex-shrink: 0;
        }

        .stat-inline-number {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #6ea8fe 0%, #b77dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-inline-label {
          color: #9aa0a6;
          font-size: 13px;
          font-weight: 500;
        }

        .about-illustration {
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(102, 126, 234, 0.3);
          border-radius: 20px;
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          transition: all 0.4s ease;
        }

        .about-illustration:hover {
          border-color: rgba(102, 126, 234, 0.5);
          background: rgba(255, 255, 255, 0.05);
          transform: scale(1.02);
        }

        .illustration-card {
          text-align: center;
        }

        .illustration-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 24px;
          color: #6ea8fe;
          opacity: 0.8;
        }

        .illustration-card h4 {
          font-size: 24px;
          font-weight: 600;
          color: #e6e6e9;
          margin-bottom: 12px;
        }

        .illustration-card p {
          color: #9aa0a6;
          font-size: 16px;
        }

        /* Mission, Vision, Values Grid */
        .about-mvv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 36px;
          margin-bottom: 80px;
        }

        .mvv-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 20px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mvv-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .mvv-card:hover::before {
          transform: scaleX(1);
        }

        .mvv-card:hover {
          transform: translateY(-12px);
          border-color: rgba(102, 126, 234, 0.4);
          box-shadow: 0 25px 60px rgba(102, 126, 234, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .mvv-icon-wrapper {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .mvv-card:hover .mvv-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .mvv-icon {
          width: 36px;
          height: 36px;
          color: #6ea8fe;
        }

        .mvv-card h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #e6e6e9;
        }

        .mvv-card p {
          color: #9aa0a6;
          line-height: 1.8;
          font-size: 16px;
        }

        .values-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .values-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .values-list li:last-child {
          border-bottom: none;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          color: #6ea8fe;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .values-list li span {
          color: #b8c5d6;
          font-size: 15px;
          line-height: 1.6;
        }

        .values-list li strong {
          color: #e6e6e9;
          font-weight: 600;
        }

        /* About CTA Banner */
        .about-cta-banner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-radius: 24px;
          padding: 60px 40px;
          position: relative;
          overflow: hidden;
        }

        .about-cta-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.7s ease;
        }

        .about-cta-banner:hover::before {
          left: 100%;
        }

        .about-cta-banner h3 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #e6e6e9;
          position: relative;
        }

        .about-cta-banner p {
          font-size: 18px;
          color: #b8c5d6;
          margin-bottom: 32px;
          line-height: 1.7;
          position: relative;
        }

        .about-cta-button {
          display: inline-block;
          padding: 18px 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
          position: relative;
        }

        .about-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }

        /* Who We Serve Section */
        .serve-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
        }

        .serve-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .serve-text-block h3 {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #e6e6e9;
        }

        .serve-text-block p {
          color: #9aa0a6;
          line-height: 1.8;
          font-size: 17px;
          margin-bottom: 36px;
        }

        .serve-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(110, 168, 254, 0.05);
          border: 1px solid rgba(110, 168, 254, 0.2);
          border-radius: 12px;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #6ea8fe 0%, #b77dff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #9aa0a6;
          font-size: 14px;
          font-weight: 500;
        }

        .serve-image-placeholder {
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed #2a2e36;
          border-radius: 16px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-content {
          text-align: center;
        }

        .placeholder-icon {
          font-size: 80px;
          margin-bottom: 16px;
        }

        .placeholder-content p {
          color: #9aa0a6;
          font-size: 16px;
        }

        /* Pricing Section */
        .pricing-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
          background: rgba(10, 12, 18, 0.5);
        }

        .pricing-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }

        .pricing-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 40px;
        }

        .pricing-card.highlighted {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .pricing-card h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #e6e6e9;
        }

        .pricing-features-list {
          list-style: none;
          padding: 0;
        }

        .pricing-features-list li {
          color: #b8c5d6;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 16px;
        }

        .pricing-features-list li:last-child {
          border-bottom: none;
        }

        .pricing-card p {
          color: #9aa0a6;
          line-height: 1.8;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .pricing-cta {
          display: inline-block;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          margin-top: 12px;
        }

        .pricing-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
        }

        /* Integrations Section */
        .integrations-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
        }

        .integrations-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }

        .integration-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 40px;
        }

        .integration-card.primary {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .integration-icon-wrapper {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .integration-card:hover .integration-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
          border-color: rgba(102, 126, 234, 0.6);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .integration-icon-svg {
          width: 40px;
          height: 40px;
          color: #6ea8fe;
        }

        .integration-card h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #e6e6e9;
        }

        .integration-card p {
          color: #9aa0a6;
          line-height: 1.8;
          margin-bottom: 24px;
          font-size: 16px;
        }

        .integration-logos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .logo-placeholder {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #2a2e36;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          color: #9aa0a6;
          font-size: 14px;
          font-weight: 500;
        }

        .roadmap-list {
          list-style: none;
          padding: 0;
        }

        .roadmap-list li {
          color: #b8c5d6;
          padding: 8px 0;
          font-size: 16px;
        }

        /* Resources Section */
        .resources-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
          background: rgba(10, 12, 18, 0.5);
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-bottom: 60px;
        }

        .resource-category-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 36px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .resource-category-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .resource-category-card:hover::before {
          opacity: 1;
        }

        .resource-category-card:hover {
          transform: translateY(-10px);
          border-color: rgba(110, 168, 254, 0.4);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
        }

        .category-icon-wrapper {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .resource-category-card:hover .category-icon-wrapper {
          transform: scale(1.15) rotate(10deg);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .category-icon-svg {
          width: 32px;
          height: 32px;
          color: #6ea8fe;
        }

        .resource-category-card h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #e6e6e9;
        }

        .resource-category-card p {
          color: #9aa0a6;
          line-height: 1.7;
          font-size: 16px;
        }

        .newsletter-section {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 48px;
        }

        .newsletter-section h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #e6e6e9;
        }

        .newsletter-section p {
          color: #9aa0a6;
          margin-bottom: 24px;
          font-size: 16px;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #2a2e36;
          border-radius: 10px;
          color: #e6e6e9;
          font-size: 15px;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #6ea8fe;
        }

        .newsletter-button {
          padding: 14px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        /* Vision Section */
        .vision-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
        }

        .vision-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .vision-content h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          margin-bottom: 24px;
          color: #e6e6e9;
        }

        .vision-content p {
          font-size: clamp(17px, 2.5vw, 20px);
          color: #9aa0a6;
          line-height: 1.8;
          margin-bottom: 36px;
        }

        .vision-cta-button {
          display: inline-block;
          padding: 18px 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
        }

        .vision-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }

        /* Demo Section */
        .demo-section {
          position: relative;
          padding: 120px 0;
          z-index: 10;
        }

        .demo-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .demo-form-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 40px;
        }

        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-field.full-width {
          grid-column: 1 / -1;
        }

        .form-field label {
          color: #9aa0a6;
          font-size: 14px;
          font-weight: 500;
        }

        .form-field input,
        .form-field select {
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #2a2e36;
          border-radius: 10px;
          color: #e6e6e9;
          font-size: 15px;
          transition: all 0.2s;
        }

        .form-field input:focus,
        .form-field select:focus {
          outline: none;
          border-color: #6ea8fe;
          box-shadow: 0 0 0 3px rgba(110, 168, 254, 0.1);
        }

        .form-field select {
          cursor: pointer;
        }

        .form-field option {
          background: #0a0e27;
          color: #e6e6e9;
        }

        .demo-submit-button {
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .demo-submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.45);
        }

        .demo-info-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid #2a2e36;
          border-radius: 16px;
          padding: 40px;
        }

        .demo-info-container h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #e6e6e9;
        }

        .expectations-list {
          list-style: none;
          padding: 0;
          margin-bottom: 36px;
        }

        .expectations-list li {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          align-items: flex-start;
        }

        .expectation-icon-wrapper {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .expectations-list li:hover .expectation-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
          border-color: rgba(102, 126, 234, 0.5);
        }

        .expectation-icon-svg {
          width: 24px;
          height: 24px;
          color: #6ea8fe;
        }

        .expectations-list strong {
          display: block;
          color: #e6e6e9;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .expectations-list p {
          color: #9aa0a6;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .social-proof {
          padding: 24px;
          background: rgba(110, 168, 254, 0.05);
          border: 1px solid rgba(110, 168, 254, 0.2);
          border-radius: 12px;
        }

        .proof-label {
          font-size: 14px;
          color: #9aa0a6;
          margin-bottom: 12px;
        }

        .proof-stats {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .proof-stats span {
          color: #e6e6e9;
          font-size: 14px;
          font-weight: 500;
        }

        /* Footer */
        .site-footer {
          position: relative;
          padding: 60px 40px 30px;
          background: rgba(10, 12, 18, 0.8);
          backdrop-filter: blur(10px);
          border-top: 1px solid #2a2e36;
          z-index: 10;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 48px;
          margin-bottom: 40px;
        }

        .footer-column h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #6ea8fe;
        }

        .footer-column p,
        .footer-column a {
          color: #9aa0a6;
          text-decoration: none;
          display: block;
          margin-bottom: 12px;
          line-height: 1.7;
          font-size: 15px;
        }

        .footer-column a:hover {
          color: #6ea8fe;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .social-links a {
          display: inline-flex;
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          margin-bottom: 0;
        }

        .social-links a:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #2a2e36;
        }

        .footer-bottom p {
          color: #9aa0a6;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .nav-container {
            padding: 16px 30px;
          }

          .content-container {
            padding: 0 30px;
          }

          .demo-layout {
            grid-template-columns: 1fr;
          }

          .pricing-content,
          .integrations-content {
            grid-template-columns: 1fr;
          }

          .about-story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-stats-inline {
            grid-template-columns: 1fr;
          }

          .about-mvv-grid {
            grid-template-columns: 1fr;
          }

          .success-slide {
            width: 380px;
            padding: 32px 28px;
          }

          .metric-value {
            font-size: 46px;
          }

          .auto-slider-container::before,
          .auto-slider-container::after {
            width: 100px;
          }

          /* Adjust 3D carousel for tablets */
          .carousel-3d-container {
            height: 340px;
            perspective: 1200px;
          }

          .feature-card-3d {
            width: 270px;
            margin-left: -135px;
            margin-top: -135px;
            padding: 24px 20px;
            transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px);
          }

          @keyframes cardFloat {
            0%, 100% {
              transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px) translateY(0);
            }
            50% {
              transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(370px) translateY(-7px);
            }
          }

          .feature-card-3d:hover {
            transform: rotateY(calc(var(--card-index) * 60deg)) translateZ(410px) scale(1.05);
          }

          .feature-icon-box-pro {
            width: 50px;
            height: 50px;
          }

          .feature-icon-svg {
            width: 25px;
            height: 25px;
          }

          .feature-title {
            font-size: 17px;
            margin-bottom: 9px;
          }

          .feature-description {
            font-size: 12px;
            margin-bottom: 12px;
          }

          .feature-list li {
            font-size: 11px;
            padding: 4px 0;
            padding-left: 16px;
          }
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
            z-index: 1001;
          }

          .nav-menu {
            position: fixed;
            top: 68px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 68px);
            background: rgba(10, 12, 18, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            padding: 40px;
            transition: right 0.3s ease;
            align-items: stretch;
          }

          .nav-menu.active {
            right: 0;
          }

          .nav-links-group {
            flex-direction: column;
            width: 100%;
          }

          .nav-link {
            width: 100%;
            text-align: center;
            padding: 16px;
          }

          .nav-cta-button {
            width: 100%;
            text-align: center;
          }

          .hero-section {
            padding: 120px 20px 60px;
          }

          .challenge-section,
          .highlights-section,
          .about-section,
          .pricing-section,
          .integrations-section,
          .resources-section,
          .vision-section,
          .demo-section {
            padding: 80px 0;
          }

          .content-container {
            padding: 0 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }

          .hero-primary-cta,
          .hero-secondary-cta {
            width: 100%;
            text-align: center;
          }

          .about-cta-banner {
            padding: 40px 24px;
          }

          .about-cta-banner h3 {
            font-size: 28px;
          }

          .success-slide {
            width: 320px;
            padding: 28px 24px;
          }

          .metric-value {
            font-size: 40px;
          }

          .metric-label {
            font-size: 13px;
          }

          .company-name {
            font-size: 15px;
          }

          .success-quote {
            font-size: 14px;
          }

          .auto-slider-container::before,
          .auto-slider-container::after {
            width: 60px;
          }

          .artemis-logo {
            height: 36px;
          }

          .logo-svg {
            height: 36px;
          }

          /* Convert 3D carousel to grid on mobile */
          .carousel-3d-wrapper {
            animation: none;
            position: static;
            height: auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0 10px;
          }

          .carousel-3d-container {
            perspective: none;
            height: auto;
            overflow: visible;
          }

          .feature-card-3d {
            position: static;
            width: 100%;
            max-width: 100%;
            margin: 0;
            transform: none !important;
            animation: none;
            padding: 24px 20px;
          }

          .feature-card-3d:hover {
            transform: translateY(-8px) !important;
          }

          .carousel-nav {
            display: none;
          }

          .feature-icon-box-pro {
            width: 48px;
            height: 48px;
          }

          .feature-icon-svg {
            width: 24px;
            height: 24px;
          }

          .feature-title {
            font-size: 16px;
            margin-bottom: 8px;
          }

          .feature-description {
            font-size: 12px;
            margin-bottom: 10px;
          }

          .feature-list li {
            font-size: 11px;
            padding: 4px 0;
            padding-left: 16px;
          }

          .feature-list li::before {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .feature-card-3d {
            padding: 20px 18px;
          }

          .feature-icon-box-pro {
            width: 44px;
            height: 44px;
            margin-bottom: 14px;
          }

          .feature-icon-svg {
            width: 22px;
            height: 22px;
          }

          .feature-title {
            font-size: 15px;
          }

          .feature-description {
            font-size: 11px;
          }

          .feature-list li {
            font-size: 10px;
          }

          .about-stats-inline {
            gap: 16px;
          }

          .stat-inline-item {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;