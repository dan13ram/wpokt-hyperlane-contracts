'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createAuthenticatedApi = exports.createApi = exports.rejectWithDefenderApiError = void 0;
const axios_1 = __importDefault(require('axios'));
const api_error_1 = require('./api-error');
function rejectWithDefenderApiError(axiosError) {
  return Promise.reject(new api_error_1.DefenderApiResponseError(axiosError));
}
exports.rejectWithDefenderApiError = rejectWithDefenderApiError;
function createApi(key, token, apiUrl, httpsAgent) {
  const instance = axios_1.default.create({
    baseURL: apiUrl,
    headers: {
      'X-Api-Key': key,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    httpsAgent,
  });
  instance.interceptors.response.use(({ data }) => data, rejectWithDefenderApiError);
  return instance;
}
exports.createApi = createApi;
function createAuthenticatedApi(username, session, apiUrl, httpsAgent) {
  const accessToken = session.getAccessToken().getJwtToken();
  return createApi(username, accessToken, apiUrl, httpsAgent);
}
exports.createAuthenticatedApi = createAuthenticatedApi;
