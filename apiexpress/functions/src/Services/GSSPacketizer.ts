

// eslint-disable-next-line no-unused-vars
import ResponseState from "./IResponseState";
import Verifiers from "./Verifiers";
import ApiServices from "./ApiServices";
const gssPacketizer = class GSSPacketizer {
    _verifiers = new Verifiers()
    _apiServices = new ApiServices()
    // eslint-disable-next-line require-jsdoc
    public static flatten(arr:any) {
      return arr.reduce(function(flat: string | any[], toFlatten: any) {
        // eslint-disable-next-line max-len
        return flat.concat(Array.isArray(toFlatten) ? GSSPacketizer.flatten(toFlatten) : toFlatten);
      }, []);
    }
    // eslint-disable-next-line max-len,require-jsdoc
    public jsonString(ruleNum:number, inputType:string, variable:string, value:string, logic:string) {
      let type:string = "";
      const keys = ["rule", "type", "Reference", "reference", "goal"];

      if ( inputType === "premise") type = "premise";
      if ( inputType === "conclusion") type = "conclusion";
      if (inputType === "goal") type = "conclusion";
      const temp =
            ` 
                       { "${keys[0]}": "${ruleNum}",
                        "${keys[1]}": "${type}",
                        "${keys[2]}": "test",
                        "statements": {
                        "statement": [
          {
            "comparison": "equals"
          },
          {
            "logic": "${logic}"
          },
          {
            "object": "${variable}"
          },
          {
            "value": "${value}"
          },
          {
            "cert": 100
          }
        ]
      }
    },
   `;
        // console.log(temp)

      return (temp );
    }

    // eslint-disable-next-line require-jsdoc
    public jsonObjectString(anArray: Array<string>, isGoal: string): string {
      //   console.log("in object string")
      //  console.table(anArray)
      const length = anArray.length;
      const keys = ["text", "type", "question", "reference", "goal"];

      // console.table(anArray)
      let temp =
            ` 
                        "${keys[0]}": "${anArray[3]}",
                        "${keys[1]}": "",
                        "${keys[2]}": "${anArray[1]}",
                        "${keys[3]}": "${anArray[2]}",
                        "${keys[4]}": "${ isGoal }",
                        "legals": {
                           "option" :[
                         `;

      for (let i = 4; i < length; i++) {
        const anOption = ` {"title": "${anArray[i]}" },`;
        temp += anOption;
      }
      temp = temp.slice(0, -1);
      //  console.log(temp)
      return (temp += "]}");
    }
    // eslint-disable-next-line require-jsdoc
    public transpose(a: Array<Array<string>>): Array<Array<string>> {
      return a[0].map(function(_, c) {
        return a.map(function(r) {
          return r[c];
        });
      });
      // or in more modern dialect
      // return a[0].map((_, c) => a.map(r => r[c]));
    }

    // eslint-disable-next-line require-jsdoc
    public getColumn(table:Array<Array<string>> ) {
      const column:Array<string> = [];
      table.forEach( (row) => {
        column.push(row[1]);
      });
      return column;
    }


    // eslint-disable-next-line require-jsdoc
    public findDups(array:Array<string>) {
      // @ts-ignore
      const dupes = [];
      const results = [];
      array.forEach((item:string, index:number) => {
        // @ts-ignore
        dupes[item] = dupes[item] || [];

        // @ts-ignore
        dupes[item].push(index);
      });
      // @ts-ignore
      for (const name in dupes) {
        // eslint-disable-next-line max-len
        // console.log(name + '->indexes->' + dupes[name] + '->count->' + dupes[name].length)
        // @ts-ignore
        if (dupes[name].length > 1) results.push(dupes[name]);
      }
      return results;
    }
    // @ts-ignore
    // eslint-disable-next-line require-jsdoc
    public split(unioned, j) {
      const multis = [];
      // console.log("calling split " + j)  ;
      // console.table(unioned)
      const elements = [];
      // @ts-ignore
      unioned.forEach( (anElement, index ) => {
        if (anElement.endsWith("++")) {
          multis.push(index);
        }
      } );
      multis.push(unioned.length);
      // console.log("multis")
      // console.table(multis)
      for (let k = multis[j]; k < multis[j+1]; k++) {
        elements.push(unioned[k]);
      }
      elements.unshift("multi-premise");
      // console.log(elements)
      return elements;
    }

    // @ts-ignore
    // eslint-disable-next-line require-jsdoc
    public clone(existingArray, arrayDeletes) {
      // console.log("existing")
      //  console.table(existingArray)
      //  console.log("arrayDeletes")
      //  console.log(arrayDeletes)
      // @ts-ignore
      const deleteElements = [];
      // @ts-ignore
      const newArray = [];
      if (arrayDeletes.length < 1) {
        return existingArray;
      }
      // @ts-ignore
      arrayDeletes.forEach( (inner) => {
        //  console.log(inner)
        // eslint-disable-next-line guard-for-in
        for (const i in existingArray) {
          if (inner.includes(+i)) { // @ts-ignore
            deleteElements[i] = existingArray[i];
          }
          // @ts-ignore
          newArray[i] = existingArray[i];
          //   console.table(newArray)
        }
      });
      // @ts-ignore
      let unioned = [];
      // @ts-ignore
      deleteElements.forEach( (row) => {
        // @ts-ignore
        unioned = this.union(row, unioned);
      });

      let j = 0;
      // console.table(arrayDeletes)
      // @ts-ignore
      arrayDeletes.forEach( (row) => {
        // @ts-ignore
        const elements = this.split(unioned, j);
        //   console.log("elements")
        //  console.log(elements);
        const start = row[0] + j++;
        // @ts-ignore
        newArray.splice(start, 0, elements);

        //    console.log("start " + start);
        // console.table(newArray)
        // unioned[0] = "multi premise"

        // console.table(unioned)
      });

      // console.log("newArray")
      //  console.table(newArray)
      // @ts-ignore
      return newArray;
    }
    // @ts-ignore
    // eslint-disable-next-line require-jsdoc
    public union(a, b) {
      // @ts-ignore
      // eslint-disable-next-line max-len
      const result = b.concat(a).filter((value, index, self) => { // array unique
        if (value !== undefined) {
          return self.indexOf(value) === index;
        }
      });
      return result;
    }


    // eslint-disable-next-line require-jsdoc
    public async testGoogle(url: string) :Promise<ResponseState | undefined> {
      try {
        // eslint-disable-next-line max-len,new-cap
        const {error, jsonString, status, message} = await this._apiServices.SheetReader(url);
        if (error) return {error, jsonString, status, message};
        if (jsonString) {
          //      let data = JSON.parse(jsonString)
          const first = jsonString.split(/\r?\n/);
          const arrayOfArrays = [];
          for (const line of first) {
            const array = line.split(",");
            if ((array[0] === "" || array[0].startsWith("--"))) continue;
            if (array[0] === "end") break;
            arrayOfArrays.push(array);
          }

          //  let filtered = ''
          // @ts-ignore
          const unique = [];
          arrayOfArrays.forEach( (array) => {
            const aSet = new Set(array);
            // eslint-disable-next-line max-len
            const filtered = [...aSet].filter( (item) => item !== "" && item !== "" && item);
            //    console.log("filtered")
            //   console.log(filtered)
            unique.push(filtered);
          });
          // @ts-ignore
          //   console.log("unique")
          // console.table(unique)
          // @ts-ignore
          let transposed = this.transpose(unique);
          //  console.table("transposed")
          //  console.table(transposed)
          // @ts-ignore
          const final = this.transpose(transposed);
          //    console.table("final")
          // console.table (final)

          let aString = "{ \"data\": [";
          let sliced = final.slice(1);
          //  console.log("sliced")
          //  console.table(sliced)

          //* ******************************************
          // @ts-ignore
          const test = this.getColumn(sliced);
          //  console.log(test)

          // @ts-ignore
          const dups = this.findDups(test);
          //   if(dups.length > 0) {
          //   console.log(dups)
          // @ts-ignore
          const cloned = this.clone(sliced, dups);
          //  }
          //  else {   cloned = sliced ;
          //   console.table(cloned)}

          //* ***************************************
          // @ts-ignore
          //  let aJsonString =
          cloned.forEach( (aRow) => {
            let goal = "";
            if (aRow.includes("recommendation")) goal = "goal 100";
            // @ts-ignore
            const filtered = aRow.filter( (item) => item !== undefined);
            //  console.log('filtered');
            //  console.table(filtered)
            // @ts-ignore
            // eslint-disable-next-line max-len
            aString += "\n          {" + this.jsonObjectString(filtered, goal) + "},";
          } );
          aString = aString.slice(0, -1);
          aString += "],";


          // @ts-ignore
          let variables = [];
          sliced = [];

          // @ts-ignore
          let rulepart: any[] = [];

          // @ts-ignore
          let ruleLogic: string[] | string[][] = [];
          // console.table(arrayOfArrays)
          // console.log("making rule logic from a row 0")
          arrayOfArrays.forEach((anArray) => {
            rulepart.push(anArray[0]);
            variables.push(anArray[3]);
            sliced.push( anArray.slice(4));
          });
          // @ts-ignore
          ruleLogic.push(arrayOfArrays[0].slice(3));
          //  console.log(arrayOfArrays)
          ruleLogic = GSSPacketizer.flatten(ruleLogic);
          ruleLogic.shift();
          //   console.log(ruleLogic)
          //  console.table(rulepart)
          //    console.table(sliced)
          //   let rules = []
          // @ts-ignore
          variables = variables.slice(1);
          // @ts-ignore
          rulepart = rulepart.slice(1);
          //  console.log("rulepart")
          // console.table(rulepart)
          // @ts-ignore
          transposed = this.transpose(sliced.slice(1));
          // console.table(transposed)
          let ruleCount = 1;
          let result = "";
          result += "\"rules\": [  ";
          // @ts-ignore
          transposed.forEach((aRow) => {
            let logic = "";
            for (let i = 0; i < aRow.length; i++) {
              //  console.log(" i = " + i + " logic: "+ ruleLogic[i])
              // @ts-ignore
              if (ruleLogic[i] === "some") logic = "O";
              else if (ruleLogic[i] === "not") logic = "N";
              else logic= "A";
              if (aRow[i] !== "") {
                if (ruleLogic[ruleCount-1] === "some") logic = "O";
                else if (ruleLogic[i] === "not") logic = "N";
                else logic= "A";
                if ( i !== aRow.length - 1 ) {
                  // @ts-ignore
                  // eslint-disable-next-line max-len
                  result += this.jsonString(ruleCount, rulepart[i], variables[i], aRow[i], logic);
                  if (rulepart[i]=== "conclusion" || rulepart[i] === "goal" ) {
                    ruleCount++;
                  }
                } else {
                  // @ts-ignore
                  // eslint-disable-next-line max-len
                  result += this.jsonString(ruleCount, rulepart[i], variables[i], aRow[i], logic);
                  ruleCount++;
                }
              }
            }
          });
          result = result.trim().slice(0, -1);
          const jsonResult = result + "]}";
          const str = aString + jsonResult;
          // eslint-disable-next-line new-cap
          if (this._verifiers.IsJsonString(str)) {
            return {error: null, jsonString: str, status: 200, message: "ok"};
          } else {
            console.log("bad ---" + str);
            // eslint-disable-next-line max-len
            return {error: new Error("Input of csv in bad format"), jsonString: "", status: 0, message: "bad format in JSON String"};
          }
        }
      } catch (error) {
        // eslint-disable-next-line max-len
        return {error: error, jsonString: "", status: 0, message: "Format Error Parsing SpreadSheet"};
      }
      return undefined;
    }
};
export default gssPacketizer;
