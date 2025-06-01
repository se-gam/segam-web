import { Option } from '@/lib/definitions';
import { getCourseAttendance } from '@/lib/actions/attendance';

export default async function getCourseOptions(): Promise<Option[]> {
  const data = await getCourseAttendance();
  return data.courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));
}
