import axios from "axios";
import config from "../config";
import { Order } from "../entity/Order";
import { OrderSended } from "../types/OrderSended";
import { OrderItem } from "../entity/OrderItem";

const MobbexService = async (body: any) => {
  try {
    console.log(body);
    const order = await Order.insert(body);
    const orderToSend = await Order.findOne(order.identifiers[0].id);
    body.items.forEach(async (element: any) => {
      await OrderItem.insert({
        quantity: element.quantity,
        item: element.item,
        total: element.total,
        order: orderToSend,
      });
    });
    const itemsToSend = await OrderItem.find({ where: { order: orderToSend } });
    const newOrder = createOrder(orderToSend, itemsToSend);
    const response = await sendtoCheckout(newOrder);
    return response;
  } catch (e) {
    console.log("Error in Mobbex Service", e);
    return "Error in Mobbex service";
  }
};

const createOrder = (order: any, itemsToSend: any) => {
  const items = itemsToSend.map(
    (element: { quantity: any; item: { name: any }; total: any }) => {
      return {
        quantity: element.quantity,
        description: element.item.name,
        total: element.total,
      };
    }
  );

  const newOrder: OrderSended = {
    total: order.total,
    currency: "ARS",
    items,
    return_url: "https://facebook.com",
    description: "Gracias por elegirnos !",
    reference: order.reference,
    options: {
      theme: {
        type: "light",
        background: "#4002c4",
        showHeader: true,
        header: {
          name: "NextDots",
          logo:
            "https://scontent.faep8-2.fna.fbcdn.net/v/t1.0-9/p960x960/72368501_1279612048876444_1648131903850545152_o.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=zgUNG4fSW_gAX9rmOCX&_nc_ht=scontent.faep8-2.fna&oh=34496ee606002b59d16eee17df040f12&oe=5F21042F",
        },
        colors: {
          primary: "#FF0000",
        },
      },
    },
  };
  return newOrder;
};

const sendtoCheckout = async (order: OrderSended) => {
  try {
    const response = await axios.post(
      "https://api.mobbex.com/p/checkout",
      order,
      {
        headers: {
          "x-api-key": config.apikey,
          "x-access-token": config.token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in checkout", error);
    return "Error in chekout";
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
