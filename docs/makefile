all:
	make withtemplate

withtemplate:
	pdflatex header
	pandoc -f markdown+tex_math_dollars+tex_math_single_backslash --template eisvogel -V lang=pl-PL -o temp_temp.pdf praca_inzynierska_maciej_hajduk.md
	pandoc -o temp.pdf -V lang=pl-PL praca_inzynierska_maciej_hajduk.md
	pdfunite header.pdf temp_temp.pdf praca_inzynierska_maciej_hajduk_temp.pdf
	pdfunite header.pdf temp.pdf praca_inzynierska_maciej_hajduk.pdf
	make clean

withhtml:
	pdflatex header
	pandoc -t html --css pandoc.css praca_inzynierska_maciej_hajduk.md -o temp.html
	wkhtmltopdf temp.html temp.pdf
	pdfunite header.pdf temp.pdf praca_inzynierska_maciej_hajduk.pdf
	make clean

clean:
	rm temp.html temp.pdf temp_temp.pdf header.pdf header.aux header.log || true