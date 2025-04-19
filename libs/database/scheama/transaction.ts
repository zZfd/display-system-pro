import Realm, { ObjectSchema } from "realm";
import { TransactionItem } from "./transactionItem";

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  items!: Realm.List<TransactionItem>;
  amount!: number;
  paidDate!: Date;

  static schema: ObjectSchema = {
    name: "Transaction",
    properties: {
      _id: "objectId",
      items: "TransactionItem[]",
      amount: "double",
      paidDate: "date",
    },
    primaryKey: "_id",
  };
}
