import StackHeader from '@/components/common/stackHeader/stackHeader';
import FriendList from '@/components/studyroom/friends/friendList';
import { getFriends } from '@/lib/actions/user';

export default async function FriendsPage() {
  const friends = await getFriends();
  return (
    <>
      <StackHeader title="스터디룸 친구 목록" />
      <FriendList friends={friends} />
    </>
  );
}
