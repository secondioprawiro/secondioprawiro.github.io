import React, { useState, useEffect, useRef } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface Tooltip {
  text: string;
  x: number;
  y: number;
}

const LEVEL_COLORS: Record<number, string> = {
  0: '#161b22',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const DAY_LABEL_WIDTH = 30;

function groupIntoWeeks(contributions: ContributionDay[]): (ContributionDay | null)[][] {
  if (!contributions.length) return [];
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];

  const firstDate = new Date(contributions[0].date + 'T12:00:00');
  for (let i = 0; i < firstDate.getDay(); i++) week.push(null);

  for (const day of contributions) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

interface GitHubCalendarProps {
  username: string;
}

const GitHubCalendar: React.FC<GitHubCalendarProps> = ({ username }) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setApiData(null);

    const yParam = selectedYear === currentYear ? 'last' : String(selectedYear);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${yParam}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<ApiResponse>;
      })
      .then(json => {
        setApiData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [selectedYear, username, currentYear]);

  const handleCellMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const wrapRect = wrapperRef.current?.getBoundingClientRect();
    if (!wrapRect) return;

    const x = rect.left - wrapRect.left + CELL / 2;
    const y = rect.top - wrapRect.top - 8;

    const label = day.count === 0
      ? `No contributions on ${formatDate(day.date)}`
      : `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`;

    setTooltip({ text: label, x, y });
  };

  const handleCellMouseLeave = () => setTooltip(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-4 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <div className="absolute inset-0 border-4 border-t-[#3dffa2] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !apiData) {
    return (
      <div className="text-center py-10 text-sm" style={{ color: 'rgba(221,228,240,0.3)' }}>
        Could not load contribution data.
      </div>
    );
  }

  const weeks = groupIntoWeeks(apiData.contributions);
  const total =
    selectedYear === currentYear
      ? (apiData.total.lastYear ?? 0)
      : (apiData.total[String(selectedYear)] ?? 0);

  // Build month label map: weekIndex → label
  const monthMap: Record<number, string> = {};
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week.find(d => d !== null);
    if (firstDay) {
      const m = new Date(firstDay.date + 'T12:00:00').getMonth();
      if (m !== lastMonth) {
        monthMap[wi] = MONTHS[m];
        lastMonth = m;
      }
    }
  });

  const gridWidth = weeks.length * STEP - GAP;

  return (
    <div className="w-full" ref={wrapperRef} style={{ position: 'relative' }}>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap"
          style={{
            background: 'rgba(13,17,23,0.95)',
            border: '1px solid #30363d',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <span className="font-semibold text-sm" style={{ color: '#dde4f0' }}>
          {total.toLocaleString()} contributions in{' '}
          {selectedYear === currentYear ? 'the last year' : String(selectedYear)}
        </span>
      </div>

      {/* Calendar + Year Selector */}
      <div className="flex gap-5 items-start">
        {/* Scrollable calendar */}
        <div className="flex-1 overflow-x-auto min-w-0">
          <div style={{ minWidth: DAY_LABEL_WIDTH + gridWidth }}>
            {/* Month labels row */}
            <div className="flex" style={{ marginLeft: DAY_LABEL_WIDTH }}>
              {weeks.map((_, wi) => (
                <div
                  key={wi}
                  className="text-[10px] font-medium select-none" style={{ color: 'rgba(221,228,240,0.3)' }}
                  style={{ width: STEP, flexShrink: 0 }}
                >
                  {monthMap[wi] ?? ''}
                </div>
              ))}
            </div>

            {/* Day labels + grid */}
            <div className="flex items-start mt-1">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px]" style={{ width: DAY_LABEL_WIDTH, flexShrink: 0 }}>
                {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                  <div
                    key={i}
                    className="text-[10px] font-medium text-right pr-2 select-none" style={{ color: 'rgba(221,228,240,0.3)' }}
                    style={{ height: CELL, lineHeight: `${CELL}px` }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          backgroundColor: day ? LEVEL_COLORS[day.level] : 'transparent',
                          border: day ? '1px solid rgba(27,31,35,0.06)' : 'none',
                          cursor: day ? 'pointer' : 'default',
                          flexShrink: 0,
                        }}
                        onMouseEnter={day ? (e) => handleCellMouseEnter(e, day) : undefined}
                        onMouseLeave={day ? handleCellMouseLeave : undefined}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 mt-2 justify-end">
              <span className="text-[10px] mr-1" style={{ color: 'rgba(221,228,240,0.3)' }}>Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 2,
                    backgroundColor: LEVEL_COLORS[level],
                    border: '1px solid rgba(27,31,35,0.06)',
                    flexShrink: 0,
                  }}
                />
              ))}
              <span className="text-[10px] ml-1" style={{ color: 'rgba(221,228,240,0.3)' }}>More</span>
            </div>
          </div>
        </div>

        {/* Year selector */}
        <div className="flex flex-col gap-1.5" style={{ flexShrink: 0 }}>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className="px-3 py-1 rounded text-sm font-medium text-center transition-all"
              style={{
                minWidth: 56,
                background: selectedYear === year
                  ? 'linear-gradient(180deg, #3dffa2 0%, #1de882 100%)'
                  : 'transparent',
                color: selectedYear === year ? '#07090f' : 'rgba(61,255,162,0.7)',
                border: selectedYear === year ? 'none' : '1px solid rgba(61,255,162,0.2)',
                boxShadow: selectedYear === year ? 'inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                if (selectedYear !== year) {
                  (e.target as HTMLElement).style.background = 'rgba(61,255,162,0.1)';
                  (e.target as HTMLElement).style.color = '#3dffa2';
                }
              }}
              onMouseLeave={e => {
                if (selectedYear !== year) {
                  (e.target as HTMLElement).style.background = 'transparent';
                  (e.target as HTMLElement).style.color = 'rgba(61,255,162,0.7)';
                }
              }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubCalendar;
