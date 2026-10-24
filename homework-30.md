Домашнее задание №30 — архитектурный рефакторинг

Что я выбрала

Архитектура приложения: Feature-Based + Core/Shared. Внутри каждой фичи простое разделение на слои (страницы, компоненты, работа с данными, интерфейсы).

UI и логика: Smart/Dumb компоненты и CBD. Страница «умная», компоненты внутри неё «глупые». Сервисы в папке data-access работают как Facade над API.

Состояние: Singleton-сервисы (providedIn: 'root'). Signals используются в новом коде (products), RxJS остался в уже написанном (users, posts, auth).

Методология: OOD. У каждого класса одна задача, зависимости получаю через inject, для данных использую интерфейсы.

Файлы разложены по папкам, больше нет общих папок components, services, interfaces, в которых лежит код всех фич сразу.

Что было не так в текущем коде

1. Все компоненты, сервисы и интерфейсы лежали в общих папках components, services, interfaces. Чтобы найти всё про пользователей, приходилось открывать 5 разных папок.
2. В папке interceptors лежали и interceptor'ы, и guard'ы, то есть название не соответствовало содержимому. Теперь они лежат отдельно: core/interceptors и core/guards.
3. Есть два класса LocalStorageService в двух файлах (storage.service.ts и local-storage.service.ts) с разным поведением. Я перенесла оба в core/services. Объединять их не стала, потому что это уже изменение логики, а в этом задании я только раскладывала файлы.
4. Пять интерфейсов (IBlogPost, IDestination, IFeature, ITourAbout, ISearchData) нигде не используются, это мёртвый код. Я перенесла их в shared/interfaces, удалить их можно отдельной задачей.
5. Фича products уже лежала в features/products, а остальное приложение нет. Получилось два разных стиля в одном проекте.

Что сделано

- Создала core. Там то, что нужно всему приложению один раз: layout (header, footer, loader, message), interceptor'ы, guard'ы, токен конфига, глобальные сервисы (loader, message, theme, localStorage) и страница 404.
- Создала shared. Там то, что можно переиспользовать и что ничего не знает о бизнес-логике: директивы, пайпы и интерфейсы.
- Создала features/auth, features/users и features/posts рядом с уже существующим features/products. У каждой фичи одинаковая внутренняя структура: pages, components, data-access, interfaces.
- auth.guard и admin.guard перенесла в core/guards, потому что они защищают маршруты всего сайта, а не одной фичи.
- Ничего не удаляла и не объединяла, это только перемещение файлов.
- Изменились только пути в импортах. Логику, шаблоны и стили я не трогала. Проверила, сравнив файлы до и после: отличаются только строки с путями.

Почему это подходит

- Feature-Based: приложение уже состоит из отдельных частей (users, posts, products, auth). Новая фича это новая папка, а не правки в пяти общих папках. Фичи можно грузить лениво, loadComponent в маршрутах уже так работает.
- Core/Shared: есть понятное правило, куда положить файл. Нужен всему приложению один раз, значит core. Переиспользуется и не связан с бизнесом, значит shared. Нужен только одной фиче, значит в эту фичу. Так shared не превращается в свалку.
- Smart/Dumb: страницы (users-page, posts) получают данные из сервиса, а user-card, user-create и users-filter только показывают данные и сообщают о событиях. Их легко переиспользовать и проверять.
- Facade: UserService и PostService скрывают от страницы, что данные идут через UserApiService и PostApiService и что есть локальное состояние. Страница ничего не знает про HTTP.
- Singleton-сервисы: состояние пользователей, постов и корзины должно быть одно на всё приложение, providedIn: 'root' это даёт без лишнего кода.
- Signals и RxJS вместе: products написан на Signals и работает, users и posts на RxJS (BehaviorSubject). Переписывать рабочий код без причины это риск и нарушение YAGNI. Внутри одной фичи используется один подход.
- OOD: у каждого класса одна задача. API-сервис ходит в сеть, сервис хранит состояние, компонент показывает данные.

Почему НЕ альтернативы

- Только Layered (папки ui, services, models на весь проект): это ровно то, что у меня было. Всё лежит по слоям, и одна фича размазана по всем слоям. Слои я оставила только внутри каждой фичи.
- Только Core/Shared без фич: решает, куда класть общее, но не решает, где лежит всё про пользователей.
- Redux / NgRx: приложение небольшое, состояние в основном локально для фичи и не пересекается. NgRx добавил бы actions, reducers, effects и selectors, то есть в несколько раз больше кода ради тех же данных. Это оверинжиниринг.
- Переписать всё на Signals: работающий RxJS-код пришлось бы менять без нового функционала, и есть риск сломать логику. Лучше переходить постепенно при следующих изменениях.
- DDD: у меня нет сложной предметной области и бизнес-правил, которые нужно моделировать. Приложение в основном CRUD, DDD дал бы только лишние слои.
- TDD: это методология разработки новых функций, а не способ раскладки файлов. Рефакторинг только перемещает файлы, нового поведения, под которое писать тест, нет. Тесты лучше добавлять отдельно.
- Facade-классы поверх каждого сервиса: сервисы data-access уже выполняют эту роль. Ещё один слой над ними был бы лишним кодом (YAGNI).

Минусы выбранного подхода

