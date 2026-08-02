import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }

// distance to the city: repeated boxes on a grid
float boxes(vec3 p, out float id){
  vec2 cell = floor(p.xz / 8.0);
  id = hash21(cell);
  vec3 q = p;
  q.xz = mod(p.xz, 8.0) - 4.0;
  float h = 4.0 + id * 26.0;
  vec3 b = vec3(2.2 + id*1.1, h, 2.2 + fract(id*7.3)*1.1);
  vec3 d = abs(vec3(q.x, p.y - 0.0, q.z)) - b;
  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

float map(vec3 p, out float id){
  float city = boxes(p, id);
  float ground = p.y;
  return min(city, ground);
}

vec3 palette(float t){
  vec3 cyan = vec3(0.37, 0.85, 1.0);
  vec3 mag  = vec3(1.0, 0.24, 0.50);
  vec3 amb  = vec3(1.0, 0.63, 0.27);
  if (t < 0.42) return cyan;
  if (t < 0.78) return mag;
  return amb;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  float t = uTime * 0.06 + uScroll * 6.0;

  vec3 ro = vec3(sin(t*0.35)*3.0, 9.0 + uScroll*10.0 + uMouse.y*1.6, -t*14.0);
  vec3 ta = ro + vec3(uMouse.x*0.35, -0.16 - uMouse.y*0.1, 1.0);
  vec3 fw = normalize(ta - ro);
  vec3 rt = normalize(cross(vec3(0.0,1.0,0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x*rt + uv.y*up + 1.35*fw);

  float dist = 0.0;
  float id = 0.0;
  float hitId = 0.0;
  bool hit = false;
  vec3 p = ro;
  for(int i=0;i<78;i++){
    p = ro + rd*dist;
    float d = map(p, id);
    if(d < 0.02){ hit = true; hitId = id; break; }
    if(dist > 220.0) break;
    dist += d*0.82;
  }

  vec3 col = vec3(0.0);
  // sky: deep teal to violet with a low neon sun
  float sky = smoothstep(-0.15, 0.55, rd.y);
  vec3 skyCol = mix(vec3(0.05,0.09,0.12), vec3(0.03,0.02,0.06), sky);
  float sun = exp(-abs(rd.y-0.02)*9.0) * exp(-abs(rd.x-0.15)*1.4);
  skyCol += vec3(1.0,0.35,0.25) * sun * 0.55;
  col = skyCol;

  if(hit){
    vec3 base = vec3(0.012,0.016,0.022);
    // window grid emission
    vec2 wuv = vec2(atan(p.z, p.x)*3.0, p.y);
    vec2 g = fract(vec2(p.x + p.z, p.y) * vec2(1.6, 1.05));
    float win = step(0.55, g.x) * step(0.52, g.y);
    float lit = step(0.42, hash21(floor(vec2(p.x + p.z, p.y) * vec2(1.6, 1.05)) + floor(uTime*0.35)*0.01));
    vec3 neon = palette(hitId) * win * lit;
    float facade = 1.0 - smoothstep(0.0, 60.0, p.y);
    col = base + neon * (0.9 + 0.6*facade);
    // wet ground reflection band
    if(p.y < 0.05){
      float r = hash21(floor(p.xz*0.6));
      col = mix(vec3(0.01,0.02,0.03), palette(r)*0.30, 0.5 + 0.5*sin(p.z*0.4 + uTime));
      col *= 0.55;
    }
    float fog = 1.0 - exp(-dist*0.016);
    col = mix(col, skyCol + vec3(0.03,0.05,0.07), fog);
  }

  // volumetric haze / drifting fog layers
  float haze = 0.0;
  for(int i=0;i<3;i++){
    float fi = float(i);
    haze += 0.045 * exp(-abs(rd.y - (-0.02 + fi*0.05))*13.0);
  }
  col += vec3(0.30,0.55,0.75) * haze * (0.7 + 0.3*sin(uTime*0.4));

  // rain streaks
  vec2 ruv = uv * vec2(90.0, 12.0);
  ruv.y += uTime * 9.0;
  float rain = smoothstep(0.965, 1.0, hash21(floor(ruv)));
  col += vec3(0.45,0.75,0.95) * rain * 0.16;

  // vignette + grade
  float vig = 1.0 - 0.85*length(uv*vec2(0.62,0.95));
  col *= clamp(vig, 0.0, 1.0);
  col = pow(max(col, 0.0), vec3(0.86));
  col += (hash21(gl_FragCoord.xy + uTime) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function CityScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4) * 0.75);
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      const dpr = renderer.getPixelRatio();
      uniforms.uRes.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    let scrollTarget = 0;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.uTime.value = reduce ? 12 : clock.getElapsedTime();
      uniforms.uMouse.value.x += (target.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (target.y - uniforms.uMouse.value.y) * 0.05;
      uniforms.uScroll.value += (scrollTarget - uniforms.uScroll.value) * 0.06;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      mat.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
