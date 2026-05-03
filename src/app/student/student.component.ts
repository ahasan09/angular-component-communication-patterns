import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css'],
    standalone: false
})
export class StudentComponent implements OnInit {
  subscribeCounter = 0;
  @Input() parentData = '';
  @Output() childEvent = new EventEmitter<string>();
  private comService = inject(CommunicationService);

  ngOnInit() {
    this.comService.currentCounter.subscribe((response: number) => {
      this.subscribeCounter = response;
    });
  }

  increaseCount() {
    this.comService.increaseCountEvent.next(true);
    this.subscribeCounter++;
    this.comService.updateCounter(this.subscribeCounter);
  }

  onChange(value: string) {
    this.childEvent.emit(value);
  }
}
