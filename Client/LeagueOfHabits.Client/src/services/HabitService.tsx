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
        // const daysOfWeek: Date[]= response[0].completeDays.map(date => new Date(date).getTime())

        const completeDays = [
          {
            dayComplete: 1709521200000,
            habits: ["Corrida", "Estudo", "Academia"],
            Total: 3,
            ExpectedTotal: 5
          },
          {
            dayComplete: 1709607600000,
            habits: ["Corrida", "Estudo", "Academia", "Gym", "Reading"],
            Total: 5,
            ExpectedTotal: 5
          }
        ]

        return completeDays//daysOfWeek
      }
    }catch(error){
      console.log("An error ocorred during get habits")
    }
  }
}

export { HabitService as HabitRepository };
