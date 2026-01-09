import { RouterProvider } from "@tanstack/react-router";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter();

// Wait for router to be ready before hydrating
router.load().then(() => {
	const rootElement = document.getElementById("root");

	if (rootElement) {
		hydrateRoot(rootElement, <RouterProvider router={router} />);
	}
});
