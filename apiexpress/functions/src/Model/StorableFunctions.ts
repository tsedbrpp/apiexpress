

// eslint-disable-next-line no-unused-vars
import IStoreable from "./IStoreable";


// eslint-disable-next-line require-jsdoc
class StorableFunctions implements IStoreable {
  // eslint-disable-next-line require-jsdoc
  get id(): string | undefined {
    return this._id;
  }

  // eslint-disable-next-line require-jsdoc
  set id(value: string | undefined) {
    this._id = value;
  }

    private _id:string | undefined = "";
}
export default StorableFunctions;
