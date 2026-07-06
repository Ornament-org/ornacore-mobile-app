// Manual Jest mock — this native module is only linked via pod install /
// gradle on a real build, so tests run against this JS-only stub instead.
module.exports = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
  requestAuthorization: jest.fn(),
  setRNConfiguration: jest.fn(),
};
