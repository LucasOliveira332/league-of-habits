import { apiUrl } from '../config/config';
class UserRepository {
  private paramUrl: string;
  private method: string;
  constructor(paramUrl: string, method: string) {
    (this.paramUrl = paramUrl), (this.method = method);
  }

  login() {
    const method = 'Post';
    const headers = { 'Content-Type': 'application/json' };

    fetch(apiUrl + '/login');
  }
}
