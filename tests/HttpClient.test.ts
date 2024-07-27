import chai from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";

const expect = chai.expect;
chai.use(sinonChai);

import { HttpClient } from "../src/HttpClient";

const NODE_URL = "https://nodeurl.com";

interface FakeResponse {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<any>;
}

describe("HttpClient", () => {
  let http: InstanceType<typeof HttpClient>;
  const fakeJson = sinon.fake.resolves({ foo: "bar" });
  const fakeResponse: FakeResponse = { ok: true, status: 200, json: fakeJson };
  const fetchStub = sinon.stub();
  fetchStub.resolves(fakeResponse);

  beforeEach(() => {
    http = new HttpClient(NODE_URL, "password");
    global.fetch = fetchStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should make GET request", async () => {
    await http.get("/path");

    expect(fetchStub).to.have.been.calledWith(`${NODE_URL}/path`, {
      method: "GET",
      headers: {
        Authorization: "Basic OnBhc3N3b3Jk",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });

  it("should make POST request", async () => {
    const body = {
      payload: "test-payload",
    };

    await http.post("/path", body);

    expect(fetchStub).to.have.been.calledWith(`${NODE_URL}/path`, {
      method: "POST",
      headers: {
        Authorization: "Basic OnBhc3N3b3Jk",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "payload=test-payload",
    });
  });
});
