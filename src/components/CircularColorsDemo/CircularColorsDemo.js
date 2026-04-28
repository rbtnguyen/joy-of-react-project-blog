"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { motion, useReducedMotion } from "motion/react";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  let intervalId = React.useRef();

  const selectedColor = getColor(timeElapsed);

  function getColor(timeElapsed) {
    const colorIndex = timeElapsed % COLORS.length;

    return COLORS[colorIndex];
  }

  const handlePlay = () => {
    intervalId.current = window.setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    setIsPlaying(true);
  };

  const handlePause = () => {
    clearInterval(intervalId.current);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setTimeElapsed(0);
  };

  const id = React.useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={id}
                  className={styles.selectedColorOutline}
                  transition={shouldReduceMotion ? { duration: 0 } : undefined}
                ></motion.div>
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox,
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{String(timeElapsed)}</dd>
        </dl>
        <div className={styles.actions}>
          {!isPlaying ? (
            <button onClick={handlePlay}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={handlePause}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
