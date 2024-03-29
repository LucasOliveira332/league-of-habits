import { RenderHeatMap } from './components/heatMap/HeatMap';
import './App.css';
import UserRepository from './services/UserService';
import UserLoginDTO from './request/UserLoginDTO';
import { HabitRepository } from './services/HabitService';

function App() {
  const userRepository = new UserRepository();
  const habitRepository = new HabitRepository();

  const user: UserLoginDTO = {
    email: 'lucas.g.oliveira10@hotmail.com',
    password: '£|m0g£3BG~60^4VPj+UxQTe?9',
  };

  return (
    <>
      <div id="main">
        <div className="habit-menu">
          <h1>habit-menu</h1>
          <button onClick={() => userRepository.login(user)}>LOGIN</button>
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
