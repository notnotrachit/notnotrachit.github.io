import { createServerFn } from "@tanstack/react-start";

interface WakapiResponse {
    data: {
        human_readable_total: string;
        human_readable_daily_average: string;
        languages: Array<{ name: string; percent: number; text: string; color?: string }>;
        editors: Array<{ name: string; percent: number; text: string }>;
    };
}

export const getWakapiStats = createServerFn({ method: "GET" })
    .handler(async () => {
        const apiKey = process.env.WAKATIME_API_KEY;

        if (!apiKey) {
            console.warn("WAKATIME_API_KEY is missing on server!");
            return null;
        }

        try {
            const headers: Record<string, string> = {
                Authorization: `Basic ${btoa(apiKey)}`
            };

            const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
                headers
            });

            if (!response.ok) {
                throw new Error(`Wakapi fetch failed: ${response.statusText}`);
            }

            const json: WakapiResponse = await response.json();
            const data = json.data;

            return {
                coding_time_text: data.human_readable_total || "0 hrs",
                daily_average_text: data.human_readable_daily_average || "0 mins",
                languages: data.languages || []
            };

        } catch (error) {
            console.error("Failed to fetch Wakapi stats:", error);
            return null;
        }
    });
