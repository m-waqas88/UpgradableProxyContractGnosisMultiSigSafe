async function main() {
    const proxyAddress = '0x3cb36436A7bfF8CA656a243346100fDC589CcF83';    // proxy address not the admin of the proxy.  
    const P2 = await ethers.getContractFactory("Phase2");
    console.log("Preparing upgrade...");
    const P2Address = await upgrades.prepareUpgrade(proxyAddress, P2);
    console.log("Phase2 deployed at:", P2Address);
  }
   
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });