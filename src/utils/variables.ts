export const LogoName = "Zenith Array"

export const colorCardScema = [
    {
        firstColor: "#6670BD",
        secondColor: '#6670BD',
    },
    {
        firstColor: "#BC69F4",
        secondColor: '#FECA8E',
    },
    {
        firstColor: "#333333",
        secondColor: '#333333',
    },
    {
        firstColor: "#8CA7FF",
        secondColor: '#8CA7FF',
    },
    {
        firstColor: "#FF6565",
        secondColor: '#FF6565',
    },

    {
        firstColor: "#3C9EA5",
        secondColor: '#3C9EA5',
    },

    {
        firstColor: "#E6B362",
        secondColor: '#E6B362',
    },

    {
        firstColor: "#314141",
        secondColor: '#229B9F',
    }
];


export const baseURL = import.meta.env.MODE == "development" ? 'http://localhost:5001' : "https://castview-backend.onrender.com"

export enum UserRoles {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST',
    // Add more roles as needed
}

export const tokenCastView = 'tokencast'