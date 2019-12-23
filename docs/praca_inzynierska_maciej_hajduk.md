---
title: "Wydział Podstawowych Problemów Techniki"
author: [Maciej Hajduk, Politechnika Wrocławska]
date: "Wrocław 2019"
geometry: margin=3cm
numbersections: true
indent: true
header-includes: |
  \usepackage{tcolorbox}
  \usepackage{pdfpages}
  \usepackage[]{algorithm2e}
  \newcommand\qed{\hfill\rule{1em}{1em}}
---

\newtheorem{theorem}{Twierdzenie}
<!-- -------------------------------- -->

\tableofcontents

\newpage\null\newpage

# Wstęp

## Wprowadzenie

__Celem pracy jest zaprogramowanie i implementacja silnika graficznego służącego do generowania podstawowych obiektów geometrycznych w geometrii hiperbolicznej. Wybrano jej model - tak zwany dysk Poincaré. Biblioteka została napisana w języku `Typescript` (który jest wersją języka `JavaScript` zawierającą ponadto między innymi silne typowianie).__
\vspace{3mm}

Praca swoim zakresem obejmie obsługę rysowania lini, okręgów, wielokątów na tejże płaszczyźnie oraz implementację przykładowych programów obejmujących wizualizacje bardziej skomplikowanych struktur. Na tle innych implementacji, aplikacja wyróżnia się dostarczanymi możliwościami i realizacją problemu z pomocą matematycznego opisu pewnego modelu. Przykładowe demonstracje możliwości aplikacji są dostarczone razem z kodem źródłowym, jest to, poza możliwością narysowania dowolnego wielokąta, rysowaniem figur foremnych czy prostych animacji, także interakcja z urządzeniami peryferyjnymi i tesselacja przestrzeni hiperbolicznej. Niewątpliwą zaletą dostarczonej aplikacji jest prostota implementacji własnych rozwiązań, na co składa się silne typowanie języka Typescript wraz z dokładnymi interfejsami dla klas oraz funkcje dostarczone przez silnik, pozwalające na łatwe manipulowanie wyświetlającymi się obiektami, nie wymagające przy tym zrozumienia modelu.

\vspace{3mm}
__Praca składa się z czterech rozdziałów:__

\vspace{3mm}
__Rozdział pierwszy__: Omówienie analizy wybranego problemu, przedstawienie motywacji podjęcia tego tematu oraz uzasadnienie wyboru modelu dysku Poincaré. Rozdział zawiera poza tym komentarz do różnych rodzajów geometrii nieeuklidesowych, oraz krótki opis i porównanie innych modeli geometrii hiperbolicznej.

\vspace{3mm}
__Rozdział drugi__: Szczegółowa charakterystyka systemu wraz z opisem poszczególnych plików oraz przeznaczeniem klas i funkcji składających się na program. Opisanie algorytmów przekształcających byty w geometrii euklidesowej na odpowiadające im elementy geometrii hiperbolicznej, funkcji pomocniczych, reprezentacji punktów i linii w obu modelach.

\vspace{3mm}
__Rozdział trzeci__: Opis technologii użytych do implementacji projektu: wybranego języka programowania, środowiska składającego się na aplikację oraz bibliotek wykorzystanych w programie.

\vspace{3mm}
__Rozdział czwarty__: Instrukcje instalacji i wdrożenia systemu w środowisku docelowym. Końcowy rozdział stanowi podsumowanie uzyskanych wyników i ewentualne możliwości rozwoju projektu.

\vspace{3mm}
Udało się zrealizować wszystkie postawione cele.

## Kontekst historyczny

__Geometria jest nauką o mierze. Nazwa ta narzuca silne skojarzenia z nauką niemalże przyrodniczą. Nauczana we wszystkich szkołach od dwóch i pół tysiąca lat - wydawałoby się jest już czymś bardzo dobrze poznanym. Nowe teorie matematyczne doprowadziły jednak do podważenia tej pewności i powstania geometrii alternatywnych.__

\vspace{3mm}

O życiu Euklidesa wiemy bardzo niewiele, a przecież to jemu zawdzięczamy nazwę _naszej_ geometrii. Ani data urodzenia, ani pochodzenie nie są nam znane, a wszystkie informacje o nim czerpiemy z antycznych dzieł w których opisana jest matematyka. Około 300 roku przed naszą erą, Euklides - dyrektor Biblioteki Aleksandryjskiej, wydał swoje największe dzieło - _Elementy Geometrii_, na które składa się 13 ksiąg zawierających właściwie całą wiedzę matematyczną tamtych czasów. Początkowe definicje pierwszej księgi posiadają 5 stwierdzeń, które według Euklidesa są tak proste, że nie wymagają uzasadnienia. Euklides nazwał je aksjomatami:

> 1. Od dowolnego punktu do dowolnego innego można poprowadzić prostą.
> 2. Ograniczoną prostą można dowolnie przedłużyć.
> 3. Z dowolnego środka dowolnym promieniem można opisać okrąg.
> 4. Wszystkie kąty proste są równe (przystające).
> 5. Jeśli 2 proste na płaszczyźnie tworzą z trzecią kąty jednostronne wewnętrzne o sumie mniejszej od 2 kątów prostych, to proste te, po przedłużeniu, przetną się i to z tej właśnie strony. [^axioms]

Piąty aksjomat mówi o tym, że z jednej strony przecinanej linii dwie proste będą się przybliżać. Zaczął on dość szybko wzbudzać podejrzenia. Jest znacznie bardziej skomplikowany od pozostałych, a już na pewno nie tak intuicyjny. Nawet Euklides unikał używania go w swoim dziele tak długo, jak to było możliwe i użył go dopiero w dowodzie własności 29.

Można śmiało powiedzieć, że piąty aksjomat w kolejnych wiekach spędzał uczonym sen z powiek. Przez kolejne 1500 lat matematycy próbowali udowodnić, że o wiele bardziej skomplikowany postulat musi wynikać z pozostałych czterech. Jednym z pierwszych zajmujących się tym problemem uczonych, był żyjący w V wieku naszej ery Proklos. Stwierdził on w swoim komentarzu do dzieł Euklidesa:

