import { apiUrl } from '../../config/config.tsx';
import UserLoginDTO from '../Request/UserLoginDTO.tsx';
import FetchHttpService from '../Services/FetchHttpService.tsx';

class UserRepository {
  async login(user: UserLoginDTO) {
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    const request = new FetchHttpService()
    const response = await request.makeRequest(apiUrl + 'login', method, header, JSON.stringify(user))

    if(!response) console.log(response)

    console.log(response)
  }
}

export default UserRepository;
