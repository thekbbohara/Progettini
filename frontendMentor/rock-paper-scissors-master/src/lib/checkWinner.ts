/* const checkWinner = (
  playerChoice: number,
  botChoice: number,
): null | true | false => {
  if (playerChoice === botChoice) return null;
  else if (botChoice === 0 && playerChoice === 2) return false;
  else if (botChoice === 2 && playerChoice === 0) return true;
  else if (playerChoice === botChoice - 1) return false;
  else return true;
};
*/
const checkWinner = (
  playerChoice: number,
  botChoice: number,
): null | true | false => {
  if (playerChoice === botChoice) return null;

  switch (playerChoice) {
    case 0:
      return botChoice === 2 ? true : false;
    case 1:
      return botChoice === 0 ? true : false;
    case 2:
      return botChoice === 1 ? true : false;
    default:
      throw new Error("Invalid choice");
  }
};

export default checkWinner;
