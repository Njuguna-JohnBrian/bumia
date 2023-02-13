/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";

export interface IRequesHandler extends RequestHandler {
  keyword: string;
}

class ApiFeatures {
  public query: any;
  public queryString: IRequesHandler;
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

export default ApiFeatures;
