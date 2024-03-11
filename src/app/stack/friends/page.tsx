import StackHeader from '@/components/common/stackHeader/stackHeader';
import FriendList from '@/components/studyroom/friends/friendList';
import { getFriends } from '@/lib/actions/user';

export default async function FriendsPage() {
  const friends = await getFriends();
  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden">
      <StackHeader title="스터디룸 친구 목록" />
      <div className="h-full overflow-auto">
        <FriendList friends={friends} />
      </div>
    </div>
  );
}
