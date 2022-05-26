import { GoodsInfo } from "@/types";
import { http } from "@/utils/http";

export interface OrderGoodsInfo extends GoodsInfo {
  goods_price_format: string;
  market_price_format: string;
  goods_number: number;
  shipping_enable: 0 | 1;
  rec_id: number;
}

export interface OrderInfo {
  shop_name: string;
  goods_amount: string;
  shipping_amount: string;
  goods: OrderGoodsInfo[];
}

export interface ConsigneeInfo {
  consignee: string;
  mobile: string;
  province_name: string;
  city_name: string;
  district_name: string;
  address: string;
}

export interface AmountStructure {
  end_amount: string;
  user_money: string;
}

export interface OrderDetailInfo {
  consignee: ConsigneeInfo | null;
  goods_list: OrderInfo[];
  user_money: string;
  total: AmountStructure;
  payment_list: { pay_id: number }[];
}

export const getOrderInfo = async (
  rec_type: number,
  address_id: string
): Promise<OrderDetailInfo> =>
  await http("/api/v4/trade/orderinfo", {
    method: "POST",
    data: { rec_type, address_id, type_id: 0 },
  });

export const useBalance = async (
  is_balance: 0 | 1,
  rec_type: 0 | 10,
  total: string
): Promise<AmountStructure> =>
  await http("/api/v4/trade/changesurplus", {
    method: "POST",
    data: { is_balance, rec_type, total },
  });

export const generateOrder = async (
  flow_type: 0 | 10,
  cart_value: string,
  pay_id: number,
  is_balance: 0 | 1,
  remarkArr: string[]
): Promise<string> => {
  const postscriptObj: { [key in string]: string } = {};
  for (const i in remarkArr) postscriptObj[`postscript[${i}]`] = remarkArr[i];
  return await http("/api/v4/trade/done", {
    method: "POST",
    data: {
      flow_type,
      cart_value,
      pay_id,
      is_balance,
      referer: "Applets",
      ...postscriptObj,
    },
  });
};