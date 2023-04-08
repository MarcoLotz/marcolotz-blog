enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}


if (!process.env.NEXT_PUBLIC_API_URL) {
  throw 'NEXT_PUBLIC_API_URL env var needs to be defined'
}


class HttpClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string, params?: { [key: string]: string }): Promise<T | any> {
    return await this.makeRequest(HttpVerb.GET, path, undefined, params);
  }

  async post<T>(path: string, body?: any): Promise<T | any> {
    return await this.makeRequest(HttpVerb.POST, path, body);
  }

  async put<T>(path: string, body?: any): Promise<T | any> {
    return await this.makeRequest(HttpVerb.PUT, path, body);
  }

  async delete<T>(path: string, params?: { [key: string]: string }): Promise<T | any> {
    return await this.makeRequest(HttpVerb.DELETE, path, undefined, params);
  }

  private async makeRequest<T>(method: HttpVerb, path: string, body?: any, params?: { [key: string]: string }) {
    const url = `${this.baseUrl}${path}${this.buildQueryParams(params)}`.replaceAll('//', '/');

    const response = await fetch(url, {
      method: method,
      body: body,
    })

    return response.json() as T;
  }

  private buildQueryParams(params?: { [key: string]: string }) {
    if (!params) return '';

    const stringfiedParams = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return '?' + stringfiedParams;
  }
}


export default new HttpClient(process.env.NEXT_PUBLIC_API_URL);
