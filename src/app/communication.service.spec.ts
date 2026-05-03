import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
  let service: CommunicationService;

  beforeEach(() => {
    service = new CommunicationService();
  });

  it('starts the shared counter at 0', () => {
    const values: number[] = [];

    const subscription = service.currentCounter.subscribe(value => values.push(value));

    expect(values).toEqual([0]);
    subscription.unsubscribe();
  });

  it('emits counter updates to subscribers', () => {
    const values: number[] = [];

    const subscription = service.currentCounter.subscribe(value => values.push(value));
    service.updateCounter(3);
    service.updateCounter(7);

    expect(values).toEqual([0, 3, 7]);
    subscription.unsubscribe();
  });

  it('emits increase and decrease events', () => {
    const increases: boolean[] = [];
    const decreases: boolean[] = [];

    const increaseSubscription = service.increaseCountEvent.subscribe(value => increases.push(value));
    const decreaseSubscription = service.decreaseCountEvent.subscribe(value => decreases.push(value));

    service.increaseCountEvent.next(true);
    service.decreaseCountEvent.next(true);

    expect(increases).toEqual([true]);
    expect(decreases).toEqual([true]);

    increaseSubscription.unsubscribe();
    decreaseSubscription.unsubscribe();
  });
});
