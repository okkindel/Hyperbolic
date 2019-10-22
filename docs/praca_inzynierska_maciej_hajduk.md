---
geometry: margin=1.5in
indent: true
header-includes: |
  \usepackage{tcolorbox}
  \newcommand\qed{\hfill\rule{1em}{1em}}
---

## Spis treści

- [Spis treści](#Spis-tre%C5%9Bci)
- [Wstęp](#Wst%C4%99p)
  - [Rys hostoryczny](#Rys-hostoryczny)
  - [Wybrane zagadnienie](#Wybrane-zagadnienie)
- [Analiza problemu](#Analiza-problemu)
- [Projekt systemu](#Projekt-systemu)
- [Implementacja systemu](#Implementacja-systemu)
  - [Opis technologii](#Opis-technologii)
- [Instalacja i wdrożenie](#Instalacja-i-wdro%C5%BCenie)
- [Omówinie kodu źródłowego](#Om%C3%B3winie-kodu-%C5%BAr%C3%B3d%C5%82owego)
- [Podsumowanie](#Podsumowanie)
- [Bibliografia](#Bibliografia)

## Wstęp

### Rys hostoryczny

### Wybrane zagadnienie

W niniejszej pracy zaimplementowany zostanie prosty silnik graficzny skupiający się na renderowaniu wizualizjacji płaszczyny dysku w modelu Poincare geometrii hiberbolitycznej.

Praca swoim zakresem objemie obsługę rysowania lini, okręgów, wielokątów na tejże płaszczyźnie oraz implementacje przykładowych programów objemujących wizualizacje bardziej skomplikowanych struktur. Istnieje kilka implementacji realizujących podobne założenie, przy czym skupiają się one zazwyczaj na dostarczeniu pewnej określonej funkcjonalności, w przeciwieńtwie do omówionej poniżej aplikacji, która w głównej mierze dostarcza narzędzia pozwalające na osiągnięcie takich efektów małym kosztem, bez dogłębnej znajomości tematu.

Praca składa się z czterech rozdziałów. W rozdziale pierwszym omówiono analizę wybranego problemu, przedstawiono... 

Rozdział drugi zawiera szczegółowy opis systemu wraz z opisem poszczególnych plików oraz przeznaczeniem klas i funkcji składających się na aplikacje. Opisane w nim zostały również algorytmy przekształcające byty w geometrii Euklidesowe na odpowiadające im elementy geometrii hiberbolicznej.

W rozdziale trzecim opisano technologie implementacji projektu: wybrany język programowania, środowisko składające się na aplikacje oraz biblioteki wykorzystane w programie.

W rozdziale czwartym przedstawiono sposób instalacji i wdrożenia systemu w środowisku docelowym. Końcowy rozdział stanowi podsumowanie uzyskanych wyników.

## Analiza problemu

W niniejszym rozdziale 

## Projekt systemu

W niniejszym rozdziale przedstawiony zostanie szczegółowy projekt systemu, zależności pomiędzy klasami oraz podstawowe algorytmy składające się na logikę funkcjonowania silnika.

## Implementacja systemu

W niniejszym rozdziale omówiona zostanie technologia, konfiguracja oraz wdrożenie systemu wraz z krótkim opisem poszczególnych części systemu i kodu źródłowego.

### Opis technologii

Do implementacji systemu użyto języka `TypeScript` w wersji `3.6.3`, bundlera (transpilatora nowoczesnych wersji języka `JavaScript` do wersji zrozumiałych dla przeglądarek) `webpack` w wersji `2.3.3` oraz `CSS3` i  `HTML5` wraz z elementem `<canvas>` odpowiedzialnym za rysowanie grafiki na ekranie. Pełna lista wszystkich bibliotek wraz z ich wersjcami znajduje się w pliku `package.json`, w katalogu głównym projektu.

## Instalacja i wdrożenie

Do zbudowania aplikacji konieczny będzie menager pakietów `npm` w wersji przynajmniej `6.5.0` oraz środowisko uruchomieniowe języka `JavaScript` - `node.js` w wersji  `10.6.0` lub nowszej. Instalacja wymaganych pakietów odbywa się poprzez wpisanie w konsoli polecenia

```JS
npm install
```

w katalogu głównym projektu. Następnie należy zbudować aplikację poleceniem

```JS
npm run build
```

Po zbudowaniu aplikacji, w katalogu głównym pojawi się folder `dist` z plikami, które wraz z plikem `index.html` składają się na gotowy program możliwy do uruchomiania w przeglądarce.

## Omówinie kodu źródłowego

## Podsumowanie

## Bibliografia

- Hyperbolic geometry MA448 - Caroline Series With assistance from Sara Maloni
