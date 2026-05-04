import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  date: string;
  setDate: (date: string) => void;
  resetTime: () => void;
}

function isValidDate(date: Date) {
  const day = date.getDay();
  return day !== 0; // no Sunday
}

function formatLocalDate(date: Date): string {
  // Returns YYYY-MM-DD in local time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DateTimePicker({ date, setDate, resetTime }: Props) {
  return (
    <DatePicker
      selected={date ? new Date(date) : null}
      onChange={(d: Date | null) => {
        setDate(d ? formatLocalDate(d) : "");
        resetTime();
      }}
      dateFormat="PPP"
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholderText="Select Appointment Date"
      filterDate={isValidDate}
      minDate={new Date()}
      required
    />
  );
}
