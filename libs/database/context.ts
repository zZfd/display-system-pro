import { createRealmContext } from "@realm/react";
import { Transaction } from "./scheama/transaction";
import { TransactionItem } from "./scheama/transactionItem";

/**
 * @description Local Realm Context
 * version: Changes logs.
 * 1: Initial version.
 *  - Transaction
 *  - TransactionItem
 */
const LocalRealmContext = createRealmContext({
  schema: [Transaction, TransactionItem],
  schemaVersion: 1,
  path: "local.realm",
});

export const {
  RealmProvider: LocalRealmProvider,
  useRealm: useLocalRealm,
  useObject: useLocalObject,
  useProgress: useLocalProgress,
  useQuery: useLocalQuery,
} = LocalRealmContext;
