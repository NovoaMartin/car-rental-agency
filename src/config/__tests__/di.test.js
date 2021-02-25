const configureDI = require('../di');

describe('Testing dependency injection', () => {
  const container = configureDI();
  const { definitions } = container;

  test('Container has the right dependencies', () => {
    expect(definitions).toHaveProperty('carController');
    expect(definitions).toHaveProperty('carService');
    expect(definitions).toHaveProperty('carRepository');
    expect(definitions).toHaveProperty('carModel');
    expect(definitions).toHaveProperty('userController');
    expect(definitions).toHaveProperty('userService');
    expect(definitions).toHaveProperty('userRepository');
    expect(definitions).toHaveProperty('userModel');
    expect(definitions).toHaveProperty('reservationController');
    expect(definitions).toHaveProperty('reservationService');
    expect(definitions).toHaveProperty('reservationRepository');
    expect(definitions).toHaveProperty('reservationModel');
    expect(definitions).toHaveProperty('Multer');
    expect(definitions).toHaveProperty('sequelize');
  });

  describe('Car module tests', () => {
    test('CarController is constructed with the right dependencies', () => {
      const { carController } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'carService' }),
        expect.objectContaining({ existingDefinitionName: 'Multer' }),
      ];
      expect(carController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('CarService is constructed with the right dependencies', () => {
      const { carService } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'carRepository' }),
      ];
      expect(carService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('CarRepository is constructed with the right dependencies', () => {
      const { carRepository } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'carModel' }),
      ];
      expect(carRepository.deps).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('User module tests', () => {
    test('UserController is constructed with the right dependencies', () => {
      const { userController } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'userService' }),
      ];
      expect(userController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('UserService is constructed with the right dependencies', () => {
      const { userService } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'userRepository' }),
      ];
      expect(userService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('UserRepository is constructed with the right dependencies', () => {
      const { userRepository } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'userModel' }),
      ];
      expect(userRepository.deps).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('Reservation module tests', () => {
    test('ReservationController is constructed with the right dependencies', () => {
      const { reservationController } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'reservationService' }),
        expect.objectContaining({ existingDefinitionName: 'carService' }),
        expect.objectContaining({ existingDefinitionName: 'userService' }),
      ];
      expect(reservationController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('ReservationService is constructed with the right dependencies', () => {
      const { reservationService } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'reservationRepository' }),
      ];
      expect(reservationService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('ReservationRepository is constructed with the right dependencies', () => {
      const { reservationRepository } = definitions;
      const expected = [
        expect.objectContaining({ existingDefinitionName: 'reservationModel' }),
      ];
      expect(reservationRepository.deps).toEqual(expect.arrayContaining(expected));
    });
  });
});
