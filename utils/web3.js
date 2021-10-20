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
let isRegistered
let userJoined

export const connectWallet = async () => {
  try {
    const { ethereum } = window
    await ethereum.enable()
    return await web3.eth.getCoinbase()
  } catch (err) {
    console.log('Please connect your wallet!')
    return false
  }
}

export const registerUser = async (userAddress) => {
  if (userAddress) {
    const { ethereum } = window
    await ethereum.enable()
    console.log('UserrrrrrAddressssss: ', userAddress)
    await web4.setProvider(ethereum, userAddress)
    const contractAbstraction = web4.getContractAbstraction(contractAbi)
    contractInstance = await contractAbstraction.getInstance(contractAddress)
    const users = (await contractInstance.getRegistredUsrs()).map(address => address.toLowerCase())
    isRegistered = users.includes(userAddress)

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
    }
  } else {
    const { ethereum } = window
    await ethereum.enable()
    console.log('Please connect your wallet!')
    return await web3.eth.getCoinbase()
  }
}

export const participate = async (userAddress) => {
  if (isRegistered) {
    console.log('Excellent!!!!!!!!')
    const participationFee = await contractInstance.participationFee()
    let registrationBonus = await contractInstance.registrationBonus()
    const fee = new BigNumber(participationFee).shiftedBy(-tokenDecimal).toString()

    await web4.setProvider(ethereum, userAddress)

    registrationBonus = new BigNumber(registrationBonus).shiftedBy(-tokenDecimal).toString()
    console.log('participationFee', fee)
    console.log('registrationBonus', registrationBonus)
    userJoined = await contractInstance.joined(userAddress)
    if (userJoined) {
      // need to leave
      console.log('You are joined', userJoined)
    } else {
      const amount = new BigNumber(AMOUNT).shiftedBy(+tokenDecimal).toString()
      const allowance = await erc20Instance.allowance(userAddress, contractAddress)
      if (allowance.toString() !== amount) {
        await erc20Instance.approve(contractAddress, amount)
      }
      console.log('Allowance', allowance.toString())
      await contractInstance.join()
      userJoined = await contractInstance.joined(userAddress)
      console.log('Successful join method')
    }

    const usersAddress = await contractInstance.getRegistredUsrs()
    console.log('USERS ADDRESS ARE: ', usersAddress)
    // const usersJoined = await contractInstance.UserJoined()
    // console.log('Users joined: ', usersJoined)

    // const finishRound = await contractInstance.startRound( )
    // const finishRound = await contractInstance.finishRound()
    // console.log('Round finished: ', finishRound)

    // const flagCaptured = await contractInstance.FlagCaptured()
    // console.log('flag captured: ', flagCaptured)

    // await contractInstance.capture(userAddress, participationFee)
    return {
      fee,
      registrationBonus,
      usersAddress,
      userJoined
    }
  } else {
    const { ethereum } = window
    await ethereum.enable()
    console.log('Please register on the game!')
    return await web3.eth.getCoinbase()
  }
}

export const leavingGame = async (userAddress) => {
  if (isRegistered) {
    const { ethereum } = window
    await ethereum.enable()
    await contractInstance.leave()
    userJoined = await contractInstance.joined(userAddress)
    console.log('Exit: ', userJoined)
    console.log('You left the game: ')
  } else {
    console.log('Please register to game!!!!!!!!')
    return registerUser()
  }
  return { userJoined }
}
export const StartGame = async () => {
  const { ethereum } = window
  await ethereum.enable()
  const start = await contractInstance.startRound()
  // const finish = await contractInstance.finishRound()
  console.log('Your capture flag: ', start)
}

export const captureFlag = async () => {
  const { ethereum } = window
  await ethereum.enable()
  const capture = (await contractInstance.capture()).logs[0]

  console.log('Your capture flag logs: ', capture)
  const address = capture.address
  console.log('Your own address is: ', address)
  const round = capture.args.round.toString()
  console.log('Your pool round is : ', round)
  const time = capture.args.startTime.toString()
  console.log('Your time is : ', time)
  return { address, round, time }
}

export const claimMethod = async () => {
  const { ethereum } = window
  await ethereum.enable()

  const currentRoundId = (await contractInstance.currentRoundId()).toString()
  console.log('currentRoundId: ', currentRoundId)
  const claim = await contractInstance.claim(currentRoundId)
  console.log('Claim: ', claim)
}
