
import StorableFunctions from "./StorableFunctions";

// eslint-disable-next-line require-jsdoc
export default class KnowledgeBase extends StorableFunctions {
  // eslint-disable-next-line require-jsdoc
  get publishedURL(): string | undefined {
    return this._publishedURL;
  }

  // eslint-disable-next-line require-jsdoc
  set publishedURL(value: string | undefined) {
    this._publishedURL = value;
  }
  // eslint-disable-next-line require-jsdoc
  get privateKb(): boolean | undefined {
    return this._privateKb;
  }

  // eslint-disable-next-line require-jsdoc
  set privateKb(value: boolean | undefined) {
    this._privateKb = value;
  }

  // eslint-disable-next-line require-jsdoc
  get userName() {
    return this._userName;
  }

  // eslint-disable-next-line require-jsdoc
  set userName(value) {
    this._userName = value;
  }
  // eslint-disable-next-line require-jsdoc
  get ruleObjects(): string | undefined {
    return this._ruleObjects;
  }

  // eslint-disable-next-line require-jsdoc
  set ruleObjects(value: string | undefined) {
    this._ruleObjects = value;
  }
  // eslint-disable-next-line require-jsdoc
  get spreadSheetURL(): string | undefined {
    return this._spreadSheetURL;
  }

  // eslint-disable-next-line require-jsdoc
  set spreadSheetURL(value: string | undefined) {
    this._spreadSheetURL = value;
  }
  // eslint-disable-next-line require-jsdoc
  get description(): string | undefined {
    return this._description;
  }

  // eslint-disable-next-line require-jsdoc
  set description(value: string | undefined) {
    this._description = value;
  }
  // eslint-disable-next-line require-jsdoc
  get title(): string | undefined {
    return this._title;
  }

  // eslint-disable-next-line require-jsdoc
  set title(value: string | undefined) {
    this._title = value;
  }
  // eslint-disable-next-line require-jsdoc
  get uid(): string | undefined {
    return this._uid;
  }

  // eslint-disable-next-line require-jsdoc
  set uid(value: string | undefined) {
    this._uid = value;
  }
  // eslint-disable-next-line require-jsdoc
  get createdAt(): number | undefined {
    return this._createdAt;
  }

  // eslint-disable-next-line require-jsdoc
  set createdAt(value: number | undefined) {
    this._createdAt = value;
  }
    private _privateKb:boolean | undefined
    private _createdAt:number | undefined;
    private _uid:string | undefined;
    private _userName: string | undefined;
    private _title: string | undefined;
    private _description: string | undefined;
    private _spreadSheetURL : string | undefined;
   private _ruleObjects : string | undefined;
    private _publishedURL: string | undefined;

    // eslint-disable-next-line max-len,require-jsdoc
    constructor(uid?:string, userName?:string | undefined, title?:string | undefined, description?:string | undefined, spreadSheetURl?:string | undefined,
        // eslint-disable-next-line max-len
        ruleObjects?:string | undefined, privateKb?:boolean | undefined, publishedURL?:string | undefined) {
      super();
      this.uid = uid;
      this.userName = userName;
      this.title = title;
      this.description = description;
      this.spreadSheetURL = spreadSheetURl;
      this.ruleObjects = ruleObjects;
      this.createdAt = Date.now();
      this.privateKb = privateKb;
      this.publishedURL = publishedURL;
    }
}


