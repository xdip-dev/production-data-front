import Cards from "./components/Cards";

function App() {
	return (
		<>
			<div className="grid">
				<div className="col-12 md:col-6 lg:col-3">
					<Cards title="Cannelaj" endpoint={"/cannelaj"} />
				</div>
				<div className="col-12 md:col-6 lg:col-3">
					<Cards title="Inj" endpoint={"/inj"} />
				</div>
			</div>
		</>
	);
}

export default App;
