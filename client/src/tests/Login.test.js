import {render, screen} from '@testing-library/react'
import Login from '../pages/Login';
import { apiPublicRequest } from '../apiRequest';


jest.mock("axios", () => ({
    __esModule: true,
  
    // default: {
    //   get: () => ({
    //     data: { id: 1, name: "John" },
    //   }),
    // },
}));

test('Sign in button', () => {
    render(<Login />)
    const buttonElement = screen.getByRole("button", {name: /Sign in/i})
    expect(buttonElement).toBe()
});