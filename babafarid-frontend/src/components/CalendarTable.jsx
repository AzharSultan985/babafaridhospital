import React, { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";

export default function CalendarTable({ onRangeSelect }) {
  const [selectedRange, setSelectedRange] = useState([]);

  const generateMonthDays = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    let days = [];
    let current = new Date(start);

    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const days = generateMonthDays();

  const handleSelect = (day) => {
    if (selectedRange.length === 0) {
      setSelectedRange([day]);
      return;
    }

    if (selectedRange.length === 1) {
      const start = selectedRange[0];
      const end = day > start ? day : start;

      const range = eachDayOfInterval({ start, end });

      setSelectedRange(range);
      onRangeSelect({ startDate: range[0], endDate: range[range.length - 1] });
      return;
    }

    // Reset and select again
    setSelectedRange([day]);
  };

  const isSelected = (d) =>
    selectedRange.some((sel) => sel.toDateString() === d.toDateString());

  return (
    <div className="bg-white p-3 rounded-xl border shadow-md w-[320px]">
      <h3 className="text-lg font-semibold mb-2">
        {format(new Date(), "MMMM yyyy")}
      </h3>

      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-gray-600">
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>

        <tbody>
          {(() => {
            const rows = [];
            let row = [];

            days.forEach((d, i) => {
              if (i === 0 && d.getDay() !== 0) {
                for (let x = 0; x < d.getDay(); x++) {
                  row.push(null);
                }
              }

              row.push(d);

              if (row.length === 7) {
                rows.push(row);
                row = [];
              }
            });

            if (row.length > 0) rows.push(row);

            return rows.map((week, wi) => (
              <tr key={wi}>
                {week.map((d, di) => (
                  <td
                    key={di}
                    onClick={() => d && handleSelect(d)}
                    className={`p-2 cursor-pointer rounded-lg ${
                      d && isSelected(d)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {d ? d.getDate() : ""}
                  </td>
                ))}
              </tr>
            ));
          })()}
        </tbody>
      </table>
    </div>
  );
}
