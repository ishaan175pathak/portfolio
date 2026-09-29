import { memo, useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function AccretionDisk() {
  const materialRef = useRef();

  const geometry = useMemo(() => {
    const innerRadius = 1.55;
    const outerRadius = 4.0;
    const radialSegments = 120;
    const angularSegments = 240;

    const positions = [];
    const uvs = [];
    const indices = [];

    for (let r = 0; r <= radialSegments; r++) {
      const t = r / radialSegments;
      const radius = innerRadius + t * (outerRadius - innerRadius);
      const thickness = 0.16 * (1.0 - t) + 0.025;

      for (let a = 0; a <= angularSegments; a++) {
        const angle = (a / angularSegments) * Math.PI * 2;
        const z = Math.sin(t * Math.PI) * thickness;

        positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
        uvs.push(t, a / angularSegments);
      }
    }

    for (let r = 0; r < radialSegments; r++) {
      for (let a = 0; a < angularSegments; a++) {
        const current = r * (angularSegments + 1) + a;
        const next = current + angularSegments + 1;

        indices.push(current, next, current + 1);
        indices.push(current + 1, next, next + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: false,

      // Glow should ADD light to the scene, not just alpha-blend over it.
      blending: THREE.AdditiveBlending,

      // Critical: skip ACES tone mapping so overbright emissive values
      // survive to hit the Bloom pass instead of being compressed to 1.0.
      toneMapped: false,

      uniforms: {
        uTime: { value: 0 },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;

        // Ashima Arts 2D simplex noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                              -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 4; i++) {
            value += amplitude * snoise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          float radius = vUv.x;

          // Safety net: discard anything right at the inner boundary so
          // no fragment can ever visually overlap the event-horizon sphere,
          // regardless of viewing angle or perspective foreshortening.
          if (radius < 0.05) {
            discard;
          }

          // Keplerian differential rotation: inner material orbits faster.
          float angularSpeed = 1.6 / pow(radius + 0.12, 1.5);
          float flowAngle = vUv.y * 6.28318 - uTime * angularSpeed;

          // Turbulence: stretch noise along the flow direction for streaky filaments.
          vec2 noiseCoord = vec2(radius * 6.0, flowAngle * 0.5 - uTime * 0.15);   // was flowAngle * 1.6             
          float turbulence = fbm(noiseCoord) * 0.5 + 0.5;
          float fineGrain = fbm(noiseCoord * 1.5 + 50.0) * 0.5 + 0.5;
          float texture = mix(turbulence, fineGrain, 0.35);

          float innerGlow = 1.0 - smoothstep(0.0, 0.28, radius);
          float body = 1.0 - smoothstep(0.12, 0.75, radius);
          float outerFade = 1.0 - smoothstep(0.70, 1.0, radius);
          float innerFade = smoothstep(0.0, 0.04, radius);

          // Relativistic beaming: side rotating toward viewer is brighter.
          // Clamped so it never goes to zero/negative on the receding side
          // (an unclamped sin() dip was killing intensity entirely there).
          float beaming = clamp(0.55 + 0.65 * sin(flowAngle + 1.2), 0.15, 1.3);

          float intensity =
            (0.18 + innerGlow * 1.15 + body * 0.30) *
            outerFade * innerFade *
            (0.55 + 0.75 * texture) *
            beaming;

          vec3 innerColor = vec3(1.0, 0.88, 0.58);
          vec3 outerColor = vec3(0.60, 0.13, 0.025);
          vec3 hotStreak = vec3(1.0, 1.0, 0.9);

          vec3 color = mix(innerColor, outerColor, radius);
          color = mix(color, hotStreak, pow(texture, 3.0) * innerGlow * 0.6);

          // Bake brightness into RGB itself (HDR overbright), not just alpha.
          // Boost factor pushes hot regions past 1.0 so Bloom actually triggers.
          vec3 emissive = color * intensity * 2.6;

          // Keep a separate, gentler alpha just for shape/edge falloff.
          float alpha = clamp(intensity * 1.4, 0.0, 1.0);

          gl_FragColor = vec4(emissive, alpha);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh
      geometry={geometry}
      rotation={[THREE.MathUtils.degToRad(68), 0, 0]}
    >
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

/*
 * Lensed halo ring — the vertical loop of light that appears to arc
 * over the top and under the bottom of the sphere (a simplified stand-in
 * for gravitational lensing of the disk's far side, à la Interstellar).
 *
 * Unlike the main disk (which is nearly flat and tilted to be viewed
 * edge-on), this ring is built face-on to the camera, so its top and
 * bottom arcs read clearly above/below the event horizon.
 */

function LensedRing() {
  const materialRef = useRef();

  const geometry = useMemo(
    () => new THREE.TorusGeometry(1.58, 0.06, 48, 200),
    []
  );

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,

      uniforms: {
        uTime: { value: 0 },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,

      // Torus UVs: vUv.x wraps around the main loop (angle), vUv.y wraps
      // around the tube's cross-section (0/1 = outer seam, 0.5 = tube center).
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;

        void main() {
          // Brightest at the tube's center, fading to nothing at its edge.
          float crossSection = abs(vUv.y - 0.5) * 2.0;
          float glow = 1.0 - smoothstep(0.0, 1.0, crossSection);
          glow = pow(glow, 1.6);

          // Drifting hot streaks flowing around the loop over time.
          float flow = fract(vUv.x * 4.0 - uTime * 0.22);
          float streaks = smoothstep(0.0, 0.5, flow) * smoothstep(1.0, 0.5, flow);

          vec3 innerColor = vec3(1.0, 0.92, 0.65);
          vec3 outerColor = vec3(0.75, 0.28, 0.06);
          vec3 color = mix(outerColor, innerColor, glow);

          float intensity = glow * (0.65 + 0.6 * streaks);

          vec3 emissive = color * intensity * 2.2;
          float alpha = clamp(intensity * 1.3, 0.0, 1.0);

          gl_FragColor = vec4(emissive, alpha);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh geometry={geometry} rotation={[THREE.MathUtils.degToRad(-18), 0, 0]}>
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

function BlackHole() {
  return (
    <group>
      <AccretionDisk />
      <LensedRing />

      {/*
        Event horizon: a plain opaque mesh. Keeping it opaque (not
        transparent, normal depthTest/depthWrite) means it participates
        in three.js's standard opaque render pass and properly occludes
        the disk via the ordinary depth buffer — no render-order tricks
        needed. The radius bump (1.25 -> 1.5), combined with the wider
        disk inner-radius gap above, keeps the tilted disk's near rim
        from ever visually crossing into this silhouette.
      */}
      
      <mesh>
        <sphereGeometry args={[1.5, 96, 96]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// hoisted so props are referentially stable
const CAMERA = { position: [0, 3.2, 11], fov: 45 };
const GL = { antialias: false, alpha: true, powerPreference: "high-performance" };

function BlackHoleScene() {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[100vh] w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={CAMERA}
        gl={GL}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <BlackHole />
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default memo(BlackHoleScene);