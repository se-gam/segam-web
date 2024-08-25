import Button from '../common/button/button';
import InfoSelector from './infoSelector';

interface BookPickerProps {
  title?: string;
  subTitle?: string;
}

export default function BookInfoSelector({ title, subTitle }: BookPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <div className="f20 font-bold text-text_primary">{title}</div>
        <div className="f14 text-text_secondary">{subTitle}</div>
      </div>
      <div>
        <InfoSelector title="영역 선택" placeholder="영역을 선택해주세요" />
        <InfoSelector title="도서 선택" placeholder="도서를 선택해주세요" />
      </div>
      <div className="mx-2">
        <Button variant="primary" size="full" label="완료" />
      </div>
    </div>
  );
}
