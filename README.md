**Dokumentacja kodu JavaScript**

Poniżej znajduje się dokumentacja dla przedstawionego kodu JavaScript, który wykonuje wiele zadań związanych z interakcją z API Star Wars (SWAPI) oraz generowaniem dynamicznych elementów interfejsu użytkownika.

## Stałe i zmienne globalne

- `BASE_URL`: Stała przechowująca bazowy adres URL do API SWAPI.

- `page`: Numer aktualnej strony dla pobierania danych z API.

- `currentPage`: Numer aktualnie wyświetlanej strony na stronie internetowej.

## Funkcje

### `getLinks()`

Pobiera linki do dostępnych kategorii z API SWAPI.

### `getData(category, page)`

Pobiera dane z określonej kategorii i strony z API SWAPI.

### `makeButtons()`

Tworzy przyciski dla każdej kategorii dostępnej w API SWAPI oraz dodaje funkcje obsługi kliknięć przycisków.

### `generateTable(name, collection)`

Generuje tabelę w interfejsie użytkownika na podstawie danych z danej kategorii i kolekcji.

### `formatDate(created)`

Formatuje datę w formacie "DD-MM-YY".

### `createDetailsModal(details)`

Tworzy modal zawierający szczegóły wybranych danych.

### `showDeleteConfirmation(item, collection, name)`

Pokazuje modal z potwierdzeniem usunięcia wybranych danych z kolekcji.

### `createCollection(name, data)`

Tworzy kolekcję obiektów dla danej kategorii, używając konstruktora `categoryClass`.

### Konstruktor `categoryClass`

Konstruktor tworzący instancje dla danej kategorii.

### Obiekt `obj`

Obiekt zawierający informacje o dostępnych kategoriach wraz z ich nagłówkami i funkcjami inicjalizującymi.

### `goToPage(page)`

Przechodzi do określonej strony danych dla danej kategorii i odświeża tabelę oraz paginację.

### `updatePagination()`

Aktualizuje elementy paginacji, takie jak aktualna strona, liczba stron, dostępność przycisków prev i next.

## Elementy interfejsu użytkownika

- `buttons`: Kontener dla przycisków kategorii.

- `tableContainer`: Kontener dla tabeli z danymi.

- `pagination`: Kontener dla elementów paginacji.

- `prevPageButton`, `nextPageButton`: Przyciski do nawigacji między stronami.

- `currentPageElement`: Element wyświetlający numer aktualnej strony.

- `toPage`: Element wyświetlający liczbę wszystkich stron.

- `goToPageButton`: Przycisk do przechodzenia do konkretnej strony.

- `goToPageInput`: Pole do wprowadzania numeru strony.

## Inne elementy

- Modale: `myModal` (szczegóły) i `deleteModal` (potwierdzenie usunięcia) - wykorzystywane do wyświetlania okien modalnych.

- Metody obsługi kliknięć, które reagują na zamknięcie modali lub przycisków takich jak przyciski "Delete" i "Details".
