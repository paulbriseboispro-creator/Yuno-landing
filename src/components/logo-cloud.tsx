import { InfiniteSlider } from "@/components/ui/infinite-slider";
import santos from "@/assets/clubs/santos.png";
import fitz from "@/assets/clubs/fitz.png";
import gabana from "@/assets/clubs/gabana.png";
import losamantes from "@/assets/clubs/losamantes.png";
import verbena from "@/assets/clubs/verbena.png";
import opium from "@/assets/clubs/opium.png";
import flor from "@/assets/clubs/flor.png";
import kapital from "@/assets/clubs/kapital.png";
import copernico from "@/assets/clubs/copernico.png";
import rubicon from "@/assets/clubs/rubicon.png";

type Logo = {
	src: string;
	alt: string;
	/** Logos that are pure dark ink on white — invert in dark mode. */
	invertOnDark?: boolean;
	/** Relative scale multiplier to normalize visual weight. */
	scale?: number;
	/** Visual aspect of the cropped logo (width / height). Tunes slot width. */
	aspect?: number;
};

const logos: Logo[] = [
	{ src: santos, alt: "Santos Todos", scale: 1.36, aspect: 1 },
	{ src: fitz, alt: "Fitz", invertOnDark: true, scale: 1.53, aspect: 1.1 },
	{ src: gabana, alt: "Gabana", scale: 1.36, aspect: 1 },
	{ src: losamantes, alt: "Los Amantes", invertOnDark: true, scale: 1.45, aspect: 2.4 },
	{ src: verbena, alt: "Verbena", scale: 1.45, aspect: 1 },
	{ src: opium, alt: "Opium Madrid", scale: 1.87, aspect: 2.2 },
	{ src: flor, alt: "La Flor", scale: 1.62, aspect: 1 },
	{ src: kapital, alt: "Teatro Kapital", scale: 1.87, aspect: 2 },
	{ src: copernico, alt: "Copérnico", scale: 2.04, aspect: 2.4 },
	{ src: rubicon, alt: "Rubicon", scale: 2.04, aspect: 2.6 },
];

// Base slot height (px). Width is derived from each logo's aspect so wide
// wordmarks get wider slots and square emblems stay compact — no overlap.
const BASE_H = 80;

export function LogoCloud() {
	return (
		<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-2">
			<InfiniteSlider gap={28} reverse speed={80} speedOnHover={25}>
				{logos.map((logo) => {
					const aspect = logo.aspect ?? 1.4;
					return (
						<div
							key={`logo-${logo.alt}`}
							className="flex items-center justify-center overflow-hidden"
							style={{ height: BASE_H, width: BASE_H * aspect }}
						>
							<img
								alt={logo.alt}
								className={[
									"pointer-events-none max-h-full max-w-full select-none object-contain opacity-80 transition-opacity hover:opacity-100",
									logo.invertOnDark ? "dark:brightness-0 dark:invert" : "",
								].join(" ")}
								style={{ transform: `scale(${logo.scale ?? 1})` }}
								loading="lazy"
								src={logo.src}
							/>
						</div>
					);
				})}
			</InfiniteSlider>
		</div>
	);
}
