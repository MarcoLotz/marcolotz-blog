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

type Param = { [key: string]: string | number };
type Header = { [key: string]: string };

class HttpClient {
  public headers: Header;

  constructor(private baseUrl: string) {
    this.headers = {};
  }

  async get<T>(path: string, params?: Param): Promise<T | any> {
    return await this.makeRequest<T>(HttpVerb.GET, path, undefined, params);
  }

  async post<T>(path: string, body?: any): Promise<T | any> {
    return await this.makeRequest<T>(HttpVerb.POST, path, body);
  }

  async put<T>(path: string, body?: any): Promise<T | any> {
    return await this.makeRequest<T>(HttpVerb.PUT, path, body);
  }

  async delete<T>(path: string, params?: Param): Promise<T | any> {
    return await this.makeRequest<T>(HttpVerb.DELETE, path, undefined, params);
  }

  private async makeRequest<T>(method: HttpVerb, path: string, body?: any, params?: Param) {
    // Replace '//' in case of NEXT_PUBLIC_API_URL contains '/' at the end of the string
    // [!] Warning: Careful with 'http://' string
    let url = path + this.buildQueryParams(params);
    url = url.replaceAll('//', '/');

    if ([HttpVerb.POST, HttpVerb.PUT, HttpVerb.PATCH].includes(method))
      this.headers['Content-Type'] = 'application/json';

    const response = await fetch(this.baseUrl + url, {
      method: method,
      body: JSON.stringify(body),
      headers: this.headers
    })

    if (response.status !== 204)
      return response.json() as T;
  }

  private buildQueryParams(params?: Param) {
    if (!params) return '';

    const stringfiedParams = Object.keys(params).reduce((acc, key) => ({
      ...acc,
      [key]: params[key].toString()
    }), {});

    const searchParams = new URLSearchParams(stringfiedParams).toString();

    return '?' + searchParams;
  }
}

const api = new HttpClient(process.env.NEXT_PUBLIC_API_URL);
export default api;
