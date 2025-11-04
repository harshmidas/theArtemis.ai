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









import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      initials: "MS",
      name: "Maria Sanchez",
      title: "Ops Manager at a staffing company",
      text: "Artemis gives us speed without chaos. Our time-to-submit dropped immediately."
    },
    {
      initials: "JT",
      name: "James Turner",
      title: "Director at a healthcare agency",
      text: "The interface feels obvious. My team adopted it in a day—no long training calls."
    },
    {
      initials: "AK",
      name: "Anita Kapoor",
      title: "CEO of a leading staffing firm",
      text: "Bulk parsing + RTR flows in one place—this is exactly what we needed."
    }
  ];

  const canvasRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const mysteryPlanetRef = useRef<THREE.Group | null>(null);
  // const cometsRef = useRef<THREE.Points[]>([]);

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

    const planetGroup = new THREE.Group();
    mysteryPlanetRef.current = planetGroup;

    const planetGeometry = new THREE.IcosahedronGeometry(4.0, 5);
    const positions = planetGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const distance = Math.sqrt(x * x + y * y + z * z);
      const distortion = 1 + 0.04 * Math.sin(distance * 3) * Math.random();
      positions[i] *= distortion;
      positions[i + 1] *= distortion;
      positions[i + 2] *= distortion;
    }
    planetGeometry.attributes.position.needsUpdate = true;
    planetGeometry.computeVertexNormals();

    const planetMaterial = new THREE.MeshStandardMaterial({
      color: 0xb59ac7,
      metalness: 0.05,
      roughness: 0.85,
      emissive: 0x1a0f25,
      emissiveIntensity: 0.08,
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planet);

    const atmosphereGeometry = new THREE.SphereGeometry(4.65, 64, 64);
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5aed8,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      metalness: 0,
      roughness: 1,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    planetGroup.add(atmosphere);

    const asteroidBelt = new THREE.Group();
    const asteroidCount = 500;
    
    for (let i = 0; i < asteroidCount; i++) {
      const asteroidSize = 0.06 + Math.random() * 0.18;
      const asteroidGeometry = new THREE.DodecahedronGeometry(asteroidSize, 0);
      
      const hue = 0.08 + Math.random() * 0.05;
      const saturation = 0.25 + Math.random() * 0.15;
      const lightness = 0.25 + Math.random() * 0.2;
      
      const asteroidMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, saturation, lightness),
        metalness: 0.15,
        roughness: 0.95,
      });
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

      const angle = (i / asteroidCount) * Math.PI * 2;
      const radius = 5.5 + Math.random() * 2.0;
      const height = (Math.random() - 0.5) * 0.4;

      asteroid.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      asteroid.rotation.x = Math.random() * Math.PI;
      asteroid.rotation.y = Math.random() * Math.PI;
      asteroid.rotation.z = Math.random() * Math.PI;

      asteroidBelt.add(asteroid);
    }
    planetGroup.add(asteroidBelt);

    for (let i = 0; i < 3; i++) {
      const crystalGeometry = new THREE.OctahedronGeometry(0.35, 1);
      const crystalMaterial = new THREE.MeshStandardMaterial({
        color: 0xa89488,
        metalness: 0.2,
        roughness: 0.75,
        emissive: 0x000000,
        emissiveIntensity: 0,
      });
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);

      const angle = (i / 3) * Math.PI * 2;
      const radius = 6.5;
      crystal.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * 0.8,
        Math.sin(angle) * radius
      );
      planetGroup.add(crystal);
    }

    planetGroup.position.set(22, 6, -12);
    scene.add(planetGroup);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.35);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xf093fb, 0.12, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const planetLight = new THREE.PointLight(0xc5b3d8, 0.15, 30);
    planetLight.position.set(0, 0, 0);
    planetGroup.add(planetLight);

    const hemisphereLight = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.12);
    scene.add(hemisphereLight);

    camera.position.set(0, 0, 20);

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y += 0.0005;
        particlesMeshRef.current.rotation.x += 0.0003;

        const parallaxY = scrollY * 0.001;
        particlesMeshRef.current.position.y = -parallaxY * 2;
        particlesMeshRef.current.position.x = Math.sin(time * 0.5) * 0.5;
      }

      if (mysteryPlanetRef.current) {
        const planetGroup = mysteryPlanetRef.current;

        planetGroup.rotation.y += 0.003;
        planetGroup.rotation.x += 0.001;

        planetGroup.children.forEach((child, index) => {
          if (index > 2) {
            child.rotation.x += 0.02;
            child.rotation.y += 0.03;
            child.position.y += Math.sin(time * 2 + index) * 0.01;
          }
        });

        if (planetGroup.children[2] && planetGroup.children[2].type === 'Group') {
          planetGroup.children[2].rotation.y += 0.005;
        }

        const scrollProgress = Math.min(scrollY / 2000, 1);

        const scale = 1 + scrollProgress * 0.5;
        planetGroup.scale.set(scale, scale, scale);

        planetGroup.position.x = 22 - scrollProgress * 8;
        planetGroup.position.y = 6 + scrollProgress * 5;
        planetGroup.position.z = -12 + scrollProgress * 3;

        const planetMaterial = (planetGroup.children[0] as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        planetMaterial.emissiveIntensity = 0.08 + scrollProgress * 0.02;

        const atmosphereMaterial = (planetGroup.children[1] as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        atmosphereMaterial.opacity = 0.04 + Math.sin(time * 2) * 0.01;
      }

      if (cameraRef.current) {
        cameraRef.current.position.x +=
          (mouseX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y +=
          (-mouseY - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(scene.position);

        const baseZ = 20;
        const scrollEffect = scrollY * 0.001;
        cameraRef.current.position.z = baseZ;

        cameraRef.current.rotation.z = scrollEffect * 0.05;
      }

      pointLight.position.x = Math.sin(time) * 2.5;
      pointLight.position.y = Math.cos(time) * 2.5;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
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

  useEffect(() => {
    if (!starsContainerRef.current) return;

    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const size = Math.random() * 4 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";

      const isGolden = Math.random() > 0.92;
      if (isGolden) {
        star.style.backgroundColor = "#ffd700";
        star.style.boxShadow = "0 0 4px #ffd700, 0 0 8px #ffd700";
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
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleScrollTo =
    (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      <div id="canvas-container" ref={canvasRef} />

      <nav>
        <div className="logo">Artemis</div>
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
              Superpowers
            </a>
          </li>
          <li>
            <a href="#voices" onClick={handleScrollTo("#voices")}>
              Voices
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleScrollTo("#about")}>
              About
            </a>
          </li>
          <li>
            <a
              href="#demo"
              className="nav-cta"
              onClick={handleScrollTo("#demo")}
            >
              Book Demo
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleScrollTo("#contact")}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Supercharged by Next-Gen AI Brilliance</h1>
          <p className="subtitle">Streamlined · Minimalist · Balance</p>
          <p className="tagline">
            Artemis stays colorful yet calm: no unnecessary complexity, easy to
            learn, and fast to use. With only basic knowledge and minimal
            navigation training, you become an expert.
          </p>
          <div className="cta-buttons">
            <a
              href="#demo"
              className="cta-button"
              onClick={handleScrollTo("#demo")}
            >
              Book a Demo
            </a>
            <a
              href="#superpowers"
              className="cta-button secondary"
              onClick={handleScrollTo("#superpowers")}
            >
              View Superpowers
            </a>
          </div>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <section className="superpowers" id="superpowers">
        <h2 className="section-title">Talent Superpowers</h2>
        <p className="section-subtitle">
          A revolution in staffing technology—innovation that empowers your
          every hire.
        </p>
        <div className="superpowers-grid">
          <div className="superpower-card">
            <div className="superpower-icon">⚡</div>
            <h3>Instant Talent Discovery</h3>
            <ul>
              <li>Lightning-fast candidate search with precise results</li>
              <li>Deep VMS integrations for seamless workflow</li>
              <li>Interactive Skills Checklist</li>
            </ul>
          </div>
          <div className="superpower-card">
            <div className="superpower-icon">🚀</div>
            <h3>Next-Gen Workflow Power</h3>
            <ul>
              <li>Send Right-to-Represent (RTR) instantly to candidates</li>
              <li>Design and manage dynamic candidate pipelines</li>
              <li>Smart resume upload & parsing with bulk automation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="voices" id="voices">
        <h2 className="section-title">Voices of Success</h2>
        <p className="section-subtitle">
          Real stories from teams that thrive with Artemis.
        </p>
        <div className="testimonials-slider">
          <div className="testimonials-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.initials}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="section-title">About Artemis</h2>
        <p className="section-subtitle">
          Building the future of recruitment technology with innovation, integrity, and intelligence.
        </p>
        
        <div className="about-hero">
          <div className="about-hero-content">
            <h3>Redefining Staffing Excellence</h3>
            <p>
              Artemis is more than an Applicant Tracking System—it's a complete ecosystem designed 
              to revolutionize how staffing agencies operate. Built on cutting-edge AI technology 
              and decades of industry expertise, we deliver solutions that are both powerful and 
              intuitive, enabling teams to focus on what matters most: connecting great talent 
              with exceptional opportunities.
            </p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-block">
            <div className="about-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To democratize enterprise-grade recruitment technology, making sophisticated 
              ATS capabilities accessible to staffing agencies of all sizes. We believe that 
              powerful tools shouldn't come with complexity or prohibitive costs—they should 
              empower teams to work smarter, faster, and more effectively.
            </p>
          </div>

          <div className="about-block">
            <div className="about-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>
              To become the global standard for intelligent staffing solutions, where every 
              recruiter has access to AI-powered tools that eliminate repetitive tasks, 
              surface the best candidates instantly, and provide actionable insights that 
              drive better hiring decisions.
            </p>
          </div>

          <div className="about-block">
            <div className="about-icon">💎</div>
            <h3>Core Values</h3>
            <ul>
              <li><strong>Simplicity First:</strong> Elegant interfaces that reduce training time to minutes, not days</li>
              <li><strong>Security by Design:</strong> Enterprise-grade protection for sensitive candidate data</li>
              <li><strong>Continuous Innovation:</strong> Regular updates driven by real user feedback</li>
              <li><strong>Customer Success:</strong> Your growth is our success—we're partners, not just vendors</li>
              <li><strong>Transparency:</strong> No hidden fees, no surprise charges, no complicated pricing tiers</li>
            </ul>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Candidates Placed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Agencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Platform Uptime</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>

        <div className="about-features-grid">
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <h4>Fast Implementation</h4>
            <p>Go live in days, not months. Our streamlined onboarding gets you operational quickly.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔗</div>
            <h4>Seamless Integrations</h4>
            <p>Connect with major VMS platforms, job boards, and HRMS systems effortlessly.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🤖</div>
            <h4>AI-Powered Matching</h4>
            <p>Advanced algorithms surface the best candidates based on skills, experience, and fit.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h4>Real-Time Analytics</h4>
            <p>Track key metrics, identify bottlenecks, and optimize your recruitment funnel.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h4>Enterprise Security</h4>
            <p>SOC 2 compliant infrastructure with end-to-end encryption and regular audits.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💼</div>
            <h4>Dedicated Support</h4>
            <p>Expert assistance whenever you need it, with personalized training and resources.</p>
          </div>
        </div>

        <div className="about-cta">
          <h3>Ready to Transform Your Staffing Operations?</h3>
          <p>Join hundreds of agencies already using Artemis to streamline their recruitment process.</p>
          <a href="#demo" className="cta-button" onClick={handleScrollTo("#demo")}>
            Schedule Your Demo
          </a>
        </div>
      </section>

      <section className="contact-form-section" id="demo">
        <h2 className="section-title">Book a Demo</h2>
        <p className="section-subtitle">See Artemis in action.</p>
        <div className="form-container">
          <form onSubmit={submitDemo}>
            <div className="form-grid">
              <div className="form-group">
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
              <div className="form-group">
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
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
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
              <div className="form-group">
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
            <div className="form-group">
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
            <button type="submit" className="submit-btn">
              Request Demo
            </button>
          </form>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Artemis ATS</h4>
            <p>Supercharged recruiting technology for modern staffing teams.</p>
            <div className="social-links">
              <a href="#" title="LinkedIn">
                💼
              </a>
              <a href="#" title="Facebook">
                📘
              </a>
              <a href="#" title="Twitter">
                🐦
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#superpowers" onClick={handleScrollTo("#superpowers")}>
              Superpowers
            </a>
            <a href="#voices" onClick={handleScrollTo("#voices")}>
              Voices
            </a>
            <a href="#about" onClick={handleScrollTo("#about")}>
              About
            </a>
            <a href="#demo" onClick={handleScrollTo("#demo")}>
              Book Demo
            </a>
          </div>
          <div className="footer-section">
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
          color: #fff;
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
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .star[style*="ffd700"] {
          animation: goldenTwinkle 4s infinite ease-in-out;
        }

        @keyframes goldenTwinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 4px #ffd700, 0 0 8px #ffd700;
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2) rotate(180deg);
            box-shadow: 0 0 6px #ffd700, 0 0 12px #ffd700;
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

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 20px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          background: rgba(10, 14, 39, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .nav-links {
          display: flex;
          gap: 30px;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: all 0.3s;
          position: relative;
          cursor: pointer;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-links a:hover {
          color: #667eea;
        }

        .nav-cta {
          padding: 10px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 25px;
          transition: all 0.3s;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .nav-cta::after {
          display: none;
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
          background: #fff;
          transition: all 0.3s;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 60px;
          z-index: 10;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
        }

        .hero h1 {
          font-size: clamp(36px, 8vw, 72px);
          margin-bottom: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 1s ease-out;
        }

        .hero .subtitle {
          font-size: clamp(18px, 3vw, 28px);
          margin-bottom: 15px;
          color: #b8c5d6;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero .tagline {
          font-size: clamp(16px, 2.5vw, 20px);
          margin-bottom: 40px;
          color: #8a95a8;
          animation: fadeInUp 1s ease-out 0.4s both;
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

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .cta-button {
          display: inline-block;
          padding: 18px 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          border: none;
        }

        .cta-button.secondary {
          background: transparent;
          border: 2px solid #667eea;
          box-shadow: none;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transition: left 0.5s;
          z-index: -1;
        }

        .cta-button:hover::before {
          left: 0;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }

        .superpowers {
          position: relative;
          padding: 100px 50px;
          z-index: 10;
        }

        .section-title {
          text-align: center;
          font-size: clamp(36px, 6vw, 48px);
          margin-bottom: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          text-align: center;
          font-size: clamp(16px, 2.5vw, 20px);
          color: #b8c5d6;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .superpowers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .superpower-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 1000px;
          animation: card3DFloat 6s ease-in-out infinite;
        }

        @keyframes card3DFloat {
          0%, 100% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0);
          }
          33% { 
            transform: perspective(1000px) rotateY(2deg) rotateX(1deg) translateY(-8px);
          }
          66% { 
            transform: perspective(1000px) rotateY(-2deg) rotateX(-1deg) translateY(-4px);
          }
        }

        .superpower-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          transform: rotate(45deg);
          transition: all 0.6s;
        }

        .superpower-card:hover::before {
          top: -10%;
          left: -10%;
        }

        .superpower-card:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-15px);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
          border-color: rgba(102, 126, 234, 0.5);
        }

        .superpower-icon {
          font-size: 48px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .superpower-card h3 {
          font-size: 24px;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .superpower-card ul {
          list-style: none;
          position: relative;
          z-index: 1;
        }

        .superpower-card li {
          color: #b8c5d6;
          line-height: 1.8;
          padding-left: 20px;
          position: relative;
          margin-bottom: 10px;
        }

        .superpower-card li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #667eea;
        }

        .voices {
          position: relative;
          padding: 100px 50px;
          z-index: 10;
        }

        .testimonials-slider {
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }

        .testimonials-track {
          display: flex;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card {
          min-width: 100%;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 60px 50px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation: card3DRotate 8s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @keyframes card3DRotate {
          0%, 100% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
          }
          25% { 
            transform: perspective(1000px) rotateY(3deg) rotateX(2deg);
          }
          50% { 
            transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
          }
          75% { 
            transform: perspective(1000px) rotateY(-3deg) rotateX(-2deg);
          }
        }

        .testimonial-card:hover {
          box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4);
          border-color: rgba(102, 126, 234, 0.3);
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-5px);
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .dot.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 32px;
          border-radius: 6px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }

        .author-info h4 {
          margin-bottom: 5px;
        }

        .author-info p {
          color: #8a95a8;
          font-size: 14px;
        }

        .testimonial-text {
          color: #e0e6f0;
          line-height: 1.9;
          font-style: italic;
          font-size: 20px;
          font-weight: 400;
        }

        .about {
          position: relative;
          padding: 100px 50px;
          z-index: 10;
        }

        .about-hero {
          max-width: 1000px;
          margin: 0 auto 80px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          padding: 60px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: card3DFloat 6s ease-in-out infinite;
        }

        .about-hero-content h3 {
          font-size: 36px;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-hero-content p {
          color: #d0d8e6;
          font-size: 19px;
          line-height: 1.9;
          font-weight: 400;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto 80px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .about-icon {
          font-size: 48px;
          margin-bottom: 20px;
          filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
        }

        .about-block {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-block:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
          border-color: rgba(102, 126, 234, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .about-block h3 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #667eea;
        }

        .about-block p {
          color: #c5d0e0;
          line-height: 1.8;
          font-size: 16px;
        }

        .about-block ul {
          list-style: none;
          padding-left: 0;
        }

        .about-block li {
          color: #c5d0e0;
          line-height: 1.9;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 16px;
        }

        .about-block li:last-child {
          border-bottom: none;
        }

        .about-block li strong {
          color: #8a9dea;
          font-weight: 600;
        }

        .about-stats {
          max-width: 1200px;
          margin: 0 auto 80px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.4s;
          animation: card3DFloat 5s ease-in-out infinite;
        }

        .stat-card:nth-child(2) {
          animation-delay: 0.5s;
        }

        .stat-card:nth-child(3) {
          animation-delay: 1s;
        }

        .stat-card:nth-child(4) {
          animation-delay: 1.5s;
        }

        .stat-card:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .stat-label {
          color: #b8c5d6;
          font-size: 16px;
          font-weight: 500;
        }

        .about-features-grid {
          max-width: 1200px;
          margin: 0 auto 80px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .feature-item {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 15px;
          padding: 30px;
          transition: all 0.4s;
        }

        .feature-item:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 15px;
          filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.3));
        }

        .feature-item h4 {
          font-size: 20px;
          margin-bottom: 12px;
          color: #8a9dea;
          font-weight: 600;
        }

        .feature-item p {
          color: #b0bccf;
          font-size: 15px;
          line-height: 1.7;
        }

        .about-cta {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(102, 126, 234, 0.25);
          border-radius: 25px;
          padding: 60px 40px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
        }

        .about-cta h3 {
          font-size: 32px;
          margin-bottom: 20px;
          color: #fff;
        }

        .about-cta p {
          font-size: 18px;
          color: #c5d0e0;
          margin-bottom: 35px;
          line-height: 1.8;
        }

        .about-cta .cta-button {
          display: inline-block;
          padding: 18px 50px;
          font-size: 18px;
        }

        .contact-form-section {
          position: relative;
          padding: 100px 50px;
          z-index: 10;
        }

        .form-container {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 50px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #b8c5d6;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
        }

        .form-group select {
          cursor: pointer;
        }

        .form-group option {
          background: #0a0e27;
          color: #fff;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }

        footer {
          position: relative;
          padding: 50px;
          background: rgba(10, 14, 39, 0.8);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 10;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section h4 {
          margin-bottom: 20px;
          color: #667eea;
        }

        .footer-section p,
        .footer-section a {
          color: #b8c5d6;
          line-height: 1.8;
          text-decoration: none;
          display: block;
          margin-bottom: 10px;
        }

        .footer-section a:hover {
          color: #667eea;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-links a {
          display: inline-flex;
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .social-links a:hover {
          transform: translateY(-5px) rotate(360deg);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #8a95a8;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        .scroll-indicator::after {
          content: '↓';
          font-size: 32px;
          color: #667eea;
        }

        @media (max-width: 968px) {
          nav {
            padding: 15px 30px;
          }

          .nav-links {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(10, 14, 39, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            padding: 50px;
            transition: right 0.3s;
          }

          .nav-links.active {
            right: 0;
          }

          .menu-toggle {
            display: flex;
          }

          .superpowers, .voices, .about, .contact-form-section {
            padding: 60px 30px;
          }

          .form-container {
            padding: 30px 20px;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .testimonial-card {
            padding: 40px 30px;
          }

          .testimonial-text {
            font-size: 18px;
          }

          .about-hero {
            padding: 40px 30px;
          }

          .about-hero-content h3 {
            font-size: 28px;
          }

          .about-hero-content p {
            font-size: 16px;
          }

          .about-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .stat-number {
            font-size: 36px;
          }

          .stat-label {
            font-size: 14px;
          }

          .about-cta {
            padding: 40px 30px;
          }

          .about-cta h3 {
            font-size: 26px;
          }

          .about-cta p {
            font-size: 16px;
          }
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
          }

          .about-stats {
            grid-template-columns: 1fr;
          }

          .about-features-grid {
            grid-template-columns: 1fr;
          }

          .about-hero {
            padding: 30px 20px;
          }

          .stat-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;