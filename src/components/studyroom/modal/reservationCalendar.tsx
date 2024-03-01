const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

interface ReservationCalendarProps {
  day: Date;
  setSelectedDay: (date: Date) => void;
}

export default function ReservationCalendar({ day, setSelectedDay }: ReservationCalendarProps) {
  const isSelected = (date: Date) => day.toDateString() === date.toDateString();

  const renderDays = () => {
    const today = new Date();
    return [...Array(7)].map((_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
      const isToday = date.toDateString() === today.toDateString();

      return (
        <button
          key={date.toISOString()}
          className={`flex h-11 w-9 flex-col items-center justify-center rounded-lg ${
            isSelected(date) ? 'bg-[#D6E6FD] text-[#3281F7]' : 'text-text_primary'
          }`}
          onClick={() => setSelectedDay(date)}
        >
          <span className="f18 font-semibold">{date.getDate()}</span>
          <span className="f12 font-semibold">{isToday ? '오늘' : daysOfWeek[date.getDay()]}</span>
        </button>
      );
    });
  };

  return <div className="mb-4 flex w-full justify-between space-x-1">{renderDays()}</div>;
}
