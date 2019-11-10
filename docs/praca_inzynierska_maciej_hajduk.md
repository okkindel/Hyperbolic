---
title: "Wydział Podstawowych Problemów Techniki"
author: [Maciej Hajduk, Politechnika Wrocławska]
date: "Wrocław 2019"
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
  - [Podstawowy podział](#podstawowy-podzia%c5%82)
  - [Model Kleina](#model-kleina)
- [Projekt systemu](#projekt-systemu)
- [Implementacja systemu](#implementacja-systemu)
  - [Opis technologii](#opis-technologii)
- [Instalacja i wdrożenie](#instalacja-i-wdro%c5%bcenie)
  - [Serwer deweloperski](#serwer-deweloperski)
- [Omówinie kodu źródłowego](#om%c3%b3winie-kodu-%c5%bar%c3%b3d%c5%82owego)
- [Podsumowanie](#podsumowanie)
- [Bibliografia](#bibliografia)

# Wstęp

## Rys hostoryczny

We wszystkich szkołach od 2500 lat nauczana jest geometria. Sama nazwa - geometria - kojarzyć się może z nauką przyrodniczą, z rzeczą poznawaną na codzień z doświaczenia. Taka właśnie geometria jest również czymś bardzo instynktownym i dobrze wydawałoby się poznanym. Nasuwa się pytanie, czy może istnieć jakaś konkurencyjna do niej teoria.

Sama nazwa tej geometrii - geometria euklidesowa, bierze się z faktu, że została ona sformułowana aksjomatycznie w dziele _Elementy_ około 300 roku przed naszą erą, przez dyrektora Biblioteki Aleksandryjsciej - Euklidesa. Euklides przedstawił 5 postulatów z których wyprowadził całą geometrię, jaką przez kolejne wieki znano:

> 1. Dowolne dwa punkty można połączyć odcinkiem.
> 2. Dowolny odcinek można przedłużyć nieograniczenie (uzyskując prostą).
> 3. Dla danego odcinka można zaznaczyć okrąg o środku w jednym z jego końcowych punktów i promieniu równym jego długości.
> 4. Wszystkie kąty proste są przystające.
> 5. Dwie proste, które przecinają trzecią w taki sposób, że suma kątów wewnętrznych po jednej stronie jest mniejsza od dwóch kątów prostych, przetną się z tej właśnie strony.

Piąty aksjomat wywołał wiele wątpliwości. Nawet Euklides unikał używania go w swoim dziele tak długo, jak to było możliwe. Przez kolejne 1500 lat kolejni matematycy próbowali udowodnić, że o wiele bardziej skomplikowany postulat musi wynikać z pozostałych czterech.

Jednym z pierwszych zajmujących się tym problemem uczonych, był żyjący w V wieku naszej ery Proklos. Stwierdził on w swoim komentarzu do dzieł Euklidesa:

> Nie jest możliwe, aby uczony tej miary co Euklides godził się na obecność tak długiego postulatu w aksjomatyce – obecność postulatu wzięła się z pospiesznego kończenia przez niego Elementów, tak aby zdążyć przed nadejściem słusznie oczekiwanej rychłej śmierci; my zatem – czcząc jego pamięć – powinniśmy ten postulat usunąć lub co najmniej znacznie uprościć.

Wyzwanie usunięcia piątego aksjomatu podjęło wielu matematyków w kolejnych wiekach, znane są dowody Ibn al-Haythama (Alhazen, XI wiek), Omar Khayyáma (XII wiek), Nasir al-Din al-Tūsīa (XIII wiek) i Giovanni Girolamo Saccheriego (XVIII wiek), wszystkie jednak, jak się później okazywało, były błędne. Fakt, że mimo prostych błędów funkcjonowały i były nawet nauczane, wskazuje na kłopot, jakim dla uczonych było przyjęcie do wiadomości, że mogą istnieć dwie różne a wręcz wykluczające się, ale jednocześnie poprawne geometrie, a więc dwie teorie opisujące w różny sposób ten sam obiekt. W szczególności Immanuel Kant w swoim dziele _Krytyka czystego rozumu_ stwierdził, że intuicja geometryczna jest wrodzona, więc nie może istnieć wiele równoległych geometrii, a każdy kto chciałby zajmować się alternatywnymi geometriami nie nadaje się do nauki. Spotkało się to ze sprzeciwem. Johann Heinrich Lambert, zająwszy się taką alternatywną geometrią, ogłosił, że jeśli to nie jest nauka, to on chce uprawiać nienaukę. Udano się do największego w tamtym czasie autorytetu - Carla Friedricha Gaussa, ten jednak wycofał się, bojąc się - jak pisał - wrzasku Boetów. Problem jednak był i należało się do niego jakoś odnieść. Odważyło się na to dwóch młodych ludzi, którzy uparli się nie tylko na uprawianie tej geometrii, ale wręcz głosili jej równoprawność. Rosjanin,  Nikołaj Łobaczewski oraz Węgier - Janos Bolyai, niezależnie od siebie opublikowali prace w których - chociaż odmiennie - nowa geometria była konsekwentnie wyprowadzona. Obu odkrywców spotkała też za to kara, Łobaczewski został wręcz zmuszony do opuszczenia uczelni.

Sprawę nowej geometrii (nazywanej już geometrią Bolyaia-Łobaczewskiego) przejął Felix Klein. Postawił on tezę, że jeżeli za pomocą geometrii euklidesowej jesteśmy w stanie przedstawić tę nieeuklidesową - i odwrotnie, to oba modele są sobie w istocie równoważne. Opublikował też w 1870 roku dzieło, w którym dowiódł równoprawności obu modeli.

Dosadnie do nowego modelu odniósł się fizyk - Hermann Helmholtz, publikując pracę, w której określił matematykę jako skrzynkę z narzędziami dla nauk przyrodniczych, czym odebrał jej walor nakuki przyrodniczej jako takiej.

## Wybrane zagadnienie

W niniejszej pracy zaimplementowany zostanie prosty silnik graficzny skupiający się na renderowaniu wizualizjacji płaszczyny dysku w modelu Poincarégo geometrii hiberbolitycznej.

Praca swoim zakresem objemie obsługę rysowania lini, okręgów, wielokątów na tejże płaszczyźnie oraz implementacje przykładowych programów objemujących wizualizacje bardziej skomplikowanych struktur. Istnieje kilka implementacji realizujących podobne założenie, przy czym skupiają się one zazwyczaj na dostarczeniu pewnej określonej funkcjonalności, w przeciwieńtwie do omówionej poniżej aplikacji, która w głównej mierze dostarcza narzędzia pozwalające na osiągnięcie takich efektów małym kosztem, bez dogłębnej znajomości tematu.

Praca składa się z czterech rozdziałów:

W rozdziale pierwszym omówiono analizę wybranego problemu, przedstawiono motywacje podjęcia tego tematu oraz uzasadniono wybór modelu płaszczyzny Poincarégo.

Rozdział drugi zawiera szczegółowy opis systemu wraz z opisem poszczególnych plików oraz przeznaczeniem klas i funkcji składających się na aplikacje. Opisane w nim zostały algorytmy przekształcające byty w geometrii Euklidesowe na odpowiadające im elementy geometrii hiberbolicznej, funkcje pomocnicze, reprezentacje punktów i linii w obu modelach.

W rozdziale trzecim opisano technologie implementacji projektu: wybrany język programowania, środowisko składające się na aplikację oraz biblioteki wykorzystane w programie.

W rozdziale czwartym przedstawiono sposób instalacji i wdrożenia systemu w środowisku docelowym. Końcowy rozdział stanowi podsumowanie uzyskanych wyników.

# Analiza problemu

__W niniejszym rozdziale przedstawiona będzie analiza problemu, opis matematyczny modelu płaszczyny dysku Poincarégo oraz przegląd kilku wybranych modeli geometrii nieeuklicesowej.__

Debata nad piątym postulatem Euklidesa stworzyła problem, jak alternatywna geometria powinna wyglądać. Umiano pokazać poszczególne właściwości, ale nie powstał żaden model pozwalający na szersze spojrzenie na problem. Pierwszy model geometrii nieeuklidesowej został stworzony przez Kleina. W sprawę zaangażował się również Bernard Rieman. Stwierdził on, że można opisać nieskończenie wiele struktur matematycznych, które nie będą spełniały postulatów Euklidesa, będąc dalej geometriami.

<!-- TODO: Wygląda to na jakis bullshit Koncepcja Riemana zakłada płaszczynę jako zbiór punków, dla których określamy iloczyn skalarny. Będąc w zbiorze liczb rzeczywistych, iloczyn skalarny dla $X=(x_1, y_1)$ i $Y=(x_2, y_2)$ wynosi

$$ X \cdot Y = g_{11}x_1y_1 + g_{12}x_1y_2 + g_{21}x_2y_1 + g_{22}x_2y_2 $$

gdzie $g_{ij}$ są dobrane tak, by liczba  -->

## Podstawowy podział

Geometria nieeuklidesowa to każda geometria, która nie spełnia przynajmniej jednego z postulatów Euklidesa. Geometrie nieeuklidesowe możemy podzielić na dwa rodzaje:

__Geometria Łobaczewskiego-Bólyaia (hiperboliczna):__

  Geometria hiperboliczna jest bliżej związana z geometrią euklidesową, niż się wydaje: jedyną różnicą aksjomatyczną jest postulat równoległy. Po usunięciu postulatu równoległego z geometrii euklidesowej geometria wynikowa jest geometrią absolutną. Wszystkie twierdzenia o geometrii absolutnej, w tym pierwsze 28 twierdzeń zaprezentowanych przez Euklisdesa, obowiązują w geometrii i euklidesowej i hiperbolicznej.

  W modelu hiperbolicznym, w płaszczyźnie dwuwymiarowej, dla dowolnej linii $L$ i punktu $X$, który nie jest na $L$, istnieje nieskończenie wiele linii przechodzących przez $X$, które się nie przecinają $L$.

__Geometria Riemanna (eliptyczna):__

  Najprostszym modelem geometrii eliptycznej jest kula, w której linie są kołami wielkimi (takimi jak równik lub południki na kuli ziemskiej). Jest to również jeden ze standardowych modeli prawdziwej płaszczyzny projekcyjnej. Różnica polega na tym, że jako model geometrii eliptycznej wprowadza się metrykę umożliwiającą pomiar długości i kątów, natomiast jako model płaszczyzny rzutowej takiej metryki nie ma.
  
  W modelu eliptycznym dla dowolnej linii $L$ i punktu $X$, który nie jest na $L$, wszystkie linie przechodzące przez $X$ przecinają się $L$.

Sposobem opisania różnic między tymi geometriami jest rozważenie dwóch linii prostych rozciągniętych w nieskończoność w płaszczyźnie dwuwymiarowej, które są prostopadłe do trzeciej linii:

![Zachowanie linii ze wspólną prostopadłą w każdym z trzech rodzajów geometrii](figures/noneuclid.png)

- W geometrii euklidesowej linie pozostają w stałej odległości od siebie (co oznacza, że linia narysowana prostopadle do jednej linii w dowolnym punkcie przecina drugą linię, a długość odcinka linii łączącego punkty przecięcia pozostaje stała) i są znane jako równoległe.
- W geometrii hiperbolicznej linie _zakrzywiają się_ od siebie, zwiększając odległość w miarę przesuwania się dalej od punktów przecięcia ze wspólną prostopadłą; linie te są często nazywane ultraparallelami .
- W geometrii eliptycznej linie _zakrzywiają się_ do siebie i w końcu przecinają.

## Model Kleina

Model Kleina - a w zaszadzie model dysku Beltrami–Kleina jest modelem geometrii hiberbolicznej, w którym punkty są reprezentowane przez punkty we wnętrzu dysku. Przyjmuje on następujące zalożenia:

- Płaszczyną jest wnętrze koła bez krawędzi
<!-- - TODO: TO FAJNE POWIEDZENIE GAUSSA -->
- Prostymi są cięciwy tego koła ()
- Proste będą prostopadłe wtedy, gdy przedłużenie jednej z nich przechodzi przez punkt przecięcia stycznych do  math w końcach drugiej.

![Koła w modelu Kleina](figures/klein_circles.png)

Model nie jest zgodny , co oznacza, że kąty są zniekształcone, a okręgi na płaszczyźnie hiperbolicznej na ogół nie są okrągłe w modelu.

# Projekt systemu

__W niniejszym rozdziale przedstawiony zostanie szczegółowy projekt systemu, zależności pomiędzy klasami oraz podstawowe algorytmy składające się na logikę funkcjonowania silnika.__

# Implementacja systemu

__W niniejszym rozdziale omówiona zostanie technologia, konfiguracja oraz wdrożenie systemu wraz z krótkim opisem poszczególnych części systemu i kodu źródłowego.__

## Opis technologii

Do implementacji systemu użyto języka `TypeScript` w wersji `3.6.3`, bundlera (transpilatora nowoczesnych wersji języka `JavaScript` do wersji zrozumiałych dla przeglądarek) `webpack` w wersji `2.3.3` oraz `CSS3` i  `HTML5` wraz z elementem `<canvas>` odpowiedzialnym za rysowanie grafiki na ekranie. Pełna lista wszystkich bibliotek wraz z ich wersjcami znajduje się w pliku `package.json`, w katalogu głównym projektu.

# Instalacja i wdrożenie

__Rozdział ten zawiera informacje o sposobie zbudowania aplikacji w celu jej uruchomienia i opcjonalnie - wdrożenia na serwerze WWW.__

Do zbudowania aplikacji konieczny będzie menager pakietów `npm` w wersji przynajmniej `6.5.0` oraz środowisko uruchomieniowe języka `JavaScript` - `node.js` w wersji  `10.6.0` lub nowszej. Instalacja wymaganych pakietów odbywa się poprzez wpisanie w konsoli polecenia

``` BASH
npm install
```

w katalogu głównym projektu. Następnie należy zbudować aplikację poleceniem

``` BASH
npm run build
```

Po zbudowaniu aplikacji, w katalogu głównym pojawi się folder `dist` z plikami, które wraz z plikem `index.html` składają się na gotowy program możliwy do uruchomiania w przeglądarce.

## Serwer deweloperski

Aplikacja wspiera tryb deweloperski, w którym bieżące zmiany w kodzie automatycznie są budowane do plików wynikowych. Do uruchomienia trybu deweloperskiego potrzebne są te same pakiety instalowane poleceniem:

``` BASH
npm install
```

Wywołanie trybu odbywa się komendą:

``` BASH
npm run build-watch
```

# Omówinie kodu źródłowego

# Podsumowanie

# Bibliografia

- Caroline Series With assistance from Sara Maloni, Hyperbolic geometry MA448
- Bjørn Jahren, An introduction to hyperbolic geometry, MAT4510/3510
- Martin Freiherr von Gagern, Creation of Hyperbolic OrnamentsAlgorithmic and Interactive Methods, Technischen Universitat Mu̧nchen
- Izabela Przezdzink, Geometria Poincarego i Kleina. Skrypt do zajęć: Podstawy geometrii i elementy geometrii nieeuklidesowej, Wrocław 2010, Uniwersytet Wrocławski Wydział Matematyki i Informatyki Instytut Matematyczny
- Mateusz Kłeczek, Geometria hiperboliczna, Chrzanów 2016
- Steve Szydlik, Hyperbolic Constructions inGeometer’s Sketchpad, December 21, 2001
- Marek Kordos, Geometria Bolyaia–Łobaczewskiego, http://www.deltami.edu.pl/temat/matematyka/geometria/geometrie_nieeuklidesowe/2018/07/23/Geometria_Bolyaia_Lobaczewskiego/, Sierpień 2018
