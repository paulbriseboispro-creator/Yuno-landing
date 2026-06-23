import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Dock-style magnification for header nav.
 * - Subtle scale on the hovered item
 * - Neighbors are pushed apart (animated horizontal padding)
 * - Hovered item lifts slightly upward
 */
export function MagnifyNav({ children, className }: Props) {
  const mouseX = useMotionValue(Infinity);
  const items = React.Children.toArray(children);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={className}
    >
      {items.map((child, i) => (
        <MagnifyItem key={i} mouseX={mouseX}>
          {child}
        </MagnifyItem>
      ))}
    </div>
  );
}

const RANGE = 100;
const SPRING = { mass: 0.1, stiffness: 180, damping: 14 };

function MagnifyItem({
  mouseX,
  children,
}: {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Subtle scale (less aggressive than before)
  const scaleT = useTransform(distance, [-RANGE, 0, RANGE], [1, 1.12, 1]);
  // Vertical lift of the hovered item
  const yT = useTransform(distance, [-RANGE, 0, RANGE], [0, -6, 0]);
  // Side padding pushes neighbors away → real layout shift
  const padT = useTransform(distance, [-RANGE, 0, RANGE], [0, 8, 0]);

  const scale = useSpring(scaleT, SPRING);
  const y = useSpring(yT, SPRING);
  const paddingLeft = useSpring(padT, SPRING);
  const paddingRight = useSpring(padT, SPRING);

  return (
    <motion.div
      ref={ref}
      style={{ paddingLeft, paddingRight }}
      className="flex items-center"
    >
      <motion.div style={{ scale, y }} className="origin-bottom">
        {children}
      </motion.div>
    </motion.div>
  );
}
