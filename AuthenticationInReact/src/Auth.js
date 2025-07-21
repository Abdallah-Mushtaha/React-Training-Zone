// Auth.js

//  Role-Based Authentication in React
export const TestUser = {
    name: "Abood",
    // will use this specific role to determine if they have the correct role to access specific resources in application
    role: "admin",
};

export async function getUser() {
    // which will await for 1 second because there is no real backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const authToken = generateToken();

    return [200, { authToken, user: TestUser }];
}

export async function login() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    const authToken = generateToken();
    return [200, { authToken, user: TestUser }];
}

const generateToken = () => {
    return Math.random().toString(36).substring(2);
};
