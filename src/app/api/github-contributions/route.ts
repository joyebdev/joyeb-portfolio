type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  count: number;
  date: string;
  level: ContributionLevel;
};

type ContributionPayload = {
  contributions: ContributionDay[];
  totalContributions: number;
};

type DenoContribution = {
  contributionCount?: number;
  contributionLevel?: string;
  count?: number;
  date?: string;
  level?: number;
};

const PRIMARY_URL = 'https://github-contributions-api.deno.dev/joyeb-kothiya29';
const FALLBACK_URL =
  'https://github.com/users/joyeb-kothiya29/contributions';

type NextFetchRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

const REVALIDATE_OPTIONS: NextFetchRequestInit = {
  next: { revalidate: 300 },
};

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseLevel(value: unknown, count: number): ContributionLevel {
  if (typeof value === 'number' && value >= 0 && value <= 4) {
    return value as ContributionLevel;
  }

  if (typeof value === 'string') {
    const normalized = value.toUpperCase();
    if (normalized === 'NONE') return 0;
    if (normalized === 'FIRST_QUARTILE') return 1;
    if (normalized === 'SECOND_QUARTILE') return 2;
    if (normalized === 'THIRD_QUARTILE') return 3;
    if (normalized === 'FOURTH_QUARTILE') return 4;
  }

  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function sortByDate(a: ContributionDay, b: ContributionDay): number {
  return a.date.localeCompare(b.date);
}

function normalizeDenoPayload(payload: unknown): ContributionPayload | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const source = payload as {
    contributions?: unknown;
    totalContributions?: unknown;
  };

  if (!Array.isArray(source.contributions)) {
    return null;
  }

  const flattened = source.contributions.flatMap((entry) =>
    Array.isArray(entry) ? entry : [entry],
  );

  const contributions: ContributionDay[] = flattened
    .map((entry) => {
      const day = entry as DenoContribution;
      const date = typeof day.date === 'string' ? day.date : '';
      const count = Number(day.contributionCount ?? day.count ?? 0);

      if (!isValidDateString(date) || Number.isNaN(count)) {
        return null;
      }

      return {
        count,
        date,
        level: parseLevel(day.contributionLevel ?? day.level, count),
      } satisfies ContributionDay;
    })
    .filter((day): day is ContributionDay => day !== null)
    .sort(sortByDate);

  if (!contributions.length) {
    return null;
  }

  const totalFromPayload = Number(source.totalContributions);
  const totalContributions = Number.isFinite(totalFromPayload)
    ? totalFromPayload
    : contributions.reduce((sum, day) => sum + day.count, 0);

  return {
    contributions,
    totalContributions,
  };
}

function parseTooltipCount(text: string): number {
  const clean = text.replace(/<[^>]*>/g, '').trim();

  if (/^No contributions/i.test(clean)) {
    return 0;
  }

  const match = clean.match(/([\d,]+)\s+contributions?/i);
  if (!match) {
    return 0;
  }

  return Number(match[1].replace(/,/g, '')) || 0;
}

function parseFallbackHtml(html: string): ContributionPayload | null {
  const tooltipMap = new Map<string, number>();
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(tooltipRegex)) {
    const cellId = match[1];
    const tooltipText = match[2];
    tooltipMap.set(cellId, parseTooltipCount(tooltipText));
  }

  const dayRegex = /<td[^>]*class="ContributionCalendar-day"[^>]*>/g;
  const contributions: ContributionDay[] = [];

  for (const match of html.matchAll(dayRegex)) {
    const tag = match[0];
    const idMatch = tag.match(/id="([^"]+)"/);
    const dateMatch = tag.match(/data-date="([^"]+)"/);
    const levelMatch = tag.match(/data-level="([0-4])"/);

    if (!idMatch || !dateMatch || !levelMatch) {
      continue;
    }

    const date = dateMatch[1];
    if (!isValidDateString(date)) {
      continue;
    }

    const level = Number(levelMatch[1]) as ContributionLevel;
    const count = tooltipMap.get(idMatch[1]) ?? 0;

    contributions.push({ count, date, level });
  }

  if (!contributions.length) {
    return null;
  }

  contributions.sort(sortByDate);

  const totalMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s*contributions?/i,
  );
  const totalFromHeading = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ''))
    : NaN;
  const totalContributions = Number.isFinite(totalFromHeading)
    ? totalFromHeading
    : contributions.reduce((sum, day) => sum + day.count, 0);

  return {
    contributions,
    totalContributions,
  };
}

async function getPrimaryPayload(): Promise<ContributionPayload | null> {
  const primaryResponse = await fetch(PRIMARY_URL, REVALIDATE_OPTIONS);

  if (primaryResponse.ok) {
    const primaryText = await primaryResponse.text();

    try {
      const parsed = JSON.parse(primaryText) as unknown;
      const normalized = normalizeDenoPayload(parsed);
      if (normalized) {
        return normalized;
      }
    } catch {
    }
  }

  const jsonResponse = await fetch(`${PRIMARY_URL}.json`, REVALIDATE_OPTIONS);

  if (!jsonResponse.ok) {
    return null;
  }

  const payload = (await jsonResponse.json()) as unknown;
  return normalizeDenoPayload(payload);
}

async function getFallbackPayload(): Promise<ContributionPayload | null> {
  const response = await fetch(FALLBACK_URL, REVALIDATE_OPTIONS);

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  return parseFallbackHtml(html);
}

export async function GET() {
  try {
    const primaryPayload = await getPrimaryPayload();
    if (primaryPayload) {
      return Response.json(primaryPayload);
    }

    const fallbackPayload = await getFallbackPayload();
    if (fallbackPayload) {
      return Response.json(fallbackPayload);
    }

    return Response.json(
      { error: 'Unable to fetch contribution data.' },
      { status: 502 },
    );
  } catch {
    return Response.json(
      { error: 'Unable to fetch contribution data.' },
      { status: 500 },
    );
  }
}
