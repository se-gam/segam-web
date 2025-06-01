'use client';

export default function DateSection() {
  return (
    <div className="flex flex-col">
      <div className="f20 font-bold text-text_primary">과제 기간</div>
      <p className="f14 font-medium text-text_secondary">시작일부터 마감일을 선택해 주세요</p>

      <div className="mt-4">
        <p className="f16 font-semibold text-text_primary">시작일</p>
        <div className="f14 rounded-md bg-[#f6f6f6] p-3 font-medium text-theme_accent">
          2025년 5월 20일(화) 00시 00분
        </div>
      </div>

      <div className="mt-3">
        <p className="f16 font-semibold text-text_primary">마감일</p>
        <div className="f14 rounded-md bg-[#f6f6f6] p-3 font-medium text-theme_accent">
          2025년 5월 26일(월) 23시 59분
        </div>
      </div>

      <div className="mt-3">
        <span className="f14 inline-block rounded-md bg-[#f6f6f6] px-3 py-2 font-semibold text-theme_secondary">
          오늘부터 다음주 N요일까지
        </span>
      </div>
    </div>
  );
}
