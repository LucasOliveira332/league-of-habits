import { apiUrl } from '../../config/config';
import FetchHttpService from '../Services/FetchHttpService';
import LocalStorageService from '../Services/LocalStorageService';
import tokenResponseDTO from '../response/tokenReponseDTO';

class HabitRepository {
  async getHabits() {

    const token: tokenResponseDTO = LocalStorageService.getItem<tokenResponseDTO>('Bearer')

    console.log(token.tokenType + ' ' + token.accessToken)

    console.log(token)
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
        console.log(response)
      }
    }catch(error){
      console.log("An error ocorred during get habits")
    }
    


  }
}

export { HabitRepository };
