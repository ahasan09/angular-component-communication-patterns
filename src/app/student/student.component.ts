import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  subscribeCounter = 0;
  @Input() parentData = '';
  @Output() childEvent = new EventEmitter<string>();

  constructor(private comService: CommunicationService) {}

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
