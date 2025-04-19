import Realm from "realm";

export class TransactionItem extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  price!: number;
  quantity!: number;

  static schema: Realm.ObjectSchema = {
    name: "TransactionItem",
    properties: {
      _id: "objectId",
      title: "string",
      price: "double",
      quantity: "double",
      transaction: {
        type: "linkingObjects",
        objectType: "Transaction",
        property: "items",
      },
    },
    primaryKey: "_id",
  };
}
