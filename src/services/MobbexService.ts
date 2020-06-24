import axios from "axios";
import config from '../config'

const MobbexService = async (body: any) => {
  try {
    console.log(body);
    const response = await sendtoCheckout(config.urlCheckout, body);
    return { payment: response.data };
  } catch (e) {
    console.log(e);
  }
};

const sendtoCheckout = async (url: string, data: any) => {
  console.log("Start Payment");
  try {
    const response = await axios.post(url, data, {
      headers: {
        "x-api-key": config.apikey,
        "x-access-token": config.token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const methodPayment = async () => {
  const exampleUrl =
    "https://api.mobbex.com/p/sources/list/e463a332-242f-4f49-9962-714acb41f028?total=12500";
  try {
    const response = await axios.get(exampleUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default MobbexService;
