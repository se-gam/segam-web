import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';

interface StudyRoomCardProps {
  title: string;
  description: string;
  iconName: string;
}
export default function StudyRoomCard({
  title,
  iconName,
  description,
}: StudyRoomCardProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md p-3">
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-icons_bg p-0.5">
          <Icons.ImageIcon name={iconName} width={36} height={36} />
        </div>
        <div>
          <h3 className="f16 font-bold text-text_primary">{title}</h3>
          <p className="f12 font-medium text-text_secondary">{description}</p>
        </div>
      </div>
      <Button size="lg" variant="default" label="취소" />
    </div>
  );
}
