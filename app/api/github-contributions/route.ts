import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const username = "sahariya-divyansh";
  const token = process.env.GITHUB_TOKEN;

  // TODO: Add GITHUB_TOKEN to .env.local for authenticating directly with GitHub GraphQL API
  if (token) {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 86400 },
      });

      const json = await res.json();
      const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
      const days = weeks.flatMap((w: any) =>
        w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
        }))
      );

      if (days.length > 0) {
        return NextResponse.json({ days });
      }
    } catch (e) {
      console.error("Failed to fetch GitHub GraphQL API:", e);
    }
  }

  // Fallback to public contributions API endpoint
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data = await res.json();
      const days = (data.contributions || []).map((d: any) => ({
        date: d.date,
        count: d.count,
      }));
      return NextResponse.json({ days });
    }
  } catch (e) {
    console.error("Failed to fetch public contributions API:", e);
  }

  return NextResponse.json({ days: [] });
}
