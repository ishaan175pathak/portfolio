import React from "react";
import { motion } from "framer-motion";

const PLANETS = [
  { id: "mercury", size: 8, distance: 38, duration: 8, color: "#a9a9a9", shade: "#454545", phase: 15 },
  { id: "venus", size: 13, distance: 59, duration: 12, color: "#e8b889", shade: "#86543b", phase: 75 },
  { id: "earth", size: 14, distance: 82, duration: 16, color: "#168bd2", shade: "#06345e", phase: 145 },
  { id: "mars", size: 11, distance: 105, duration: 22, color: "#df6548", shade: "#712c25", phase: 220 },
  { id: "jupiter", size: 24, distance: 143, duration: 34, color: "#d6b18b", shade: "#78543d", phase: 40 },
  { id: "saturn", size: 21, distance: 183, duration: 43, color: "#e2ca91", shade: "#88744c", phase: 185 },
  { id: "uranus", size: 17, distance: 224, duration: 54, color: "#91d8dc", shade: "#3c777e", phase: 280 },
  { id: "neptune", size: 17, distance: 263, duration: 66, color: "#3976dc", shade: "#172e75", phase: 115 },
  { id: "pluto", size: 6, distance: 294, duration: 78, color: "#cbb6a6", shade: "#68534c", phase: 325 },
];

function Planet({ planet }) {
  const { id, size, distance, duration, color, shade, phase } = planet;

  return (
    <>
      {/* Orbital path */}
      <div
        className="absolute rounded-full border border-white/[0.09]"
        style={{
          width: distance * 2,
          height: distance * 2,
        }}
      />

      {/* Orbiting planet */}
      <motion.div
        className="absolute"
        style={{
          width: distance * 2,
          height: distance * 2,
          rotate: phase,
        }}
        animate={{ rotate: phase + 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
        >
          {/* Planet surface */}
          <div
            className="relative h-full w-full rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at 30% 25%,
                  ${color},
                  ${color} 15%,
                  ${shade} 65%,
                  #080b16 100%
                )
              `,
              boxShadow: `inset -${size / 5}px -${size / 8}px ${size / 3}px rgba(0,0,0,0.75),
                          0 0 ${id === "earth" ? 10 : 5}px ${color}35`,
            }}
          >
            {/* Earth-like blue atmospheric edge */}
            {id === "earth" && (
              <div
                className="absolute inset-[-2px] rounded-full"
                style={{
                  border: "1px solid rgba(73, 184, 255, 0.55)",
                  boxShadow: "0 0 7px rgba(35, 157, 255, 0.3)",
                }}
              />
            )}

            {/* Subtle banding on gas giants */}
            {(id === "jupiter" || id === "saturn") && (
              <div
                className="absolute inset-[20%] rounded-full opacity-50"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent 0 3px,
                    ${shade} 4px 5px,
                    transparent 6px 8px
                  )`,
                }}
              />
            )}

            {/* Saturn's layered ring system */}
            {id === "saturn" && (
              <>
                <div
                  className="absolute left-1/2 top-1/2 z-[-1] h-[42%] w-[175%] -translate-x-1/2 -translate-y-1/2 rotate-[-22deg] rounded-[50%] border-[3px] border-amber-100/50"
                  style={{
                    boxShadow: "0 0 3px rgba(238, 210, 150, 0.3)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 h-[58%] w-[200%] -translate-x-1/2 -translate-y-1/2 rotate-[-22deg] rounded-[50%] border-[2px] border-amber-300/30"
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function Loader() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent">
      {/* Keep your existing twinkling star background behind this component */}

      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{
          width: "min(100vw, 650px)",
          height: "min(100vw, 650px)",
          minWidth: 320,
          minHeight: 320,
          transform: "scale(min(1, 100vw / 650))",
        }}
      >
        {/* Sun */}
        <div
          className="absolute z-10 rounded-full"
          style={{
            width: 34,
            height: 34,
            background:
              "radial-gradient(circle at 35% 30%, #fff8c9 0%, #ffd166 35%, #ff8c24 70%, #d64c12 100%)",
            boxShadow:
              "0 0 12px 4px rgba(255, 183, 3, 0.35), 0 0 40px 12px rgba(255, 140, 36, 0.16), 0 0 80px rgba(255, 140, 36, 0.08)",
          }}
        />

        {/* Sun's subtle animated corona */}
        <motion.div
          className="absolute rounded-full border border-amber-300/20"
          style={{ width: 52, height: 52 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {PLANETS.map((planet) => (
          <Planet key={planet.id} planet={planet} />
        ))}
      </div>
    </div>
  );
}
