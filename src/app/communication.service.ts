import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  public increaseCountEvent = new Subject<boolean>();
  public decreaseCountEvent = new Subject<boolean>();

  private counterSource = new BehaviorSubject<number>(0);
  public currentCounter = this.counterSource.asObservable();

  updateCounter(count: number) {
    this.counterSource.next(count);
  }
}
