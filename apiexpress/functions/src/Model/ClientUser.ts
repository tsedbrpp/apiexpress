
import StorableFunctions from "./StorableFunctions";

// eslint-disable-next-line require-jsdoc
export default class ClientUser extends StorableFunctions {
  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
  // eslint-disable-next-line require-jsdoc
  get createdAt(): Number | undefined {
    return this._createdAt;
  }

  // eslint-disable-next-line require-jsdoc
  set createdAt(value: Number | undefined) {
    this._createdAt = value;
  }

  // eslint-disable-next-line require-jsdoc
  get runLimit(): number | undefined {
    return this._runLimit;
  }

  // eslint-disable-next-line require-jsdoc
  set runLimit(value: number | undefined) {
    this._runLimit = value;
  }

  // eslint-disable-next-line require-jsdoc
  get numberOfSystems(): number | undefined {
    return this._numberOfSystems;
  }

  // eslint-disable-next-line require-jsdoc
  set numberOfSystems(value: number | undefined) {
    this._numberOfSystems = value;
  }
    private _role:string = "user"
    private _createdAt: Number | undefined = 0
    private _firstName: string | undefined = "";
    private _lastName: string | undefined = "";
    private _userName: string | undefined = "";
    private _userId: string | undefined = "";
    private _email: string | undefined = "";
    private _photoUrl: string | undefined = "";
    private _numberOfSystems: number | undefined = 0;
    private _runLimit: number | undefined = 1000;

    // eslint-disable-next-line max-len,require-jsdoc
    constructor(uid?: string, userName?: string | undefined, photoUrl?: string | undefined, email?: string | undefined,
        runlimit?:number | undefined, numberOfSystems?: number | undefined) {
      super();

      this.userId = uid;
      this.userName = userName ? userName:"unknown";
      this.photoUrl = photoUrl ? photoUrl: "unknown";
      this.email = email;
      this.numberOfSystems = numberOfSystems;
      this.runLimit = 0;
      this.createdAt = Date.now();
      this.role = "user";
    }


    // eslint-disable-next-line require-jsdoc
    get photoUrl(): string | undefined {
      return this._photoUrl;
    }

    // eslint-disable-next-line require-jsdoc
    set photoUrl(value: string | undefined) {
      this._photoUrl = value;
    }


    // eslint-disable-next-line require-jsdoc
    get email(): string | undefined {
      return this._email;
    }

    // eslint-disable-next-line require-jsdoc
    set email(value: string | undefined) {
      this._email = value;
    }

    // eslint-disable-next-line require-jsdoc
    get userId(): string | undefined {
      return this._userId;
    }

    // eslint-disable-next-line require-jsdoc
    set userId(value: string | undefined) {
      this._userId = value;
    }

    // eslint-disable-next-line require-jsdoc
    get userName(): string | undefined {
      return this._userName;
    }

    // eslint-disable-next-line require-jsdoc
    set userName(value: string | undefined) {
      this._userName = value;
    }

    // eslint-disable-next-line require-jsdoc
    get lastName(): string | undefined {
      return this._lastName;
    }

    // eslint-disable-next-line require-jsdoc
    set lastName(value: string | undefined) {
      this._lastName = value;
    }


    // eslint-disable-next-line require-jsdoc
    set firstName(name: string | undefined) {
      this._firstName = name;
    }

    // eslint-disable-next-line require-jsdoc
    get firstName(): string | undefined {
      return this._firstName;
    }
}


