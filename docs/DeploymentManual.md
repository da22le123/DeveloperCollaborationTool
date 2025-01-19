# Deployment Manual

Application consists of two parts: **backend** and **frontend**. The following guide is based on some assumptions:

- Deployment will be onto single machine.
- This single machine runs Linux with **apt** package manager.

## How to deploy Backend:

### In order to deploy a Node backend:

1. Install Node.js and npm using apt:

```bash
sudo apt install nodejs
sudo apt install npm
```

2. Install [PM2](https://pm2.keymetrics.io/) globally using npm:

```bash
npm install -g pm2
```

3. Copy contents of `/src/backend` to desired directory.

4. Create a .env file iin that directory by adding variables mentioned in `backend/README.md`.

5. Install all the required dependencies using npm:

```bash
npm install
```

6. Run the backend server using PM2:

```bash
pm2 start index.js --name PA-Backend
```

## How to deploy Frontend:

### In order to deploy a Vite frontend:

1. Install [http-server](https://www.npmjs.com/package/http-server/) globally using npm:

```bash
npm install -g http-server
```

2. Copy contents of `/src/frontend` to desired directory.

3. Create a .env file in that directory by adding variables mentioned in `frontend/README.md`.

4. Install all the required dependencies using npm:

```bash
npm install
```

5. Build Vite app using:

```bash
npm run build
```

6. Serve contents built to `/dist` using PM2:

```bash
pm2 start "http-server dist -p 8080" --name PA-Frontend
```

## Additionally:

You can save PM2 processes to restart automatically on server reboot by running:

```bash
pm2 save
pm2 startup
```

## Things to consider

- Both frontend and backend must be accessible from outside.
- If you have a reverse proxy (which is highly recommended), don't forget to set up proxy forwarding for both frontend
  and backend. Backend port is specified as `PORT` in `backend/.env`, frontend port is specified in `pm2 start` command.
- `VITE_API_BASE_URL` environmental variable on frontend must be a public address on which the backend is available.
  I.e. not `http://localhost:4173`, but `http://domain.com:4173` or `https://*public_ip*:4173`
- `CLIENT_URL` environmental variable on backend must be a public address on which the frontend is available (it is only
  used for CORS so it can be omitted if your reverse proxy manages it for you).

## Assuming everything was done correctly:

You should have fully working "Developer Collaboration Tool" that you can access by visiting `http://*CLIENT_URL*`.

To start using the system, use one of the default user accounts described in the [User Data document](UserData.md).
