import { apiUrl } from '../../config/config.tsx';
import UserLoginDTO from '../request/UserLoginDTO.tsx';
import FetchHttpService from '../Services/FetchHttpService.tsx';
import tokenResponseDTO from '../response/tokenReponseDTO.tsx'

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
        console.log(response.refreshToken)
      }
    }catch(error){
      console.log("An error occurred during login:", error);
    }
  }
}

export default UserRepository;
