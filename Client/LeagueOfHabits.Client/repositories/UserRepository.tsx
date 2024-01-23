interface User {
    email: string,
    password: string
}

class UserRepository {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    login(user: User){
        const method = 'Post'
        const headers = {'Content-Type': 'application/json'} 

        fetch(this.baseUrl + '/login',)
    }
}

const baseUrl = 'https://localhost:7218/';

const userRepository = new UserRepository(baseUrl);

console.log(userRepository)