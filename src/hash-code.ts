import * as _ from "lodash";
import { isNumber, isObject, isString } from "util";

export class HashCode {

  public static getHashCode(o: any): number {

    if (isNumber(o)) {
      return this._getHashCodeForNumber(o);
    }

    if (isString(o)) {
      return this._getHashCodeForString(o);
    }

    let hashCode = 385229220;

    _.forOwn(o, (value, key) => {
      if (isNumber(value)) {
        hashCode += HashCode._getHashCodeForNumber(value);
      } else if (isString(value)) {
        hashCode += HashCode._getHashCodeForString(value);
      } else if (isObject(value)) {
        _.forOwn(value, (value2, key2) => {
          hashCode += HashCode.getHashCode(value);
        });
      }
    });

    return hashCode;
  }

  private static _getHashCodeForNumber(n: number) {
    return n;
  }

  private static _getHashCodeForString(s: string): number {
    let hashCode = 385229220;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < s.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hashCode = (hashCode * -1521134295) ^ s.charCodeAt(i);
    }

    return hashCode;
  }
}
