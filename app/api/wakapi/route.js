export async function GET() {
    try {
        const response = await fetch(
            "https://wakapi.rachitkhurana.tech/api/summary?interval=last_7_days&api_key=933f352a-9e87-45b5-8c82-206a664f1cd9",
            { next: { revalidate: 300 } } // Cache for 5 minutes
        );

        if (!response.ok) {
            return Response.json(
                { error: "Failed to fetch Wakapi data" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Wakapi API error:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
