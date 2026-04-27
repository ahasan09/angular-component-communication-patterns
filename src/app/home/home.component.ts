import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  counter = 0;
  subscribeCounter = 0;
  parentData = '';
  childData = '';
  private subscriptions = new Subscription();

  constructor(private comService: CommunicationService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.comService.increaseCountEvent.subscribe((response: boolean) => {
        if (response) this.counter++;
      })
    );
    this.subscriptions.add(
      this.comService.decreaseCountEvent.subscribe((response: boolean) => {
        if (response) this.counter--;
      })
    );
    this.subscriptions.add(
      this.comService.currentCounter.subscribe((response: number) => {
        this.subscribeCounter = response;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  parentEvent() {
    this.parentData = 'Data pass from Parent ' + Math.floor(Math.random() * 10);
  }
}
