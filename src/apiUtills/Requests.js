import { asyncResponse, objectToCamelCase, objectToSnakeCase } from "./ResponseUtills";
import {Env} from "../Env";

export const REQUESTS_STATUS = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
}

class HttpError extends Error {
    code = null;
    codeText = null;
    errorText = null;

    constructor(code, codeText, errorText) {
        super(codeText);
        this.code = code;
        this.errorText = errorText;
    }
}

class GeneralRequest extends Function {
    method = null;
    url = null;
    log = false;
    mock;
    mockDelay;
    convertToCamelCase;
    returnMockOnLocal;
    returnStatusWithResult;

    constructor(url, options = {}) {
        super();
        const {
            mock = { success: true },
            mockDelay = 500,
            convertToCamelCase = false,
            returnMockOnLocal = false,
            returnStatusWithResult = false,
            log = false,
        } = options;

        this.url = url;

        this.mock = mock;
        this.mockDelay = mockDelay;
        this.convertToCamelCase = convertToCamelCase;
        this.returnMockOnLocal = returnMockOnLocal;
        this.returnStatusWithResult = returnStatusWithResult;
        this.log = log;

        return new Proxy(this, {
            apply: (target, thisArg, args) => {
                return target._call(thisArg, ...args);
            }
            });
        }

        getMockData(...args) {
            if(!this.mock) {
                return null;
            }
            if (typeof this.mock === 'function') {
                return this.mock(...args);
            }
            return this.mock;
        }

        async _call(...args) {
            if (Env.isUsingMockData || (Env.isLocalServerRun && this.returnMockOnLocal)) {
                const mockData = this.getMockData(...args);
                if (this.log) {
                    console._log(...args, mockData);
                }
                let result = await asyncResponse(mockData, this.mockDelay);
                if (this.convertToCamelCase) {
                    result = objectToCamelCase(result);
                }
                return result;
            }

        const res = await this._fetch(...args);

        if (this.log) {
            console._log(...args, res);
        }

        switch (res.status) {
            case REQUESTS_STATUS.UNAUTHORIZED:
            case REQUESTS_STATUS.BAD_REQUEST:
            case REQUESTS_STATUS.FORBIDDEN:
            case REQUESTS_STATUS.NOT_FOUND: 
            case REQUESTS_STATUS.NOT_ALLOWED:
            case REQUESTS_STATUS.CONFLICT:
            case REQUESTS_STATUS.UNPROCESSABLE_ENTITY:
            case REQUESTS_STATUS.SUCCESS:
            default:
                try{
                    let result = await res.json();

                    if (this.convertToCamelCase) {
                        result = objectToCamelCase(result);
                    }

                    if (this.returnStatusWithResult) {
                        return [result, res.status];
                    }
                    return
                } catch (e) {
                    console.error(`Error parsing response from ${this.url}:`, e);
                    throw new HttpError(res.status, res.statusText, 'Failed to parse response');
                }
        }

    }
}

export class PostRequest extends GeneralRequest {
    convertBodyToSnakeCase;

    /**
     * @param {string} url
     * @param {{
     * mock?: any,
     * convertBodyToSnakeCase?: boolean,
     * convertToCamelCase?: boolean,
     * mockDelay?: number,
     * returnMockOnLocal?: boolean, 
     * returnStatusWithResult?: boolean,
     * log?: boolean
     * }} options
     */
    constructor(url, options = {}) {
        super(url, options);
        const { convertBodyToSnakeCase = false } = options;

        this.convertBodyToSnakeCase = convertBodyToSnakeCase;
    }

    async _fetch(body){
        if (this.convertBodyToSnakeCase) {
            body = objectToSnakeCase(body);
        }

        const reqObject = {
            method: 'POST',
            body: JSON.stringify(body)};
        
       if (body && Object.keys(body).length > 0) {
            reqObject.headers = {
                'Content-Type': 'application/json',
            };
        }

        return await this._fetchWithReqObject(reqObject);
    }

    _log(body, res) {
        console.groupCollapsed(`POST ${this.url}`);
        if (this.convertBodyToSnakeCase){
            body = objectToSnakeCase(body);
        }
        console.info('Request body:', body);
        console.info('Response:', res);
        console.groupEnd();
    }
}

export class GetRequest extends GeneralRequest {
    convertBodyToSnakeCase;

    /**
     * @param {string} url
     * @param {{
     * mock?: any,
     * convertBodyToSnakeCase?: boolean,
     * convertToCamelCase?: boolean,
     * mockDelay?: number,
     * returnMockOnLocal?: boolean, 
     * returnStatusWithResult?: boolean,
     * log?: boolean
     * }} options
     */
    constructor(url, options = {}) {
        super(url, options);
        const { convertBodyToSnakeCase = false } = options;

        this.convertBodyToSnakeCase = convertBodyToSnakeCase;
    }

    UrlSearchParams(queryParams){
        if(!queryParams) {
            return '';
        }
        if (this.convertBodyToSnakeCase) {
            queryParams = objectToSnakeCase(queryParams);
        }
        return '?' + new URLSearchParams(queryParams).toString();
    }

    async _fetch(queryParams) {
        const reqObject = {
            method: 'GET',
            headers: {}
        };
        
        return await this._fetchWithReqObject(reqObject, this.UrlSearchParams(queryParams));
    }

    _log(queryParams, res) {
        console.groupCollapsed(`GET ${this.url}`);
        if (this.convertBodyToSnakeCase){
            queryParams = objectToSnakeCase(queryParams);
        }
        console.info('Query params:', queryParams);
        console.info('Response:', res);
        console.groupEnd();
    }
}
