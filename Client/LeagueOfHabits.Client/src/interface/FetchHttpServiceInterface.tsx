export default interface FetchHttpServiceInterface {
  makeRequest(url: string, method: string, headers: Record<string, string> | undefined, body?: string): Promise<any>
}