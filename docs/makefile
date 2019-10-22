all:
	pdflatex header
	pandoc -t html --css pandoc.css praca_inzynierska_maciej_hajduk.md -o temp.html
	wkhtmltopdf temp.html temp.pdf
	pdfunite header.pdf temp.pdf praca_inzynierska_maciej_hajduk.pdf
	make clean

clean:
	rm temp.html temp.pdf header.pdf header.aux header.log