---
geometry: margin=1.5in
indent: true
header-includes: |
  \usepackage{tcolorbox}
  \newcommand\qed{\hfill\rule{1em}{1em}}
---

# Spis treści

- [Spis treści](#spis-tre%c5%9bci)
- [Wstęp](#wst%c4%99p)
  - [Rys hostoryczny](#rys-hostoryczny)
  - [Wybrane zagadnienie](#wybrane-zagadnienie)
- [Analiza problemu](#analiza-problemu)
- [Projekt systemu](#projekt-systemu)
- [Implementacja systemu](#implementacja-systemu)
  - [Opis technologii](#opis-technologii)
- [Instalacja i wdrożenie](#instalacja-i-wdro%c5%bcenie)
- [Omówinie kodu źródłowego](#om%c3%b3winie-kodu-%c5%bar%c3%b3d%c5%82owego)
- [Podsumowanie](#podsumowanie)
- [Bibliografia](#bibliografia)


# Wstęp

## Rys hostoryczny

We wszystkich szkołach od 2500 lat nauczana jest geometria. Sama nazwa - geometria - kojarzyć się może z nauką przyrodniczą, z rzeczą poznawaną na codzień z doświaczenia. Taka właśnie geometria jest również czymś bardzo instynktownym i dobrze wydawałoby się poznanym. Nasuwa się pytanie, czy może istnieć jakaś konkurencyjna do niej teoria.

Sama nazwa tej geometrii - geometria euklidesowa, bierze się z faktu, że została ona sformułowana aksjomatycznie w dziele 'Elementy' około 300 roku przed naszą erą, przez dyrektora Biblioteki Aleksandryjsciej - Euklidesa. Euklides przedstawił 5 postulatów z których wyprowadził całą geometrię, jaką przez kolejne wieki znano:

1. Dowolne dwa punkty można połączyć odcinkiem.
2. Dowolny odcinek można przedłużyć nieograniczenie (uzyskując prostą).
3. Dla danego odcinka można zaznaczyć okrąg o środku w jednym z jego końcowych punktów i promieniu równym jego długości.
4. Wszystkie kąty proste są przystające.
5. Dwie proste, które przecinają trzecią w taki sposób, że suma kątów wewnętrznych po jednej stronie jest mniejsza od dwóch kątów prostych, przetną się z tej właśnie strony.

Piąty aksjomat wywołał wiele wątpliwości. Nawet Euklides unikał używania go w swoim dziele tak długo, jak to było możliwe. Przez kolejne 1500 lat kolejni matematycy próbowali udowodnić, że o wiele bardziej skomplikowany postulat musi wynikać z pozostałych czterech.

Jednym z pierwszych zajmujących się tym problemem uczonych, był żyjący w 5 wieku naszej ery Proklos. Stwierdził on w swoim komentarzu do dzieł Euklidesa:

> Nie jest możliwe, aby uczony tej miary co Euklides godził się na obecność tak długiego postulatu w aksjomatyce – obecność postulatu wzięła się z pospiesznego kończenia przez niego Elementów, tak aby zdążyć przed nadejściem słusznie oczekiwanej rychłej śmierci; my zatem – czcząc jego pamięć – powinniśmy ten postulat usunąć lub co najmniej znacznie uprościć.

Wyzwanie usunięcia piątego aksjomatu podjęło wielu matematyków w kolejnych wiekach. Wielu potencjalnie się to udało, po pewnym czasie okazało się jednak, że w każdym z dowodów był błąd. Fakt, że były to błędy dość trywialne, wskazuje na kłopot, jakim dla uczonych było przyjęcie do wiadomości, że mogą istnieć dwie różne a wręcz wykluczające się, ale jednocześnie poprawne geometrie, a więc dwie teorie opisujące w różny sposób ten sam obiekt. W szczególności Immanuel Kant w swoim dziele `Krytyka czystego rozumu` stwierdził, że intuicja geometryczna jest wrodzona, więc nie może istnieć wiele równoległych geometrii, a każdy kto chciałby zajmować się alternatywnymi geometriami nie nadaje się do nauki. Spotkało się to ze sprzeciwem. Johann Heinrich Lambert, zająwszy się taką alternatywną geometrią, ogłosił, że jeśli to nie jest nauka, to on chce uprawiać nienaukę. Udano się do największego w tamtym czasie autorytetu - Carla Friedricha Gaussa, ten jednak wycofał się, bojąc się - jak pisał - wrzasku Boetów. Problem jednak był i należało się do niego jakoś odnieść. Odważyło się na to dwóch młodych ludzi, którzy uparli się nie tylko na uprawianie tej geometrii, ale wręcz głosili jej równoprawność. Rosjanin,  Nikołaj Łobaczewski oraz Węgier - Janos Bolyai, niezależnie od siebie opublikowali prace w których - chociaż odmiennie - nowa geometria była konsekwentnie wyprowadzona. Obu odkrywców spotkała też za to kara, Łobaczewski został wręcz zmuszony do opuszczenia katedry.

Sprawę nowej geometrii (nazywanej już geometrią Bolyaia-Łobaczewskiego) przejął Felix Klein. Postawił on tezę, że jeżeli za pomocą geometrii euklidesowej jesteśmy w stanie przedstawić tę nieeuklidesową - i odwrotnie, to oba modele są sobie w istocie równoważne. Opublikował też w 1870 roku dzieło, w którym dowiódł równoprawności obu modeli.

Dosadnie do nowego modelu odniósł się fizyk - Hermann Helmholtz, publikując pracę, w której określił matematykę jako skrzynkę z narzędziami dla nauk przyrodniczych, czym odebrał jej walor nakuki przyrodniczej jako takiej.

## Wybrane zagadnienie

W niniejszej pracy zaimplementowany zostanie prosty silnik graficzny skupiający się na renderowaniu wizualizjacji płaszczyny dysku w modelu Poincarégo geometrii hiberbolitycznej.

Praca swoim zakresem objemie obsługę rysowania lini, okręgów, wielokątów na tejże płaszczyźnie oraz implementacje przykładowych programów objemujących wizualizacje bardziej skomplikowanych struktur. Istnieje kilka implementacji realizujących podobne założenie, przy czym skupiają się one zazwyczaj na dostarczeniu pewnej określonej funkcjonalności, w przeciwieńtwie do omówionej poniżej aplikacji, która w głównej mierze dostarcza narzędzia pozwalające na osiągnięcie takich efektów małym kosztem, bez dogłębnej znajomości tematu.

Praca składa się z czterech rozdziałów. W rozdziale pierwszym omówiono analizę wybranego problemu, przedstawiono... 

Rozdział drugi zawiera szczegółowy opis systemu wraz z opisem poszczególnych plików oraz przeznaczeniem klas i funkcji składających się na aplikacje. Opisane w nim zostały również algorytmy przekształcające byty w geometrii Euklidesowe na odpowiadające im elementy geometrii hiberbolicznej.

W rozdziale trzecim opisano technologie implementacji projektu: wybrany język programowania, środowisko składające się na aplikacje oraz biblioteki wykorzystane w programie.

W rozdziale czwartym przedstawiono sposób instalacji i wdrożenia systemu w środowisku docelowym. Końcowy rozdział stanowi podsumowanie uzyskanych wyników.

# Analiza problemu

W niniejszym rozdziale 

# Projekt systemu

W niniejszym rozdziale przedstawiony zostanie szczegółowy projekt systemu, zależności pomiędzy klasami oraz podstawowe algorytmy składające się na logikę funkcjonowania silnika.

# Implementacja systemu

W niniejszym rozdziale omówiona zostanie technologia, konfiguracja oraz wdrożenie systemu wraz z krótkim opisem poszczególnych części systemu i kodu źródłowego.

## Opis technologii

Do implementacji systemu użyto języka `TypeScript` w wersji `3.6.3`, bundlera (transpilatora nowoczesnych wersji języka `JavaScript` do wersji zrozumiałych dla przeglądarek) `webpack` w wersji `2.3.3` oraz `CSS3` i  `HTML5` wraz z elementem `<canvas>` odpowiedzialnym za rysowanie grafiki na ekranie. Pełna lista wszystkich bibliotek wraz z ich wersjcami znajduje się w pliku `package.json`, w katalogu głównym projektu.

# Instalacja i wdrożenie

Do zbudowania aplikacji konieczny będzie menager pakietów `npm` w wersji przynajmniej `6.5.0` oraz środowisko uruchomieniowe języka `JavaScript` - `node.js` w wersji  `10.6.0` lub nowszej. Instalacja wymaganych pakietów odbywa się poprzez wpisanie w konsoli polecenia

```JS
npm install
```

w katalogu głównym projektu. Następnie należy zbudować aplikację poleceniem

```JS
npm run build
```

Po zbudowaniu aplikacji, w katalogu głównym pojawi się folder `dist` z plikami, które wraz z plikem `index.html` składają się na gotowy program możliwy do uruchomiania w przeglądarce.

# Omówinie kodu źródłowego

# Podsumowanie

# Bibliografia

- Hyperbolic geometry MA448 - Caroline Series With assistance from Sara Maloni
