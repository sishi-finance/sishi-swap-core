import { Contract, Wallet, providers } from 'ethers'
import { expandTo18Decimals } from './utilities'
import { ERC20, ERC20__factory, SishiswapFactory, SishiswapFactory__factory, SishiswapPair, SishiswapPair__factory } from '../../typechain'


interface FactoryFixture {
  factory: SishiswapFactory
}



export async function factoryFixture([wallet]: Wallet[]): Promise<FactoryFixture> {
  const factory = await new SishiswapFactory__factory(wallet).deploy(wallet.address)
  // const factory = await deployContract(wallet, SishiswapFactory, [wallet.address], overrides)
  return { factory }
}

interface PairFixture extends FactoryFixture {
  token0: ERC20
  token1: ERC20
  pair: SishiswapPair
}

export async function pairFixture([wallet]: Wallet[]): Promise<PairFixture> {
  const { factory } = await factoryFixture([wallet])
  const ERC20Factorry = new ERC20__factory(wallet)
  const tokenA = await ERC20Factorry.deploy(expandTo18Decimals(10000))
  const tokenB = await ERC20Factorry.deploy(expandTo18Decimals(10000))
  await factory.createPair(tokenA.address, tokenB.address)
  const pairAddress = await factory.getPair(tokenA.address, tokenB.address)
  const pair = new SishiswapPair__factory(wallet).attach(pairAddress)
  const token0Address = (await pair.token0())
  const token0 = tokenA.address === token0Address ? tokenA : tokenB
  const token1 = tokenA.address === token0Address ? tokenB : tokenA

  return { factory, token0, token1, pair }

}
