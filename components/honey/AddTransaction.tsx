import { useLocalRealm } from "@/libs/database/context";
import { Transaction } from "@/libs/database/scheama/transaction";
import { memo } from "react";
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Realm from "realm";
import Button from "../common/Button";

const AddTransaction = memo(() => {
  const realm = useLocalRealm();
  const addLemonHoneyWater = () => {
    realm.write(() => {
      realm.create<Transaction>("Transaction", {
        _id: new Realm.BSON.ObjectID(),
        amount: 9.9,
        paidDate: new Date(),
        items: [
          {
            _id: new Realm.BSON.ObjectID(),
            title: "柠檬蜂蜜水",
            price: 9.9,
            quantity: 1,
          },
        ],
      });
    });
  };

  const addBoxHoney = () => {
    realm.write(() => {
      realm.create<Transaction>("Transaction", {
        _id: new Realm.BSON.ObjectID(),
        amount: 9.9,
        paidDate: new Date(),
        items: [
          {
            _id: new Realm.BSON.ObjectID(),
            title: "蜂蜜便携装",
            price: 17,
            quantity: 1,
          },
        ],
      });
    });
  };

  const deleteAllTransactions = () => {
    realm.write(() => {
      const allTransactions = realm.objects<Transaction>("Transaction");
      realm.delete(allTransactions);
    });
  };

  return (
    <View style={styles.container}>
      <Button
        type="primary"
        title="1杯柠檬蜂蜜水"
        size="small"
        onPress={addLemonHoneyWater}
        style={styles.button}
      />
      <Button
        type="primary"
        title="1盒蜂蜜"
        size="small"
        onPress={addBoxHoney}
        style={styles.button}
      />
      <Button
        type="text"
        danger
        size="small"
        title="删除所有订单"
        onPress={deleteAllTransactions}
        style={styles.deleteButton}
      />
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    top: "20@vs",
    left: "3@s",
    flex: 1,
    rowGap: "10@vs",
  },
  button: {
    // width: "200@s",
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    marginTop: "200@vs",
  },
});

export default AddTransaction;