> Nie jest możliwe, aby uczony tej miary co Euklides godził się na obecność tak długiego postulatu w aksjomatyce – obecność postulatu wzięła się z pospiesznego kończenia przez niego Elementów, tak aby zdążyć przed nadejściem słusznie oczekiwanej rychłej śmierci; my zatem – czcząc jego pamięć – powinniśmy ten postulat usunąć lub co najmniej znacznie uprościć. [^proklos_annotation]

Wyzwanie usunięcia piątego aksjomatu podjęło wielu matematyków w kolejnych wiekach. Prowadziło to do postania wielu nowych twierdzeń, które w istocie były piątemu aksjomatowi równoważne. Prowadziło to do sprzeciwu innych uczonych. W szczególności Immanuel Kant w swoim dziele _Krytyka czystego rozumu_ stwierdził, że intuicja geometryczna jest wrodzona, więc nie może istnieć wiele równoległych geometrii, a każdy kto chciałby zajmować się alternatywnymi geometriami nie nadaje się do nauki. Nie wszyscy zgodzili się z tym stwierdzeniem. Udano się do największego w tamtym czasie autorytetu - Carla Friedricha Gaussa, który jednak wycofał się, bojąc się - jak pisał - wrzasku Beotów. Do problemu należało się jednak odnieść. Odważyło się na to dwóch młodych ludzi, którzy uparli się nie tylko na uprawianie tej geometrii, ale wręcz głosili jej równoprawność. Rosjanin,  Nikołaj Łobaczewski oraz Węgier - Janos Bolyai, niezależnie od siebie opublikowali prace w których - chociaż odmiennie - nowa geometria była konsekwentnie wyprowadzona. Obu odkrywców spotkała też za to kara, Łobaczewski został wręcz zmuszony do opuszczenia katedry.

\vspace{3mm}
Sprawę nowej geometrii (nazywanej już geometrią Bolyaia-Łobaczewskiego) przejął Felix Klein. Postawił on tezę, że jeżeli za pomocą geometrii euklidesowej jesteśmy w stanie przedstawić tę nieeuklidesową - i odwrotnie, to oba modele są sobie w istocie równoważne. Opublikował też w 1870 roku dzieło, w którym dowiódł równoprawności obu modeli.

Dosadnie do nowego modelu odniósł się fizyk - Hermann Helmholtz, publikując pracę, w której określił matematykę jako skrzynkę z narzędziami dla nauk przyrodniczych, czym odebrał jej walor nauki przyrodniczej jako takiej.

[^axioms]: [Geometria euklidesowa. Encyklopedia PWN](https://encyklopedia.pwn.pl/haslo/geometria-euklidesowa;3904959.html)
[^proklos_annotation]: [Najgłupiej postawiony problem matematyki. Marek Kordos - Delta, maj 2012](http://www.deltami.edu.pl/temat/matematyka/geometria/planimetria/2012/04/25/Dowody_V_postulatu_Euklidesa/)

\newpage\null\newpage

# Analiza problemu

__W tym rozdziale przedstawiona będzie analiza problemu, opis matematyczny modelu płaszczyzny dysku Poincaré oraz przegląd kilku wybranych modeli geometrii nieeuklidesowej.__

\vspace{3mm}
Odkrycie, że piątego aksjomatu nie można udowodnić na podstawie pozostałych czterech aksjomatów, było dla naukowców niespodzianką. Zrobiono to, demonstrując istnienie geometrii, w której pierwsze cztery aksjomaty utrzymywały się, ale piąty nie. Debata nad piątym postulatem Euklidesa stworzyła problem, jak powinna wyglądać alternatywna geometria. Umiano pokazać zaledwie poszczególne właściwości takich geometrii. Pierwszy model geometrii nieeuklidesowej został stworzony przez Kleina. W sprawę zaangażowało się wielu matematyków, w tym również Bernard Rieman. Stwierdził on, że można opisać nieskończenie wiele struktur matematycznych, które nie będą spełniały postulatów Euklidesa, będąc dalej geometriami.

## Podstawowy podział

Geometria nieeuklidesowa to każda geometria, która nie spełnia przynajmniej jednego z postulatów Euklidesa. Geometrie nieeuklidesowe możemy podzielić na dwa rodzaje:

![Trójkąt oraz dwie proste przedstawione na powierzchni o geometrii hiperbolicznej](figures/hyp-triangle.png){ width=250px }

### Geometria Łobaczewskiego-Bolyaia (hiperboliczna)

  Geometria hiperboliczna jest bliżej związana z geometrią euklidesową, niż się wydaje. Jedyną różnicą aksjomatyczną jest postulat równoległy. Po usunięciu postulatu równoległego z geometrii euklidesowej geometria wynikowa jest geometrią absolutną. Wszystkie twierdzenia o geometrii absolutnej, w tym pierwsze 28 twierdzeń zaprezentowanych przez Euklidesa, obowiązują w geometrii zarówno euklidesowej jak i hiperbolicznej.

  \vspace{3mm}
  W modelu hiperbolicznym, w płaszczyźnie dwuwymiarowej, dla dowolnej linii $L$ i punktu $X$, który nie jest na $L$, istnieje nieskończenie wiele linii przechodzących przez $X$, które nie przecinają $L$.

### Geometria Riemanna (eliptyczna)

  Geometria eliptyczna jest geometrią nieeuklidesową o dodatniej krzywiźnie, która zastępuje postulat równoległy stwierdzeniem "przez dowolny punkt na płaszczyźnie, nie ma linii równoległych do danej linii". Geometria eliptyczna jest czasem nazywana również geometrią Riemannowską. Model można wizualizować jako powierzchnię kuli, na której linie przyjmowane są jako wielkie koła. W geometrii eliptycznej suma kątów trójkąta wynosi więcej niż 180 stopni.
  
  \vspace{3mm}
  W modelu eliptycznym dla dowolnej linii $L$ i punktu $X$, który nie jest na $L$, wszystkie linie przechodzące przez $X$ przecinają $L$.

### Różnice pomiędzy geometriami

Sposobem opisania różnic między tymi geometriami jest rozważenie dwóch linii prostych rozciągniętych w nieskończoność w płaszczyźnie dwuwymiarowej, które są prostopadłe do trzeciej linii:

- W geometrii euklidesowej linie pozostają w stałej odległości od siebie (co oznacza, że linia narysowana prostopadle do jednej linii w dowolnym punkcie przecina drugą linię, a długość odcinka linii łączącego punkty przecięcia pozostaje stała) i są znane jako równoległe.
\vspace{3mm}

- W geometrii hiperbolicznej linie _zakrzywiają się_ od siebie, zwiększając odległość w miarę przesuwania się dalej od punktów przecięcia ze wspólną prostopadłą; linie te są często nazywane ultraparallelami.
\vspace{3mm}

- W geometrii eliptycznej linie _zakrzywiają się_ do siebie i w końcu przecinają.

\vspace{3mm}
Omawiane różnice pokazane są na poniższym rysunku.

![Zachowanie linii ze wspólną prostopadłą w każdym z trzech rodzajów geometrii](figures/noneuclid.png)

Ta praca skupia się na geometrii hiperbolicznej.  
Istnieje kilka możliwych sposobów wykorzystania części przestrzeni euklidesowej jako modelu płaszczyzny hiperbolicznej. Wszystkie te modele spełniają ten sam zestaw aksjomatów i wyrażają tę samą abstrakcyjną płaszczyznę hiperboliczną. Dlatego wybór modelu nie ma znaczenia dla twierdzeń czysto hiperbolicznych, jednak różnica występuje podczas ich wizualizacji.  
Następne podrozdziały są poświęcone krótkiemu omówieniu najpopularniejszych z nich.

## Popularne modele geometrii hiperbolicznej

Geometria hiperboliczna została opisana za pomocą wielu modeli. Poniższej zaprezentowano cztery popularne modele.

### Model Kleina

Model Kleina - a w zasadzie model dysku Beltrami–Kleina jest modelem geometrii hiperbolicznej, w którym punkty są reprezentowane przez punkty we wnętrzu dysku. Przyjmuje on następujące założenia:

- __Płaszczyzną hiperboliczną__ jest wnętrze koła bez krawędzi.
\vspace{1mm}
- __Prostymi hiperbolicznymi__ są cięciwy tego koła (końce prostej).
\vspace{1mm}
- __Proste będą prostopadłe__ wtedy, gdy przedłużenie jednej z nich przechodzi przez punkt przecięcia stycznych do obu linii.

![Przykład kilku linii na modelu Kleina](figures/klein_model.png){ width=250px }

Linie w modelu pozostają proste, a cały model można łatwo osadzić w ramach rzeczywistej geometrii rzutowej. Model ten nie jest jednak zgodny, co oznacza, że kąty są zniekształcone, a okręgi na płaszczyźnie hiperbolicznej na ogół nie są okrągłe w modelu.

![Graficzne zobrazowanie kół w modelu Kleina](figures/klein_circles.png){ width=250px }

### Model półpłaszczyzny Poincaré

Model półpłaszczyzny Poincaré to model dwuwymiarowej geometrii hiperbolicznej, jest to płaszczyzna:
$$ {\{(x, y) \mid y > 0; x, y \in \mathbb {R} \}} $$

![Przykład tesselacji w modelu półpłaszczyzny Poincaré](figures/halfplane_tesselation.png){ width=250px }

Model nosi imię Henri Poincaré, ale został stworzony przez Eugenio Beltrami, który użył go wraz z modelem Kleina i modelem dysku Poincaré, aby pokazać, że geometria hiperboliczna jest równie spójna, jak spójna jest geometria euklidesowa. Omawiany model jest zgodny, co oznacza, że kąty zmierzone w punkcie modelu są równe kątom na płaszczyźnie hiperbolicznej.

### Model dysku Poincaré

Model Poincaré geometrii hiperbolicznej wykorzystuje wnętrze dysku jednostkowego:

$$
  K = \{(x,y)\in\mathbf{R}^2: x^2 + y^2 <1\}~.
$$
Zauważmy, że zbior ten można utożsamiać ze zbiorem liczb zespolonych:

$$
K^* = \{z \in \mathbf{C}: |z| < 1\}.
$$

Dokładniej:
\begin{itemize}
\item punktami hiperbolicznymi są elementy zbioru $K^*$.
\item odległość pomiędzy punktami $z_1, z_2 \in K^*$ wyraża się wzorem 
\begin{equation}
\label{eq:distH}
d_H(z_1,z_2) = \ln\left( \frac{|1-z_1 \cdot \overline{z_2}| + |z_1-z_2|}{ |1-z_1 \cdot \overline{z_2}| - |z_1-z_2|} \right)~,
\end{equation}
gdzie $|z|$ oznacza normę liczby zespolonej $z$ oraz $\overline{z}$ oznacza sprzężenie liczby zespolonej $z$.
\end{itemize}

W modelu tym liniami hiperbolicznymi są to łuki koła prostopadłe do okręgu jednostkowego. 
Linie hiperboliczne przechodzace przez środek dysku jednostkowego degeneruja sie do średnic. 
Kąty pomiędzy liniami hiperbolicznymi sa mierzone jako katy euklidesowe miedzy stycznymi w punkcie przeciecia
![Przykład kilkunastu linii w modelu dysku Poincaré](figures/poincare_disc_lines.png){ width=250px }

Długość krzywych na dysku Poincaré mierzy się za pomocą tak zwanego tensora metrycznego, który wyraża się wzorem
$$
  ds^2 = 4 \frac{dx^2+dy^2}{(1-(x^2+y^2))^2} ~.
$$

Oznacza to, że w celu wyznaczenia długości krzywej $\gamma= (\gamma_1,\gamma_2):[a,b] \to K$ 
na dysku Poincaire należy obliczyć całkę oznaczoną:

$$
  L_{\gamma} =\int\limits_{a}^{b} \frac{2 \sqrt{\gamma_1'(t)^2 + \gamma_2'(t)^2}}{1-(\gamma_1(t)^2+\gamma_2(t)^2)} dt ~,
$$

gdzie $\gamma_i'(t)$ oznacza pochodną $i$-tej współrzędnej krzywej $\gamma$ w punkcie $t$.

\paragraph{Długość odcinka.}
Niech $0\leq r <1$. Stosując ten wzór do odcinka (w klasycznej geometrii) $\gamma(t) = (t,0)$ dla $t\in [0,r]$ otrzymujemy wzór:

$$
  L_{\gamma} = \int\limits_0^r \frac{2 }{1-t^2} dt = \ln\left(\frac{1 + r}{1 - r}\right)~.
$$

Jest to wzór zgodny ze wzorem (\ref{eq:distH}):

$$
d_h(0,r) = \ln\left(\frac{|1-0\cdot\overline{r}|+|0-r|}{|1-0\cdot\overline{r}|-|0-r|}\right) = \ln\left(\frac{1+r}{1-r}\right) ~.
$$

Widzimy więc, że długość (w sensie odległości na dysku Poincaré) odcinka o końcach $(0,0)$ i $(r,0)$ pokrywa się z odległością $d_h$ między tymi punktami.

Zauważmy, że $\lim_{r\to 1-} d_H((0,0),(r,0)) = \infty$. Oznacza to, że odległości punktów dysku Poincaré od jego środka rosną do nieskończoności wraz ze zbliżaniem się do jego brzegu $\{(x,y)\in\mathbf{R}^2:x^2+y^2=1\}$.

![Przykład tesselacji w modelu dysku Poincaré](figures/poincare_disk_tesselation.png){ width=250px }

\paragraph{Obwód koła.}
Załóżmy ponownie, że $0< r <1$. Obliczymy długość okręgu $\{(x,y): x^2+y^2 = r^2\}$ na dysku Poincaré.
W tym celu rozważamy krzywą $\gamma(t) = (r\cos(t),r\sin(t))$ dla $t\in[0,2\pi]$ i otrzymujemy
\begin{equation}
\label{eq:circle}
L_r =\int\limits_{0}^{2\pi} 
     \frac{ 2 \sqrt{r^2 \sin^2(t) + r^2 \cos^2(t)}}
           {1-(r^2\cos^2(t)+r^2 \sin^2(t))} dt = 
     \int\limits_{0}^{2\pi} \frac{ 2 r } {1- r^2} dt =
       \frac{4 \pi  r}{1-r^2}~.
\end{equation}
Widzimy więc, że $\lim_{r\to 1-} L_r = \infty$. 

Rozważmy teraz zbiór $C_R=\{(x,y)\in K: d_H((x,y),(0,0)) = R\}$. Zauważmy, że
$$
  (d_H((r,0),(0,0)) = R) \equiv \left(\ln\frac{1+r}{1-r} = R\right) \equiv \left(r=\frac{e^{R}-1}{e^{R}+1}\right)
$$
Po podstawieniu wzoru $r= (e^R-1)/(e^R+1)$ do formuły (\ref{eq:circle}) otrzymujemy
$$
  L_{C_r} = \pi\left( e^{R} - e^{-R}\right)
$$
Oznacza to, że dla dużych $R$ okrąg o środku w puncie $(0,0)$ i promieniu $R$ ma w przybliżeniu długość $\pi\cdot e^R$.

### Model Hemisfery

Hemisfera nie jest często używana jako model płaszczyzny hiperbolicznej. Jest jednak bardzo przydatna w łączeniu różnych innych modeli za pomocą różnych rzutów, jak pokazano na poniższym rysunku.

- __Punkty hiperboliczne__ to punkty na półkuli południowej.
\vspace{1mm}
- __Linie hiperboliczne__ to półkola powstałe z przecięcia półkuli południowej z płaszczyznami prostopadłymi do równika.

\begin{figure}[H]
\includegraphics[width=250px]{figures/hemisphere.png}
\centering
\caption{Rzut na dysk Poincaré (a) i projekcja do modelu Klein-Beltrami (b) [Martin Freiherr von Gagern, Creation of Hyperbolic Ornaments]}
\end{figure}

Wadą omawianego rozwiązania, jest dodatkowy wymiar, jaki należy rozpatrzeć podczas implementacji, co komplikuje pracę z tym modelem.

## Uzasadnienie wyboru modelu dysku Poincaré

Jak zaznaczono na wstępie, kolejne rozdziały, a także opisane implementacje będą prawie wyłącznie korzystać z modelu dysku Poincaré. Wydaje się to być właściwym wyborem, z uwagi na wartości estetyczne i wspomnianą zgodność tego modelu.

![Porównanie modeli Kleina, dysku Poincaré i półpłaszczyzny Poincaré](figures/models_comparision.png)

\newpage\null\newpage

# Projekt systemu

__W tym rozdziale przedstawiony zostanie szczegółowy projekt systemu, jego matematyczna interpretacja, zależności pomiędzy klasami oraz podstawowe algorytmy składające się na logikę funkcjonowania silnika.__

## Cykl pracy silnika

Głównym plikiem silnika jest `main.ts` znajdujący się w katalogu `/src`. Po uruchomieniu programu, tworzy on instancje klasy `Canvas` odpowiedzialnej za rysowanie elementów na ekranie, ładuje konfiguracje wyświetlanego programu i tworzy pętlę silnika poprzez wywołanie metody `createLoop()` klasy `Engine`.

\vspace{3mm}

Moduł odpowiedzialny za renderowanie obrazu znajduje się w pliku `canvas.ts`. Konstruktor klasy `Canvas` przyjmuje element `canvas` ze strony `index.html` oraz jego kontekst. Następie inicjuje się poprzez wywołanie funkcji `setupCanvas()`, która ustala szerokość i wysokość elementu. W każdym cyklu silnika, wywoływana jest funkcja `drawOverlay()`, która resetuje element do podstawowego widoku. Kolejne funkcje klasy odpowiadają za rysowanie punktów, linii, łuków i wielokątów. Klasa udostępnia też funkcje zmiany koloru rysowanych elementów i grubości linii.

![Diagram klasy Canvas](figures/program_canvas.png){ width=200px }


Klasa `Engine` przyjmuje konfigurację z pliku `/assets/config.json`, która ustala ilość FPS. Jednocześnie wywołuje metodę `drawOverlay()` klasy `Canvas` i uruchamia funkcję `onLoop()` z programu. Konfiguracja programu dostarczona jest z pomocą wzorca _dependency injection_ w parametrach konstruktora.

![Diagram klasy Engine](figures/program_engine.png){ width=200px }

Odtwarzany program tworzony jest poprzez wywołanie instancji klasy, dziedziczącej po abstrakcyjnej klasie `Program`, która udostępnia metody takie jak `onLoop()`.

![Diagram klasy Program](figures/program_program.png){ width=200px }

## Typy obiektów renderowanych przez silnik

Każdy możliwy do narysowania obiekt jest instancją jednej z klas. W kodzie silnika istnieje wyraźny podział na klasy udostępniające obiekty rysowane w przestrzeni euklidesowej i hiperbolicznej. Źródła wszystkich elementów znajdują się w katalogu `/src/core/entity`.  
Kolejne rozdziały są poświęcone opisie i interpretacji poszczególnych klas.

<!-- ![Diagram UML głównych składowych aplikacji](figures/diagram.png) -->
\includepdf{figures/diagram.pdf}

## Obiekty geometrii Euklidesowej

Instancje klas opisanych poniżej są obiektami rysowanymi finalnie przez silnik. Zdefiniowanie ich jest konieczne, gdyż na płaskim ekranie całość sprowadza się do rysowania linii, łuków, kół i punktów w przestrzeni euklidesowej. Każdy element przestrzeni hiperbolicznej zawiera instancję przynajmniej jednej z poniższych klas. Właśnie one są interpretowane i rysowane przez klasę `Canvas`.

### Klasa Point

Konstruktor klasy `Point` przyjmuje dwie zmienne typu `number`, które są reprezentacją bezwzględnych koordynatów punktu na płótnie. Programista może skorzystać z metod `toHypPoint(plane: Plane): HypPoint` oraz `inversion(plane: Plane)`.  

Funkcja `inversion(plane: Plane)` przyjmuje instancję klasy `Plane` (sfery hiperbolicznej) i zwraca dla niej koordynaty punktu w interfejsie klasy `HypPoint`, natomiast funkcja `inversion(plane: Plane)` zwraca punkt będący inwersją tego punktu względem płaszczyzny `Plane`. Funkcja `inversion` odgrywa ważną rolę w obliczaniu zakrzywień linii na przestrzeni hiperbolicznej.

![Przykład inwersji punktu P względem okręgu](figures/inversion.png){ width=200px }

### Klasa Line

Konstruktor klasy `Line` przyjmuje dwie zmienne typu `number`. Programista może skorzystać z metody `at(x: number): number`, która zwraca wartość w punkcie `x` oraz `intersectPoint(line: Line): Point`, która zwraca punkt przecięcia tej lini z inną linią.  

Alternatywnymi sposobami na stworzenie instancji klasy `Line` jest skorzystanie ze statycznych metod:  

- `fromPoints(p: Point, q: Point)` - Metoda tworzy linię z dwóch punktów.  

- `fromPointSlope(p: Point, q: number)` - Metoda do stworzenia linii potrzebuje podania punktu i kąta wyrażonego w radianach.

### Klasa Circle

Konstruktor klasy `Circle` przyjmuje punkt centralny będący instancją klasy `Point` i średnicę typu `number` oraz udostępnia metodę `intersectPoints(circle: Circle): [Point, Point]`, przyjmującą drugi okrąg i zwracającą parę punktów, w których przecinają się oba obiekty. Funkcja `fromPoints(p: Point, q: Point, r: Point)` udostępnia alternatywny sposób tworzenia okręgu z trzech obiektów klasy `Point`. Algorytm za to odpowiedzialny opisany jest poniżej.

### Klasa Plane

Najważniejszym z pośród omawianych dotychczas elementów jest klasa `Plane`, będąca singletonem i 'punktem odniesienia' do wszystkich obiektów dla geometrii hiperbolicznej.  

Klasa `Plane` dziedziczy po klasie `Circle`. Podobnie jak ona - posiada centrum i średnicę, które liczone są jednak automatycznie na podstawie szerokości i wysokości ekranu przy pierwszym wywołaniu instancji klasy.

## Obiekty geometrii hiperbolicznej

Kod źródłowy klas opisanych poniżej znajduje się w oddzielnym katalogu silnika - `/hyperbolic`. Każdy z tych obiektów opisuje byt geometrii hiperbolicznej rysowany następnie przez silnik w formie prostych linii, okręgów i łuków.

### Klasa HypLine

Klasa `HypLine` jest pierwszą z pośród klas obiektów hiperbolicznych. Konstruktor klasy przyjmuje - podobnie jak klasy `Line` - dwa punkty oraz dodatkowo instancję klasy `Plane`.  

Klasa zezwala na następujące operacje:

- Funkcja `calculateArc(p: Point, q: Point, plane: Plane): Circle` za pomocą algorytmu opisanego poniżej, zwraca instancję klasy `Circle`. Jest ona w istocie opisem okręgu, na obwodzie którego leży dana prosta hiperboliczna.

- Funkcja `cutIfSticksOut(point: Point, circle: Circle, plane: Plane): Point` ustala punkty `p` i `q` wyznaczające końce odcinka oraz sprawdza, czy punkt nie leży poza granicą koła wyznaczonego przez obiekt klasy `Plane`. W takim przypadku przesuwa dany punkt na punkt przecięcia obu okręgów używając do tego wspomnianej już metody `intersectPoints(circle: Circle): [Point, Point]`.  

\vspace{1mm}
__Konstrukcja linii hiperbolicznej na podstawie dwóch punków:__
\vspace{1mm}

  > Niech A i B będą punktami na dysku Poincaré, a punkty $A'$ i $B'$ będą ich inwersjami na płaszczyźnie `Plane`. Potrzebujemy okręgu przez A i B, który jest prostopadły do `Plane`.
  
![Konstrukcja linii w przestrzeni hiperbolicznej](figures/line_contruction.png){ width=250px }

  > Podczas konstruowania okręgu przez A i B, dowolny z odbijanych punktów $A'$ lub $B'$ może być użyty do zdefiniowania okręgu. Jeśli jeden z punktów ma współrzędne $(0,0)$, należy użyć drugiego punktu ($(0,0)$ odzwierciedla nieskończoność, która w tym kontekście jest niezdefiniowanym punktem).

__Algorytm wyznaczania okręgu na podstawie dwóch punktów i płaszczyny:__

1. Sprawdź współrzędne punktu `p`: jeżeli są takie same jak współrzędne centrum Plane, przypisz `q` do zmiennej `validPoint`, w przeciwnym wypadku przypisz `p`.  

2. Oblicz dwusieczną punktów `p` i `q` oraz `q` i `validPoint.inversion(plane)`.

3. Znajdź centrum nowego okręgu będące punktem przecięcia obu linii z pomocą funkcji `intersectPoint` klasy `Line`.  

4. Znadź promień nowego okręgu licząc odległość euklidesową pomiędzy jednym z początkowych punków a punktem przecięcia dwusiecznych.

\vspace{3mm}

Ostatnią nieomówioną funkcją jest `countAngle(circle: Circle)`, określającą na podstawie wcześniej obliczonych punktów, początkowy i końcowy kąt łuku oraz kierunek, w jakim rysowany będzie ten łuk. Ma to znaczenie dla klasy `Canvas` i pomaga w ustaleniu, gdzie znajduje się wnętrze rysowanej figury.

### Klasa HypPoint

Klasa HypPoint to w rzeczywistości reprezentacja punktu względem płaszczyzny hiperbolicznej w dziedzinie $(-1, 1) \times (-1, 1) \in \mathbb {R} \times \mathbb {R}$.  

Klasa udostępnia metodę `toCanvasCoords(): Point`, zwracającą instancję tego samego punktu, nadającą się do wyświetlenia przez silnik. Funkcja `reflect(point: HypPoint): HypPoint` zwraca odbicie tego punktu względem innego, podanego w argumentach. Jest to wymagane do poprawnego rysowania obiektów na przestrzeni. Klasa zawiera również dwie prywatne, pomocnicze funkcje `times(point: HypPoint | number): HypPoint` oraz `over(point: HypPoint | number): HypPoint` służące kolejno do mnożenia lub dzielenia danego punktu przez stałą lub inny punkt.  

Najważniejszą metodą tej klasy jest `moebius(point: HypPoint, t: number): HypPoint`. Aby zrozumieć jej działanie potrzebne jest zdefiniowanie _Transformacji Möbiusa_ i jej udziału w obliczaniu punktu na przestrzeni dysku Poincaré. Opis zamieszono w punkcie __3.6__, na końcu tego rozdziału.

### Klasa HypPolygon

Konstruktor klasy `HypPolygon` przyjmuje dwie zmienne typu `Point` oraz instancję klasy `Plane`. Tworzy z nich wielokąt na przestrzeni hiperbolicznej.  

Wielokąt może zostać rozszerzony o kolejne punkty z pomocą metody `addVerticle(point: Point)`. Funkcja `getCompletePolygonLines(): HypLine[]` zwraca wszystkie odcinki wchodzące w skład wielokąta, wraz z jednym dodatkowym odcinkiem, łączącym pierwszy i ostatni wierzchołek. Funkcje `moebius(point: HypPoint, t: number): HypPolygon` oraz `reflect(point: HypPoint): HypPolygon` wykonują kolejno transformację Möbiusa oraz odbicie względem przekazanego punktu na wszystkich wierzchołkach wielokąta.  

Programista może skorzystać ze statycznej metody `fromVerticles(verts: Point[], plane: Plane): HypPolygon`, która przyjmuje tablicę punków oraz instancję klasy `Plane` i zwraca gotowy wielokąt.

### Klasa HypTile

Klasa `HypTile` jest nietypowa na tle swoich poprzedniczek. Konstruktor tej klasy jest prywatny, a stworzenie jej instancji odbywa się za pomocą jednej z trzech metod statycznych:

- `fromPolygon(polygon: HypPolygon, center: HypPoint, plane: Plane): HypTile` - funkcja tworzy obiekt klasy `HypTile` wykorzystując do tego instancję obiekty klasy `HypPolygon`
\vspace{3mm}

- `createNKPolygon(n: number, k: number, center: HypPoint, plane: Plane): HypTile` - Zwraca n-kąt o wielkości i kątach dobranych w ten sposób, by przy układaniu ich obok siebie, tworzyły przestrzeń będączą k-kątem (k = liczba n-gonów 'spotykających się' na każdym wierzchołku).
\vspace{3mm}

- `createRegularPolygon(numOfVerts: number, distance: number, center: HypPoint, plane: Plane, startAngle = 0): HypTile` - funkcja tworzy wielokąt foremny o podanych parametrach.
\vspace{3mm}

## Funkcje dodatkowe

Plik `geometry.ts` zawiera zestaw funkcji wspólnych dla wielu obiektów, lub nie powiązanych bezpośrednio z żadnym z nich. Są to głównie funkcje czysto matematyczno - geometryczne, takie jak odległość Euklidesowa lub liczenie dwusiecznej.

## Transformacja Möbiusa

\begin{theorem}
Transformacja Möbiusa jest funkcją na rozszerzonej płaszczyźnie zespolonej określoną równaniem

$$ f(z)={\frac{az+b}{cz+d}}, \: gdzie \: ad - bc \neq 0 $$
\end{theorem}

$$ transformacja \: Möbiusa = złożenie \: inwersji = izometrie \: hiperboliczne $$

__Hiperboliczne symetrie są modelowane jako przekształcenia Möbiusa:__ [^moebius]
\vspace{3mm}

Transformacje Möbiusa (zwane również homografiami) tworzą grupę geometryczną. Odwrócenie przestrzeni przez sferę ze środkiem w punkcie $O$ i promieniu $r$, odwzorowuje na siebie wszystkie promienie takie, że iloczyn punktu na tym promieniu wraz z jego obrazem jest równy $r^2$. Transformacje Möbiusa zachowują również kąty. Izometria geometrii hiperbolicznych to właśnie transformacje Möbiusa. W ten sposób, z ich pomocą możemy nawigować po przestrzeni hiperbolicznej, płynnie przesuwając punkt widzenia modelu dysku Poincaré.

![Przykładowa transformacja Möbiusa [Marshall Bern, Optimal Möbius Transformation]](figures/moebius.png){ width=250px }

Na użytek aplikacji i wybranego modelu użyty został zmodyfikowany wzór Transformacji Möbiusa. [^moebius_poincare]

\begin{theorem}
Transformacja wyrażona równaniem:

$$ f(z) = \beta \frac{z - \alpha }{\overline{\alpha }z - 1}, \: gdzie \: \left | \alpha  \right | < 1 \: i \: \left | \beta  \right | = 1 $$

zachowuje funkcje odległości Poincaré.
\end{theorem}

[^moebius]: [Hyperbolic Transformations, Chapter 17, Definition 17.1](http://homepages.gac.edu/~hvidsten/geom-text/web-chapters/hyper-transf.pdf)
[^moebius_poincare]: [Hyperbolic Transformations, Chapter 17, Corollary 17.12](http://homepages.gac.edu/~hvidsten/geom-text/web-chapters/hyper-transf.pdf)

\newpage\null\newpage

# Implementacja systemu

__W tym rozdziale omówiona zostanie technologia, konfiguracja oraz wdrożenie systemu wraz z krótkim opisem jego poszczególnych składowych i kodu źródłowego.__

## Opis technologii

Do implementacji systemu użyto języka `TypeScript` w wersji `3.6.3`, bundlera (transpilatora nowoczesnych wersji języka `JavaScript` do wersji zrozumiałych dla przeglądarek) `webpack` w wersji `2.3.3` oraz `SCSS` i  `HTML5` wraz z elementem `<canvas>` odpowiedzialnym za rysowanie grafiki na ekranie.  

Użyta została również funkcyjna biblioteka `ramda` w formie pomocniczej biblioteki _utilsowej_. Pełna lista wszystkich bibliotek wraz z ich wersjami znajduje się w pliku `package.json`, w katalogu głównym projektu na załączonej płycie CD.

## Konfiguracja systemu

Konfiguracja systemu potrzebna do zbudowania silnika znajduje się w całości w katalogu głównym.
Aplikacja budowana jest z plików źródłowych z pomocą konfiguracji webpackowej.  
Poniżej zamieszczono opisy i przeznaczenie poszczególnych plików oraz ogólny projekt całej aplikacji.

### Biblioteki projektu

Biblioteki potrzebne do zbudowania aplikacji wraz z ich wersjami znajdują się w pliku `package.json`.  
Instalują się one do katalogu `node_modules` po wpisaniu komendy `npm install`. Aby zbudować aplikacje potrzebne jest połączenie z internetem.

### Bundlowanie aplikacji

Do bundolwania aplikacji użyty został framework `webpack`. Jego konfiguracja znajduje się w pliku `webpack.config.js` w katalogu głównym. Określa ona, gdzie znajdują się pliki źródłowe, jakie mają rozszerzenia i w jaki sposób powinny być kompilowane. Do konfiguracji dołączone jest również rozszerzenie `style-loader`, które kompiluje pliki stylów o formacie `scss`.

### Konfiguracja języka

Język `Typescript` wymaga pliku `tsconfig.json` w katalogu głównym projektu. Plik tsconfig.json określa pliki główne i opcje kompilatora wymagane do skompilowania projektu.

## Pliki źródłowe silnika

![Schemat katalogów i plików źródłowych](figures/files.png){ width=300px }

Źródła systemu umieszczone są w całości w katalogu `/src/core`. Opis poszczególnych klas i przepływ pracy programu znajduje się w poprzednim rozdziale. Katalog `styles` zawiera plik styli, który budowany jest razem z resztą aplikacji z pomocą `webpacka`, natomiast folder `demo` zawiera programy demonstracyjne. Opis niektórych programów, co za tym idzie - możliwości silnika znajduje się poniżej. W katalogu `assets` znajduje się plik konfiguracyjny dla klasy `Canvas`.
\vspace{3mm}

Każdy program demonstracyjny dziedziczy po klasie `Program`. Klasa bazowa udostępnia metodę `onLoop()`, w której umieszcza się instrukcje do wykonania przez silnik oraz zmienna point definiująca aktualne położenie wskaźnika myszy. Instancja klasy `Canvas` dostarczana jest poprzez wzorzec `dependecy injection`.

### Polygon Demo

Program `Polygon Demo` prezentuje możliwości rysowania linii i wielokątów na dysku Poincaré. Klasa zawiera zmienną globalną `polygon` typu `HypPolygon`, która definiowana jest po wybraniu dwóch punków na dysku. Wybór punktu odbywa się poprzez klikniecie lewym przyciskiem myszy na ekranie.
\vspace{3mm}

Funkcja `onLoop()` zawiera instrukcje rysowania wielokąta, co ogranicza się do wywołania metody `canvas.drawHypPolygon(this.polygon)`. Podobnie działa rysowanie punktów i linii. Programista nie musi znać wewnętrznych implementacji, jedynie api udostępniane przez klasy silnika.
\vspace{3mm}

Program `Polygon` pokazuje również możliwości manipulowania grubością linii oraz kolorami płótna. W omawianym przykładzie jest to osiągnięte za pomocą wywołania funkcji klasy `Canvas` - `canvas.setColors("#FFF")`.

![Przykład wielokąta narysowany przy użyciu programu Polygon Demo](figures/polygon_demo.png){ width=200px }

### Interaction Demo

Program `Interaction Demo` zawiera wykorzystanie klasy `HypTile`. W każdym przebiegu pętli silnika, dookoła wskaźnika myszy zdefiniowanego zmienną `point`, z pomocą statycznej metody `createRegularPolygon()` tworzone są wielokąty foremne. Kąt obrotu każdej z figur jest zdefiniowany za pomocą zmiennej globalnej `rotate`. Po narysowaniu wszystkich figur, zmienna ta jest inkrementowana, następnie wyświetlana jest następna klatka obrazu.

![Przykładowe figury narysowane za pomocą programu Interaction Demo](figures/interaction_demo.png){ width=200px }

### Tesselation Demo

Program `Tesselation Demo` różni się od innych demonstracji: pętla silnika wyświetla raz już zdefiniowany obraz, rysując wszystkie kafelki umieszczone w tablicy `tiles` interfejsu `HypTile[]`. Konstruktor klasy wywołuje metodę `determineTiles()`, która tworzy pierwszy kafelek za pomocą statycznej metody `createNKPolygon()`, a następnie określoną ilość razy odbija jego obraz, co skutkuje wypełnieniem dysku przylegającymi do siebie kafelkami. Do tego celu została użyta opisana w poprzednim rozdziale funkcja `reflect()`.

!['Kafelkowanie' dysku wykonane przez program Tesselation Demo](figures/tesselation_demo.png){ width=200px }

## Pliki źródłowe pracy

Tekst tej pracy napisany został w języku `markdown`. Pliki źródłowe umieszczone są w katalogu `/docs` i budowane są za pomocą skryptu zamieszczonego w pliku `makefile` z wykorzystaniem programu `pandoc` i biblioteki `texlive`. Katalog `/docs/figures` zawiera statyczne pliki. Strona tytułowa napisana jest w języku `latex` i budowana jest osobno.

\newpage\null\newpage

# Instalacja i wdrożenie

__Rozdział zawiera informacje o sposobie zbudowania aplikacji w celu jej uruchomienia i opcjonalnie - wdrożenia na serwerze WWW.__

Do zbudowania aplikacji konieczny będzie menadżer pakietów `npm` w wersji przynajmniej `6.5.0` oraz środowisko uruchomieniowe języka `JavaScript` - `node.js` w wersji  `10.6.0` lub nowszej. Instalacja wymaganych pakietów odbywa się poprzez wpisanie w konsoli polecenia

``` BASH
npm install
```

w katalogu głównym projektu. Skrypt umożliwiający zbudowanie aplikacji wykonuje się poleceniem:

``` BASH
npm run build
```

Skutkuje to pojawieniem się w katalogu głównym folderu `/dist` z plikami, które wraz z plikiem `index.html` składają się na gotowy program możliwy do uruchomiania w przeglądarce.

![Wygląd aplikacji po uruchomieniu](figures/app_view.png)

## Serwer deweloperski

Stworzony program wspiera tryb deweloperski, w którym bieżące zmiany w kodzie automatycznie są kompilowane do plików wynikowych. Do uruchomienia trybu deweloperskiego potrzebne są pakiety instalowane poleceniem:

``` BASH
npm install
```

Wywołanie trybu odbywa się komendą:

``` BASH
npm run build-watch
```

## Wdrożenie na serwerze WWW

Projekt można umieścić na serwerze WWW. Sposób wdrożenia zależy od posiadanego serwera. Ze względu na dużą objętość zaleca się umieszczenie projektu bez katalogu `node_modules`. Do poprawnego działania projektu wystarczy plik `index.html` oraz katalog `/dist` pojawiający się po zbudowaniu aplikacji.

\newpage\null\newpage

# Podsumowanie

Udało się zrealizować główny cel pracy, jakim było skonstruowanie silnika graficznego służącego do obsługi grafiki na dysku Poincaré. Silnik ten umożliwia generowanie podstawowych obiektów graficznych: lini, okręgów, wieloboków. Przed przystąpieniem do realizacji projektu przeprowadzona została teoretyczna analiza zagadnienia. Poprawność zbudowanego silnika została przetestowana za pomocą kilku aplikacji. W szczególności: zastosowano go do wyświetlenia kilku przykładów tasselizacji dysku Poincaré.
\vspace{3mm}

Naturalnym sposobem rozszerzenia zbudowanego silnika graficznego jest rozszerzenie go o mechanizmy fakturowania za pomocą plików graficznych. Innym, bardziej ambitnym, możliwym rozszerzeniem zbudowanego narzędzia jest przekształcenie go w silnik służący do generowania grafiki dla trójwymiarowej geometrii hiperbolicznej.
\vspace{3mm}

Projekt został zrealizowany w języku TypeScript, będącym typowaną wersją języka JavaScript. Zdaniem autora użycie tego wariantu języka JavaScript znacznie przyśpieszyło proces budowania aplikacji.  
\vspace{3mm}

\newpage\null\newpage

# Bibliografia

[1] \hspace{3mm} Michael Hvidsten, _Exploring Geometry - Web Chapters_, 2017, Gustavus Adolphus College
\vspace{3mm}

[2] \hspace{3mm} Martin Freiherr von Gagern, _Creation of Hyperbolic Ornaments - Algorithmic and Interactive Methods_, 2010, Technischen Universitat Munchen
\vspace{3mm}

[3] \hspace{3mm} Joan Gómez, _Tam, gdzie proste są krzywe_, 2010, RBA Coleccionables. S. A.
\vspace{3mm}

[4] \hspace{3mm} Bjørn Jahren, _An introduction to hyperbolic geometry_, MAT4510/3510, August 2010
\vspace{3mm}

[6] \hspace{3mm} Marek Kordos, _O różnych geometriach_,  Warszawa 1987, Wydawnictwa Alfa
\vspace{3mm}

[7] \hspace{3mm} David Hilbert, _Foundations of Geometry_, Open Court Press, LaSalle, Illinois 1971
\vspace{3mm}

[8] \hspace{3mm} Frank Nielsen1and and Richard Nock, _Hyperbolic Voronoi diagrams made easy_, Sony Computer Science Laboratories Inc
\vspace{3mm}

[9] \hspace{3mm} Marshall Bern and David Eppstein, _Optimal Möbius Transformationfor Information Visualization and Meshing_, Univ.  of California
\vspace{3mm}

[10] \hspace{3mm} Marek Kordos, _Geometria Bolyaia–Łobaczewskiego_, DeltaMi, Sierpień 2018, Instytut Matematyki UW
\vspace{3mm}

[11] \hspace{3mm} Steve Szydlik, _Hyperbolic Constructions in Geometer’s Sketchpad_, December 21, 2001
\vspace{3mm}

[12] \hspace{3mm} Douglas N. Arnold and Jonathan Rogness, _Möbius Transformations Revealed_, Minneapolis 2008, Institute for Mathematics and its Applications
\vspace{3mm}

[13] \hspace{3mm} C. Series, _Hyperbolic Geometry_, MA448, 2008
\vspace{3mm}

[14] \hspace{3mm} Izabela Przezdzink, _Geometria Poincaré i Kleina_, Wrocław 2010, Uniwersytet Wrocławski Wydział Matematyki i Informatyki - Instytut Matematyczny
\vspace{3mm}

\newpage\null\newpage

# Zawartość płyty CD

Do pracy dołączono płytę CD o następującej zawartości:

- kod źródłowy programu znajdujący się w folderze `/src`
\vspace{3mm}
- gotową, zbudowaną w katalogu `/dist` aplikację
\vspace{3mm}
- katalog `/docs` zawierający kod źródłowy tej pracy
\vspace{3mm}
- plik w formacie `pdf` zawierający pracę
