export default class FetchHttpService {
  static async makeRequest(url: string, method: string, headers: Record<string, string> | undefined, body?: string): Promise<any> {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body
    });

    if (!response.ok) return response.status
    return response.json();
  }
}
