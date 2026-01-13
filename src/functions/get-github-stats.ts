import { createServerFn } from "@tanstack/react-start";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// User's GraphQL Query
const USER_STATS_QUERY = `
  query userInfo($login: String!) {
    user(login: $login) {
      repositories(ownerAffiliations: OWNER, isFork: false, first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          stargazerCount
          forkCount
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`;

interface LanguageNode {
    size: number;
    node: {
        color: string;
        name: string;
    };
}

interface RepoNode {
    name: string;
    stargazerCount: number;
    forkCount: number;
    languages: {
        edges: LanguageNode[];
    };
}

export const getGithubStats = createServerFn({ method: "GET" })
    .handler(async (payload: any) => {
        const username = payload?.data;

        let token;
        if (username === "notnotrachit") token = process.env.GITHUB_TOKEN_PERSONAL;
        else if (username === "rachitk-ht") token = process.env.GITHUB_TOKEN_WORK;

        if (!token) {
            console.warn(`GitHub Token for ${username} is missing! Falling back to public API.`);
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`);
                if (!res.ok) throw new Error(`Public API error: ${res.statusText}`);

                const repos = await res.json();
                if (!Array.isArray(repos)) throw new Error("Invalid response format");

                let totalStars = 0;
                let totalForks = 0;
                const langMap = new Map<string, number>();

                repos.forEach((repo: any) => {
                    if (repo.fork) return;
                    totalStars += repo.stargazers_count || 0;
                    totalForks += repo.forks_count || 0;
                    if (repo.language) {
                        const size = repo.size || 0;
                        langMap.set(repo.language, (langMap.get(repo.language) || 0) + size);
                    }
                });

                const totalSize = Array.from(langMap.values()).reduce((a, b) => a + b, 0);
                const languages = Array.from(langMap.entries())
                    .map(([name, size]) => ({
                        name,
                        size,
                        color: "",
                        percent: totalSize > 0 ? parseFloat(((size / totalSize) * 100).toFixed(2)) : 0
                    }))
                    .sort((a, b) => b.size - a.size)
                    .slice(0, 5);

                return {
                    totalStars,
                    totalForks,
                    languages
                };
            } catch (e) {
                console.warn("Public fallback failed:", e);
                return { totalStars: 0, totalForks: 0, languages: [] };
            }
        }

        try {
            const response = await fetch(GITHUB_GRAPHQL_API, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: USER_STATS_QUERY,
                    variables: { login: username },
                }),
            });

            const json = await response.json();

            if (json.errors) {
                console.error("GraphQL Errors:", json.errors);
                throw new Error(json.errors[0].message);
            }

            const repos: RepoNode[] = json.data.user.repositories.nodes;

            // Aggregation Logic (from user snippet)
            let totalStars = 0;
            let totalForks = 0;
            const langMap = new Map<string, { size: number; color: string }>();

            repos.forEach((repo) => {
                totalStars += repo.stargazerCount;
                totalForks += repo.forkCount;

                repo.languages.edges.forEach((edge) => {
                    const { name, color } = edge.node;
                    const size = edge.size;

                    const current = langMap.get(name) || { size: 0, color };
                    langMap.set(name, { size: current.size + size, color });
                });
            });

            const totalSize = Array.from(langMap.values()).reduce((acc, val) => acc + val.size, 0);

            const languages = Array.from(langMap.entries())
                .map(([name, { size, color }]) => ({
                    name,
                    size,
                    color,
                    percent: totalSize > 0 ? parseFloat(((size / totalSize) * 100).toFixed(2)) : 0
                }))
                .sort((a, b) => b.size - a.size)
                .slice(0, 5); // Start with top 5

            return {
                totalStars,
                totalForks,
                languages
            };

        } catch (error) {
            console.error("Failed to fetch GitHub stats:", error);
            return {
                totalStars: 0,
                totalForks: 0,
                languages: []
            };
        }
    });
