/// <reference types="qs" />
/// <reference types="express" />
declare const uploadsMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export default uploadsMiddleware;
