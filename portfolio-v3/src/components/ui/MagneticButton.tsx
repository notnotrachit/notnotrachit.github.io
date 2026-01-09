import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

interface MagneticButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
}

export function MagneticButton({
	children,
	className = "",
	onClick,
	href,
}: MagneticButtonProps) {
	const content = (
		<div
			className={`
        relative inline-flex items-center justify-center px-8 py-4 
        bg-white text-black overflow-hidden 
        transition-all duration-300 group-hover:scale-105
        font-display font-bold uppercase tracking-wider text-sm
        border border-transparent hover:border-white/20
        shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
        ${className}
      `}
		>
			<div className="absolute inset-0 bg-neutral-200 translate-y-[100%] transition-transform duration-300 ease-out-expo group-hover:translate-y-0" />
			<span className="relative z-10">{children}</span>
		</div>
	);

	const Wrapper = href ? "a" : "div";
	const props = href
		? { href, className: "inline-block cursor-none group" }
		: { onClick, className: "inline-block cursor-none group" };

	// @ts-ignore - Dynamic tag handling
	return (
		<Magnetic strength={0.4}>
			<Wrapper {...props}>{content}</Wrapper>
		</Magnetic>
	);
}
