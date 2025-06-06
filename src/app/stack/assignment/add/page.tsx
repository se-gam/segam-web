import { Option } from '@/lib/definitions';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import { getCourseOptions } from '@/lib/actions/assignment';
import AssignmentForm from '@/components/assignment/assignmentForm';

export default async function AddAssignmentPage() {
  const courses: Option[] = await getCourseOptions();

  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden bg-white">
      <StackHeader title="과제 추가하기" />
      <main className="flex h-full flex-col overflow-hidden bg-white px-4 py-2">
        <div className="flex-1 overflow-y-auto">
          <AssignmentForm courses={courses} />
        </div>
      </main>
    </div>
  );
}
