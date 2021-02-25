const UserController = require('../userController');
const createUser = require('./user.fixture');
const { fromDataToEntity } = require('../../mapper/userMapper');

const serviceMock = {
  getAll: jest.fn(() => Array.from({ length: 5 }, (id) => createUser(id + 1))),
  delete: jest.fn(),
  get: jest.fn((id)=>createUser(id)),
  save: jest.fn(),
};

const reqMock = {
  params: {
    id: 1,
  },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new UserController(serviceMock);

describe('Testing user controller', () => {
  afterEach(() => {
    Object.values(serviceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });

  test('Configure routes', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };

    mockController.configureRoutes(app);

    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
  });

  test('List function renders list.njk with all users', async ()=>{
    const users = serviceMock.getAll();
    await mockController.list(reqMock, resMock)

    expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("user/views/list.njk", {
      users
    })
  });

  test("Add function renders add.njk", async()=>{
    await mockController.add(reqMock,resMock);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith("user/views/add.njk")
  })

  test("Delete function", async()=>{
    await mockController.delete(reqMock,resMock);

    expect(serviceMock.delete).toHaveBeenCalledWith(1);
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/user/list")
  })


  test("Edit function renders edit.njk with user data", async()=>{
    const user = serviceMock.get(1)

    await mockController.edit(reqMock,resMock);

    expect(serviceMock.get).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("user/views/edit.njk",{user})
  })

  test("Save function saves a user", async()=>{
    const reqMockWithBody = {
      body: {
        id: 1,
        name: 'First name',
        surname: 'Last name',
        docType: "DNI",
        docNumber: "30123567",
        nationality: 'Arg',
        address: "lalala 123",
        phone: "1111112222",
        email:"asd@gmail.com",
      }
    }

    await mockController.save(reqMockWithBody,resMock);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(fromDataToEntity(createUser(1)));
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith("/user/list")
  })


  test("View function renders view.njk with user details", async()=>{
    const user = serviceMock.get(1);
    await mockController.view(reqMock,resMock);
    expect(serviceMock.get).toHaveBeenCalledTimes(2)
    expect(resMock.render).toHaveBeenCalledTimes(1)
    expect(resMock.render).toHaveBeenCalledWith("user/views/view.njk", {user})
  })


});
