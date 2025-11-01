declare module 'stockfish' {
  // The package exports a factory that returns a Web Worker-like engine.
  const createEngine: any;
  export default createEngine;
}