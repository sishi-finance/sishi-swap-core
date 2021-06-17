import { ethers } from "hardhat"
import { SishiswapFactory__factory } from "../typechain";

async function main() {

  const [deployer] = await ethers.getSigners();
  const feeAddress = "0xdDc9f2f317448698F69cFa3082Fd6CF9c3AD92d3"

  const FactoryDeployer = await new SishiswapFactory__factory(deployer)
    .deploy(deployer.address)

  console.log("FactoryAddrress address:", FactoryDeployer.address);

  await FactoryDeployer
    .connect(deployer)
    .setFeeTo(feeAddress)
    
  console.log("FactoryAddrress address:", FactoryDeployer.address);

  await hre.run("verify:verify", {
    address: FactoryDeployer.address,
    constructorArguments: [deployer.address],
  })

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
