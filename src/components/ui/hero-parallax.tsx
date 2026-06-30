"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";

export type ParallaxProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

// Below Tailwind's `md` breakpoint we drop the 3D overlay treatment: the header
// flows above the cards instead of floating over them, and the rows sit in
// normal document height so there's no dead space and nothing bleeds into the
// section below. The horizontal scroll-drift is kept (just gentler) so the
// dashboards still glide past as you scroll.
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export const HeroParallax = ({
  products,
  header,
}: {
  products: ParallaxProduct[];
  header?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const isMobile = useIsMobile();
  const drift = isMobile ? 260 : 600;
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, drift]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -drift]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.55, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-150, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="pb-12 md:h-[180vh] md:py-32 overflow-hidden antialiased relative flex flex-col self-auto md:[perspective:1000px] md:[transform-style:preserve-3d]"
    >
      {header}
      <motion.div
        style={isMobile ? undefined : { rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-5 mb-5 md:space-x-20 md:mb-20">
          {firstRow.map((product, i) => (
            <ProductCard product={product} translate={translateX} key={`${product.title}-${i}`} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-5 space-x-5 md:mb-20 md:space-x-20">
          {secondRow.map((product, i) => (
            <ProductCard product={product} translate={translateXReverse} key={`r2-${product.title}-${i}`} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-5 md:space-x-20">
          {thirdRow.map((product, i) => (
            <ProductCard product={product} translate={translateX} key={`r3-${product.title}-${i}`} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-44 w-[17rem] sm:h-64 sm:w-[24rem] md:h-96 md:w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
          loading="lazy"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
