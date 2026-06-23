import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";
import { useCommon } from "@/content/common";

export function NotFoundPage() {
	const t = useCommon().notFound;
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
						{t.title}
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
						{t.descLine1} <br />
						{t.descLine2}
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button asChild>
							<Link to="/">
								<HomeIcon data-icon="inline-start" />
								{t.goHome}
							</Link>
						</Button>

						<Button asChild variant="outline">
							<Link to="/">
								<CompassIcon data-icon="inline-start" />{" "}
								{t.explore}
							</Link>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
