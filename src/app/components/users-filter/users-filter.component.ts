import { Component, Output, EventEmitter, OnInit, DestroyRef, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {

  private destroyRef: DestroyRef = inject(DestroyRef);

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl<string | null> = new FormControl<string>('');

  ngOnInit(): void {
  this.searchControl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    tap((value: string | null) => this.filterChange.emit(value || '')),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe();
}

}