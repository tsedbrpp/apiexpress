import CreateJSON from "./CreateJSON";
import ModelUpper from "./ModelUpper";
test("test json", async () => {
  ////////////  new CreateJSON().createSpreadSheetFile();
  //new CreateJSON().createTheObjects("foo.json");
  ////////////// new CreateJSON().createSpreadSheetPremiseCon();
  // new CreateJSON().createTheRules();
  jest.setTimeout(45000);
  let modelUpper = ModelUpper.GetInstance();
  await modelUpper.pursue();
});
