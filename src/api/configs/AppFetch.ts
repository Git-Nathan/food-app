export class AppFetch {
  private APIHost: string;
  private config?: RequestInit;

  constructor(APIHost: string, config?: RequestInit) {
    if (config) {
      this.config = config;
    }
    this.APIHost = APIHost;
  }

  async get(url: string, config?: RequestInit) {
    return await fetch(this.APIHost + url, {
      method: "GET",
      ...this.config,
      ...config,
    });
  }

  async delete(url: string, config?: RequestInit) {
    return await fetch(this.APIHost + url, {
      method: "DELETE",
      ...this.config,
      ...config,
    });
  }

  async put(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return await fetch(this.APIHost + url, {
      method: "PUT",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });
  }

  async patch(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return await fetch(this.APIHost + url, {
      method: "PATCH",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });
  }

  async post(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return await fetch(this.APIHost + url, {
      method: "POST",
      body: typeof data === "object" ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    });
  }
}
