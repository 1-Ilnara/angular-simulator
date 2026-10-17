import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  user = {
    name: 'Alex',
    age: 20,
  };

  // Кнопка 1: мутация объекта. Ребёнок (OnPush) НЕ обновится.
  changeName(): void {
    this.user.name = 'Eugene';
  }

  // Кнопка 2: исправление. Создаём новый объект, меняется ссылка, ребёнок обновится.
  changeNameFixed(): void {
    this.user = {
      ...this.user,
      name: 'Eugene',
    };
  }

  // Сброс (новый объект, поэтому ребёнок тоже обновится).
  reset(): void {
    this.user = {
      name: 'Alex',
      age: 20,
    };
  }

  // Почему интерфейс не обновился?
  // В changeName() мы мутируем существующий объект: this.user.name = 'Eugene'.
  // Ссылка на объект user остаётся прежней. ChildComponent использует OnPush,
  // а OnPush сравнивает входные данные по ссылке. Ссылка та же, поэтому Angular
  // считает, что ничего не изменилось, и пропускает проверку ChildComponent.
  // В родителе имя уже "Eugene" (родитель Default), а в ребёнке всё ещё "Alex".
  //
  // Исправление (способ 1): создать новый объект через spread: { ...this.user, name: 'Eugene' }.
  // Ссылка изменилась, OnPush видит новый input и обновляет компонент.
  // Другие способы: вызвать markForCheck() у ребёнка или хранить user в signal.
}
