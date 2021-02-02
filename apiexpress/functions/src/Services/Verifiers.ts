// eslint-disable-next-line require-jsdoc
export default class Verifiers {
  // eslint-disable-next-line require-jsdoc
  public IsJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }


  // eslint-disable-next-line require-jsdoc
  public verifyUrl(value: string): boolean {
    // eslint-disable-next-line max-len
    const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (regexp.test(value)) {
      return true;
    } else {
      console.log("returning false verify" + value);
      return false;
    }
  }

  // private urlVerify = "((http|https)://)(www.)?"+ "[a-zA-Z0-9@:%._\\+~#?&//=]"+ "{2,256}\\.[a-z]"+ "{2,6}\\b([-a-zA-Z0-9@:%"+ "._\\+~#?&//=]*)";


  // eslint-disable-next-line require-jsdoc
  public verifyEmail(value: string): boolean {
    // eslint-disable-next-line max-len
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line require-jsdoc
  public verifyPassword(value: string): boolean {
    return true;
  }

  public verifyNumber(value: string) {
    const reg = /^-?\d+\.?\d*$/;
    if (value) {
      return reg.test(value);
    } else return false;
  }

  public verifyLength(value: string, length: number): boolean {
    if (value.length >= length && value.length < 5000) {
      return true;
    }
    return false;
  }
}
