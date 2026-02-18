// src/app/page.tsx
import { prisma } from "@/lib/db";

export default async function Home() {
  const items = await prisma.feedItem.findMany({
    orderBy: { completedAt: "desc" },
  });

  // ----- 2026 GOALS LOGIC -----
  const year = 2026;
  const booksGoal = 20;
  const moviesGoal = 30;
  const milesGoal = 500;

  const items2026 = items.filter((item) => {
    const d = new Date(item.completedAt);
    return d.getFullYear() === year;
  });

  const booksRead2026 = items2026.filter(
    (item) => item.source === "goodreads"
  ).length;

  const moviesWatched2026 = items2026.filter(
    (item) => item.source === "letterboxd"
  ).length;

  const milesRun2026 = items2026
    .filter((item) => item.source === "strava")
    .reduce((sum, item) => {
      const miles = getRunMilesFromTitle(item.title);
      return sum + (miles ?? 0);
    }, 0);

  const booksPct = Math.min((booksRead2026 / booksGoal) * 100, 100);
  const moviesPct = Math.min((moviesWatched2026 / moviesGoal) * 100, 100);
  const milesPct = Math.min((milesRun2026 / milesGoal) * 100, 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "1rem 0",
        backgroundColor: "#0b1020",
        backgroundImage:
          "linear-gradient(0deg, rgba(0,255,204,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.15) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        fontFamily: '"Verdana", "Geneva", system-ui, -apple-system, sans-serif',
        color: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          border: "3px solid #00ffcc",
          backgroundColor: "#020617",
          boxShadow: "0 0 0 3px #111827, 0 0 16px rgba(0,0,0,0.85)",
        }}
      >
        {/* TOP "TITLE BAR" LIKE AN OLD APP WINDOW */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "2px solid #00ffcc",
            backgroundImage:
              "linear-gradient(90deg, #182c51, #162447 40%, #111827)",
            padding: "0.4rem 0.8rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: "3px",
              marginRight: "0.6rem",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#ff5f57",
                border: "1px solid #4b1110",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#febc2e",
                border: "1px solid #4b3a11",
              }}
            />
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#28c840",
                border: "1px solid #123816",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#e5e7eb",
              flex: 1,
            }}
          >
            T.J. FERRISS // MATH FEED 96
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#a5b4fc",
              fontFamily: '"Courier New", monospace',
            }}
          >
            ONLINE
          </div>
        </header>

        <main style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
          {/* BIG 90s HEADER PANEL */}
          <section
            style={{
              border: "2px solid #94a3b8",
              boxShadow:
                "inset 0 0 0 1px #020617, 4px 4px 0 #00ffcc, -4px -4px 0 #1e293b",
              marginBottom: "1.25rem",
              position: "relative",
              backgroundColor: "#020617",
            }}
          >
            {/* stripy top band */}
            <div
              style={{
                height: "18px",
                backgroundImage:
                  "repeating-linear-gradient(90deg,#00ffcc 0,#00ffcc 4px,#0b1020 4px,#0b1020 8px)",
                borderBottom: "1px solid #0f172a",
              }}
            />
            <div
              style={{
                display: "flex",
                padding: "0.85rem 0.9rem 1rem",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              {/* left: title & description */}
              <div style={{ flex: "1 1 260px" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#e5e7eb",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: "0.4rem",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
                  PERSONAL DATA STREAM
                </div>
                <h1
                  style={{
                    fontSize: "1.6rem",
                    margin: "0 0 0.25rem",
                    color: "#f9fafb",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Geometry of Things I Read &amp; Watch
                </h1>
                <p
                  style={{
                    margin: 0,
                    marginTop: "0.25rem",
                    fontSize: "0.85rem",
                    color: "#cbd5f5",
                    maxWidth: "30rem",
                  }}
                >
                  A running log of books from <b>Goodreads</b>, films from{" "}
                  <b>Letterboxd</b>, and runs from <b>Strava</b>, plotted like a
                  math textbook cover from 1996.
                </p>
              </div>

              {/* right: legend box */}
              <div
                style={{
                  flex: "0 0 220px",
                  border: "1px solid #64748b",
                  backgroundColor: "#020617",
                  padding: "0.6rem 0.7rem",
                  boxShadow: "2px 2px 0 #00ffcc, -2px -2px 0 #1f2937",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#e5e7eb",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    borderBottom: "1px solid #4b5563",
                    paddingBottom: "0.2rem",
                  }}
                >
                  Legend
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                  }}
                >
                  <LegendSwatch color="#00ffcc" label="Goodreads — Books" />
                  <LegendSwatch color="#ff6bd5" label="Letterboxd — Films" />
                  <LegendSwatch color="#ffd93b" label="Strava — Runs" />
                </div>
              </div>
            </div>
          </section>

          {/* 2026 GOALS PANEL */}
          <section
            style={{
              border: "2px solid #94a3b8",
              backgroundColor: "#020617",
              marginBottom: "1.25rem",
              boxShadow: "3px 3px 0 #00ffcc",
            }}
          >
            <div
              style={{
                backgroundColor: "#111827",
                borderBottom: "1px solid #475569",
                padding: "0.35rem 0.6rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#e5e7eb",
                  fontFamily: '"Courier New", monospace',
                }}
              >
                {year} goal tracker
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#a5b4fc",
                }}
              >
                Counts only entries where date = {year}
              </span>
            </div>
            <div
              style={{
                padding: "0.75rem 0.75rem 0.85rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                <GoalCard
                  label="Books read"
                  value={booksRead2026}
                  goal={booksGoal}
                  unit="books"
                  color="#00ffcc"
                  percent={booksPct}
                />
                <GoalCard
                  label="Films watched"
                  value={moviesWatched2026}
                  goal={moviesGoal}
                  unit="films"
                  color="#ff6bd5"
                  percent={moviesPct}
                />
                <GoalCard
                  label="Miles run"
                  value={milesRun2026}
                  goal={milesGoal}
                  unit="mi"
                  color="#ffd93b"
                  percent={milesPct}
                  valuePrecision={1}
                />
              </div>
            </div>
          </section>

          {/* FEED SECTION TITLE */}
          <div
            style={{
              marginBottom: "0.4rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                height: "1px",
                backgroundColor: "#64748b",
                flex: 1,
              }}
            />
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#e5e7eb",
                padding: "0 0.6rem",
                border: "1px solid #64748b",
                backgroundColor: "#020617",
              }}
            >
              Activity feed
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "#64748b",
                flex: 1,
              }}
            />
          </div>

          {/* FEED CARDS */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {items.length === 0 ? (
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#e5e7eb",
                  backgroundColor: "#020617",
                  border: "2px dashed #64748b",
                  padding: "0.75rem 0.85rem",
                }}
              >
                No items yet. Once you mark books as &ldquo;read&rdquo;, log films,
                or sync runs, this list will start to populate.
              </p>
            ) : (
              items.map((item) => {
                const dateLabel = new Date(item.completedAt).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "short", day: "numeric" }
                );

                const isBook = item.source === "goodreads";
                const isMovie = item.source === "letterboxd";
                const isRun = item.source === "strava";

                const chipLabel = isBook
                  ? "Book"
                  : isMovie
                  ? "Movie"
                  : isRun
                  ? "Run"
                  : item.source;

                const chipColor = isBook
                  ? "#00ffcc"
                  : isMovie
                  ? "#ff6bd5"
                  : isRun
                  ? "#ffd93b"
                  : "#f97316";

                return (
                  <article
                    key={item.id}
                    style={{
                      border: "2px solid #4b5563",
                      backgroundColor: "#020617",
                      position: "relative",
                      padding: "0.7rem 0.8rem",
                      boxShadow: "2px 2px 0 #00ffcc",
                    }}
                  >
                    {/* inner "graph paper" background */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: "2px",
                        border: "1px solid #1f2937",
                        backgroundImage:
                          "linear-gradient(0deg, rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        opacity: 0.5,
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.18em",
                              color: "#e5e7eb",
                              fontFamily: '"Courier New", monospace',
                            }}
                          >
                            {chipLabel}
                          </span>
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: chipColor,
                              boxShadow: `0 0 0 1px #020617, 0 0 6px ${chipColor}`,
                            }}
                          />
                        </div>

                        <h2
                          style={{
                            fontSize: "0.95rem",
                            margin: 0,
                            color: "#f9fafb",
                          }}
                        >
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                                borderBottom: "1px dotted #94a3b8",
                              }}
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </h2>

                        {item.subtitle && (
                          <p
                            style={{
                              margin: "0.15rem 0 0.1rem",
                              fontSize: "0.82rem",
                              color: "#e5e7eb",
                            }}
                          >
                            {item.subtitle}
                          </p>
                        )}

                        {item.description && (
                          <p
                            style={{
                              marginTop: "0.25rem",
                              marginBottom: 0,
                              fontSize: "0.8rem",
                              color: "#e5e7eb",
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          flex: "0 0 auto",
                          textAlign: "right",
                          fontSize: "0.72rem",
                          color: "#e5e7eb",
                          paddingLeft: "0.6rem",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid #64748b",
                            padding: "0.18rem 0.45rem",
                            backgroundColor: "#020617",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {dateLabel}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Courier New", monospace',
                            color: "#a5b4fc",
                          }}
                        >
                          {item.source === "goodreads"
                            ? "Goodreads"
                            : item.source === "letterboxd"
                            ? "Letterboxd"
                            : item.source === "strava"
                            ? "Strava"
                            : item.source}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

// Helper to parse "… · 5.3 mi" from Strava run titles
function getRunMilesFromTitle(title: string): number | null {
  const match = title.match(/([\d.]+)\s*mi\b/i);
  if (!match) return null;
  const miles = parseFloat(match[1]);
  return Number.isNaN(miles) ? null : miles;
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.8rem",
        color: "#e5e7eb",
      }}
    >
      <span
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "2px",
          border: "1px solid #020617",
          backgroundColor: "#020617",
          boxShadow: "0 0 0 1px #64748b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: "-30%",
            backgroundImage: `linear-gradient(135deg, ${color}, transparent 70%)`,
          }}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}

