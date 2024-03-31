import axios, { AxiosInstance } from "axios";
import ApiParams from "../config/_params/api.js";

const $api = axios.create({
  baseURL: ApiParams._defaults.baseURL,
  timeout: ApiParams._defaults.timeout,
  headers: { ...ApiParams._defaults.headers },
});

function buildSecondaryParams(_params: Record<string, number | string>) {
  const params = new URLSearchParams();
  Object.keys(_params).map((k) => params.set(k, _params[k].toString()));
  return params;
}

/**
 * Fetcher is a generic service that enables API calls
 * WARNING: Fetcher methods return a Promise and don't implement Error Cath
 */
class FetcherService {
  #api: AxiosInstance;

  /**
   * @param api {AxiosInstance | null} Unless an Axios instance is provided, the service uses the default
   */
  constructor(api: AxiosInstance | null = null) {
    this.#api = api || $api;
  }

  create(domain: string, params: Record<string, number | string> = {}) {}

  find(domain: string, params: Record<string, number | string> = {}) {
    let query = "/".concat(ApiParams.domains[domain] || "");

    query = params ? replaceURLParams(query, params) : query;
    // Due to "withDelete" option, replaceURLParams() modifies params and can make it empty
    query += params ? "?".concat(buildSecondaryParams(params).toString()) : "";

    return this.#api.get(query).then((r) => r.data);
  }

  update(domain: string, params: Record<string, number | string> = {}) {}

  delete(domain: string, params: Record<string, number | string> = {}) {}
}

function replaceURLParams(
  url: string,
  _params = {},
  withDelete = true
): string {
  let newURL = url;
  Object.keys(_params).map((k) => {
    newURL = newURL.replace(`:${k}`, _params[k]);
    if (withDelete) delete _params[k];
  });

  //console.debug(url, _params, newURL);

  return newURL;
}

export default FetcherService;
