import { AxiosResponse } from "axios";
import BaseApi from "./baseApi";

// https://stocknewsapi.com/api/v1?tickers=FB&items=50&token=snvd2ra3xpoqmjrdzofytkwmceh5fhbvveygzi4j
// https://stocknewsapi.com/api/v1/category?section=general&items=50&token=snvd2ra3xpoqmjrdzofytkwmceh5fhbvveygzi4j

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTrending(queryParams: any): Promise<AxiosResponse<any>> {
    return BaseApi.get(
      `${queryParams.endpoint}?start="${queryParams.start}"&end="${queryParams.end}"&limit=${queryParams.limit}&token=${process.env.REACT_APP_API_KEY}`
    );
  },
  getRawData(queryParams: any): Promise<AxiosResponse<any>> {
    return BaseApi.get(
      `${queryParams.endpoint}?token=${process.env.REACT_APP_API_KEY}`
    );
  }
};