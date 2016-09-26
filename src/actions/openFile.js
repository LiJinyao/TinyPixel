export const RECEIVE_FILE = 'RECEIVE_FILE'
export function receiveFile(file) {
  return {
    type: RECEIVE_FILE,
    file,
  }
}
