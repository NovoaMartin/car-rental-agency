const Sequelize = require('sequelize');
const ReservationRepository = require('../reservationRepository');
const reservationModel = require('../../model/reservationModel');
const carModel = require('../../../car/model/carModel');
const userModel = require('../../../user/model/userModel');
const createReservation = require('../../controller/__tests__/reservation.fixture');
const createCar = require('../../../car/controller/__tests__/cars.fixture');
const createUser = require('../../../user/controller/__tests__/user.fixture');
const { fromDataToEntity } = require('../../mapper/reservationMapper');

describe('Testing reservation repository', () => {
  let reservationRepository;
  let sequelize;
  let ReservationModel;
  beforeEach(async (done) => {
    sequelize = new Sequelize('sqlite::memory');
    carModel.setup(sequelize);
    userModel.setup(sequelize);
    ReservationModel = reservationModel.setup(sequelize);
    ReservationModel.setupAssociations(carModel, userModel);
    await sequelize.sync({ force: true });

    await (carModel.build(createCar(), {
      isNewRecord: true,
    })).save();

    await (userModel.build(createUser(), {
      isNewRecord: true,
    })).save();

    reservationRepository = new ReservationRepository(ReservationModel);
    done();
  });

  test('save creates a reservation the DB', async () => {
    const reservation = createReservation(undefined);
    const savedReservation = await reservationRepository.save(reservation);
    const expectedReservation = fromDataToEntity(reservation);

    expectedReservation.id = 1;
    savedReservation.updated_at = undefined;
    savedReservation.created_at = undefined;
    expect(savedReservation).toMatchObject(expectedReservation);
  });

  test('updates a reservation in the DB', async () => {
    const newReservation = createReservation(undefined);
    const reservationToUpdate = createReservation(1);
    reservationToUpdate.paymentMethod = 'Test';
    await reservationRepository.save(newReservation);
    const updatedCar = await reservationRepository.save(reservationToUpdate);

    expect(updatedCar.id).toEqual(1);
    expect(updatedCar.paymentMethod).toEqual('Test');
  });

  test('Deletes a reservation from the DB', async () => {
    const reservation = createReservation(undefined);
    await reservationRepository.save(reservation);
    await reservationRepository.save(reservation);
    await reservationRepository.save(reservation);

    const result = await reservationRepository.delete(2);
    const remainingReservations = await reservationRepository.getAll();

    expect(result).toEqual(true);
    expect(remainingReservations[0].id).toEqual(1);
    expect(remainingReservations[1].id).toEqual(3);
  });

  test('Get all returns all reservations', async () => {
    const reservation = createReservation(undefined);
    await reservationRepository.save(reservation);
    await reservationRepository.save(reservation);
    await reservationRepository.save(reservation);

    const result = await reservationRepository.getAll();

    expect(result).toHaveLength(3);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(3);
  });

  test('get returns specified user', async () => {
    const reservationOne = createReservation(undefined);
    reservationOne.paymentMethod = 'Test1';
    const reservationTwo = createReservation(undefined);
    reservationTwo.paymentMethod = 'Test2';
    await reservationRepository.save(reservationOne);
    await reservationRepository.save(reservationTwo);

    const firstReservation = await reservationRepository.get(1);
    const secondReservation = await reservationRepository.get(2);
    expect(firstReservation.paymentMethod).toEqual('Test1');
    expect(secondReservation.paymentMethod).toEqual('Test2');
  });
});
