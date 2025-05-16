const userSockets: { [key: string]: string[] } = {};

const registerSocket = (userId: string, socketId: string) => {
  if (!userSockets[userId]) {
    userSockets[userId] = [];
  }
  if (!userSockets[userId].includes(socketId)) {
    userSockets[userId].push(socketId);
  }
};
const unregisterSocket = (socketId: string) => {
  for (const userId in userSockets) {
    const index = userSockets[userId].indexOf(socketId);
    if (index !== -1) {
      userSockets[userId].splice(index, 1);
      if (userSockets[userId].length === 0) {
        delete userSockets[userId];
      }
      break;
    }
  }
};
const getUserSockets = (userId: string) => {
  return userSockets[userId] || [];
};

export { registerSocket, unregisterSocket, getUserSockets };
