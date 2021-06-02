import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

function App() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfWidth, setPdfWidth] = useState(500);
	const appComponent = useRef<HTMLDivElement>(null);

	const handleLoadSuccess = ({ numPages }: any) => {
		setNumPages(numPages);
	};

	const nextPage = () => {
		setPageNumber(pageNumber + 1);
	};

	const previousPage = () => {
		setPageNumber(pageNumber - 1);
	};

	const handleResize = () => {
		if (appComponent && appComponent.current) {
			const newSize = appComponent.current.getBoundingClientRect().width;
			setPdfWidth((newSize * 80) / 100);
		}
	};

	useEffect(() => {
		if (appComponent && appComponent.current) {
			const tempPdfWidth =
				appComponent.current.getBoundingClientRect().width;
			setPdfWidth((tempPdfWidth * 90) / 100);
			window.addEventListener("resize", handleResize);
		}
	}, []);

	return (
		<div className="App" ref={appComponent}>
			<nav>
				<button onClick={previousPage}>Previous</button>
				<button onClick={nextPage}>Next</button>
			</nav>
			<Document
				file={`${process.env.PUBLIC_URL}/25-05-COVID-19_BOLETIM20210525.pdf`}
				onLoadSuccess={handleLoadSuccess}
			>
				<Page
					pageNumber={pageNumber}
					width={pdfWidth}
					renderTextLayer={false}
				/>
			</Document>
			<p>
				{pageNumber} of {numPages}
			</p>
		</div>
	);
}

export default App;
