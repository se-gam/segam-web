'use client';

import { useState } from 'react';

import Tag from '@/components/common/tag/tag';
import { dateWeekFormatter } from '@/utils/format';
import Button from '@/components/common/button/button';
import { Friend, ReservationUser, Slot, Studyroom } from '@/lib/definitions';
import { reserveStudyroom } from '@/lib/actions/studyroom';
import CheckUser from '@/components/studyroom/reservation/checkUser';
import useModal from '@/hooks/useModal';
import useLink from '@/hooks/useLink';
import AddFriendModal from '@/components/studyroom/reservation/addFriendModal';

const RANDOM_REASON = ['졸업작품', '과제', '팀 프로젝트'];

interface ReservationFormProps {
  studyRoom: Studyroom;
  friendData: Friend[];
  date: string;
}

function getDurationList({ startsAt, slots }: { startsAt: number | null; slots: Slot[] }) {
  if (!startsAt) return [];
  const nextTime = startsAt + 1;
  const nextSlot = slots.find((s) => s.startsAt === nextTime);
  if (!nextSlot) return [{ label: '1시간', value: 1 }];
  return [
    { label: '1시간', value: 1 },
    { label: '2시간', value: 2 },
  ];
}
function getButtonStatus({ value, cValue }: { value: number | null; cValue: number }) {
  if (!value) return 'default';
  if (value === cValue) return 'selected';
  return 'disabled';
}

export default function ReservationForm({ studyRoom, friendData, date }: ReservationFormProps) {
  const { modal } = useModal();
  const { navigatePop } = useLink();
  const today = new Date(date);
  const [friends, setFriends] = useState(friendData);
  const [startsAt, setStartsAt] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [users, setUsers] = useState<ReservationUser[]>([]);
  const [reason, setReason] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const durationList = getDurationList({ startsAt, slots: studyRoom.slots });
  const addUser = ({ studentId, name }: { studentId: string; name: string }) => {
    setUsers((prev) => {
      if (prev.find((user) => user.studentId === studentId)) return prev;
      return [...prev, { studentId, name }];
    });
  };
  const addFriend = ({ studentId, name }: Friend) => {
    setFriends((prev) => {
      if (prev.find((f) => f.studentId === studentId)) return prev;
      return [...prev, { studentId, name }];
    });
    addUser({ studentId, name });
  };
  const handleReserveClick = async () => {
    if (!startsAt) {
      modal({
        title: '시작 시간을 선택해주세요',
        content: '시작 시간을 선택해주세요.',
      });
      return;
    }
    if (!duration) {
      modal({
        title: '이용 시간을 선택해주세요',
        content: '이용 시간을 선택해주세요.',
      });
      return;
    }
    if (users.length < studyRoom.minUsers - 1) {
      modal({
        title: '동반 이용자를 추가해주세요',
        content: '동반 이용자를 추가해주세요.',
      });
      return;
    }
    if (reason.length === 0) {
      modal({
        title: '예약 사유를 입력해주세요',
        content: '예약 사유를 입력해주세요.',
      });
      return;
    }
    try {
      await reserveStudyroom({
        studyroomId: studyRoom.id,
        date: today,
        startsAt: startsAt!,
        duration: duration!,
        reason,
        users: users.map((u) => u.studentId),
      });
      navigatePop();
    } catch (e) {
      modal({
        title: '예약 실패',
        content: '예약에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };
  return (
    <main className="flex h-full flex-col justify-between space-y-6 overflow-auto">
      <div className="flex h-full flex-col">
        <div className="px-4 pt-6">
          <header className="mb-6 space-y-2">
            <h1 className="f20 font-bold text-text_primary">{studyRoom.name}</h1>
            <div className="flex gap-1.5">
              <Tag label={dateWeekFormatter(today)} size="ms" variant="default" />
              <Tag label={studyRoom.location} size="ms" variant="default" />
              <Tag
                label={`${studyRoom.minUsers}~${studyRoom.maxUsers}명`}
                size="ms"
                variant="default"
              />
            </div>
          </header>
          <section className="space-y-6">
            <article>
              <h2 className="f20 font-bold text-text_primary">이용시간</h2>
              <p className="f14 mb-4 font-medium text-text_secondary">
                하루 최대 2시간까지 이용할 수 있어요
              </p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {studyRoom.slots.map((slot) => {
                    if (slot.isClosed) return null;
                    return (
                      <Button
                        key={slot.id}
                        label={`${slot.startsAt}시`}
                        size="ml"
                        variant={getButtonStatus({
                          value: startsAt,
                          cValue: slot.startsAt,
                        })}
                        onClick={() => {
                          setStartsAt(slot.startsAt);
                          setDuration(null);
                        }}
                      />
                    );
                  })}
                </div>
                {startsAt && (
                  <div className="flex flex-wrap gap-2">
                    {durationList.map((u) => (
                      <Button
                        key={u.label}
                        label={u.label}
                        size="ml"
                        variant={getButtonStatus({
                          value: duration,
                          cValue: u.value,
                        })}
                        onClick={() => setDuration(u.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
            <article className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="f20 font-bold text-text_primary">동반 이용자 추가</h2>
                  <p className="f14 font-medium text-text_secondary">
                    나를 제외하고 최소 1명의 인원이 필요해요
                  </p>
                </div>
                <Button
                  label="추가"
                  size="md"
                  variant="default"
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                />
              </div>
              <div className="max-h-[140px] overflow-y-auto overflow-x-hidden">
                {friends.map((friend) => (
                  <CheckUser
                    key={friend.studentId}
                    friendId={friend.studentId}
                    friendName={friend.name}
                    isAdded={users.some((u) => u.studentId === friend.studentId)}
                    date={today}
                    onSuccess={addUser}
                  />
                ))}
              </div>
              {users.length > 0 && (
                <div className="flex gap-2">
                  {users.map((u) => (
                    <Button
                      key={u.studentId}
                      label={u.name}
                      size="ml"
                      variant="default"
                      onClick={() => {
                        setUsers((prev) => prev.filter((user) => user.studentId !== u.studentId));
                      }}
                    />
                  ))}
                </div>
              )}
            </article>
            <article className="space-y-3">
              <h2 className="f20 font-bold text-text_primary">예약 사유</h2>
              <div className="space-y-2">
                <textarea
                  className="f14 e-theme_primary h-10 w-full rounded-sm bg-button_default_bg px-3 py-2.5 font-normal text-text_primary transition-colors duration-200 placeholder:text-text_secondary focus:outline-theme_primary"
                  placeholder="500자 이내로 입력해주세요."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex gap-1">
                  <Button
                    label="스터디"
                    size="ml"
                    variant="default"
                    onClick={() => {
                      setReason('스터디');
                    }}
                  />
                  <Button
                    label="회의"
                    size="ml"
                    variant="default"
                    onClick={() => {
                      setReason('회의');
                    }}
                  />
                  <Button
                    label="랜덤 생성하기"
                    size="ml"
                    variant="selected"
                    onClick={() => {
                      const random = Math.floor(Math.random() * RANDOM_REASON.length);
                      setReason(RANDOM_REASON[random]);
                    }}
                  />
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
      <div className="px-6 pb-4">
        <Button
          label="완료"
          size="full"
          variant="primary"
          className="shrink-0"
          onClick={handleReserveClick}
        />
      </div>
      {drawerOpen && (
        <AddFriendModal
          drawerOpen={drawerOpen}
          date={today}
          friends={friends}
          setDrawerOpen={setDrawerOpen}
          addFriend={addFriend}
        />
      )}
    </main>
  );
}
