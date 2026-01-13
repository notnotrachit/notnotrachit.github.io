import type React from "react";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

function easeOutCubic(t: number): number {
	return 1 - (1 - t) ** 3;
}

interface IconCloudProps {
	icons?: React.ReactNode[];
	images?: string[];
}

interface IconPosition {
	x: number;
	y: number;
	z: number;
	scale: number;
	opacity: number;
	id: number;
}

interface Rotation {
	x: number;
	y: number;
}

interface TargetRotation extends Rotation {
	startX: number;
	startY: number;
	distance: number;
	startTime: number;
	duration: number;
}

export function IconCloud({ icons, images }: IconCloudProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
	const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [targetRotation, setTargetRotation] = useState<TargetRotation | null>(
		null,
	);
	const animationFrameRef = useRef<number>(0);
	const rotationRef = useRef<Rotation>(rotation);
	const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
	const imagesLoadedRef = useRef<boolean[]>([]);

	// Create icon canvases once when icons/images change
	useEffect(() => {
		if (!icons && !images) return;

		const items = icons || images || [];
		imagesLoadedRef.current = new Array(items.length).fill(false);

		const newIconCanvases = items.map((item, index) => {
			const offscreen = document.createElement("canvas");
			offscreen.width = 80;
			offscreen.height = 80;
			const offCtx = offscreen.getContext("2d");

			if (offCtx) {
				if (images) {
					const img = new Image();
					img.crossOrigin = "anonymous";
					img.src = item as string;
					img.onload = () => {
						offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
						offCtx.beginPath();
						offCtx.arc(40, 40, 40, 0, Math.PI * 2);
						offCtx.closePath();
						offCtx.clip();
						offCtx.drawImage(img, 0, 0, 80, 80);
						imagesLoadedRef.current[index] = true;
					};
				} else {
					offCtx.scale(2, 2);
					try {
						const svgString = renderToString(item as React.ReactElement);
						const img = new Image();
						img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
						img.onload = () => {
							offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
							offCtx.drawImage(img, 0, 0);
							imagesLoadedRef.current[index] = true;
						};
					} catch (e) {
						console.error("Error rendering icon to string:", e);
					}
				}
			}
			return offscreen;
		});

		iconCanvasesRef.current = newIconCanvases;
	}, [icons, images]);

	useEffect(() => {
		const items = icons || images || [];
		const newIcons: IconPosition[] = [];
		const numIcons = items.length || 20;
		const offset = 2 / numIcons;
		const increment = Math.PI * (3 - Math.sqrt(5));

		for (let i = 0; i < numIcons; i++) {
			const y = i * offset - 1 + offset / 2;
			const r = Math.sqrt(1 - y * y);
			const phi = i * increment;
			const x = Math.cos(phi) * r;
			const z = Math.sin(phi) * r;

			newIcons.push({
				x: x * 150,
				y: y * 150,
				z: z * 150,
				scale: 1,
				opacity: 1,
				id: i,
			});
		}
		setIconPositions(newIcons);
	}, [icons, images]);

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDragging(true);
		setLastMousePos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (rect) {
			setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
		}
		if (isDragging) {
			const deltaX = e.clientX - lastMousePos.x;
			const deltaY = e.clientY - lastMousePos.y;
			rotationRef.current = {
				x: rotationRef.current.x + deltaY * 0.002,
				y: rotationRef.current.y + deltaX * 0.002,
			};
			setLastMousePos({ x: e.clientX, y: e.clientY });
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
			const dx = mousePos.x - centerX;
			const dy = mousePos.y - centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const speed = 0.003 + (distance / maxDistance) * 0.01;

			if (!isDragging) {
				rotationRef.current = {
					x: rotationRef.current.x + (dy / canvas.height) * speed,
					y: rotationRef.current.y + (dx / canvas.width) * speed,
				};
			}

			iconPositions.forEach((icon, index) => {
				const cosX = Math.cos(rotationRef.current.x);
				const sinX = Math.sin(rotationRef.current.x);
				const cosY = Math.cos(rotationRef.current.y);
				const sinY = Math.sin(rotationRef.current.y);

				const rotatedX = icon.x * cosY - icon.z * sinY;
				const rotatedZ = icon.x * sinY + icon.z * cosY;
				const rotatedY = icon.y * cosX + rotatedZ * sinX;

				const scale = (rotatedZ + 250) / 350;
				const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

				ctx.save();
				ctx.translate(
					canvas.width / 2 + rotatedX,
					canvas.height / 2 + rotatedY,
				);
				ctx.scale(scale, scale);
				ctx.globalAlpha = opacity;

				if (icons || images) {
					if (
						iconCanvasesRef.current[index] &&
						imagesLoadedRef.current[index]
					) {
						ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
					}
				}
				ctx.restore();
			});
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animate();
		return () => {
			if (animationFrameRef.current)
				cancelAnimationFrame(animationFrameRef.current);
		};
	}, [icons, images, iconPositions, isDragging, mousePos]);

	return (
		<canvas
			ref={canvasRef}
			width={500}
			height={500}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className="cursor-pointer max-w-full h-auto"
		/>
	);
}
