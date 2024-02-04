import { apiUrl } from '../../config/config';
class HabitRepository {
  paramUrl: string;
  method: string;
  constructor(paramUrl: string, method: string) {
    (this.paramUrl = paramUrl), (this.method = method);
  }

  async getHabits() {
    try {
      const response = await fetch(apiUrl + this.paramUrl);
      const responseJson = response.json();
      return responseJson;
    } catch {
      return null;
    }
  }
}

export { HabitRepository };
