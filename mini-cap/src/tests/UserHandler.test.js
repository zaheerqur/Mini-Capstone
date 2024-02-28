import {
  getCompanyData,
  getUserData,
  updateUserInfo,
  updateCompanyInfo,
  changePassword,
    loginUser
} from "../backend/UserHandler"; // Import your function
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Mock Firebase storage functions
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  getFirestore: jest.fn(() => "mockedDb"),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

describe("getting user/company data functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  test("getUserData: should return user data if document exists", async () => {
    const fakeData = {
      role: "mgmt",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phoneNumber: "123-456-7890",
      password: "password123",
    };
    const fakeDocSnap = {
      exists: jest.fn(() => true),
      data: jest.fn(() => fakeData),
    };
    const fakeDocRef = jest.fn();
    doc.mockReturnValue(fakeDocRef);
    getDoc.mockResolvedValue(fakeDocSnap);

    const result = await getUserData(fakeData.email);

    expect(result).toEqual(fakeData);
    expect(doc).toHaveBeenCalledWith(
      expect.anything(),
      "Users",
      fakeData.email
    );
    expect(getDoc).toHaveBeenCalledWith(expect.anything());
  });

  test("getCompanyData: should return company data if document exists", async () => {
    const fakeData = {
      role: "mgmt",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phoneNumber: "123-456-7890",
      password: "password123",
    };
    const fakeDocSnap = {
      exists: jest.fn(() => true),
      data: jest.fn(() => fakeData),
    };
    const fakeDocRef = jest.fn();
    doc.mockReturnValue(fakeDocRef);
    getDoc.mockResolvedValue(fakeDocSnap);

    const result = await getCompanyData(fakeData.email);

    expect(result).toEqual(fakeData);
    expect(doc).toHaveBeenCalledWith(
      expect.anything(),
      "Company",
      fakeData.email
    );
    expect(getDoc).toHaveBeenCalledWith(expect.anything());
  });
});

describe("update user/company info functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  test("updateUserInfo: should update user info in Firestore", async () => {
    const fakeEmail = "johndoe@gmail.com";
    const fakeData = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
    };
    const fakeDocRef = jest.fn();
    doc.mockReturnValue(fakeDocRef);

    await updateUserInfo(fakeEmail, fakeData);

    expect(doc).toHaveBeenCalledWith(expect.anything(), "Users", fakeEmail);
    expect(updateDoc).toHaveBeenCalledWith(fakeDocRef, fakeData);
  });

  test("updateCompanyInfo: should update company info in Firestore", async () => {
    const fakeEmail = "company@example.com";
    const fakeData = {
      companyName: "Example Company",
      phoneNumber: "987-654-3210",
    };
    const fakeDocRef = jest.fn();
    doc.mockReturnValue(fakeDocRef);

    await updateCompanyInfo(fakeEmail, fakeData);

    expect(doc).toHaveBeenCalledWith(expect.anything(), "Company", fakeEmail);
    expect(updateDoc).toHaveBeenCalledWith(fakeDocRef, fakeData);
  });
});

describe("changePassword function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should change user password if current password matches and new password is different", async () => {
    // Mock user document exists
    const fakeUserDoc = {
      exists: jest.fn(() => true),
      data: jest.fn(() => ({ password: "oldPassword" })),
    };
    doc.mockReturnValue(fakeUserDoc);
    getDoc.mockResolvedValue(fakeUserDoc);

    // Mock updateDoc function
    updateDoc.mockResolvedValue();

    const email = "test@example.com";
    const data = {
      email,
      currentPassword: "oldPassword",
      newPassword: "newPassword",
    };

    await expect(changePassword(email, data)).resolves.toEqual({
      message: "Password updated successfully",
    });
    expect(updateDoc).toHaveBeenCalledWith(doc(), { password: "newPassword" });
  });
});

describe('logging in', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  test('loginUser: should login the user', async () => {
    const mockUserData = {
      email: 'johndoe@gmail.com',
      password: 'password12'
    };
    const fakeUserDocSnap = { exists: jest.fn(() => true), data: jest.fn(() => mockUserData) };
    const fakeUserDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeUserDocRef);
    getDoc.mockResolvedValueOnce(fakeUserDocSnap);

    const fakeCompanyDocSnap = { exists: jest.fn(() => false) };
    const fakeCompanyDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeCompanyDocRef);
    getDoc.mockResolvedValueOnce(fakeCompanyDocSnap);

    await expect(loginUser(mockUserData)).resolves.not.toThrow();
  });

  test('loginUser: should login the company', async () => {
    const mockCompanyData = {
      email: 'chad@gmail.com',
      password: 'password123'
    };
    const fakeUserDocSnap = { exists: jest.fn(() => false) };
    const fakeUserDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeUserDocRef);
    getDoc.mockResolvedValueOnce(fakeUserDocSnap);

    const fakeCompanyDocSnap = { exists: jest.fn(() => true), data: jest.fn(() => mockCompanyData) };
    const fakeCompanyDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeCompanyDocRef);
    getDoc.mockResolvedValueOnce(fakeCompanyDocSnap);

    await expect(loginUser(mockCompanyData)).resolves.not.toThrow();
  });

  test('loginUser: should fail user login', async () => {
    const mockUserData = {
      email: 'johndoe@gmail.com',
      password: 'password12'
    };
    const fakeUserDocSnap = { exists: jest.fn(() => false) };
    const fakeUserDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeUserDocRef);
    getDoc.mockResolvedValueOnce(fakeUserDocSnap);

    const fakeCompanyDocSnap = { exists: jest.fn(() => false) };
    const fakeCompanyDocRef = jest.fn();
    doc.mockReturnValueOnce(fakeCompanyDocRef);
    getDoc.mockResolvedValueOnce(fakeCompanyDocSnap);

    await expect(loginUser(mockUserData)).rejects.toThrow('User does not exist.');
  });




});