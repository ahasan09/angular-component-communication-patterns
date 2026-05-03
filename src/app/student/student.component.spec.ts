import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentComponent } from './student.component';
import { CommunicationService } from '../communication.service';

describe('StudentComponent', () => {
  let fixture: ComponentFixture<StudentComponent>;
  let component: StudentComponent;
  let communicationService: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentComponent],
      providers: [CommunicationService]
    });

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    communicationService = TestBed.inject(CommunicationService);
    fixture.detectChanges();
  });

  it('renders parent data passed from the parent component', () => {
    component.parentData = 'Parent message';
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Parent message');
  });

  it('emits child text changes to the parent', () => {
    const emittedValues: string[] = [];
    component.childEvent.subscribe(value => emittedValues.push(value));

    component.onChange('Child message');

    expect(emittedValues).toEqual(['Child message']);
  });

  it('increments the counter and updates the communication service', () => {
    const counterValues: number[] = [];
    const increaseEvents: boolean[] = [];
    communicationService.currentCounter.subscribe(value => counterValues.push(value));
    communicationService.increaseCountEvent.subscribe(value => increaseEvents.push(value));

    component.increaseCount();

    expect(component.subscribeCounter).toBe(1);
    expect(counterValues).toEqual([0, 1]);
    expect(increaseEvents).toEqual([true]);
  });
});
