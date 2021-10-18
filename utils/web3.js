import Web3 from 'web3'
import Web4 from '@cryptonteam/web4'
import { BigNumber } from 'bignumber.js'
import { ERC20 } from '~/utils/abis/abi'
import { contractAbi } from '~/utils/abis/contract'

const contractAddress = '0x2bD632F77194E5cf2BB0cF19b0d92a1D14D8385F'
const tokenAddress = '0xb57b0bdb4d976aa950e2d5484dd33ed4d1a63d27'
const AMOUNT = 10

const { ethereum } = window
const web3 = new Web3(ethereum)
const web4 = new Web4()
let contractInstance
let erc20Instance
let tokenDecimal
let tokenSymbol

export const connectWallet = async () => {
  try {
    const { ethereum } = window
    await ethereum.enable()
    return await web3.eth.getCoinbase()
  } catch (er) {
    console.log('Error: ', er)
  }
}

export const registerUser = async (userAddress) => {
  try {
    const { ethereum } = window
    await ethereum.enable()

    await web4.setProvider(ethereum, userAddress)

    const contractAbstraction = web4.getContractAbstraction(contractAbi)
    contractInstance = await contractAbstraction.getInstance(contractAddress)
    const users = (await contractInstance.getRegistredUsrs())
      .map(address => address.toLowerCase())

    const isRegistered = users.includes(userAddress)

    console.log('isRegistered', isRegistered)

    // const currentRoundId = (await contractInstance.currentRoundId()).toString()
    // console.log('Current round: ', currentRoundId)
    // const roundInfo = await contractInstance.getFullRoundInfo(currentRoundId)
    // console.log('roundInfo', roundInfo)
    // const getPlayerStatInRound = await contractInstance.getPlayerStatInRound(userAddress, currentRoundId)
    // console.log('getPlayerStatInRound', getPlayerStatInRound)

    if (isRegistered) {
      console.log('Get user balance...')
      const erc20Abstraction = web4.getContractAbstraction(ERC20)
      erc20Instance = await erc20Abstraction.getInstance(tokenAddress)
      const balanceAddress = await erc20Instance.balanceOf(userAddress)
      tokenDecimal = await erc20Instance.decimals()
      tokenSymbol = await erc20Instance.symbol()

      console.log('Get token symbol and decimals...', tokenSymbol, tokenDecimal.toString())

      const balance = new BigNumber(balanceAddress).shiftedBy(-tokenDecimal).toString()
      console.log('Balnce: ', balance)

      return {
        users,
        isRegistered,
        symbol: tokenSymbol,
        balance
      }
    } else {
      console.log('Registration user...')
      await contractInstance.register()

      return {
        users,
        isRegistered
      }
    }
  } catch (er) {
    console.log('Error', er)
  }
}

export const participate = async (userAddress) => {
  const { ethereum } = window
  await ethereum.enable()

  const participationFee = await contractInstance.participationFee()
  let registrationBonus = await contractInstance.registrationBonus()
  const fee = new BigNumber(participationFee).shiftedBy(-tokenDecimal).toString()

  await web4.setProvider(ethereum, userAddress)

  registrationBonus = new BigNumber(registrationBonus).shiftedBy(-tokenDecimal).toString()
  console.log('participationFee', fee)
  console.log('registrationBonus', registrationBonus)

  const amount = new BigNumber(AMOUNT).shiftedBy(+tokenDecimal).toString()
  const allowance = await erc20Instance.allowance(userAddress, contractAddress)

  console.log('Allowance', allowance.toString())

  if (allowance.toString() !== amount) {
    await erc20Instance.approve(contractAddress, amount)
  }
  const joined = await contractInstance.joined(userAddress)
  if (joined) {
    // need to leave
    console.log('You are joined', joined)
  } else {
    await contractInstance.join()
    console.log('Successful join method')
  }

  const usersAddress = await contractInstance.getRegistredUsrs()
  const usersJoined = await contractInstance.UserJoined()
  console.log('Users joined: ', usersJoined)

  // const finishRound = await contractInstance.startRound( )
  // const finishRound = await contractInstance.finishRound()
  // console.log('Round finished: ', finishRound)

  // const flagCaptured = await contractInstance.FlagCaptured()
  // console.log('flag captured: ', flagCaptured)

  // await contractInstance.capture(userAddress, participationFee)
  return {
    fee,
    registrationBonus,
    usersAddress
  }
}

export const claimMethod = async () => {
  const { ethereum } = window
  await ethereum.enable()

  const currentRoundId = (await contractInstance.currentRoundId()).toString()
  console.log('currentRoundId: ', currentRoundId)
  const claim = await contractInstance.claim(currentRoundId)
  console.log('Claim: ', claim)
}