type GoalCardProps = {
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: string;
  percent: number;
  valuePrecision?: number;
};

function GoalCard({
  label,
  value,
  goal,
  unit,
  color,
  percent,
  valuePrecision = 0,
}: GoalCardProps) {
  const displayValue =
    valuePrecision > 0 ? value.toFixed(valuePrecision) : Math.round(value);

  const pctLabel = `${Math.round(percent)}%`;

  return (
    <div
      style={{
        border: "1px solid #64748b",
        backgroundColor: "#020617",
        padding: "0.55rem 0.6rem 0.65rem",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#e5e7eb",
          marginBottom: "0.25rem",
          fontFamily: '"Courier New", monospace',
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.5rem",
          alignItems: "baseline",
          marginBottom: "0.3rem",
        }}
      >
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#f9fafb",
          }}
        >
          {displayValue}{" "}
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#e5e7eb",
            }}
          >
            / {goal} {unit}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            color: "#e5e7eb",
          }}
        >
          {pctLabel}
        </div>
      </div>
      <div
        style={{
          height: "10px",
          border: "1px solid #64748b",
          backgroundColor: "#020617",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "1px",
            width: `${percent}%`,
            maxWidth: "100%",
            backgroundImage: `repeating-linear-gradient(90deg, ${color} 0, ${color} 6px, #020617 6px, #020617 10px)`,
          }}
        />
      </div>
    </div>
  );
}
