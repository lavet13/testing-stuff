export const fetch = async (person: string): Promise<string> => {
  let sleep = 1000;

  if (person === "Bob") {
    sleep = 2000;
    return new Promise((resolve) => setTimeout(() => resolve(person), sleep));
  }

  return new Promise((resolve) => setTimeout(() => resolve(person), sleep));
};
