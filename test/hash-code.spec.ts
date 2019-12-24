import * as chai from "chai";
import * as _ from "lodash";
import "mocha";

import { HashCode } from "../src/hash-code";

const expect = chai.expect;

describe("HashCode tests", () => {
  describe("getHashCode", () => {
    it("returns hashcode for number", () => {
      expect(HashCode.getHashCode(-100)).to.eq(-100);
    });

    it("returns same hashcode for same number", () => {
      expect(HashCode.getHashCode(2345515)).to.eq(HashCode.getHashCode(2345515));
    });

    it("returns different hashcode for different numbers", () => {
      expect(HashCode.getHashCode(2345515)).to.not.eq(HashCode.getHashCode(2345516));
    });
  });

  describe("getHashCode", () => {
    it("returns same hashcode for same string", () => {
      expect(HashCode.getHashCode("teqniqly")).to.eq(HashCode.getHashCode("teqniqly"));
    });

    it("returns different hashcode for different string", () => {
      expect(HashCode.getHashCode("teqniqly")).to.not.eq(HashCode.getHashCode("farooq"));
    });

    it("when same string differs by case hashcodes are different", () => {
      expect(HashCode.getHashCode("teqniqly")).to.not.eq(HashCode.getHashCode("Teqniqly"));
    });
  });

  describe("getHashCode", () => {
    describe("simple objects", () => {
      it("returns same hashcode for same objects", () => {
        const o = {
          founded: 2017,
          location: "US",
          name: "Teqniqly",
        };

        const copy = _.cloneDeep(o);

        expect(HashCode.getHashCode(o)).to.eq(HashCode.getHashCode(copy));
      });

      it("returns different hashcode for different objects", () => {
        const o = {
          founded: 2017,
          location: "US",
          name: "Teqniqly",
        };

        const copy = _.cloneDeep(o);
        copy.name = "teqniqly";

        expect(HashCode.getHashCode(o)).to.not.eq(HashCode.getHashCode(copy));
      });
    });

    describe("complex objects", () => {
      it("returns same hashcode for same objects", () => {
        const o = {
          founded: 2017,
          locations: [
            {
              employees: 10,
              location: "US",
              name: "HQ",
            },
            {
              employees: 3,
              location: "CAN",
              name: "CANHQ",
            },
          ],
          name: "Teqniqly",
        };

        const copy = _.cloneDeep(o);

        expect(HashCode.getHashCode(o)).to.eq(HashCode.getHashCode(copy));
      });

      it("returns different hashcode for different objects", () => {
        const o = {
          founded: 2017,
          locations: [
            {
              employees: 10,
              location: "US",
              name: "HQ",
            },
            {
              employees: 3,
              location: "CAN",
              name: "CANHQ",
            },
          ],
          name: "Teqniqly",
        };

        const copy = _.cloneDeep(o);
        copy.locations[0].employees = 20;

        expect(HashCode.getHashCode(o)).to.not.eq(HashCode.getHashCode(copy));
      });
    });
  });
});
