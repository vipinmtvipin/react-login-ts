self.onmessage = (event: MessageEvent<number>) => {

  const limit = event.data;

  let sum = 0;

  for (let i = 0; i < limit; i++) {
    sum += i;
  }

  self.postMessage(sum);
};

export {};