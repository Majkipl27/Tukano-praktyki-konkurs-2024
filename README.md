# UWAGA
Zanim przystąpisz do pracy, przeczytaj całość instrukcji.

## Klonowanie repozytorium

W prawym górnym roku kliknij przycisk code. Następnie skopiuj link który zostanie ci podany i do terminala wklej komendę git clone <link>, gdzie w miejsce link, wstaw skopiowany link. Upewnij się, że masz zainstalowane narzędzie git, jak i narzędzia npm i nodejs.

## Instalacja bibliotek

W tym samym terminalu, wejdź w folder, gdzie zostało skopiowane repozytorium. Następnie wywołaj komendę aby zainstalować niezbędne pakiety:
```
npm i
```
lub
```
pnpm i
```
W zależności, z którego menadżera pakietów nodejs korzystasz.

## Stwórz bazę danych

Stwórz bazę danych mariadb, która zawiera tabelę maps, definiowaną w następujący sposób:
```
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| data     | blob         | YES  |     | NULL    |                |
| distance | int(11)      | YES  |     | NULL    |                |
| path     | varchar(255) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```


## Dodaj zmienne środowiskowe

Aby projekt działał poprawnie, upewnij się, że posiadasz odpowiednie zmienne środowiskowe. Przykładowy plik 
.env powinien wyglądać tak:
```
GEMINI_API_KEY=<klucz api gemini ai>
DB_HOST=<host bazy danych>
DB_USER=<użytkownik bazy danych>
DB_PASS=<hasło użytkownika bazy danych>
DB_NAME=<nazwa bazy danych, z której będziesz korzystać>
```
Plik ten umieść w głównym katalogu projektu.

## Uruchamianie aplikacji
W oknie terminala, w ścieżce folderu projektu, wywołaj komendę:
```
npm run dev
```
upewniając się jednak, że powyższe kroki zostały spełnione. Jeśli wszystko zadziała poprawnie, projekt powinien uruchomić się pod adresem: 
```
localhost:3000
```
## Informacje dla tukano:

Plik zmiennych środowiskowych, z działającym kluczem do gemini api, został załączony do dostarczonego e-maila. Ważne! Po pobraniu pliku, może się okazać, że kropka z początku zniknęła, proszę ją dodać, aby nazwą pliku było .env. Załączyłem także plik ze strukturą bazy danych, dla łatwego jej przywrócenia.



