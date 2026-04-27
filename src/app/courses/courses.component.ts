import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from './courses.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-courses',
  template: `<h2>Courses Component Worked!!</h2>
  <h2>Subscribe Counter: {{subscribeCounter}}</h2>
  <h2>Value from Parent: {{parentData}}</h2>
  <div>{{title}}</div>
  <div>{{"Title: "+title}}</div>
  <div>{{ getTitle() }}</div>
  <h2>*ngFor Directive</h2>
  <ul>
      <li *ngFor="let course of courses">
          {{course}}
      </li>
  </ul>
  <h2>Data get from service</h2>
  <ul>
      <li *ngFor="let course of serviceCourses">
          {{course}}
      </li>
  </ul>
  <br/>
  <div>
      <button (click)="decreaseCount()" type="button" class="btn btn-primary">
          Decrease Counter
      </button>
  </div>`
})
export class CoursesComponent implements OnInit {
  @Input() parentData = '';
  subscribeCounter = 0;
  title = 'Courses title';
  courses = ['Course1', 'Course2', 'Course3'];
  serviceCourses: string[] = [];

  constructor(
    private service: CoursesService,
    private comService: CommunicationService
  ) {
    this.serviceCourses = this.service.getCourses();
  }

  ngOnInit() {
    this.comService.currentCounter.subscribe((response: number) => {
      this.subscribeCounter = response;
    });
  }

  getTitle() {
    return this.title;
  }

  decreaseCount() {
    this.subscribeCounter--;
    this.comService.updateCounter(this.subscribeCounter);
    this.comService.decreaseCountEvent.next(true);
  }
}
