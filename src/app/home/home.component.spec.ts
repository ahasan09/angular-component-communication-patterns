import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-student',
  template: '',
  standalone: false
})
class StudentStubComponent {
  @Input() parentData = '';
  @Output() childEvent = new EventEmitter<string>();
}

@Component({
  selector: 'app-courses',
  template: '',
  standalone: false
})
class CoursesStubComponent {
  @Input() parentData = '';
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let communicationService: CommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, StudentStubComponent, CoursesStubComponent],
      providers: [CommunicationService]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    communicationService = TestBed.inject(CommunicationService);
    fixture.detectChanges();
  });

  it('reacts to service increase and decrease events', () => {
    communicationService.increaseCountEvent.next(true);
    communicationService.increaseCountEvent.next(true);
    communicationService.decreaseCountEvent.next(true);

    expect(component.counter).toBe(1);
  });

  it('tracks shared counter updates from the service', () => {
    communicationService.updateCounter(9);

    expect(component.subscribeCounter).toBe(9);
  });

  it('updates child data from the student child output', () => {
    const student = fixture.debugElement.query(By.directive(StudentStubComponent)).componentInstance as StudentStubComponent;

    student.childEvent.emit('Message from child');
    fixture.detectChanges();

    expect(component.childData).toBe('Message from child');
    expect(fixture.nativeElement.textContent).toContain('Message from child');
  });
});
