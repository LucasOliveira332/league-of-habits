import { apiUrl } from '../../config/config.tsx';
import UserLoginDTO from '../request/UserLoginDTO.tsx';
import FetchHttpService from '../repositories/FetchHttpRepository.tsx';
import tokenResponseDTO from '../response/TokenReponseDTO.tsx'
import LocalStorageService from './LocalStorageService.tsx';

class UserRepository {
  async login(userCredentials: UserLoginDTO) {
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    const request = new FetchHttpService()
    try{
      const response: tokenResponseDTO = await request.makeRequest(
        apiUrl + 'login', 
        method, 
        header, 
        JSON.stringify(userCredentials))
  
      if(!response){
        console.log('Login failed. No response received.')
      } else{
        LocalStorageService.setItem(response.tokenType, response)
      }
    }catch(error){
      console.log("An error occurred during login:", error);
    }
  }
}

export default UserRepository;
