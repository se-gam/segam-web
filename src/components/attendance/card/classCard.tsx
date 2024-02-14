import { ReactNode } from 'react';

interface ClassCardProps {
  title: string;
  description: string;
  tag: ReactNode;
}
export default function ClassCard({ title, description, tag }: ClassCardProps) {
  return (
    <div className="w-full space-y-0.5 overflow-hidden px-1.5 py-2">
      {tag}
      <div>
        <h3 className="f16 w-full truncate font-bold text-text_primary ">{title}</h3>
        <p className="f12 truncate font-medium text-text_secondary">{description}</p>
      </div>
    </div>
  );
}
