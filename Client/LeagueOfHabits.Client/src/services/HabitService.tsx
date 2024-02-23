import { apiUrl } from '../../config/config';
import FetchHttpService from '../repositories/FetchHttpRepository';
import LocalStorageService from './LocalStorageService';
import TokenResponseDTO from '../response/tokenReponseDTO';

export default class HabitService {
  async getCheckedDays() {
    const token: TokenResponseDTO = LocalStorageService.getItem<TokenResponseDTO>('Bearer')

    const accessToken = token.tokenType + ' ' + token.accessToken

    const method = 'GET';
    const header = { 'Content-Type': 'application/json',
                     'Authorization': accessToken};
    


    try{
      const response = await FetchHttpService.makeRequest(
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

export { HabitService as HabitRepository };
