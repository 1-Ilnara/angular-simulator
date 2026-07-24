import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  showLoader(): void {
    this.isLoadingSubject.next(true);
    document.documentElement.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
    document.documentElement.style.overflow = '';
  }
  
}
