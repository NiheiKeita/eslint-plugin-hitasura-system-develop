import { noDifferentName } from "./rules/no-different-name";
import { notUsePushInMapRule } from "./rules/notUsePushInMap";

export const rules = {
  "no-different-name": noDifferentName,
  "no-use-push-in-map": notUsePushInMapRule
};