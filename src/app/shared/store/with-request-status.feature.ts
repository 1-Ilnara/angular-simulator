import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { IRequestStatusState } from '../interfaces/IRequestStatusState';

const initialRequestStatusState: IRequestStatusState = {
  loading: false,
  error: null,
};

export function withRequestStatus() {
  return signalStoreFeature(
    withState<IRequestStatusState>(initialRequestStatusState),
    withMethods((store) => ({
      startRequest(): void {
        patchState(store, { loading: true, error: null });
      },

      finishRequest(): void {
        patchState(store, { loading: false });
      },

      failRequest(message: string): void {
        patchState(store, { loading: false, error: message });
      },
    })),
  );
}
