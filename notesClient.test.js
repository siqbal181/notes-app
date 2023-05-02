const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('Client class', () => {
  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      full_name: "sinatra/sinatra",
      id: 106995
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadData((returnedDataFromApi) => {
      expect(returnedDataFromApi.full_name).toBe("sinatra/sinatra");
      expect(returnedDataFromApi.id).toBe(106995);

      done();
    });
  });
});