import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  date: string;
  setDate: (date: string) => void;
}

export default function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  return (
    <DatePicker
      selected={date ? new Date(date) : null}
      onChange={(d: Date | null) => setDate(d ? d.toISOString() : "")}
      showTimeSelect
      dateFormat="Pp" // Shows both Date and Time in the input field
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholderText="Select Appointment Date & Time"
      required
    />
  );
}
