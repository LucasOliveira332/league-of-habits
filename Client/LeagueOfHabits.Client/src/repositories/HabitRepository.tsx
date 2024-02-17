import { apiUrl } from '../../config/config';
import FetchHttpService from '../Services/FetchHttpService';
import LocalStorageService from '../Services/LocalStorageService';
import tokenResponseDTO from '../response/tokenReponseDTO';

export default class HabitRepository {
  async getCheckedDays() {
    const token: tokenResponseDTO = LocalStorageService.getItem<tokenResponseDTO>('Bearer')

    const method = 'GET';
    const header = { 'Content-Type': 'application/json',
                     'Authorization': token.tokenType + ' ' + token.accessToken};
    
    const request = new FetchHttpService()

    try{
      const response = await request.makeRequest(
        apiUrl + 'habit',
        method,
        header)

      if(!response){
        console.log('Get habits failed. No response received.')
      }else{
        const daysOfWeek: Date[]= response[0].completeDaysDate.map(date => new Date(date).getTime())

        return daysOfWeek
      }
    }catch(error){
      console.log("An error ocorred during get habits")
    }
    


  }
}

export { HabitRepository };
