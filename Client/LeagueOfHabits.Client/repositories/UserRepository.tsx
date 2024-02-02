import { apiUrl } from '../config/config';
import { UserLoginDTO } from '../Request/UserLoginDTO.tsx';
class UserRepository {
  async login(user: UserLoginDTO) {
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    const response = await fetch(apiUrl + 'login', {
      method: method,
      headers: header,
      body: JSON.stringify(user),
    });

    const responseJson = await response.json();
    console.log(responseJson);
  }
}

export { UserRepository };
