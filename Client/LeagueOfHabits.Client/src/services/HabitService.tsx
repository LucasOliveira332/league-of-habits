import { apiUrl } from '../../config/config';
import FetchHttpService from '../repositories/FetchHttpRepository';
import LocalStorageService from './LocalStorageService';
import TokenResponseInterface from '../interface/TokenResponseInterface';
import CompleteDaysInterface from '../interface/CompleteDaysInterface';

export default class HabitService {
  async getCheckedDays() {
    const token: TokenResponseInterface = LocalStorageService.getItem<TokenResponseInterface>('Bearer')

    const accessToken = token.tokenType + ' ' + token.accessToken

    const method = 'GET';
    const header = { 'Content-Type': 'application/json',
                     'Authorization': accessToken};

    try{
      const response : CompleteDaysInterface[] = await FetchHttpService.makeRequest(
        apiUrl + 'Habit/CompleteDays',
        method,
        header)

      if(!response){
        console.log('Get habits failed. No response received.')
      }else{
        // Quantos habitos tem para hoje
        const mapList = response.map((habit) => {
          return habit.completeDays
        });
        console.log(mapList)
        const daysOfWeek: Date[]= response[0].completeDays.map(date => new Date(date).getTime())
        return daysOfWeek
      }
    }catch(error){
      console.log("An error ocorred during get habits")
    }
  }
}

export { HabitService as HabitRepository };
