const { ethers } = require('hardhat');
const { expect } = require('chai');

describe("P3 proxy functionality testing", async() => {
    let P1, p1, P3, p3;
    it("First test", async() => {
        P1 =  await ethers.getContractFactory("Phase1");
        P2 = await ethers.getContractFactory("Phase2");
        P3 = await ethers.getContractFactory("Phase3");
        p1 = await upgrades.deployProxy(P1, [20000], {initializer: "initialize"});
        await p1.deployed();
        p2 = await upgrades.upgradeProxy(p1.address, P2);
        await p2.deployed();
        const amountToBeBurnt = 2000;
        await p2.burn(amountToBeBurnt);
        const totalSupply = await p2.totalSupply();
        expect(totalSupply).to.equal(18000);
        p3 = await upgrades.upgradeProxy(p1.address, P3);
        await p3.deployed();
        await p3.burn(3000);
        const totalSupplyP3 = await p3.totalSupply();
        const totalSupplyP1 = await p1.totalSupply();
        expect(totalSupplyP3).to.equal(15000);
        expect(totalSupplyP3).to.equal(totalSupplyP1);
        console.log("Phase 3 proxy contract deployed on: ", p3.address);
    });
});