export default interface TokenResponseDTO{
  tokenType: string
  accessToken: string
  expiresIn: number
  refreshToken: string
}