import Tag from '@/components/common/tag/tag';
import { Studyroom } from '@/lib/definitions';

interface StudyRoomSlotItemProps {
  data: Studyroom;
}

function StudyRoomSlotItem({ data }: StudyRoomSlotItemProps) {
  const { name, location, minUsers, maxUsers, operatingHours, slots } = data;
  const [startTime, endTime] = operatingHours.split('~').map((time) => parseInt(time, 10));
  const hoursRange = Array.from({ length: endTime - startTime + 1 }, (_, i) => startTime + i);

  return (
    <div className="mb-6 flex flex-col">
      <div className="mb-3 flex">
        <div className="mr-2 h-12 w-12 rounded-lg bg-slate-100">사진ㅋㅋ</div>
        <div className="flex flex-col justify-between">
          <h3 className="f16 font-bold leading-4 text-text_primary">{name}</h3>
          <div className="flex">
            <Tag label={location} variant="default" size="sm" className="mr-1" />
            <Tag label={`${minUsers}~${maxUsers}명`} variant="orange" size="sm" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full justify-between">
          {hoursRange.slice(0, -1).map((hour) => {
            const slot = slots.find((s) => s.startsAt === hour);
            const isClosed = slot ? slot.isClosed : true;
            const isReserved = slot ? slot.isReserved : true;
            const bgColor = isClosed || isReserved ? 'bg-text_primary' : 'bg-timeline_bg'; // TODO: refactor with cn @kmsu44
            return <div key={hour} className={`h-1 w-full ${bgColor}`} />;
          })}
        </div>
        <div className="mt-1 flex w-full justify-between">
          {hoursRange.map((hour, index) => (
            <span
              key={hour}
              className={`f12 font-medium text-text_secondary ${index % 2 === 0 ? 'visible' : 'invisible'}`}
            >
              {index % 2 === 0 ? hour : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StudyRoomSlotListProps {
  data: Studyroom[];
}

export default function StudyRoomSlotList({ data }: StudyRoomSlotListProps) {
  return (
    <div className="flex flex-col">
      {data.map((studyroom) => (
        <StudyRoomSlotItem key={studyroom.id} data={studyroom} />
      ))}
    </div>
  );
}
