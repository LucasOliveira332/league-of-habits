interface ResponseFetchInterface {
  statusCode : number,
  promise : Promise<any>
}

interface FetchHttpServiceInterface {
   request(url: string, method: string, headers: Record<string, string> | undefined, body: string): Promise<ResponseFetchInterface>

class FetchHttpService implements FetchHttpServiceInterface {
  async request(url: string, method: string, headers: Record<string, string> | undefined, body: string): Promise<ResponseFetchInterface> {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body
    })

    return {
      statusCode: response.status,
      promise: response.status === 200 ? response.json(): Promise.resolve()
    }
  }
}