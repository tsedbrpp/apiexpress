import axios from "axios";
// eslint-disable-next-line no-unused-vars
import ResponseState from "./IResponseState";


// eslint-disable-next-line require-jsdoc
export default class ApiServices {
  // eslint-disable-next-line require-jsdoc
  public async SheetReader(url: string): Promise<ResponseState> {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        // eslint-disable-next-line max-len
        return {error: null, jsonString: response.data, status: response.status, message: "ok"};
      } else {
        return {
          error: new Error("bad status"),
          jsonString: "",
          status: response.status,
          message: "Server error",
        };
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.status);
        return {
          error: error,
          jsonString: "",
          status: error.response.status,
          message: "Request made and server responded",
        };
        //  console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return {
          error: error,
          jsonString: "",
          status: 403,
          message: "Request error: you may not have permission",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return {
          error: error,
          jsonString: "",
          status: error.response.status,
          message: "request not set up correctly",
        };
      }
    }
  }
}
