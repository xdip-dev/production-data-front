import Cards from "./components/Cards";

function App() {
	return (
		<>
			<div className="grid">
				<div className="col-12 md:col-6 lg:col-3">
					<Cards title="Cannelaj" endpoint={"/cannelaj"} />
				</div>
				<div className="col-12 md:col-6 lg:col-3">
					<Cards title="Next one" endpoint={"/null"} />
				</div>
			</div>
		</>
	);
}

export default App;
