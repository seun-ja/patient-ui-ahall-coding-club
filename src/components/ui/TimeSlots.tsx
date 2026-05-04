interface Props {
  slots: string[];
  selected: string | null;
  onSelect: (slot: string) => void;
}

export default function TimeSlots({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {slots.length === 0 && (
        <p className="text-sm text-gray-400 col-span-3">No available slots</p>
      )}

      {slots.map((slot) => {
        const active = selected === slot;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={`px-3 py-2 rounded-lg text-sm border transition
              ${
                active
                  ? "bg-emerald-600 text-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-600"
              }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