- Больше вложенных папок, импорты длиннее (../../../core/...). Это можно смягчить алиасами путей в tsconfig, но в этом задании я этого не делала.
- Нужна дисциплина: если одна фича начнёт импортировать из другой, зависимости запутаются. Правило такое: фичи зависят только от core и shared, но не друг от друга.
- Два подхода к состоянию (Signals и RxJS) в одном проекте. Это временный компромисс.
- IUser лежит в core/interfaces, потому что им пользуются и auth, и users, и layout. Если положить его в users, то core и auth стали бы зависеть от фичи.

Дерево проекта

src/app/
├── core/
│ ├── enums/
│ │ ├── MessageType.ts
│ │ ├── color.ts
│ │ ├── preset-theme.ts
│ │ └── user-role.ts
│ ├── guards/
│ │ ├── admin.guard.ts
│ │ └── auth.guard.ts
│ ├── interceptors/
│ │ ├── auth.interceptor.ts
│ │ ├── error-handler.interceptor.ts
│ │ └── logging.interceptor.ts
│ ├── interfaces/
│ │ ├── IMessage.ts
│ │ ├── INavigation.ts
│ │ ├── ISocialLink.ts
│ │ └── IUser.ts
│ ├── layout/
│ │ ├── footer/
│ │ │ └── footer.component.ts
│ │ ├── header/
│ │ │ └── header.component.ts
│ │ ├── loader/
│ │ │ └── loader.component.ts
│ │ └── message/
│ │ └── message.component.ts
│ ├── pages/
│ │ └── not-found-page/
│ │ └── not-found-page.component.ts
│ ├── services/
│ │ ├── loader.service.ts
│ │ ├── local-storage.service.ts
│ │ ├── message.service.ts
│ │ ├── storage.service.ts
│ │ └── theme.service.ts
│ └── tokens/
│ ├── IAppConfig.ts
│ └── app-config.token.ts
├── features/
│ ├── auth/
│ │ ├── components/
│ │ │ └── login/
│ │ │ └── login.components.ts
│ │ ├── data-access/
│ │ │ └── auth.service.ts
│ │ └── interfaces/
│ │ ├── IAuthResponse.ts
│ │ ├── ILoginCredentials.ts
│ │ └── IToken.ts
│ ├── posts/
│ │ ├── components/
│ │ │ └── post-edit-dialog/
│ │ │ └── post-edit-dialog.component.ts
│ │ ├── data-access/
│ │ │ ├── post-api.service.ts
│ │ │ ├── post.resolver.ts
│ │ │ └── post.service.ts
│ │ ├── interfaces/
│ │ │ ├── IPost.ts
│ │ │ ├── IPostReactions.ts
│ │ │ └── IPostResponse.ts
│ │ └── pages/
│ │ ├── post-create/
│ │ │ └── post-create.component.ts
│ │ ├── post-detail/
│ │ │ └── post-detail.component.ts
│ │ └── posts/
│ │ └── posts.component.ts
│ ├── products/
│ │ ├── components/
│ │ │ ├── product-card/
│ │ │ │ └── product-card.component.ts
│ │ │ └── product-filters/
│ │ │ └── product-filters.component.ts
│ │ ├── data-access/
│ │ │ ├── cart-api.service.ts
│ │ │ ├── cart.service.ts
│ │ │ ├── product-api.service.ts
│ │ │ └── product.service.ts
│ │ ├── enums/
│ │ │ ├── Order.ts
│ │ │ └── SortBy.ts
│ │ ├── interfaces/
│ │ │ ├── ICartDeletedResponse.ts
│ │ │ ├── ICartItem.ts
│ │ │ ├── ICartProduct.ts
│ │ │ ├── ICartProductPayload.ts
│ │ │ ├── ICartResponse.ts
│ │ │ ├── ICartsResponse.ts
│ │ │ ├── IDimensions.ts
│ │ │ ├── IOption.ts
│ │ │ ├── IProduct.ts
│ │ │ ├── IProductQuery.ts
│ │ │ ├── IProductQueryParams.ts
│ │ │ ├── IProductsResponse.ts
│ │ │ └── IReview.ts
│ │ ├── pages/
│ │ │ ├── cart-page/
│ │ │ │ └── cart-page.component.ts
│ │ │ ├── product-detail-page/
│ │ │ │ └── product-detail-page.component.ts
│ │ │ └── product-list-page/
│ │ │ └── product-list-page.component.ts
│ │ └── routing/
│ │ └── product.resolver.ts
│ └── users/
│ ├── components/
│ │ ├── user-card/
│ │ │ └── user-card.component.ts
│ │ ├── user-create/
│ │ │ └── user-create.component.ts
│ │ └── users-filter/
│ │ └── users-filter.component.ts
│ ├── data-access/
│ │ ├── user-api.service.ts
│ │ └── user.service.ts
│ └── pages/
│ └── users-page/
│ └── users-page.component.ts
├── shared/
│ ├── directives/
│ │ ├── animated-gradient.directive.ts
│ │ └── hover-bold.directive.ts
│ ├── interfaces/
│ │ ├── IBlogPost.ts
│ │ ├── IDestination.ts
│ │ ├── IFeature.ts
│ │ ├── IGradientConfiguration.ts
│ │ ├── ISearchData.ts
│ │ └── ITourAbout.ts
│ └── pipes/
│ ├── phone-format.pipe.ts
│ └── plural.pipe.ts
├── app.component.ts
├── app.config.ts
├── app.routes.ts
└── collection.ts

Папки компонентов и страниц кроме .ts содержат ещё .html и .scss, для краткости они не показаны.
