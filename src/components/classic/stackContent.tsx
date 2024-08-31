'use client';

import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { reserveClassic } from '@/lib/actions/client';
import getQueryClient from '@/lib/getQueryClient';
import GtCalender from '@/components/classic/gtCalender';
import InfoSelector from '@/components/classic/infoSelector';
import TimeSlotSelector from '@/components/classic/timeSlotSelector';
import Button from '@/components/common/button/button';
import useModal from '@/hooks/useModal';
import { BookInfo, Category, GodokCalendar, Option } from '@/lib/definitions';
import { isApp } from '@/utils/stackRouter';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface StackContentProps {
  calendarSlot: GodokCalendar;
  bookData: BookInfo[];
}

export default function StackContent({ calendarSlot, bookData }: StackContentProps) {
  const availableDate: any = Object.keys(calendarSlot);
  const router = useRouter();
  const session = useSession();
  const queryClient = getQueryClient();
  const { modal } = useModal();
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs(availableDate[0]));
  const [slot, setSlot] = useState<string>('');
  const [category, setCategory] = useState<Option>({ value: 0, label: '' });
  const [book, setBook] = useState<Option>({ value: 0, label: '' });
  const reserveMutation = useMutation({
    mutationFn: () =>
      reserveClassic({
        session,
        godokSlotId: slot,
        bookAreaCode: category.value,
        bookCode: book.value,
      }),
    onSuccess: () => {
      if (isApp()) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'UPDATE',
          }),
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: ['classicStatus'],
        });
        router.back();
      }
    },
    onError: (error) => {
      modal({
        title: '예약 실패',
        content: error.message,
      });
    },
  });
  const formatData = () => {
    const groupedData: { [key: number]: Category } = {};

    bookData.forEach((item) => {
      const { categoryId, categoryName, bookId, bookName } = item;
      if (!groupedData[categoryId]) {
        groupedData[categoryId] = {
          categoryId,
          categoryName,
          books: [],
        };
      }
      groupedData[categoryId].books.push({
        value: bookId,
        label: bookName,
      });
    });
    return Object.values(groupedData);
  };
  const formattedBookData = formatData();
  const areaInfo = formattedBookData.map((item) => ({
    value: item.categoryId,
    label: item.categoryName,
  }));
  const bookInfo =
    formattedBookData.find((item) => item.categoryId === category.value)?.books || [];

  return (
    <div className="mx-4 flex flex-col gap-6">
      <GtCalender
        value={date!}
        onChange={(value) => {
          setDate(value);
        }}
        disabledData={(value) => !availableDate.includes(value.format('YYYY-MM-DD'))}
      />
      {!(availableDate?.length === 0) && (
        <>
          <TimeSlotSelector
            value={slot}
            onChange={(id) => setSlot(id)}
            availableTimeSlots={calendarSlot[date.format('YYYY-MM-DD')]}
          />
          <div className="flex flex-col gap-3">
            <div className="f20 font-bold text-text_primary">도서 선택하기</div>
            <div>
              <InfoSelector
                type="area"
                data={areaInfo}
                value={category}
                onChange={(data: Option) => setCategory(data)}
                title="영역 선택"
                placeholder="영역을 선택해주세요"
              />
              <InfoSelector
                type="book"
                data={bookInfo}
                value={book}
                onChange={(data: Option) => {
                  setBook(data);
                }}
                title="도서 선택"
                placeholder="도서를 선택해주세요"
              />
            </div>
          </div>
          <Button
            variant="primary"
            size="full"
            label="완료"
            onClick={() => reserveMutation.mutate()}
          />
        </>
      )}
    </div>
  );
}
