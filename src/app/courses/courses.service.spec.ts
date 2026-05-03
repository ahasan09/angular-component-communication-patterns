import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  it('returns the available course names', () => {
    const service = new CoursesService();

    expect(service.getCourses()).toEqual(['Course1', 'Course2', 'Course3']);
  });
});
