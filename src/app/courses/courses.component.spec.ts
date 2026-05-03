import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { CommunicationService } from '../communication.service';

describe('CoursesComponent', () => {
  let fixture: ComponentFixture<CoursesComponent>;
  let component: CoursesComponent;
  let communicationService: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [CommonModule],
      providers: [CoursesService, CommunicationService]
    });

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    communicationService = TestBed.inject(CommunicationService);
    fixture.detectChanges();
  });

  it('loads courses from CoursesService', () => {
    expect(component.serviceCourses).toEqual(['Course1', 'Course2', 'Course3']);
  });

  it('renders parent data and service courses', () => {
    component.parentData = 'Parent course value';
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Parent course value');
    expect(text).toContain('Course1');
    expect(text).toContain('Course2');
    expect(text).toContain('Course3');
  });

  it('decreases the counter and notifies the communication service', () => {
    const counterValues: number[] = [];
    const decreaseEvents: boolean[] = [];
    communicationService.currentCounter.subscribe(value => counterValues.push(value));
    communicationService.decreaseCountEvent.subscribe(value => decreaseEvents.push(value));

    component.subscribeCounter = 5;
    component.decreaseCount();

    expect(component.subscribeCounter).toBe(4);
    expect(counterValues).toEqual([0, 4]);
    expect(decreaseEvents).toEqual([true]);
  });
});
