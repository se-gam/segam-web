export default function MenuRoulette() {
  // 선택된 요소를 저장할 상태

  return (
    <div
      className={`text-pri f28 mb-14 mt-16 flex h-20 w-72 items-center justify-center rounded-2xl bg-app_bg font-bold text-text_primary ${isSpinning ? 'animate-spin' : ''}`}
    >
      gd
      {/* {selectedItem || '세종 감자탕'} */}
    </div>
  );
}
