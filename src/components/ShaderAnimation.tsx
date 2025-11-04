import  { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShaderAnimation = ({ 
  className = '', 
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<{[key: string]: THREE.IUniform}>(null);
  const animationFrameRef = useRef<number | null>(null);
  const capturingRef = useRef(false);
  interface CCapture {
    capture: (canvas: HTMLCanvasElement) => void;
  }
  const capturerRef = useRef<CCapture | null>(null);

  // Vertex Shader
  const vertexShader = `
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform sampler2D u_noise;
    
    #define PI 3.141592653589793
    #define TAU 6.
    
    const float multiplier = 25.5;
    const float zoomSpeed = 10.;
    const int layers = 10;
    const int octaves = 5;

    vec2 hash2(vec2 p)
    {
      vec2 o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).xy;
      return o;
    }
    
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),sin(_angle),
                  -sin(_angle),cos(_angle));
    }
    
    vec3 hsb2rgb( in vec3 c ){
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                              6.0)-3.0)-1.0,
                      0.0,
                      1.0 );
      rgb = rgb*rgb*(3.0-2.0*rgb);
      return c.z * mix( vec3(1.0), rgb, c.y);
    }
    
    float hash(vec2 p)
    {
      float o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).x;
      return o;
    }

    float noise(vec2 uv) {
      vec2 id = floor(uv);
      vec2 subuv = fract(uv);
      vec2 u = subuv * subuv * (3. - 2. * subuv);
      float a = hash(id);
      float b = hash(id + vec2(1., 0.));
      float c = hash(id + vec2(0., 1.));
      float d = hash(id + vec2(1., 1.));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(in vec2 uv) {
      float s = .0;
      float m = .0;
      float a = .5;
      for(int i = 0; i < octaves; i++) {
        s += a * noise(uv);
        m += a;
        a *= .5;
        uv *= 2.;
      }
      return s / m;
    }
    
    vec3 domain(vec2 z){
      return vec3(hsb2rgb(vec3(atan(z.y,z.x)/TAU,1.,1.)));
    }

    vec3 colour(vec2 z) {
      return domain(z);
    }
    
    vec3 render(vec2 uv, float scale, vec3 colour) {
      vec2 id = floor(uv);
      vec2 subuv = fract(uv);
      vec2 rand = hash2(id);
      float bokeh = abs(scale) * 1.;
      
      float particle = 0.;
      
      if(length(rand) > 1.3) {
        vec2 pos = subuv-.5;
        float field = length(pos);
        particle = smoothstep(.3, 0., field);
        particle += smoothstep(.4, 0.34 * bokeh, field);
      }
      return vec3(particle*2.);
    }
    
    vec3 renderLayer(int layer, int layers, vec2 uv, inout float opacity, vec3 colour, float n) {
      vec2 _uv = uv;
      float scale = mod((u_time + zoomSpeed / float(layers) * float(layer)) / zoomSpeed, -1.);
      uv *= 20.;
      uv *= scale*scale;
      uv = rotate2d(u_time / 10.) * uv;
      uv += vec2(25. + sin(u_time*.1)) * float(layer);

      vec3 pass = render(uv * multiplier, scale, colour) * .2;

      opacity = 1. + scale;
      float _opacity = opacity;
      
      float endOpacity = smoothstep(0., 0.4, scale * -1.);
      opacity += endOpacity;

      return pass * _opacity * endOpacity;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy);

      if(u_resolution.y < u_resolution.x) {
        uv /= u_resolution.y;
      } else {
        uv /= u_resolution.x;
      }

      float n = fbm((uv + vec2(sin(u_time*.1), u_time*.1)) * 2. - 2.);

      vec3 colour = vec3(0.);
      colour = n * mix(vec3(0., .5, 1.5), clamp(vec3(1., .5, .25)*2., 0., 1.), n);

      float opacity = 1.;
      float opacity_sum = 1.;

      for(int i = 1; i <= layers; i++) {
        colour += renderLayer(i, layers, uv, opacity, colour, n);
        opacity_sum += opacity;
      }

      colour /= opacity_sum;

      gl_FragColor = vec4(clamp(colour * 20., 0., 1.),1.0);
    }
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let texture = null;

    // Load texture
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    
    loader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
      (loadedTexture) => {
        texture = loadedTexture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        
        initScene(texture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    const initScene = (texture: THREE.Texture) => {
      // Camera
      const camera = new THREE.Camera();
      camera.position.z = 1;
      cameraRef.current = camera;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Geometry
      const geometry = new THREE.PlaneGeometry(2, 2);

      // Uniforms
      const uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_noise: { type: "t", value: texture },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
      };
      uniformsRef.current = uniforms;

      // Material
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });
      (material.extensions as any).derivatives = true;

      // Mesh
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;

      container.appendChild(renderer.domElement);

      // Set initial size
      handleResize();

      // Start animation
      animate();
    };

    const handleResize = () => {
      if (!rendererRef.current || !uniformsRef.current || !containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      rendererRef.current.setSize(width, height);
      uniformsRef.current.u_resolution.value.x = rendererRef.current.domElement.width;
      uniformsRef.current.u_resolution.value.y = rendererRef.current.domElement.height;
    };

    const handleMouseMove = (e: PointerEvent) => {
      if (!uniformsRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const ratio = height / width;
      
      uniformsRef.current.u_mouse.value.x = (e.clientX - rect.left - width / 2) / width / ratio;
      uniformsRef.current.u_mouse.value.y = (e.clientY - rect.top - height / 2) / height * -1;
    };

    const animate = (delta = 0) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      render(delta);
    };

    const render = (delta: number) => {
      if (!uniformsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      
      uniformsRef.current.u_time.value = -10000 + delta * 0.0005;
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      if (capturingRef.current && capturerRef.current) {
        capturerRef.current.capture(rendererRef.current.domElement);
      }
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    container.addEventListener('pointermove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointermove', handleMouseMove);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh && object.geometry) {
            object.geometry.dispose();
          }
          if (object instanceof THREE.Mesh && object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        touchAction: 'none',
        ...style
      }}
    />
  );
};

export default ShaderAnimation;