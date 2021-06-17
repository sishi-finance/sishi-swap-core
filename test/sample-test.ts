import { ethers } from "hardhat";
import { expect } from "chai";
import { Greeter__factory } from "../typechain";
import { MockProvider } from "@ethereum-waffle/provider";

describe("Greeter", function() {
  it("Should return the new greeting once it's changed", async function() {
    const provider = new MockProvider()
    const [wallet, other] = provider.getWallets()
    const Greeter = new Greeter__factory(wallet);
    const greeter = await Greeter.deploy("Hello, world!");
    
    await greeter.deployed();
    expect(await greeter.greet()).to.equal("Hello, world!");

    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
