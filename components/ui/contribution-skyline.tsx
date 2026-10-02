"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionSkylineProps {
  data?: ContributionDay[];
  title?: string;
  unit?: string;
  palette?: {
    light: string[];
    dark: string[];
  };
  defaultView?: "2d" | "3d";
  className?: string;
}

const DEFAULT_PALETTE = {
  light: ["#d4d4d4", "#a3a3a3", "#737373", "#000000"],
  dark: ["#d4d4d4", "#a3a3a3", "#737373", "#000000"],
};

// Generate realistic dummy contribution data for 52 weeks if none supplied
function generateSampleData(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  // Deterministic seed pseudo-random
  let seed = 12345;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i <= 364; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let count = 0;
    const p = rnd();
    if (!isWeekend) {
      if (p > 0.25) count = Math.floor(rnd() * 8) + 1;
      if (p > 0.8) count += Math.floor(rnd() * 12);
    } else {
      if (p > 0.6) count = Math.floor(rnd() * 5);
    }

    days.push({
      date: d.toISOString().split("T")[0],
      count,
    });
  }

  return days;
}

export default function ContributionSkyline({
  data: providedData,
  title = "A year of building, one commit at a time",
  unit = "contribution",
  palette = DEFAULT_PALETTE,
  defaultView = "3d",
  className = "",
}: ContributionSkylineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<"2d" | "3d">(defaultView);
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  // Orbit rotation angle for 3D skyline canvas
  const [rotation, setRotation] = useState({ rx: 0.55, ry: -0.65 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const daysData = useMemo(() => {
    return providedData && providedData.length > 0 ? providedData : generateSampleData();
  }, [providedData]);

  // Calculations for stats
  const stats = useMemo(() => {
    let total = 0;
    let maxCount = 0;
    let busiestDate = "";
    let currentStreak = 0;
    let tempStreak = 0;

    daysData.forEach((d) => {
      total += d.count;
      if (d.count > maxCount) {
        maxCount = d.count;
        busiestDate = d.date;
      }
      if (d.count > 0) {
        tempStreak++;
        currentStreak = Math.max(currentStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    return { total, maxCount: maxCount || 1, busiestDate, currentStreak };
  }, [daysData]);

  // Color helper: get hex color for count level (0..4)
  const getColor = useCallback(
    (count: number) => {
      if (count === 0) return "rgba(82, 42, 37, 0.08)";
      const colors = palette.light;
      const ratio = count / stats.maxCount;
      if (ratio <= 0.25) return colors[0];
      if (ratio <= 0.5) return colors[1];
      if (ratio <= 0.75) return colors[2];
      return colors[3];
    },
    [palette.light, stats.maxCount]
  );

  // Shade color helper for 3D sides
  const adjustColor = useCallback((colorHex: string, factor: number) => {
    if (colorHex.startsWith("rgba")) return "rgba(82, 42, 37, 0.15)";
    let hex = colorHex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const num = parseInt(hex, 16);
    let r = (num >> 16) + factor;
    let g = ((num >> 8) & 0x00ff) + factor;
    let b = (num & 0x0000ff) + factor;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }, []);

  // 3D Canvas Rendering
  const renderCanvas3D = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 360;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Grid dimensions: 52 weeks (cols) x 7 days (rows)
    const numCols = 52;
    const numRows = 7;

    const cellW = 12;
    const cellH = 12;
    const gap = 3;

    const centerX = width / 2;
    const centerY = height / 2 + 30;

    const cosX = Math.cos(rotation.rx);
    const sinX = Math.sin(rotation.rx);
    const cosY = Math.cos(rotation.ry);
    const sinY = Math.sin(rotation.ry);

    // Helper to project 3D point (x, y, z) to 2D canvas (px, py)
    const project = (x: number, y: number, z: number) => {
      // Rotate around Y
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      // Rotate around X
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return {
        px: centerX + x1,
        py: centerY + y2,
        zDepth: z2,
      };
    };

    const gridWidth = numCols * (cellW + gap);
    const gridHeight = numRows * (cellH + gap);

    // Draw towers sorted from back to front by zDepth
    const towers: {
      col: number;
      row: number;
      day: ContributionDay;
      zDepth: number;
      points: {
        b0: { px: number; py: number };
        b1: { px: number; py: number };
        b2: { px: number; py: number };
        b3: { px: number; py: number };
        t0: { px: number; py: number };
        t1: { px: number; py: number };
        t2: { px: number; py: number };
        t3: { px: number; py: number };
      };
    }[] = [];

    daysData.forEach((day, idx) => {
      const col = Math.floor(idx / 7);
      const row = idx % 7;
      if (col >= numCols) return;

      const posX = (col - numCols / 2) * (cellW + gap);
      const posZ = (row - numRows / 2) * (cellH + gap);

      const count = day.count;
      const maxHeight = 70;
      const barH = count > 0 ? 6 + (count / stats.maxCount) * maxHeight : 2;

      // 4 corners of base (y = 0)
      const b0 = project(posX, 0, posZ);
      const b1 = project(posX + cellW, 0, posZ);
      const b2 = project(posX + cellW, 0, posZ + cellH);
      const b3 = project(posX, 0, posZ + cellH);

      // 4 corners of top (y = -barH)
      const t0 = project(posX, -barH, posZ);
      const t1 = project(posX + cellW, -barH, posZ);
      const t2 = project(posX + cellW, -barH, posZ + cellH);
      const t3 = project(posX, -barH, posZ + cellH);

      const avgZ = (b0.zDepth + b1.zDepth + b2.zDepth + b3.zDepth) / 4;

      towers.push({
        col,
        row,
        day,
        zDepth: avgZ,
        points: { b0, b1, b2, b3, t0, t1, t2, t3 },
      });
    });

    // Sort towers back-to-front
    towers.sort((a, b) => b.zDepth - a.zDepth);

    // Render towers
    towers.forEach(({ day, points }) => {
      const { b0, b1, b2, b3, t0, t1, t2, t3 } = points;
      const baseColor = getColor(day.count);

      const topColor = baseColor;
      const sideColorLeft = adjustColor(baseColor, -35);
      const sideColorRight = adjustColor(baseColor, -20);

      // Top face (t0 -> t1 -> t2 -> t3)
      ctx.beginPath();
      ctx.moveTo(t0.px, t0.py);
      ctx.lineTo(t1.px, t1.py);
      ctx.lineTo(t2.px, t2.py);
      ctx.lineTo(t3.px, t3.py);
      ctx.closePath();
      ctx.fillStyle = topColor;
      ctx.fill();
      ctx.strokeStyle = "rgba(82, 42, 37, 0.2)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Front Left side (t0 -> t3 -> b3 -> b0)
      if (t0.py < b0.py) {
        ctx.beginPath();
        ctx.moveTo(t0.px, t0.py);
        ctx.lineTo(t3.px, t3.py);
        ctx.lineTo(b3.px, b3.py);
        ctx.lineTo(b0.px, b0.py);
        ctx.closePath();
        ctx.fillStyle = sideColorLeft;
        ctx.fill();
        ctx.strokeStyle = "rgba(82, 42, 37, 0.2)";
        ctx.stroke();
      }

      // Front Right side (t3 -> t2 -> b2 -> b3)
      if (t3.py < b3.py) {
        ctx.beginPath();
        ctx.moveTo(t3.px, t3.py);
        ctx.lineTo(t2.px, t2.py);
        ctx.lineTo(b2.px, b2.py);
        ctx.lineTo(b3.px, b3.py);
        ctx.closePath();
        ctx.fillStyle = sideColorRight;
        ctx.fill();
        ctx.strokeStyle = "rgba(82, 42, 37, 0.2)";
        ctx.stroke();
      }
    });
  }, [rotation, daysData, stats.maxCount, getColor, adjustColor]);

  useEffect(() => {
    if (view === "3d") {
      renderCanvas3D();
    }
  }, [view, renderCanvas3D]);

  // Drag interaction for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      rx: Math.max(0.2, Math.min(1.2, prev.rx + dy * 0.005)),
      ry: prev.ry + dx * 0.005,
    }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // 2D heatmap rendering grid helpers
  const weeks = useMemo(() => {
    const w: ContributionDay[][] = [];
    for (let i = 0; i < daysData.length; i += 7) {
      w.push(daysData.slice(i, i + 7));
    }
    return w;
  }, [daysData]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div
      ref={containerRef}
      style={{
        ["--color-background" as string]: "#ffffff",
        ["--color-foreground" as string]: "#404040",
        ["--color-border" as string]: "#404040",
      }}
      className={`relative w-full rounded-2xl border-2 border-[#404040] bg-[#ffffff] p-6 text-[#404040] shadow-[4px_4px_0px_0px_#404040] ${className}`}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#404040]/20 pb-4">
        <div>
          <h3 className="font-body text-lg md:text-xl font-bold uppercase tracking-wider text-[#404040]">
            {title}
          </h3>
          <p className="font-body text-xs text-[#404040]/70 uppercase tracking-widest mt-1">
            {stats.total} {unit}s in the last year
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 bg-[#404040]/10 p-1 rounded-xl border border-[#404040]/20">
          <button
            onClick={() => setView("3d")}
            className={`px-3 py-1.5 font-body text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              view === "3d"
                ? "bg-[#404040] text-[#ffffff] shadow-[2px_2px_0px_0px_#404040]"
                : "text-[#404040] hover:bg-[#404040]/10"
            }`}
          >
            3D Skyline
          </button>
          <button
            onClick={() => setView("2d")}
            className={`px-3 py-1.5 font-body text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              view === "2d"
                ? "bg-[#404040] text-[#ffffff] shadow-[2px_2px_0px_0px_#404040]"
                : "text-[#404040] hover:bg-[#404040]/10"
            }`}
          >
            2D Heatmap
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {view === "3d" ? (
        <div
          className="relative w-full h-[360px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center rounded-xl bg-[#404040]/5 border border-[#404040]/15"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas ref={canvasRef} className="block w-full h-full" />
          <div className="absolute bottom-3 left-3 pointer-events-none font-body text-[10px] uppercase tracking-widest text-[#404040]/60 bg-[#ffffff]/80 px-2 py-1 rounded border border-[#404040]/20">
            Drag to rotate 3D view
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto py-4">
          <div className="min-w-[720px] flex flex-col gap-2">
            {/* Month labels */}
            <div className="flex pl-8 text-[10px] font-bold uppercase tracking-widest text-[#404040]/60">
              {months.map((m, i) => (
                <div key={i} className="flex-1 text-center">
                  {m}
                </div>
              ))}
            </div>

            {/* 2D Grid */}
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col gap-1.5 pr-2 font-body text-[9px] font-bold text-[#404040]/60 uppercase">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex flex-1 gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) =>
                          setHoveredDay({ day, x: e.clientX, y: e.clientY })
                        }
                        onMouseLeave={() => setHoveredDay(null)}
                        style={{ backgroundColor: getColor(day.count) }}
                        className="w-3.5 h-3.5 rounded-xs border border-[#404040]/20 transition-transform hover:scale-125 hover:z-10 cursor-pointer"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs font-body text-[#404040]/70">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-xs bg-[#404040]/10 border border-[#404040]/20" />
                {palette.light.map((c, i) => (
                  <div key={i} style={{ backgroundColor: c }} className="w-3 h-3 rounded-xs border border-[#404040]/20" />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary Footer */}
      <div className="mt-6 pt-4 border-t border-[#404040]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-[#404040]/5 rounded-xl border border-[#404040]/15">
          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#404040]/60 block mb-1">
            Total Contributions
          </span>
          <span className="font-display text-2xl md:text-3xl text-[#000000]">
            {stats.total}
          </span>
        </div>
        <div className="p-3 bg-[#404040]/5 rounded-xl border border-[#404040]/15">
          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#404040]/60 block mb-1">
            Busiest Day
          </span>
          <span className="font-display text-2xl md:text-3xl text-[#000000]">
            {stats.maxCount} <span className="text-xs font-body text-[#404040]">{unit}s</span>
          </span>
        </div>
        <div className="p-3 bg-[#404040]/5 rounded-xl border border-[#404040]/15">
          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#404040]/60 block mb-1">
            Longest Streak
          </span>
          <span className="font-display text-2xl md:text-3xl text-[#000000]">
            {stats.currentStreak} <span className="text-xs font-body text-[#404040]">days</span>
          </span>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          style={{ top: hoveredDay.y - 45, left: hoveredDay.x - 60 }}
          className="fixed z-50 pointer-events-none bg-[#404040] text-[#ffffff] text-[11px] font-body px-2.5 py-1.5 rounded-lg shadow-lg border border-[#ffffff]/20"
        >
          <span className="font-bold">{hoveredDay.day.count} {unit}s</span> on {hoveredDay.day.date}
        </div>
      )}
    </div>
  );
}
