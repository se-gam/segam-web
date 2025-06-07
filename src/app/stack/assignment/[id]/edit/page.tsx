import { getAssignmentById, getCourseOptions } from '@/lib/actions/assignment';
import AssignmentForm from '@/components/assignment/assignmentForm';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import { notFound } from 'next/navigation';

export default async function EditAssignmentPage({ params }: { params: { id: string } }) {
  const [courses, assignment] = await Promise.all([
    getCourseOptions(),
    getAssignmentById(params.id).catch(() => null),
  ]);

  if (!assignment) {
    notFound();
  }

  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden bg-white">
      <StackHeader title="과제 수정하기" />
      <main className="flex h-full flex-col overflow-hidden bg-white px-4 py-2">
        <div className="flex-1 overflow-y-auto">
          <AssignmentForm
            courses={courses}
            initialData={{
              assignmentId: params.id,
              courseId: assignment.courseId,
              name: assignment.name,
              startsAt: assignment.startsAt,
              endsAt: assignment.endsAt,
            }}
          />
        </div>
      </main>
    </div>
  );
}
