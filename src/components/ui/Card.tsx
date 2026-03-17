import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {children}
    </div>
  );
}
