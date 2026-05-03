/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @returns {Array<{user: number, duration: number, equipment: Array<string>}>}
 */
export default function mergeData(sessions) {
  const data = sessions.reduce((map, session) => {
    const { user, duration, equipment } = session;
    if (!map.has(user)) {
      map.set(user, {
        user,
        duration: 0,
        equipment: new Set(),
      });
    }

    const existing = map.get(user);
    existing.duration += duration;
    equipment.forEach((eq) => existing.equipment.add(eq));

    return map;
  }, new Map());

  return [...data.values()].map((value) => ({
    ...value,
    equipment: [...value.equipment].sort((a, b) => a.localeCompare(b)),
  }));
}

/*
export default function mergeData(sessions) {
  const sessionMap = new Map();

  sessions.forEach((session) => {
    const { user, duration, equipment } = session;
    if (sessionMap.has(user)) {
      const existingUser = sessionMap.get(user);
      const newUser = {
        ...existingUser,
        duration: existingUser.duration + duration,
        equipment: Array.from(new Set([...equipment...existingUser.equipment])).sort((a, b) => a.localeCompare(b)),
      };
      sessionMap.set(user, newUser);
    } else {
      sessionMap.set(user, session);
    }
  });

  return Array.from(sessionMap.values())
}

*/
