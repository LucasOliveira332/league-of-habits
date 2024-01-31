import { RenderHeatMap } from './Components/HeatMap/HeatMap';
import './App.css';

function App() {
  return (
    <>
      <div id="main">
        <div className="habit-menu">
          <h1>habit-menu</h1>
        </div>
        <div>
          <RenderHeatMap />
        </div>
        <div className="rank-table">
          <h1>Rank</h1>
        </div>
      </div>
    </>
  );
}

export default App;
