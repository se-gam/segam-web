import FriendList from '@/components/studyroom/friends/friendList';
import { getFriends } from '@/lib/actions/user';

export default async function FriendsPage() {
  const friends = await getFriends();
  return <FriendList friends={friends} />;
}
