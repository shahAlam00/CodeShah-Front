import React, { useState, useMemo } from 'react';
import { Flame, Trophy, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { Tooltip } from '../common/Tooltip';

export const ActivityHeatmap = ({ currentStreak = 0, longestStreak = 0, solvedDates = {} }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(null);

  // Build year data from real solvedDates
  const yearData = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(selectedYear, 0, 1);
    const end = new Date(selectedYear, 11, 31);
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let cur = new Date(start);
    while (cur <= end) {
      const dateStr = cur.toISOString().split('T')[0];
      const isFuture = cur > today;
      const count = solvedDates[dateStr] || 0;
      days.push({
        date: dateStr,
        formattedDate: `${monthNames[cur.getMonth()]} ${cur.getDate()}, ${selectedYear}`,
        count,
        isFuture,
        dayOfWeek: cur.getDay(),
        month: cur.getMonth(),
        problemsSolved: count,
        contestProblems: 0,
        assessments: 0,
      });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, [selectedYear, solvedDates]);

  const availableYears = useMemo(() => {
    const years = new Set(Object.keys(solvedDates).map(d => d.split('-')[0]));
    years.add(String(currentYear));
    return [...years].map(Number).sort();
  }, [solvedDates, currentYear]);

  // Group days into weeks (52-53 columns, 7 rows)
  const weeks = useMemo(() => {
    const matrix = [];
    let currentWeek = [];

    // Pad first week if year does not start on Sunday
    const firstDayOfWeek = yearData[0]?.dayOfWeek || 0;
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    yearData.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        matrix.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      matrix.push(currentWeek);
    }

    return matrix;
  }, [yearData]);

  // Calculate total problems solved in this year
  const totalSolvedThisYear = useMemo(() => {
    return yearData.reduce((acc, d) => acc + (d.count || 0), 0);
  }, [yearData]);

  // Color intensity mapping
  const getColorClass = (day) => {
    if (!day) return 'bg-transparent';
    if (day.isFuture) return 'bg-slate-100 border border-slate-200/50';
    if (day.count === 0) return 'bg-slate-100/90 border border-slate-200/60 hover:border-slate-400';
    if (day.count <= 1) return 'bg-[#9be9a8] hover:bg-[#82d68f]';
    if (day.count <= 3) return 'bg-[#40c463] hover:bg-[#34b355]';
    if (day.count <= 6) return 'bg-[#30a14e] hover:bg-[#278d42]';
    return 'bg-[#216e39] hover:bg-[#19592c]';
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft-sm">
      {/* Header with year selection & streak badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Activity Heatmap</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {totalSolvedThisYear} problems in {selectedYear}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Consistent problem solving activity across data structures and algorithms
          </p>
        </div>

        {/* Year Selector & Streaks */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => { setSelectedYear(yr); setSelectedDay(null); }}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedYear === yr
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{currentStreak}d Streak</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          {/* Months header */}
          <div className="flex text-[11px] font-semibold text-slate-600 mb-1.5 pl-7">
            {months.map((m, idx) => (
              <div key={idx} className="flex-1 text-left">
                {m}
              </div>
            ))}
          </div>

          {/* Grid with Day of Week labels on left */}
          <div className="flex gap-2">
            {/* Weekday indicators */}
            <div className="flex flex-col justify-between text-[9px] font-semibold text-slate-600 py-1 pr-1 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-1 flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 flex-1">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return <div key={dIdx} className="w-full aspect-square rounded-[3px] bg-transparent" />;
                    }

                    const tooltipText = day.isFuture
                      ? `${day.formattedDate} — Future`
                      : `${day.formattedDate} — ${day.count} ${day.count === 1 ? 'problem' : 'problems'} solved`;

                    return (
                      <Tooltip key={dIdx} content={tooltipText}>
                        <div
                          onClick={() => !day.isFuture && setSelectedDay(day)}
                          className={`w-full aspect-square rounded-[3px] transition-all cursor-pointer ${getColorClass(day)} ${
                            selectedDay?.date === day.date ? 'ring-2 ring-brand-500 scale-125 z-10' : ''
                          }`}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Longest streak: <strong className="text-slate-900">{longestStreak} days</strong>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Active days: <strong className="text-slate-900">{yearData.filter(d => d.count > 0).length}</strong>
          </span>
        </div>

        {/* Intensity Legend */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Less</span>
          <div className="w-3 h-3 rounded-[2px] bg-slate-100 border border-slate-200" />
          <div className="w-3 h-3 rounded-[2px] bg-[#9be9a8]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#40c463]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#30a14e]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#216e39]" />
          <span>More</span>
        </div>
      </div>

      {/* Selected Day Details Panel */}
      {selectedDay && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Activity Breakdown</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">{selectedDay.formattedDate}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-slate-700">
              💡 {selectedDay.problemsSolved} Problems Solved
            </span>
            <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-slate-700">
              ⚔️ {selectedDay.contestProblems} Contest Tasks
            </span>
            <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-slate-700">
              📝 {selectedDay.assessments} Assessment
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
