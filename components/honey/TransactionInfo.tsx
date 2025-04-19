import { useLocalQuery } from "@/libs/database/context";
import { Transaction } from "@/libs/database/scheama/transaction";
import { memo, useEffect } from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const TransactionInfo = memo(() => {
  const allTransactions = useLocalQuery(
    {
      type: Transaction,
    },
    []
  );

  useEffect(() => {
    console.log("allTransactions", allTransactions);
  }, [allTransactions]);
  return (
    <View style={styles.container}>
      <Text style={styles.total}>{`订单总数: ${allTransactions.length}`}</Text>
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    bottom: "20@vs",
    left: "3@vs",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    fontSize: "12@s",
    // fontWeight: "bold",
  },
});
export default TransactionInfo;
